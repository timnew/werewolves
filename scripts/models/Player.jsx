'use strict';

class Player {
  constructor(name, seat) {
    this._name = name;
    this._seat = seat;
    this._deathReason = null;
    this._sheriff = false;
  }

  get name() { return this._name; }
  get seat() { return this._seat; }
  get alive() { return !this.deathReason; }
  get deathReason() { return this._deathReason; }
  get sheriff() { return this._sheriff; }
  get lover() { return this._lover; }

  killBy(reason) {
    this._deathReason = reason;
  }
}

export default Player;
