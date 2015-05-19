'use strict';

class Phase {
  constructor(name) {
    this._name = name;
  }

  get name() { return this._name; }
}

export default Phase;
