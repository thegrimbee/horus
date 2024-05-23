from textblob import TextBlob
from textblob.classifiers import NaiveBayesClassifier
import pickle
import json

# Define your untrained AI model
class UntrainedAI:
    def __init__(self):
        pass

    def train(self, training_data):
        # Convert training data to the required format
        formatted_data = [(TextBlob(text), label) for text, label in training_data]
        
        # Train the Naive Bayes classifier
        self.classifier = NaiveBayesClassifier(formatted_data)

    def predict(self, text):
        # Prediction code goes here
        prediction = self.classifier.classify(TextBlob(text))
        return prediction

# Example usage
if __name__ == "__main__":
    # Create an instance of the untrained AI model
    ai_model = UntrainedAI()

    # Train the AI model with your training data
    # Load training data from external JSON file
    with open("training_data.json", "r") as file:
        training_data = json.load(file)

    ai_model.train(training_data)
    

    ai_model.train(training_data)
    # Save the trained AI model to a file
    with open("trained_model2.pkl", "wb") as file:
        pickle.dump(ai_model, file)

    # Make predictions using the AI model
    text = "abandon your right"
    prediction = ai_model.predict(text)
    print(f"Prediction: {prediction}")