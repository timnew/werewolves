'use strict';

const roleSpecs = require('./roleSpecs');

class Role {
  constructor(roleName, player) {
    this._roleName = roleName;
    this._nightTurnOrder = roleSpecs[roleName].order;

    this._player = player;
    this._alive = true;
    this._side = roleSpecs[roleName].side;
  }

  get roleName() {
    return this._roleName;
  }

  get nightTurnOrder(){
    return this._nightTurnOrder;
  }

  get player() { return this._player; }

  get side() {
    return this._side;
  }

  get alive() {
    return this._alive;
  }

  inNightTurn(turn) {
    return this.nightTurnOrder > 0 && this.alive;
  }

  playNightTurn(turn){
  }

  playDayTurn(turn) {
  }
}

module.exports = Role;
