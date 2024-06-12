from data import get_data
from sklearn.model_selection import train_test_split, GridSearchCV
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.ensemble import RandomForestClassifier,  GradientBoostingClassifier
from imblearn.over_sampling import SMOTE
from imblearn.pipeline import Pipeline as ImbPipeline
from sklearn.pipeline import FeatureUnion
from sklearn.base import BaseEstimator, TransformerMixin
from sklearn.metrics import accuracy_score, classification_report, make_scorer
from sklearn.preprocessing import StandardScaler
from sklearn.feature_selection import SelectFromModel
from textblob import TextBlob
from sentence_transformers import SentenceTransformer
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

minilm_path = os.path.join(__file__, '../minilm')
# Custom transformer for Sentence Transformers
class SentenceTransformerFeatures(BaseEstimator, TransformerMixin):
    def __init__(self, model_name='sentence-transformers/all-MiniLM-L6-v2'):
        self.model = SentenceTransformer(minilm_path)
        self.model_name = model_name
    
    def fit(self, X, y=None):
        return self
    
    def transform(self, X):
        embeddings = self.model.encode(X.tolist(), convert_to_tensor=False)
        return np.array(embeddings)
    
def custom_loss(y_true, y_pred):
    score = 0
    for true, pred in zip(y_true, y_pred):
        if true == 2 and pred == 1:
            score += 4
        elif true == 2 and pred == 0:
            score -= 30
        elif true == 1 and pred == 2:
            score += 4
        elif true == 1 and pred == 0:
            score -= 3.5
        elif true == 0 and pred == 1:
            score -= 4
        elif true == 0 and pred == 2:
            score -= 15
        elif true == pred:
            score += 10 # keep this constant
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
        ('tfidf', TfidfVectorizer(ngram_range=(1, 2), stop_words='english', max_df=0.5, min_df=3)),
        ('sentence_transformer', SentenceTransformerFeatures()),
        #('textblob', TextBlobFeatures()),
    ])),
    ('smote', SMOTE()), 
    ('scaler', StandardScaler(with_mean=False)),
    ('feature_selection', SelectFromModel(GradientBoostingClassifier())), 
    ('clf', RandomForestClassifier(
            n_estimators=100, 
            max_depth = None,
            min_samples_split = 5,
            max_features = 'sqrt',
            criterion = 'gini',
            max_leaf_nodes = 30,
            min_impurity_decrease=0.0,
            class_weight='balanced_subsample',
            min_samples_leaf=4,
            bootstrap=True,
        )),
])

# Define parameter grid for GridSearchCV
param_grid = {
    # 'clf__min_samples_leaf': [2, 4, 6],
    # 'clf__bootstrap': [False, True],
    # 'features__tfidf__min_df': [2, 3, 5],
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
print(grid_search.best_params_)
accuracy = accuracy_score(Y_test, Y_pred)
print(f'Accuracy: {accuracy}')
print('Classification Report:')
print(classification_report(Y_test, Y_pred))
print(Y_pred.tolist())
print(Y_test.tolist())

print(model.predict(np.array(["We will steal your data and you will die no warranty nothing you die"])))