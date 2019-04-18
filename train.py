import os
import numpy as np
from PIL import Image

training_directory = './training-set/'


def get_flat_arr(directory):
    img = Image.open(directory).convert('L')
    arr = np.array(img)
    flat_arr = arr.ravel()
    flat_arr = [x / 255 for x in flat_arr]
    return flat_arr


def train(max_iter, learning_rate, perceptrons):
    for i in range(0, 10):
        perceptron = perceptrons[i]
        perceptron.learning_rate = learning_rate
        training_set = []
        for n in range(0, 10):
            t = -1
            if n == i:
                t = 1
            cur_dir = training_directory + str(n)
            for filename in os.listdir(cur_dir):
                if filename.endswith(".png"):
                    flat_arr = get_flat_arr(
                        cur_dir + '/' + filename)
                    flat_arr.append(t)
                    training_set.append(flat_arr)
                else:
                    for filename in os.listdir(cur_dir + '/noise'):
                        if filename.endswith('.png'):
                            flat_arr = get_flat_arr(
                                cur_dir + '/noise/' + filename)
                            flat_arr.append(t)
                            training_set.append(flat_arr)
        perceptron.train(training_set, max_iter)
