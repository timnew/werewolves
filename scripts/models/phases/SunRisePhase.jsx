'use strict';

import Phase from './Phase';

class SunRisePhase extends Phase {
  constructor() {
    super();
  }

  getDescription(turn) { return 'The sun goes up'; }

  onPhaseBegin(GameEngine) {
    GameEngine.makeDeath();
  }
}

export default SunRisePhase;
