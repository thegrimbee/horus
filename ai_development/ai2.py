from data import get_data
from sklearn.model_selection import train_test_split, GridSearchCV, StratifiedKFold
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
from imblearn.over_sampling import ADASYN
from xgboost import XGBClassifier
from lightgbm import LGBMClassifier
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

minilm_path = os.path.join(__file__, '../../horus/public/minilm')
# Custom transformer for Sentence Transformers
class SentenceTransformerFeatures(BaseEstimator, TransformerMixin):
    def __init__(self, model_name='sentence-transformers/all-MiniLM-L6-v2'):
        self.model = SentenceTransformer(minilm_path)
        self.model_name = model_name
    
    def fit(self, X, y=None):
        return self
    
    def transform(self, X):
        print(X.tolist())
        print(type(X)) 
        embeddings = self.model.encode(X.tolist(), convert_to_tensor=False)
        return np.array(embeddings)
    
def custom_loss(y_true, y_pred):
    score = 0
    for true, pred in zip(y_true, y_pred):
        if true == 2 and pred == 1:
            score += 4
        elif true == 2 and pred == 0:
            score -= 25
        elif true == 1 and pred == 2:
            score += 4
        elif true == 1 and pred == 0:
            score -= 3.2
        elif true == 0 and pred == 1:
            score -= 4
        elif true == 0 and pred == 2:
            score -= 17
        elif true == pred:
            score += 10 # keep this constant
    return score

custom_scorer = make_scorer(custom_loss, greater_is_better=True)
data = get_data()
train_data, val_data = train_test_split(data, test_size=0.2, stratify=data['Harm Level'])

# Extract features and labels for training data
X_train = train_data['Sentence']
Y_train = train_data['Harm Level']

# Extract features and labels for validation data
X_test = val_data['Sentence']
Y_test = val_data['Harm Level']

pipeline = ImbPipeline([
    ('features', FeatureUnion([
        ('tfidf', TfidfVectorizer(ngram_range=(1, 2), stop_words='english', max_df=0.5, min_df=5)),
        ('sentence_transformer', SentenceTransformerFeatures()),
        #('textblob', TextBlobFeatures()),
    ])),
    # ('smote', SMOTE(sampling_strategy='auto')),
    ('adasyn', ADASYN(sampling_strategy='auto')),
    ('scaler', StandardScaler(with_mean=False)),
    ('feature_selection', SelectFromModel(GradientBoostingClassifier())), 
    ('clf', RandomForestClassifier(
            n_estimators=200, 
            max_depth = None,
            min_samples_split = 5,
            max_features = 'sqrt',
            criterion = 'gini',
            max_leaf_nodes = 30,
            min_impurity_decrease=0.0,
            class_weight='balanced_subsample',
            bootstrap=True,
            min_samples_leaf=4,
        )),
    # ('clf', XGBClassifier(
    #         n_estimators=200, 
    #         max_depth=None,
    #         learning_rate=0.1,
    #         colsample_bytree=1.0,
    #         subsample=0.8,
    #     )),
    # ('clf', LGBMClassifier(
    #         n_estimators=200, 
    #         max_depth=None,
    #         learning_rate=0.05,
    #         colsample_bytree=1.0,
    #         subsample=0.8,
    #         num_leaves=24,
    #     )),
])

# Define parameter grid for GridSearchCV
# param_grid = {
#     'clf__n_estimators': [100, 200, 300],
# }


# stratified_kfold = StratifiedKFold(n_splits=5, shuffle=True, random_state=42)
# grid_search = GridSearchCV(pipeline, param_grid, cv=stratified_kfold, n_jobs=-1, verbose=1, scoring=custom_scorer)
# grid_search.fit(X_train, Y_train)
# model = grid_search.best_estimator_
# print(grid_search.best_params_)

pipeline.fit(X_train, Y_train)
model = pipeline

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