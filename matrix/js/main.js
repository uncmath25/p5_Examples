var WIDTH = 800;
var HEIGHT = 600;

var NUM_LAYERS = 3;
var CHARACTER_WIDTHS = [5, 10, 20];
var CHARACTER_HEIGHTS = [10, 20, 40];
var MAX_CHARACTER_ROWS;
var MAX_CHARACTER_COLUMNS;

var PIXEL_SPEED = 40;
var FPS = 20;
var STEP_SIZE;

var NUM_CHARACTER_TYPES = 10;
var CHARACTER_TYPES_STROKES_MIN = 2;
var CHARACTER_TYPES_STROKES_MAX = 4;
var CHARACTER_TYPES;

var LEVEL_NUM_CHARACTERS = [500, 300, 200];
var CHARACTER_COLORS = [[50, 100, 50], [100, 200, 100], [150, 250, 150]];
var CHARACTER_STROKE_WEIGHTS = [2, 2.5, 3];
var level_character_x_positions;
var level_character_y_positions;
var level_characters;


function setup() {
  MAX_CHARACTER_ROWS = [];
  MAX_CHARACTER_COLUMNS = [];
  for (var i = 0; i < NUM_LAYERS; i++) {
    MAX_CHARACTER_ROWS.push(Math.floor(WIDTH / CHARACTER_WIDTHS[i]));
    MAX_CHARACTER_COLUMNS.push(Math.floor(HEIGHT / CHARACTER_HEIGHTS[i]));
  }

  STEP_SIZE = PIXEL_SPEED / FPS;

  createCanvas(WIDTH, HEIGHT);
  frameRate(FPS);

  _createCharacterTypes();
  _initCharacters();
}

function draw() {
  background(20);

  _updateCharacters();
}


function _createCharacterTypes() {
  CHARACTER_TYPES = [];
  for (var i = 0; i < NUM_CHARACTER_TYPES; i++) {
    var coords = [];
    for (var j = 0; j < _pickRandInt(CHARACTER_TYPES_STROKES_MIN + 1, CHARACTER_TYPES_STROKES_MAX+ 1); j++) {
      coords.push([Math.random(), Math.random()]);
    }
    CHARACTER_TYPES.push(coords);
  }
}

function _initCharacters() {
  level_character_x_positions = [];
  level_character_y_positions = [];
  level_characters = [];
  for (var i = 0; i < NUM_LAYERS; i++) {
    character_x_positions = [];
    character_y_positions = [];
    characters = [];
    for (var j = 0; j < LEVEL_NUM_CHARACTERS[i]; j++) {
      var x_init = CHARACTER_WIDTHS[i] * _pickRandInt(0, MAX_CHARACTER_ROWS[i]);
      var y_init = CHARACTER_HEIGHTS[i] * _pickRandInt(0, MAX_CHARACTER_COLUMNS[i]);
      character_x_positions.push(x_init);
      character_y_positions.push(y_init);
      characters.push(new Character([x_init, y_init], [CHARACTER_WIDTHS[i], CHARACTER_HEIGHTS[i]], CHARACTER_TYPES[_pickRandInt(0, NUM_CHARACTER_TYPES)]));
    }
    level_character_x_positions.push(character_x_positions);
    level_character_y_positions.push(character_y_positions);
    level_characters.push(characters);
  }
}

function _updateCharacters() {
  for (var i = 0; i < NUM_LAYERS; i++) {
    stroke(CHARACTER_COLORS[i][0], CHARACTER_COLORS[i][1], CHARACTER_COLORS[i][2]);
    strokeWeight(CHARACTER_STROKE_WEIGHTS[i]);
    for (var j = 0; j < LEVEL_NUM_CHARACTERS[i]; j++) {
      level_character_y_positions[i][j] += STEP_SIZE;
      if (level_character_y_positions[i][j] > HEIGHT) {
        level_character_y_positions[i][j] = -CHARACTER_HEIGHTS[i];
        var x_init = CHARACTER_WIDTHS[i] * _pickRandInt(0, MAX_CHARACTER_ROWS[i]);
        level_characters[i][j] = new Character([x_init, -CHARACTER_HEIGHTS[i]], [CHARACTER_WIDTHS[i], CHARACTER_HEIGHTS[i]], CHARACTER_TYPES[_pickRandInt(0, NUM_CHARACTER_TYPES)]);
      } else {
        level_characters[i][j].update(level_character_y_positions[i][j]);
      }
      level_characters[i][j].draw();
    }
  }
}


function _pickRandInt(min, max) {
  return Math.floor(min + (max - min)*Math.random());
}
