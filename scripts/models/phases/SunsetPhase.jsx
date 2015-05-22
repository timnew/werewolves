'use strict';

import Phase from './Phase';

class SunsetPhase extends Phase {
  constructor() {
    super('Sunset');
  }

  getDescription() { return 'The sun goes down, every body close your eyes.'; }

  onPhaseBegin(GameEngine) {
    GameEngine.nextTurn();
  }
}

export default SunsetPhase;