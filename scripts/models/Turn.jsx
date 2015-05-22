'use strict';

import _ from 'lodash';
import Immutable from 'immutable';

import { VOTE_PLAYER, ATTACK_PLAYER, POISON_PLAYER } from 'constants/GamePlayConstants';

const STATUS_MAPPING = Immutable.fromJS({
  ATTACK_PLAYER: 'attacked',
  POISON_PLAYER: 'poisoned'
});
const DEATH_ACTIONS = Immutable.Seq.of(
  ATTACK_PLAYER,
  POISON_PLAYER
);

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
                     .toSeq()
                     .filter(player=>player.roleName === roleName)
                     .count();

    let expected = this.roleSchema.get(roleName);

    return expected - actual;
  }

  nextTurn() {
    return new Turn(this);
  }

  findAliveRole(roleName) {
    return this.players
               .find(player=> player.alive && (player.roleName === roleName));
  }

  changeRole(player, roleName) {
    this._players = this.players.set(player.name, player.changeRole(roleName));
  }

  logEvent(event, value) {
    this._events = this.events.set(event, value);
  }

  populateDeathInfo() {
    return DEATH_ACTIONS
            .filter(action => this.events.has(action))
            .map(action => {
              let playerName = this.events.get(action);
              let player = this.players.get(playerName);
              let statusName = STATUS_MAPPING.get(action);
              let status = player.getStatus(statusName, false);

              return {
                action,
                player,
                statusName,
                status
              };
            });
  }

  populateDeathNames() {
    return this.populateDeathInfo()
               .filter(info => !info.player.alive )
               .map(info => info.player.name);
  }

  populateDeath() {
    this.populateDeathInfo()
        .map(info => { // Use map as tap.
          info.player.removeStatus(info.statusName);
          return info;
        })
        .filter(info => info.status )
        .forEach(info => info.player.kill(info.statusName));
  }

  pollCount() {
    let mostVoted = this.players
                        .toSeq()
                        .filter((player) => player.getStatus('voted', 0) > 0)
                        .groupBy((player) => player.getStatus('voted'))
                        .maxBy((playerGroup, tickets) => tickets);

    if(mostVoted != null) {
      this.logEvent(VOTE_PLAYER, mostVoted);

      if(mostVoted.count() === 1) {
        mostVoted.first().kill('voted');
      }
    }

    this.players.forEach((player) => player.removeStatus('voted'));
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
