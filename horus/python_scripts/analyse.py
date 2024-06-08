import sys
from ai import AI
import os

ai = AI()
def analyse_tos():
    tos_path = os.path.join(os.path.dirname(__file__), 'tos.txt')
    with open(tos_path, 'r') as f:
        tos = f.read()
    sentences = tos.split('.')
    categorized_sentences = [[], [], []]
    for sentence in sentences:
        categorized_sentences[ai.getHarmLevel(sentence)].append(sentence)
    categorized_sentences = ["\n".join(categorized_sentences[0]), 
                                "\n".join(categorized_sentences[1]), 
                                "\n".join(categorized_sentences[2])]
    normal_path = os.path.join(os.path.dirname(__file__), 'results', 'normal.txt')
    with open(normal_path, 'w') as f:
        f.write(categorized_sentences[0])
    warning_path = os.path.join(os.path.dirname(__file__), 'results', 'warning.txt')
    with open(warning_path, 'w') as f:
        f.write(categorized_sentences[1])
    danger_path = os.path.join(os.path.dirname(__file__), 'results', 'danger.txt')
    with open(danger_path, 'w') as f:
        f.write(categorized_sentences[2])
    return categorized_sentences

if __name__ == '__main__':
    analysis = analyse_tos()