'use strict';

import Phase from './Phase';

import React from 'reactx';
import StatusIcon from 'components/StatusIcon';

class SunsetPhase extends Phase {
  constructor() {
    super('Sunset');
  }

  getPhaseIcon() { return <StatusIcon prefix='hint' icon='close-eye' size='3x' pull='left'/>; }
  getDescription() { return this.renderMarkdown('The sun goes down, every body **close your eyes.**'); }

  onPhaseBegin(GameEngine) {
    GameEngine.nextTurn();
  }
}

export default SunsetPhase;
