const zero = [
  [255, 0, 0, 0, 255],
  [0, 255, 255, 255, 0],
  [0, 255, 255, 255, 0],
  [0, 255, 255, 255, 0],
  [0, 255, 255, 255, 0],
  [0, 255, 255, 255, 0],
  [255, 0, 0, 0, 255]
];

const one = [
  [255, 255, 0, 255, 255],
  [255, 0, 0, 255, 255],
  [255, 255, 0, 255, 255],
  [255, 255, 0, 255, 255],
  [255, 255, 0, 255, 255],
  [255, 255, 0, 255, 255],
  [255, 0, 0, 0, 255]
];

const two = [
  [255, 0, 0, 0, 255],
  [0, 255, 255, 255, 0],
  [0, 255, 255, 255, 0],
  [255, 255, 0, 0, 255],
  [255, 0, 0, 255, 255],
  [0, 255, 255, 255, 255],
  [0, 0, 0, 0, 0]
];

const three = [
  [255, 0, 0, 0, 255],
  [0, 255, 255, 255, 0],
  [255, 255, 255, 255, 0],
  [255, 255, 0, 0, 255],
  [255, 255, 255, 255, 0],
  [0, 255, 255, 255, 0],
  [255, 0, 0, 0, 255]
];

const four = [
  [255, 255, 0, 0, 255],
  [255, 0, 255, 0, 255],
  [0, 255, 255, 0, 255],
  [0, 255, 255, 0, 255],
  [0, 0, 0, 0, 0],
  [255, 255, 255, 0, 255],
  [255, 255, 255, 0, 255]
];

const five = [
  [0, 0, 0, 0, 0],
  [0, 255, 255, 255, 255],
  [0, 255, 255, 255, 255],
  [0, 0, 0, 0, 255],
  [255, 255, 255, 255, 0],
  [0, 255, 255, 255, 0],
  [255, 0, 0, 0, 255]
];

const six = [
  [255, 0, 0, 0, 255],
  [0, 255, 255, 255, 0],
  [0, 255, 255, 255, 255],
  [0, 0, 0, 0, 255],
  [0, 255, 255, 255, 0],
  [0, 255, 255, 255, 0],
  [255, 0, 0, 0, 255]
];

const seven = [
  [0, 0, 0, 0, 0],
  [0, 255, 255, 255, 0],
  [255, 255, 255, 0, 0],
  [255, 255, 0, 0, 255],
  [255, 0, 0, 255, 255],
  [255, 0, 255, 255, 255],
  [255, 0, 255, 255, 255]
];

const eight = [
  [255, 0, 0, 0, 255],
  [0, 255, 255, 255, 0],
  [0, 255, 255, 255, 0],
  [255, 0, 0, 0, 255],
  [0, 255, 255, 255, 0],
  [0, 255, 255, 255, 0],
  [255, 0, 0, 0, 255]
];

const nine = [
  [255, 0, 0, 0, 255],
  [0, 255, 255, 255, 0],
  [0, 255, 255, 255, 0],
  [255, 0, 0, 0, 0],
  [255, 255, 255, 255, 0],
  [0, 255, 255, 255, 0],
  [255, 0, 0, 0, 255]
];

const e = [
  [0, 0, 0, 0, 255],
  [0, 255, 255, 255, 255],
  [0, 255, 255, 255, 255],
  [0, 0, 0, 0, 255],
  [0, 255, 255, 255, 255],
  [0, 255, 255, 255, 255],
  [0, 0, 0, 0, 255]
];

const no_noise_array = [
  zero,
  one,
  two,
  three,
  four,
  five,
  six,
  seven,
  eight,
  nine
];

const canvas = [
  [255, 255, 255, 255, 255],
  [255, 255, 255, 255, 255],
  [255, 255, 255, 255, 255],
  [255, 255, 255, 255, 255],
  [255, 255, 255, 255, 255],
  [255, 255, 255, 255, 255],
  [255, 255, 255, 255, 255]
];

const pixelSize = 10;

const noNoiseLeft = window.innerWidth / 2 - 295;

const noNoiseTop = 10;

const canvasPixelSize = 25;

const canvasTop = 125;

const canvasLeft = window.innerWidth / 2 - 200;

const outputLeft = window.innerWidth / 2 + 75;

const buttonLeft = window.innerWidth / 2 - 50;

const buttonGap = 50;

const buttonTop = 90;

let output = null;

