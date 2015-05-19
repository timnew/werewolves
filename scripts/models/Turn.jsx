'use strict';

class Turn {
  constructor(dayIndex) {
    this._dayIndex = dayIndex;
    this._deadPlayers = [];
  }

  get dayIndex() { return this._dayIndex; }
  get deadPlayers() { return this._deadPlayers; }  
}

export default Turn;
