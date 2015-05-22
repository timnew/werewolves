'use strict';

import Immutable from 'immutable';
import roles from './index';

import {STATUS_MAPPING} from 'models/Turn';

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
  batchUpdateStatus(func) {
    this.updateStatus(status => status.withMutations(func));
  }
  addStatus(tag, value = true) {
    this.updateStatus(status => status.set(tag, value));
  }
  removeStatus(tag) {
    this.updateStatus(status => status.delete(tag));
  }
  updateStatusValue(tag, functor, defaultValue) {
    this.updateStatus(status => status.set(tag, functor(status.get(tag, defaultValue))));
  }
  getStatus(tag, defaultValue) {
    return this.status.get(tag, defaultValue);
  }
  hasStatus(tag) {
    return this.status.has(tag);
  }
  shiftStatus(originalTag, targetTag) {
    if(!this.hasStatus(originalTag)) {
      return;
    }

    this.batchUpdateStatus(status => status.set(targetTag, status.get(originalTag)).delete(originalTag));
  }

  beforeKill() {
    return true;
  }

  kill(reason, turn) {
    if(!this.alive) {
      return;
    }

    if(this.beforeKill(reason, turn)) {
      this.addStatus('dead', reason);
      turn.recordDeath(this);
      this.afterKill(reason, turn);
    }

    STATUS_MAPPING.forEach((k, status) => this.removeStatus(status));
  }

  afterKill(reason, turn) {
    if(this.hasStatus('lover')) {
      turn.players.get(this.getStatus('lover')).kill('lover', turn);
    }
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
