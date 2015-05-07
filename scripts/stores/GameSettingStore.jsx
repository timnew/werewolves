"use strict";

const Marty = require('marty');
const GameSetupConstants = require('../constants/GameSetupConstants');

const playerDivids = {
    8:  [2, 5],
    9:  [2, 6],
    10: [2, 7],
    11: [2, 8],
    12: [3, 8],
    13: [3, 9],
    14: [3, 10],
    15: [3, 11],
    16: [3, 12],
    17: [3, 13],
    18: [4, 13]
};

class GameSettingStore extends Marty.Store {
  constructor(options) {
    super(options);

    this.state = {
      lightPlayerCount: 0,
      darkPlayerCount: 0
    };

    this.handlers = {
      updatePlayerCount: GameSetupConstants.UPDATE_PLAYER_COUNT
    };
  }

  updatePlayerCount(playerCount) {
    let [darkPlayerCount, lightPlayerCount] = playerDivids[playerCount];
    this.setState({lightPlayerCount, darkPlayerCount});
  }
}

module.exports = Marty.register(GameSettingStore);
