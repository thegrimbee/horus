from textblob import TextBlob
from textblob.classifiers import NaiveBayesClassifier
import pickle
import json
import csv

# Define your untrained AI model
class UntrainedAI:
    def __init__(self):
        pass

    def train(self, training_data):
        # Convert training data to the required format
        # Read training data from CSV file

        formatted_data = [(TextBlob(text), label) for text, label in training_data.items()]
                
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
    with open("training_data.csv", "r") as file:
        reader = csv.reader(file)
        fields = reader.__next__()
        training_data = {row[0]: row[1] for row in reader}
    ai_model.train(training_data)
    
    # Save the trained AI model to a file
    with open("trained_model.pkl", "wb") as file:
        pickle.dump(ai_model, file)

    # Make predictions using the AI model
    text = "we steal data"
    prediction = ai_model.predict(text)
    print(f"Prediction: {prediction}")