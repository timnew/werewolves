'use strict';

class Player {
  constructor(name, seat) {
    this._name = name;
    this._seat = seat;
    this._alive = true;
  }

  get name() { return this._name; }
  get seat() { return this._seat; }
  get alive() { return this._alive; }

  toString() {
    return `${this.name}(${this.seat})`;
  }
}

export default Player;
