'use strict';

import Marty from 'marty';

var GameSetupConstants = Marty.createConstants([
      'UPDATE_PLAYER_COUNT',
      'ADD_PLAYER',
      'REMOVE_PLAYER',
      'UPDATE_PLAYER',
      'REMOVE_ALL_PLAYERS',

      'UPDATE_ROLE_CONFIG',

      'LOAD_CONFIG',
      'SAVE_CONFIG',

      'CREATE_GAME',
      'CURRENT_GAME'
  ]);

export default GameSetupConstants;
