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

  get players() { return this._players.toJS(); }
  get roleSchema() { return this._roleSchema.toJS(); }

  get dayIndex() { return this._dayIndex; }
  get events() { return this._events.toJS(); }

  get unassignedRoles() {
    return _(this.players)
      .values()
      .countBy(player => player.roleName)
      .merge(this.roleSchema, (actual, expected) => _.isNumber(actual) ? expected - actual : expected)
      .value();
  }

  nextTurn() {
    return new Turn(this);
  }

  playerKilled(player, reason) {
    this.events[`${reason}Killed`] = player;
  }
  logEvent(event, value) {
    this.events[event] = value;
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