setup = () => {
  createCanvas(windowWidth, windowHeight);
  background(200);
  loadNoNoiseNumbers();
  loadCanvas();
  loadOutput();

  generateButton = createButton("Generate");
  generateButton.position(buttonLeft, buttonTop);
  generateButton.mousePressed(generateRedirect);
  generateButton.class("btn btn-secondary");

  trainButton = createButton("Train");
  trainButton.position(buttonLeft, buttonTop + buttonGap);
  trainButton.mousePressed(trainRedirect);
  trainButton.class("btn btn-secondary");

  classifyButton = createButton("Classify");
  classifyButton.position(buttonLeft, buttonTop + buttonGap * 2);
  classifyButton.mousePressed(classify);
  classifyButton.class("btn btn-secondary");

  addNoiseButton = createButton("Add Noise");
  addNoiseButton.position(buttonLeft, buttonTop + buttonGap * 3);
  addNoiseButton.mousePressed(addNoise);
  addNoiseButton.class("btn btn-secondary");

  clearButton = createButton("Clear");
  clearButton.position(buttonLeft, buttonTop + buttonGap * 4);
  clearButton.mousePressed(clearCanvas);
  clearButton.class("btn btn-secondary");

  colorSlider = createSlider(0, 255, 0);
  colorSlider.position(buttonLeft, buttonTop + buttonGap * 5);
  colorSlider.class("range-field");

  getNoNoiseArray();
};

draw = () => {};

mouseClicked = () => {
  if (mouseY > noNoiseTop && mouseY < pixelSize * 7 + noNoiseTop) {
    for (let x = 0; x < 10; x++) {
      if (
        mouseX > noNoiseLeft + pixelSize * x * 6 &&
        mouseX < noNoiseLeft + 5 * pixelSize + pixelSize * x * 6
      ) {
        for (let y = 0; y < canvas.length; y++) {
          canvas[y] = [...no_noise_array[x][y]];
        }
        loadCanvas();
      }
    }
  }
};

loadNoNoiseNumbers = () => {
  no_noise_array.forEach((number_array, index) => {
    number_array.forEach((subArr, y) => {
      subArr.forEach((n, x) => {
        push();
        fill(n);
        rect(
          noNoiseLeft + x * pixelSize + pixelSize * index * 6,
          noNoiseTop + y * pixelSize,
          pixelSize,
          pixelSize
        );
        pop();
      });
    });
  });
};

loadOutput = () => {
  if (output) {
    output.forEach((subArr, y) => {
      subArr.forEach((n, x) => {
        push();
        fill(n);
        rect(
          outputLeft + x * canvasPixelSize,
          canvasTop + y * canvasPixelSize,
          canvasPixelSize,
          canvasPixelSize
        );
        pop();
      });
    });
  } else {
    for (let y = 0; y < 7; y++) {
      for (let x = 0; x < 5; x++) {
        push();
        fill(255);
        rect(
          outputLeft + x * canvasPixelSize,
          canvasTop + y * canvasPixelSize,
          canvasPixelSize,
          canvasPixelSize
        );
        pop();
      }
    }
  }
};

generateRedirect = () => {
  window.location.href = "/generate";
};

trainRedirect = () => {
  window.location.href = "/train";
};

classify = () => {
  let xhr = new XMLHttpRequest();
  xhr.open("POST", "/classify_request", true);
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.onreadystatechange = function() {
    if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
      if (xhr.responseText == "e") {
        output = e;
      } else {
        output = no_noise_array[parseInt(xhr.responseText)];
      }
      loadOutput();
    }
  };
  xhr.send(JSON.stringify({ canvas: canvas }));
};

addNoise = () => {
  let noiseIntensity = 100;
  for (let y = 0; y < 7; y++) {
    for (let x = 0; x < 5; x++) {
      let noise = Math.random() * (noiseIntensity * 2) - noiseIntensity;
      canvas[y][x] += noise;
      canvas[y][x] = Math.min(canvas[y][x], 255);
      canvas[y][x] = Math.max(canvas[y][x], 0);
    }
  }
  loadCanvas();
};

getNoNoiseArray = () => {
  let xhr = new XMLHttpRequest();
  xhr.open("GET", "/get_no_noise_array", true);
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.onreadystatechange = function() {
    if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
      let no_noise_arr = JSON.parse(xhr.responseText);
      for (let i = 0; i < 10; i++) {
        const element = no_noise_arr[i];
        no_noise_array[i] = element;
      }
      loadNoNoiseNumbers();
    }
  };
  xhr.send(null);
};
