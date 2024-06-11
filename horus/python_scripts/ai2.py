import pickle
import os
from textblob import TextBlob
import pandas as pd

def predict(sentence):
    # Load the model from the file
    model_path = os.path.join(os.path.dirname(__file__), '../ai_models/model2.pkl')
    with open(model_path, 'rb') as file:
        model = pickle.load(file)

    # Predict on the test set
    return model.predict(pd.Series([sentence])).tolist()[0]

print(predict("We will steal your data and you will die no warranty nothing you die"))