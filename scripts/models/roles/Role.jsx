'use strict';

import roles from './index';

import roleSpecs from './roleSpecs';
import Phase from 'models/phases/Phase';

class Role {
  constructor(player) {
    this._name = player.name;
    this._seat = player.seat;
    this._status = player.status || {};
  }

  get roleName() { return this.constructor.name; }

  get name() { return this._name; }
  get seat() { return this._seat; }
  get status() { return this._status; }
  get alive() { return !this.status.dead; }
  get sheriff() { return this.getStatus('sheriff'); }
  get lover() { return this.getStatus('lover'); }
  get verified() { return this.getStatus('verified'); }

  changeRole(roleName){
    let RoleClass = roles[roleName];
    return new RoleClass(this);
  }

  addStatus(tag, value = true) {
    this.status[tag] = value;
  }
  removeStatus(tag) {
    delete this.status[tag];
  }
  getStatus(tag) {
    return this.status[tag];
  }
  hasStatus(tag) {
    return !!this.getStatus(tag);
  }

  killBy(reason) {
    this.status.dead = reason;

    return true;
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
