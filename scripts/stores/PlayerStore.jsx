'use strict';

import Marty from 'marty';
import _ from 'lodash';

import { UPDATE_PLAYER_COUNT, ADD_PLAYER, REMOVE_PLAYER, UPDATE_PLAYER, REMOVE_ALL_PLAYERS } from 'constants/GameSetupConstants';
const MIN_PLAYER_COUNT = 5;

export class PlayerStore extends Marty.Store {
  constructor(options) {
      super(options);

      this.state = {
        expectedPlayerCount: MIN_PLAYER_COUNT,
        players: [],
        validationError: null
      };

      this.handlers = {
        updateExpectedPlayerCount: UPDATE_PLAYER_COUNT,
        addPlayer: ADD_PLAYER,
        removePlayer: REMOVE_PLAYER,
        updatePlayer: UPDATE_PLAYER,
        removeAllPlayers: REMOVE_ALL_PLAYERS
      };
  }

  get expectedPlayerCount() { return this.state.expectedPlayerCount; }

  get players() {
    return this.state.players;
  }

  get validationError() { return this.state.validationError; }

  get isValid() {
    return this.validationError === null;
  }

  get canReduce() {
    return this.expectedPlayerCount > MIN_PLAYER_COUNT;
  }

  setError(error) {
    this.setState({
      validationError: error
    });
  }

  updateExpectedPlayerCount(count) {
    this.state.expectedPlayerCount = count;
    this.validate();
  }

  addPlayer(playerDefinition) {
    this.players.push(playerDefinition);
    this.validate();
  }

  removePlayer(index) {
    _.pullAt(this.players, index);
    this.validate();
  }

  updatePlayer(index, playerDefinition) {
    this.players[index] = playerDefinition;
    this.validate();
  }

  removeAllPlayers() {
    this.players.splice(0, this.players.length);
    this.validate();
  }

  validate() {
    if (this.expectedPlayerCount < 5) {
      return this.setError('At least 5 players');
    }

    if(this.players.length !== this.expectedPlayerCount) {
      return this.setError(`Expected ${this.expectedPlayerCount} players, but got ${this.players.length}`);
    }

    for(var index in this.players) {
      let player = this.players[index];

      if(!player.name) {
        return this.setError('Player name is empty');
      }

      if(!player.seat) {
        return this.setError('Player seat is empty');
      }
    }

    if(_.uniq(_.pluck(this.players, 'name')).length !== this.players.length) {
      return this.setError('Duplicate player name');
    }

    if(_.uniq(_.pluck(this.players, 'seat')).length !== this.players.length) {
      return this.setError('Duplicate player seat');
    }

    this.setError(null);
  }
}

export default Marty.register(PlayerStore);
