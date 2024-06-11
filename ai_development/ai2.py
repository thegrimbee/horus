from data import get_data
from sklearn.model_selection import train_test_split, GridSearchCV
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.ensemble import RandomForestClassifier
from imblearn.over_sampling import SMOTE
from imblearn.pipeline import Pipeline as ImbPipeline
from sklearn.pipeline import FeatureUnion
from sklearn.base import BaseEstimator, TransformerMixin
from sklearn.metrics import accuracy_score, classification_report, make_scorer
from textblob import TextBlob
import numpy as np
import pickle
import os

# Custom transformer to extract TextBlob features
class TextBlobFeatures(BaseEstimator, TransformerMixin):
    def fit(self, X, y=None):
        return self

    def transform(self, X):
        polarities = []
        subjectivities = []
        for text in X:
            blob = TextBlob(text)
            polarities.append(blob.sentiment.polarity)
            subjectivities.append(blob.sentiment.subjectivity)
        return np.array([polarities, subjectivities]).T

def custom_loss(y_true, y_pred):
    score = 0
    for true, pred in zip(y_true, y_pred):
        if true == 2 and pred == 1:
            score += 0.4
        elif true == 2 and pred == 0:
            score -= 5
        elif true == 1 and pred == 2:
            score += 0.4
        elif true == 1 and pred == 0:
            score -= 0.55
        elif true == 0 and pred == 1:
            score -= 0.4
        elif true == 0 and pred == 2:
            score -= 0.6
        elif true == pred:
            score += 1 # keep this constant
    return score

custom_scorer = make_scorer(custom_loss, greater_is_better=True)
    
train_data, val_data = train_test_split(get_data(), test_size=0.2)
# Initialize the model
model = RandomForestClassifier(n_estimators=100, random_state=42)

# Extract features and labels for training data
X_train = train_data['Sentence']
Y_train = train_data['Harm Level']

# Extract features and labels for validation data
X_test = val_data['Sentence']
Y_test = val_data['Harm Level']

pipeline = ImbPipeline([
    ('features', FeatureUnion([
        ('tfidf', TfidfVectorizer(ngram_range=(1, 2), stop_words='english')),
        ('textblob', TextBlobFeatures())
    ])),
    ('smote', SMOTE()),  # Oversamples minority class
    ('clf', RandomForestClassifier(class_weight={0: 13, 1: 20, 2: 17}))  # place more emp
])

# Define parameter grid for GridSearchCV
param_grid = {
    'clf__n_estimators': [100, 200, 300],
    'clf__max_depth': [None, 10, 20, 30],
    'clf__min_samples_split': [2, 5, 10]
}

# Initialize GridSearchCV
grid_search = GridSearchCV(pipeline, param_grid, cv=5, n_jobs=-1, verbose=1, scoring=custom_scorer)

# Train the model
grid_search.fit(X_train, Y_train)

# Get the best model
model = grid_search.best_estimator_

model_path = os.path.join(os.path.dirname(__file__), '../horus/ai_models/model2.pkl')
# Save the model to a file
with open(model_path, 'wb') as file:
    pickle.dump(model, file)

# Predict on the test set
Y_pred = model.predict(X_test) 

# Evaluate the model
accuracy = accuracy_score(Y_test, Y_pred)
print(f'Accuracy: {accuracy}')
print('Classification Report:')
print(classification_report(Y_test, Y_pred))
print(Y_pred.tolist())
print(Y_test.tolist())

print(model.predict(np.array(["We will steal your data and you will die no warranty nothing you die"])))