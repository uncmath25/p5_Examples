function Character(pos, size, char_coords) {
  this._pos = pos;
  this._size = size;
  this._char_coords = char_coords;

  this.update = function(new_y) {
    this._pos = [this._pos[0], new_y];
  }

  this.draw = function() {
    var start_char_coord = this._char_coords[0];
    var end_char_coord;
    for (var i = 1; i < this._char_coords.length; i++) {
      end_char_coord = this._char_coords[i];
      line(this._pos[0] + this._size[0] * start_char_coord[0],
            this._pos[1] + this._size[1] * start_char_coord[1],
            this._pos[0] + this._size[0] * end_char_coord[0],
            this._pos[1] + this._size[1] * end_char_coord[1]);
      start_char_coord = end_char_coord;
    }
  }
}
