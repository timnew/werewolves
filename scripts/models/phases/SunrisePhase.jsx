'use strict';

import React from 'reactx';
import Phase from './Phase';

class SunrisePhase extends Phase {
  constructor() {
    super('Sunrise');
  }

  onPhaseBegin(GameEngine) {
    GameEngine.currentTurn.prepareDeathList(this);
    GameEngine.populateDeath();
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
    let deathNames = turn.getDeathList(this);

    if (deathNames.count() > 0) {
      return <p><b>{deathNames.join(', ')}</b> died last night, {this.renderLastWords(turn)}.</p>;
    } else {
      return <p>Last night is a peaceful night, everybody survives.</p>;
    }
  }

  renderLastWords(turn) {
    if(turn.dayIndex <= turn.roleSchema.get('Werewolf')) {
      return 'please leave the last words';
    } else {
      return 'no last words';
    }
  }
}

export default SunrisePhase;
