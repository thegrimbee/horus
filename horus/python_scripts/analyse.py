import sys
from ai import AI

ai = AI()
def analyse_tos(tos):
    sentences = tos.split('.')
    categorized_sentences = [[], [], []]
    for sentence in sentences:
        categorized_sentences[ai.getHarmLevel(sentence)].append(sentence)
    return categorized_sentences

if __name__ == '__main__':
    tos = sys.argv[1]
    print(analyse_tos(tos))