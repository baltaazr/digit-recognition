from PIL import Image
import os
import numpy as np
from copy import deepcopy
from random import random

training_directory = './training-set/'

zero = [[255, 0, 0, 0, 255], [0, 255, 255, 255, 0], [0, 255, 255, 255, 0], [
    0, 255, 255, 255, 0], [0, 255, 255, 255, 0], [0, 255, 255, 255, 0], [255, 0, 0, 0, 255]]

one = [[255, 255, 0, 255, 255], [255, 0, 0, 255, 255], [255, 255, 0, 255, 255], [255, 255,
                                                                                 0, 255, 255], [255, 255, 0, 255, 255], [255, 255, 0, 255, 255], [255, 0, 0, 0, 255]]

two = [[255, 0, 0, 0, 255], [0, 255, 255, 255, 0], [0, 255, 255, 255, 0], [
    255, 255, 0, 0, 255], [255, 0, 0, 255, 255], [0, 255, 255, 255, 255], [0, 0, 0, 0, 0]]

three = [[255,0,0,0,255,],[0,255,255,255,0,],[255,255,255,255,0,],[255,255,0,0,255,],[255,255,255,255,0,],[0,255,255,255,0,],[255,0,0,0,255,],]

four = [[255, 255, 0, 0, 255, ], [255, 0, 255, 0, 255, ], [0, 255, 255, 0, 255, ], [
    0, 255, 255, 0, 255, ], [0, 0, 0, 0, 0, ], [255, 255, 255, 0, 255, ], [255, 255, 255, 0, 255, ], ]

five = [[0, 0, 0, 0, 0, ], [0, 255, 255, 255, 255, ], [0, 255, 255, 255, 255, ], [
    0, 0, 0, 0, 255, ], [255, 255, 255, 255, 0, ], [0, 255, 255, 255, 0, ], [255, 0, 0, 0, 255, ], ]

six = [[255, 0, 0, 0, 255, ], [0, 255, 255, 255, 0, ], [0, 255, 255, 255, 255, ], [
    0, 0, 0, 0, 255, ], [0, 255, 255, 255, 0, ], [0, 255, 255, 255, 0, ], [255, 0, 0, 0, 255, ], ]

seven = [[0, 0, 0, 0, 0, ], [0, 255, 255, 255, 0, ], [255, 255, 255, 0, 0, ], [255, 255, 0,
                                                                               0, 255, ], [255, 0, 0, 255, 255, ], [255, 0, 255, 255, 255, ], [255, 0, 255, 255, 255, ], ]

eight = [[255, 0, 0, 0, 255, ], [0, 255, 255, 255, 0, ], [0, 255, 255, 255, 0, ], [
    255, 0, 0, 0, 255, ], [0, 255, 255, 255, 0, ], [0, 255, 255, 255, 0, ], [255, 0, 0, 0, 255, ], ]

nine = [[255, 0, 0, 0, 255, ], [0, 255, 255, 255, 0, ], [0, 255, 255, 255, 0, ], [
    255, 0, 0, 0, 0, ], [255, 255, 255, 255, 0, ], [0, 255, 255, 255, 0, ], [255, 0, 0, 0, 255, ], ]

no_noise_array_digits = [zero, one, two, three, four, five, six, seven, eight, nine]

shape = (7, 5)


def generate_noise(arr):
        noise_intensity = 25 + 50 * random()
        noise_arr = deepcopy(arr)
        for x in range(0, len(noise_arr)):
                for y in range(0, len(noise_arr[x])):
                        noise = random() * (noise_intensity * 2) - noise_intensity
                        noise_arr[x][y] += noise
                        noise_arr[x][y] = min(noise_arr[x][y], 255)
                        noise_arr[x][y] = max(noise_arr[x][y], 0)
        return noise_arr

def generate(no_noise_array):
    for i in range(0, 10):
        if isinstance(no_noise_array[i], bool):
            no_noise_array[i] = no_noise_array_digits[i]

        flat_arr = np.array(no_noise_array[i])

        flat_arr = flat_arr.astype(np.uint8)

        vector = np.matrix(flat_arr)

        arr = np.asarray(vector).reshape(shape)

        img = Image.fromarray(arr, 'L')

        img.save(training_directory + str(i) + '/no-noise.png')
        for n in range(1, 30):
            flat_arr = np.array(generate_noise(no_noise_array[i]))

            flat_arr = flat_arr.astype(np.uint8)

            vector = np.matrix(flat_arr)

            arr = np.asarray(vector).reshape(shape)

            img = Image.fromarray(arr, 'L')

            img.save(training_directory + str(i) +
                    '/noise/noise' + str(n) + '.png')
