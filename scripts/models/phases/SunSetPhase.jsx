'use strict';

import Phase from './Phase';

class SunSetPhase extends Phase {
  constructor() {
    super();
  }

  getDescription() { return 'The sun goes down, every body close your eyes.'; }

  onPhaseBegin(GameEngine) {
    GameEngine.nextTurn();
  }
}

export default SunSetPhase;
