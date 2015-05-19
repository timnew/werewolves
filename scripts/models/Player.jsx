'use strict';

class Player {
  constructor(name, seat) {
    this._name = name;
    this._seat = seat;
    this._alive = true;
    this._sheriff = false;
  }

  get name() { return this._name; }
  get seat() { return this._seat; }
  get alive() { return this._alive; }
  get sheriff() { return this._sheriff; }
  get lover() { return this._lover; }
}

export default Player;
