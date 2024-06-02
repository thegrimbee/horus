import pickle
import os
from textblob import TextBlob

def extract_features(sentence):
    blob = TextBlob(sentence)
    sentiment = blob.sentiment.polarity
    subjectivity = blob.sentiment.subjectivity
    return [sentiment, subjectivity]

def predict(sentence):
    # Load the model from the file
    model_path = os.path.join(os.path.dirname(__file__), '../horus/ai_models/model2.pkl')
    with open('C:/Users/gabri/horus/horus/ai_models/model2.pkl', 'rb') as file:
        model = pickle.load(file)

    # Predict on the test set
    extsentence = extract_features(sentence)
    return model.predict([extsentence])[0]

print(predict("We will steal your data and you will die no warranty nothing you die"))