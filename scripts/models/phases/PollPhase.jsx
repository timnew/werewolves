'use strict';

import React from 'react';
import { ButtonGroup, Button } from 'react-bootstrap';
import StatusIcon from 'components/StatusIcon';

import GamePlay from 'actions/GamePlay';

import Phase from './Phase';

class PollPhase extends Phase {
  constructor() {
    super('Poll');
  }

  onPhaseCompleted(GameEngine) {
    GameEngine.pollCount();
  }

  getPhaseIcon() { return <StatusIcon prefix='hint' icon='vote' size='3x' pull='left'/>; }

  getDescription() {
    return this.renderMarkdown('Please **vote** the suspect.');
  }

  votePositive(player) {
    GamePlay.votePlayer(player, 1);
  }

  voteNegative(player) {
    GamePlay.votePlayer(player, -1);
  }

  canVoteNegative(player) {
    return player.getStatus('voted', 0) > 0;
  }

  renderDefaultActions(player) {
    if(!player.alive) {
      return null;
    }

    if(player.roleName === 'Idiot') {
      return null;
    }

    return (
      <ButtonGroup bsSize='xsmall'>
        <Button onClick={this.votePositive.bind(this, player)}>
          <StatusIcon prefix='action' icon='vote-plus' size='lg'/>
        </Button>
        <Button onClick={this.voteNegative.bind(this, player)} disabled={!this.canVoteNegative(player)}>
          <StatusIcon prefix='action' icon='vote-minus' size='lg'/>
        </Button>
      </ButtonGroup>
    );
  }
}

export default PollPhase;
