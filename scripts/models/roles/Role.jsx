'use strict';

import roleSpecs from './roleSpecs';
import Phase from 'models/phases/Phase';

class Role {
  constructor(player) {
    this._player = player;
  }

  get player() { return this._player; }
  get name() { return this.player.name; }
  get seat() { return this.player.seat; }
  get alive() { return this.player.alive; }
  get sheriff() { return this.player.hasStatus('sheriff'); }
  get lover() { return this.player.hasStatus('lover'); }
  get verified() { return this.player.hasStatus('verified'); }

  get roleName() { return this.constructor.name; }

  killBy(reason) {
    this.player.killBy(reason);

    return true;
  }

  addStatus(tag) {
    return this.player.addStatus(tag);
  }
  removeStatus(tag) {
    return this.player.removeStatus(tag);
  }
  hasStatus(tag) {
    return this.player.hasStatus(tag);
  }

  static get roleName() {
    return this.name;
  }

  static get hasActiveAction() {
    return this.actionOrder > 0;
  }

  static get actionOrder(){
    return roleSpecs[this.roleName].order;
  }

  static get defaultSide() {
    return roleSpecs[this.roleName].side;
  }

  static createPhase() {
    return new Phase(this.roleName + 'Phase');
  }
}

export default Role;
