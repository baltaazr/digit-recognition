from flask import Flask, render_template, request
import os
import numpy as np
from PIL import Image
import json
from neuron import Neuron
from train import train
from generate import generate

perceptrons = []

for i in range(0, 10):
    perceptrons.append(Neuron(35))

# FLASK
app = Flask(__name__)


@app.route('/')
def index():
    return render_template('index.html')


@app.route('/train')
def trainPage():
    return render_template('train.html')


@app.route('/generate', methods=['GET', 'POST'])
def generatePage():
    if request.method == 'POST':
        no_noise_array = [False, False, False, False,
                          False, False, False, False, False, False]
        for i in range(1, 11):
            arr = request.get_json()['file' + str(i)]
            if arr:
                no_noise_array[i-1] = np.array(arr)
        generate(no_noise_array)
        return '1'
    return render_template('generate.html')


@app.route('/classify_request', methods=['POST'])
def classify_request():
    canvas = request.get_json()['canvas']
    x = np.array(canvas).ravel()
    output = [0, perceptrons[0].activate_num(x)]
    for i in range(1, 10):
        perceptron = perceptrons[i]
        o = perceptron.activate_num(x)
        if o > output[1]:
            output = [i, o]
    if output[1] > 0:
        return str(output[0])
    else:
        return 'e'


@app.route('/train_request', methods=['POST'])
def train_request():
    max_iter = int(request.get_json()['max_iter'])
    learning_rate = float(request.get_json()['learning_rate'])
    train(max_iter, learning_rate, perceptrons)
    return '1'


@app.route('/get_no_noise_array', methods=['GET'])
def get_no_noise_array():
    no_noise_array = []
    for i in range(0, 10):
        for filename in os.listdir('./training-set/' + str(i)):
            if filename.endswith(".png"):
                img = Image.open('./training-set/' + str(i) +
                                 '/' + filename).convert('L')
                arr = np.array(img)
                no_noise_array.append(arr.tolist())
    return json.dumps(no_noise_array)


app.run(port=8000, debug=True)
