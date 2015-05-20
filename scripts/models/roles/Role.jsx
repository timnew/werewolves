'use strict';

import Immutable from 'immutable';
import roles from './index';

import roleSpecs from './roleSpecs';
import Phase from 'models/phases/Phase';

class Role {
  constructor(player) {
    this._name = player.name;
    this._seat = player.seat;
    this._status = Immutable.fromJS(player.status || {});
  }

  get roleName() { return this.constructor.name; }

  get name() { return this._name; }
  get seat() { return this._seat; }
  get status() { return this._status; }
  get alive() { return !this.hasStatus('dead'); }

  changeRole(roleName){
    let RoleClass = roles[roleName];
    return new RoleClass(this);
  }

  updateStatus(func) {
    this._status = func(this._status);
  }

  addStatus(tag, value = true) {
    this.updateStatus(status => status.set(tag, value));
  }
  removeStatus(tag) {
    this.updateStatus(status => status.delete(tag));
  }
  getStatus(tag) {
    return this.status.get(tag);
  }
  hasStatus(tag) {
    return this.status.has(tag);
  }

  killBy(reason) {
    this.addStatus('dead', reason);

    return true;
  }

  clone() {
    return new this.constructor(this);
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
