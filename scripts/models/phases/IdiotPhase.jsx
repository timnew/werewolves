'use strict';

import React from 'reactx';
import { ButtonGroup, Button } from 'react-bootstrap';
import StatusIcon from 'components/StatusIcon';

import Phase from './Phase';
import { VOTE_PLAYER } from 'constants/GamePlayConstants';

import GamePlay from 'actions/GamePlay';

class IdiotPhase extends Phase {
  constructor() {
    super('Idiot');
  }

  isAvailable(turn) {
    if(turn.countMissingRole('Idiot') === 0) {
      return false;
    }

    let mostVotedNames = turn.events.get(VOTE_PLAYER);

    if(mostVotedNames.count() !== 1) {
      return false;
    }

    let mostVotedPlayer = turn.players.get(mostVotedNames.first());

    return mostVotedPlayer.roleName === 'Uncertain';
  }

  canMoveNext(turn) {
    if(turn.countMissingRole('Idiot') === 0) {
      this.nextStep();
    }

    return true;
  }

  getPhaseIcon() { return <StatusIcon prefix='hint' icon='idiot' size='3x' pull='left'/>; }

  getDescription(turn) {
    return this.renderMarkdown(`Poll result has been published, confirm whether **${this.fetchMostVotedPlayer(turn)} is **idiot**.`);
  }

  fetchMostVotedPlayer(turn) {
    return turn.events.get(VOTE_PLAYER).first();
  }

  changeRole(player) {
    GamePlay.changeRole(player, 'Idiot');
  }

  renderUncertainActions(player, turn) {
    if(this.fetchMostVotedPlayer(turn) !== player.name) {
      return null;
    }

    return (
      <ButtonGroup bsSize='xsmall'>
        <Button onClick={this.changeRole.bind(this, player)}>
          <StatusIcon prefix='role' icon='idiot' size='lg'/>
        </Button>
      </ButtonGroup>
    );
  }
}

export default IdiotPhase;
