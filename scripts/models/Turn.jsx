'use strict';

import _ from 'lodash';
import Immutable from 'immutable';

class Turn {
  constructor(turn) {
    this._players = Immutable.fromJS(turn.players).map(player => player.clone());
    this._roleSchema = Immutable.fromJS(turn.roleSchema);
    this._dayIndex = _.isNumber(turn.dayIndex) ? turn.dayIndex + 1 : 0;
    this._events = Immutable.fromJS({});
  }

  get players() { return this._players; }
  get roleSchema() { return this._roleSchema; }

  get dayIndex() { return this._dayIndex; }
  get events() { return this._events; }

  countMissingRole(roleName) {
    let actual = this.players
                     .filter(player=>player.roleName === roleName)
                     .count();

    let expected = this.roleSchema.get(roleName);

    return expected - actual;
  }

  nextTurn() {
    return new Turn(this);
  }

  changeRole(player, roleName) {
    this._players = this.players.set(player.name, player.changeRole(roleName));
  }

  playerKilled(player, reason) {
    this.logEvent(`${reason}Killed`, player);
  }

  logEvent(event, value) {
    this._events = this.events.set(event, value);
  }
}

const EMPTY_TURN = new Turn({
    players: {},
    roleSchema: {}
});

Object.defineProperty(Turn, 'EMPTY', {
  configurable: true,
  enumerable: false,
  value: EMPTY_TURN,
  writable: true
});

export default Turn;
