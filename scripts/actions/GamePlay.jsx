'use strict';

import Marty from 'marty';
import {
  NEXT_STEP
} from 'constants/GamePlayConstants';

class GamePlay extends Marty.ActionCreators {
  nextStep() {
    this.dispatch(NEXT_STEP);
  }
}

export default Marty.register(GamePlay);
