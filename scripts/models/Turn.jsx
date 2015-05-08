'use strict';

class Turn {
  constructor(index) {
    this._index = index;
  }

  get index() { return this._index; }
  get firstNight() { return this.index === 0; }
}

module.exports = Turn;
