'use strict';

import _ from 'lodash';

class Player {
  constructor(name, seat) {
    this._name = name;
    this._seat = seat;
    this._deathReason = null;
    this._statusTags = [];
  }

  get name() { return this._name; }
  get seat() { return this._seat; }
  get alive() { return !this.deathReason; }
  get deathReason() { return this._deathReason; }
  get statusTags() { return this._statusTags; }

  killBy(reason) {
    this._deathReason = reason;
  }

  addStatus(tag) {
    return this.statusTags.push(tag);
  }
  removeStatus(tag) {
    return _.pull(this.statusTags, tag);
  }
  hasStatus(tag) {
    return _.includes(this.statusTags, tag);
  }
}

export default Player;
