'use strict';

import _ from 'lodash';
import Immutable from 'immutable';

import { VOTE_PLAYER, ATTACK_PLAYER, POISON_PLAYER } from 'constants/GamePlayConstants';

export const STATUS_MAPPING = Immutable.fromJS({
  ATTACK_PLAYER: 'attacked',
  POISON_PLAYER: 'poisoned'
});
export const DEATH_ACTIONS = Immutable.Seq.of(
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

  countRole(roleName) {
    return this.players
               .toSeq()
               .filter(player=>player.roleName === roleName)
               .count();
  }
  countMissingRole(roleName) {
    let actual = this.countRole(roleName);
    let expected = this.roleSchema.get(roleName);

    return expected - actual;
  }

  nextTurn() {
    return new Turn(this);
  }

  findRole(roleName) {
    return this.players
               .find(player => player.roleName === roleName);
  }

  findAliveRole(roleName) {
    return this.players
               .find(player => player.alive && (player.roleName === roleName));
  }

  changeRole(player, roleName) {
    this._players = this.players.set(player.name, player.changeRole(roleName));
  }

  logEvent(event, value) {
    this._events = this.events.set(event, value);
  }

  marryLovers() {
    let lovers = this.players
                     .toSeq()
                     .filter(player => player.hasStatus('lover'));

    lovers.first().addStatus('lover', lovers.last().name);
    lovers.last().addStatus('lover', lovers.first().name);
  }

  prepareDeathList(phase) {
    let listName = `DeathIn${phase.name}`;
    this.logEvent('currentDeathList', listName);
    this.logEvent(listName, Immutable.fromJS([]));
  }
  recordDeath(player) {
    let listName = this.events.get('currentDeathList');
    let newList = this.events.get(listName).push(player.name);
    this._events = this.events.set(listName, newList);
  }
  getDeathList(phase) {
    let listName = phase != null ? `DeathIn${phase.name}` : this.events.get('currentDeathList');
    return this.events.get(listName);
  }

  populateDeath() {
    DEATH_ACTIONS
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
        })
        .map(info => { // Use map as tap.
          info.player.removeStatus(info.statusName);
          return info;
        })
        .filter(info => info.status )
        .forEach(info => info.player.kill(info.statusName, this));
  }

  pollCount() {
    let mostVoted = this.players
                        .toSeq()
                        .filter((player) => player.getStatus('voted', 0) > 0)
                        .groupBy((player) => player.getStatus('voted'))
                        .maxBy((playerGroup, tickets) => tickets);

    if(mostVoted == null) {
      this.logEvent(VOTE_PLAYER, Immutable.fromJS([]));
    } else {
      this.logEvent(VOTE_PLAYER, mostVoted.keySeq());
    }

    this.players.forEach((player) => player.removeStatus('voted'));
  }

  sentencePlayer() {
    let mostVoted = this.events.get(VOTE_PLAYER);

    if(mostVoted.count() !== 1) {
      return false;
    }

    let playerName = mostVoted.first();
    this.players.get(playerName).kill('voted', this);

    return true;
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
