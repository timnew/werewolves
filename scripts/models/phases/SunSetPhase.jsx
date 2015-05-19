'use strict';

import Phase from './Phase';

class SunSetPhase extends Phase {
  constructor() {
    super();
  }

  onPhaseBegin(GameEngine) {
    GameEngine.nextTurn();
  }
}

export default SunSetPhase;
