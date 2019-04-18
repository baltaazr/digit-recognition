import random
import numpy as np
from copy import deepcopy


class Neuron:
    def __init__(self, n):
        w = []
        w.append(0)
        for i in range(n):
            w.append(0)
        self.w = w
        self.learning_rate = 0.1

    def activate(self, x):
        x = np.insert(x, 0, -1)
        result = 0
        for i in range(0, len(self.w)):
            result += x[i] * self.w[i]
        if result > 0:
            return 1
        else:
            return -1

    def activate_num(self, x):
        x = np.insert(x, 0, -1)
        result = 0
        for i in range(0, len(self.w)):
            result += x[i] * self.w[i]
        return result

    def train(self, training_set, max_iter, cur_iter=1):
        training_set = deepcopy(training_set)
        np.random.shuffle(training_set)
        error = 0
        for x in training_set:
            t = x[len(x)-1]
            o = self.activate(x)
            error += abs(t-o)
            x = np.insert(x, 0, -1)
            for i in range(0, len(self.w)):
                self.w[i] += self.learning_rate*(t-o)*x[i]
        if(error == 0 or cur_iter >= max_iter):
            return
        else:
            self.train(training_set, max_iter, cur_iter+1)
