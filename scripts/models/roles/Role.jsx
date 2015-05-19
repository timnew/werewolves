'use strict';

import roleSpecs from './roleSpecs';

class Role {
  constructor(player) {
    this._player = player;
  }

  get player() { return this._player; }
  get name() { return this.player.name; }
  get seat() { return this.player.seat; }
  get alive() { return this.player.alive; }
  get sheriff() { return this.player.sheriff; }
  get lover() { return this.player.lover; }

  get roleName() { return this.constructor.name; }

  static get roleName() {
    return this.name;
  }

  static get actionInNightTurn() {
    return this.nightTurnOrder > 0;
  }

  static get nightTurnOrder(){
    return roleSpecs[this.roleName].order;
  }

  static get defaultSide() {
    return roleSpecs[this.roleName].side;
  }
}

export default Role;
