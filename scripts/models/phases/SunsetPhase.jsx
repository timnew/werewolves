'use strict';

import Phase from './Phase';

import React from 'reactx';
import { FaIcon } from 'react-fa-icon';

class SunsetPhase extends Phase {
  constructor() {
    super('Sunset');
  }

  getPhaseIcon() { return <FaIcon icon='eye-slash' size='3x' pull='left'/>; }
  getDescription() { return 'The sun goes down, every body close your eyes.'; }

  onPhaseBegin(GameEngine) {
    GameEngine.nextTurn();
  }
}

export default SunsetPhase;
