'use strict';

import React from 'reactx';
import Phase from './Phase';

class SunRisePhase extends Phase {
  constructor() {
    super();
  }

  getDescription(turn) {
    return (
      <div>
        <p>The sun goes up.</p>
        {this.renderDeathNames(turn)}
      </div>
    );
  }

  renderDeathNames(turn) {
    let deathNames = turn.populateDeathNames();

    if (deathNames.length > 0) {
      return <p>The following people dead last night: {deathNames.join(', ')}.</p>;
    } else {
      return <p>Last night is a peaceful night, everybody survives.</p>;
    }
  }

  onPhaseBegin(GameEngine) {
    GameEngine.makeDeath();
  }
}

export default SunRisePhase;
