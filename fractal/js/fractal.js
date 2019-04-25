function Fractal(pos, init_size, color=[200, 200, 200], falloff_factor=0.7, min_leaf_length=1) {
  this._pos = pos;
  this._init_size = init_size;
  this._color = color;
  this._falloff_factor = falloff_factor;
  this._min_leaf_length = min_leaf_length;
  this._angle;

  this.draw = function(angle) {
    this._angle = angle;
    stroke(this._color[0], this._color[1], this._color[2]);
    // stroke(int(random(100, 200)), int(random(100, 200)), int(random(100, 200)));
    this._draw_stem(this._pos, this._init_size);
    this._draw_leaves([this._pos[0], this._pos[1] - this._init_size], this._angle, this._falloff_factor*this._init_size);
    this._draw_leaves([this._pos[0], this._pos[1] - this._init_size], -this._angle, this._falloff_factor*this._init_size);
  }

  this._draw_stem = function(pos, length) {
    line(pos[0], pos[1], pos[0], pos[1] - length);
  }

  this._draw_leaves = function(pos, angle, length) {
    if (length < this._min_leaf_length) { return; }
    var startpoint_x = pos[0];
    var startpoint_y = pos[1];
    var endpoint_x = pos[0] + sin(angle)*length;
    var endpoint_y = pos[1] - cos(angle)*length;
    // stroke(int(random(100, 200)), int(random(100, 200)), int(random(100, 200)));
    line(startpoint_x, startpoint_y, endpoint_x, endpoint_y);
    this._draw_leaves([endpoint_x, endpoint_y], angle+this._angle, this._falloff_factor*length);
    this._draw_leaves([endpoint_x, endpoint_y], angle-this._angle, this._falloff_factor*length);
  }
}
