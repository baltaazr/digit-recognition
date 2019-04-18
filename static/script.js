loadCanvas = () => {
  canvas.forEach((subArr, y) => {
    subArr.forEach((n, x) => {
      push();
      fill(n);
      rect(
        canvasLeft + x * canvasPixelSize,
        canvasTop + y * canvasPixelSize,
        canvasPixelSize,
        canvasPixelSize
      );
      pop();
    });
  });
};

clearCanvas = () => {
  for (let y = 0; y < 7; y++) {
    for (let x = 0; x < 5; x++) {
      canvas[y][x] = 255;
    }
  }
  loadCanvas();
};

mouseDragged = () => {
  if (mouseY > canvasTop && mouseY < canvasTop + canvasPixelSize * 7) {
    if (mouseX > canvasLeft && mouseX < canvasLeft + canvasPixelSize * 5) {
      let absoluteX = mouseX - canvasLeft;
      let absoluteY = mouseY - canvasTop;
      let x = Math.floor(absoluteX / canvasPixelSize);
      let y = Math.floor(absoluteY / canvasPixelSize);
      canvas[y][x] = colorSlider.value();
      loadCanvas();
    }
  }
};
