'use strict';

import Role from './Role';
import {IDIOT_VOTED} from 'constants/GamePlayConstants';

class Idiot extends Role {
  constructor(player) {
    super(player);
  }

  beforeKill(reason, turn) {
    if(reason === 'voted') {
      turn.logEvent(IDIOT_VOTED, this.name);
      return false;
    }

    return true;
  }
}

export default Idiot;
