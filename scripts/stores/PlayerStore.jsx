'use strict';

const Marty = require('marty');
const _ = require('lodash');

const { UPDATE_PLAYER_COUNT, ADD_PLAYER, REMOVE_PLAYER, UPDATE_PLAYER } = require('../constants/GameSetupConstants');

class PlayerStore extends Marty.Store {
  constructor(options) {
      super(options);

      this.state = {
        expectedPlayerCount: 5,
        players: [],
        validationError: null
      };

      this.handlers = {
        updateExpectedPlayerCount: UPDATE_PLAYER_COUNT,
        addPlayer: ADD_PLAYER,
        removePlayer: REMOVE_PLAYER,
        updatePlayer: UPDATE_PLAYER
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

PlayerStore.register = () => {
  return Marty.register(PlayerStore);
};

module.exports = PlayerStore;
