'use strict';

import _ from 'lodash';

class Turn {
  constructor(dayIndex, players, roleSchema) {
    this._players = players;
    this._roleSchema = roleSchema;
    this._dayIndex = dayIndex;
    this._events = {};
  }

  get players() { return this._players; }
  get roleSchema() { return this._roleSchema; }

  get dayIndex() { return this._dayIndex; }
  get events() { return this._events; }

  get unassignedRoles() {
    return _(this.players)
      .values()
      .countBy(player => player.roleName)
      .merge(this.roleSchema, (actual, expected) => _.isNumber(actual) ? expected - actual : expected)
      .value();
  }

  playerKilled(player, reason) {
    this.events[`${reason}Killed`] = player;
  }
  logEvent(event, value) {
    this.events[event] = value;
  }
}

export default Turn;
