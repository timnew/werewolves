'use strict';

import React from 'reactx';
import Phase from './Phase';

class SunRisePhase extends Phase {
  constructor() {
    super();
  }

  onPhaseBegin(GameEngine) {
    GameEngine.makeDeath();
  }

  getDescription(turn) {
    return (
      <div>
        <p>The sun goes up.</p>
        {this.renderDeathNames(turn)}
        {this.renderLastWords(turn)}
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

  renderLastWords(turn) {
    if(turn.dayIndex <= turn.roleSchema.get('Werewolf')) {
      return <p>Please dead players leave the last words.</p>;
    }
  }
}

export default SunRisePhase;
