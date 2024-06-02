import sys
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
    model_path = os.path.join(os.path.dirname(__file__), '../ai_models/model2.pkl')
    with open(model_path, 'rb') as file:
        model = pickle.load(file)

    # Predict on the test set
    extsentence = extract_features(sentence)
    return model.predict([extsentence])[0]

def analyse_tos(tos):
    sentences = tos.split('.')
    categorized_sentences = [[], [], []]
    for sentence in sentences:
        categorized_sentences[predict(sentence)].append(sentence)
    return categorized_sentences

if __name__ == '__main__':
    tos = sys.argv[1] # sys.argv[0] is the script name
    analysis = analyse_tos(tos)
    level_2_sentences = "\n".join(analysis[2])
    level_1_sentences = "\n".join(analysis[1])
    print("Terms which you should be aware of:")
    print(level_2_sentences)
    print('!--------------------!')
    print("Terms which you might need to take note of:")
    print(level_1_sentences)
