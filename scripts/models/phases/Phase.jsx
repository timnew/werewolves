'use strict';

class Phase {
  constructor(name) {
    this._name = name ? name : this.constructor.name;
  }

  get name() { return this._name; }

  get description() { return '-- Game Not Started --'; }
  get canMoveNext() { return true; }
}

export default Phase;
