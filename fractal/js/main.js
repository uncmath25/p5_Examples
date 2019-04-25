var WIDTH = 800;
var HEIGHT = 600;

var fractal;
var angle;
var slider;


function setup() {
  createCanvas(WIDTH, HEIGHT);
  setupSlider();
  fractal = new Fractal([floor(WIDTH / 2), HEIGHT], floor(HEIGHT / 4));
}

function draw() {
  background(50);
  angle = slider.value();
  document.getElementById('slider-value').innerText = angle.toFixed(2);
  fractal.draw(angle / 2);
}


function setupSlider() {
  var slider_start = 0;
  var slider_end = PI;
  var slider_default = PI / 2
  slider = createSlider(slider_start, slider_end, slider_default, 0.01);
  slider.style('width', WIDTH + 'px');

  document.getElementById('canvas-container').appendChild(document.body.getElementsByTagName('canvas')[0]);
  document.getElementById('slider-container').appendChild(document.body.getElementsByTagName('input')[0]);
  document.getElementById('slider-start').appendChild(document.createTextNode(slider_start));
  document.getElementById('slider-end').appendChild(document.createTextNode(slider_end.toFixed(2)));

  angle = slider_default;
}
