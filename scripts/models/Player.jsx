'use strict';

class Player {
  constructor(name, seat) {
    this._name = name;
    this._seat = seat;
    this._status = {};
  }

  get name() { return this._name; }
  get seat() { return this._seat; }
  get status() { return this._status; }
  get alive() { return !this.status.dead; }
  get deathReason() { return this.status.dead; }

  killBy(reason) {
    this.status.dead = reason;
  }

  addStatus(tag, value = true) {
    this.status[tag] = value;
  }
  removeStatus(tag) {
    delete this.status[tag];
  }
  hasStatus(tag) {
    return !!this.status[tag];
  }
}

export default Player;
