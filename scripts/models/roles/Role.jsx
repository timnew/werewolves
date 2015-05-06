'use strict';

class Role {
  constructor(name, turnPriority) {
    this._name = name;
    this._turnPriority = turnPriority;
    this._enabled = false;
  }

  get defaultSide() {
    return 'villager';
  }

  get name() {
    return this._name;
  }

  initPlayer(player) {
    player.state = {};
  }

  get turnPriority(){
    return this._turnPriority;
  }

  get enabled() { return this._enabled; }
  set enabled(value) { this._enabled  = value; }

  isInTurn(player) {
    return this.turnPriority > 0 && player.isAlive;
  }

  playTurn(player) {
  }
}

module.exports = Role;
