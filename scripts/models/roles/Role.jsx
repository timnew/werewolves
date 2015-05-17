'use strict';

import roleSpecs from './roleSpecs';

class Role {
  constructor(player) {
    this._player = player;
    this._alive = true;
    this._side = roleSpecs[this.roleName].side;
  }

  get roleName() {
    return this.constructor.name;
  }

  get nightTurnOrder(){
    return roleSpecs[this.roleName].order;
  }

  get player() { return this._player; }
  get name(){ return this.player.name; }
  get seat() { return this.player.seat; }

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

export default Role;
