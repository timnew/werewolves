'use strict';

import Marty from 'marty';

const GamePlayConstants = Marty.createConstants([
    'CREATE_GAME',
    'NEXT_STEP',

    'SETTLE_ROLE',
    'KILL_PLAYER',
    'VERIFY_PLAYER'
  ]);

  export default GamePlayConstants;
