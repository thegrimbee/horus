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
    tos = sys.argv[1] # sys.argv[0] is the script name
    analysis = analyse_tos(tos)
    level_2_sentences = "\n".join(analysis[2])
    level_1_sentences = "\n".join(analysis[1])
    print("Terms which you should be aware of:")
    print(level_2_sentences)
    print('!--------------------!')
    print("Terms which you might need to take note of:")
    print(level_1_sentences)
