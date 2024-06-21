import sys
from ai import AI
import pandas as pd
import os
from googlesearch import search
from bs4 import BeautifulSoup
import requests
ai = AI()
def analyse_tos(tos, app=""):
    scans_path = os.path.join(os.path.dirname(__file__), '../src/scans.csv')
    scans = pd.read_csv(scans_path)
    print(scans['App'].values)
    if app in scans['App'].values:
        categorized_sentences = scans[scans['App'] == app].iloc[0].tolist()
        #print(categorized_sentences)
    else:
        if tos== '':
            print("No terms of service found for " + app + ". Searching the web...")
            tos_urls = search(app + " terms of service", num=1, stop=1)
            url = ''
            for i in tos_urls:
                url = i
            html_content = requests.get(url).text
            soup = BeautifulSoup(html_content, "html.parser")
            # Find all of the text between paragraph tags and strip out the html
            tos_list = soup.find_all('p')
            for i in tos_list:
                tos += i.get_text()
            print(tos)
        sentences = tos.split('.')
        categorized_sentences = [[], [], []]
        for sentence in sentences:
            categorized_sentences[ai.getHarmLevel(sentence)].append(sentence)
        categorized_sentences = ["\n".join(categorized_sentences[0]), 
                                "\n".join(categorized_sentences[1]), 
                                "\n".join(categorized_sentences[2])]
        dct = {'App': app, 
                              'Level_0': categorized_sentences[0], 
                              'Level_1': categorized_sentences[1], 
                              'Level_2': categorized_sentences[2]}
        dct = {k:[v] for k,v in dct.items()}
        scans = pd.concat([scans, pd.DataFrame(dct)], 
                              ignore_index=True)
        scans.to_csv(scans_path, index=False)

    normal_path = os.path.join(os.path.dirname(__file__), 'results', 'normal.txt')
    with open(normal_path, 'w', encoding='utf-8', errors='ignore') as f:
        f.write(str(categorized_sentences[0]))
    warning_path = os.path.join(os.path.dirname(__file__), 'results', 'warning.txt')
    with open(warning_path, 'w', encoding='utf-8', errors='ignore') as f:
        f.write(str(categorized_sentences[1]))
    danger_path = os.path.join(os.path.dirname(__file__), 'results', 'danger.txt')
    with open(danger_path, 'w', encoding='utf-8', errors='ignore') as f:
        f.write(str(categorized_sentences[2]))

    return categorized_sentences

if __name__ == '__main__':
    tos_path = os.path.join(os.path.dirname(__file__), 'tos.txt')
    with open(tos_path, 'r', encoding='utf-8', errors='ignore') as f:
        tos = f.read()
    app = sys.argv[1]
    analysis = analyse_tos(tos, app)