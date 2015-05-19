'use strict';

class Turn {
  constructor(dayIndex) {
    this._dayIndex = dayIndex;
  }

  get dayIndex() { return this._dayIndex; }
}

export default Turn;
