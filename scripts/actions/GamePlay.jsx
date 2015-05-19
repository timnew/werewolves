'use strict';

import Marty from 'marty';
import {
  CREATE_GAME,
  NEXT_STEP
} from 'constants/GamePlayConstants';

class GamePlay extends Marty.ActionCreators {
  createGame() {
    this.dispatch(CREATE_GAME);
  }
  nextStep() {
    this.dispatch(NEXT_STEP);
  }
}

export default Marty.register(GamePlay);
