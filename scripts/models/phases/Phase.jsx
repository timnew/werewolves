'use strict';

class Phase {
  constructor(name) {
    this._name = name ? name : this.constructor.name;
  }

  get name() { return this._name; }

  getDescription() { return '-- Game Not Started --'; }
  canMoveNext() { return true; }

  onPhaseCompleted() { }
  onPhaseBegin() { }

  static get EMPTY() {
    return new Phase('EMPTY_PHASE');
  }
}

export default Phase;
