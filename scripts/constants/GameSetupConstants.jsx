'use strict';

import Marty from 'marty';

const GameSetupConstants = Marty.createConstants([
      'ADD_PLAYER',
      'REMOVE_PLAYER',
      'UPDATE_PLAYER',
      'RESET_ALL_PLAYER',

      'UPDATE_ROLE_CONFIG',

      'LOAD_CONFIG',
      'SAVE_CONFIG',
      'INIT_CONFIG',

      'CURRENT_CONFIG'
  ]);

export default GameSetupConstants;
