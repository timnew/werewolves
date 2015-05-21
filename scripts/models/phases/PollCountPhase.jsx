'use strict';

import React from 'reactx';

import Phase from './Phase';

import { VOTE_PLAYER } from 'constants/GamePlayConstants';
import GameEngine from 'stores/GameEngine';

class PollCountPhase extends Phase {
  constructor() {
    super();
  }

  onPhaseBegin() {
    GameEngine.pollCount();
  }

  getDescription(turn) {
    if(!turn.events.has(VOTE_PLAYER)) {
      return <p>It is a peaceful day, no one is setenced.</p>;
    }

    let pollResult = turn.events.get(VOTE_PLAYER);

    if(pollResult.count() > 1) {
      return <p><b>Flat vote</b>, so no one is sentenced.</p>; // eslint-disable-line comma-spacing
    }

    let sentencedPlayer = pollResult.first();

    return <p>Player <b>{sentencedPlayer.name}</b> is most voted, who is sentenced.</p>;
  }
}

export default PollCountPhase;
