'use strict';

import React from 'react';
import { ButtonGroup, Button } from 'react-bootstrap';
import StatusIcon from 'components/StatusIcon';

import GamePlay from 'actions/GamePlay';

import Phase from './Phase';

class VotePhase extends Phase {
  constructor() {
    super();
  }

  incraseVote(player) {
    GamePlay.votePlayer(player, 1);
  }

  decreaseVote(player) {
    GamePlay.votePlayer(player, -1);
  }

  canDecreaseVote(player) {
    return player.getStatus('voted', 0) > 0;
  }

  renderDefaultActions(player) {
    if(!player.alive) {
      return null;
    }

    return (
      <ButtonGroup bsSize='xsmall'>
        <Button onClick={this.incraseVote.bind(this, player)}>
          <StatusIcon prefix='action' icon='vote'/>
        </Button>
        <Button onClick={this.decreaseVote.bind(this, player)} disabled={!this.canDecreaseVote(player)}>
          <StatusIcon prefix='action' icon='vote-cancel'/>
        </Button>
      </ButtonGroup>
    );
  }
}

export default VotePhase;
