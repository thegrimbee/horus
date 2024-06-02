from data import get_data
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score, classification_report
from textblob import TextBlob
import numpy as np
import pickle
import os

train_data, val_data = train_test_split(get_data(), test_size=0.2)
# Initialize the model
model = RandomForestClassifier(n_estimators=100, random_state=42)

# Extract features and labels for training data
X_train = train_data['Sentence'].tolist()
Y_train = train_data['Harm Level'].tolist()

# Extract features and labels for validation data
X_test = val_data['Sentence'].tolist()
Y_test = val_data['Harm Level'].tolist()

def extract_features(sentence):
    blob = TextBlob(sentence)
    sentiment = blob.sentiment.polarity
    subjectivity = blob.sentiment.subjectivity
    return [sentiment, subjectivity]

# Apply feature extraction to the training and testing data
X_train_features = np.array([extract_features(sentence) for sentence in X_train])
X_test_features = np.array([extract_features(sentence) for sentence in X_test])

# Train the model
model.fit(X_train_features, Y_train)

model_path = os.path.join(os.path.dirname(__file__), '../horus/ai_models/model2.pkl')
# Save the model to a file
with open('C:/Users/gabri/horus/horus/ai_models/model2.pkl', 'wb') as file:
    pickle.dump(model, file)

# Predict on the test set
Y_pred = model.predict(X_test_features)

# Evaluate the model
accuracy = accuracy_score(Y_test, Y_pred)
print(f'Accuracy: {accuracy}')
print('Classification Report:')
print(classification_report(Y_test, Y_pred))
print(Y_pred)
print(Y_test)