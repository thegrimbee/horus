import random

class AI:
    def __init__(self):
        pass
    def getHarmLevel(self, str):
        zeros = [0] * 6
        ones = [1] * 3
        twos = [2]
        combined = zeros
        combined.extend(ones)
        combined.extend(twos)
        return random.choice(combined)