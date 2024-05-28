import pandas as pd

def get_data():
    # The URL of your Google Sheets document's published CSV link
    url = 'https://docs.google.com/spreadsheets/d/1r6mS8WzukVhHnVFOEGmQtwL2VmSqkGXQy1H2Al6IO2o/gviz/tq?tqx=out:csv'

    # Read the CSV data
    df = pd.read_csv(url)
    df = df[df['Gabriel'] == 'Yes']
    terms_of_service_list = df['Terms of Service Sentence'].tolist()
    result = df['Harm Level'].tolist()

    return terms_of_service_list, result

