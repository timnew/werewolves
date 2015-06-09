'use strict';

import React from 'reactx';
import { ButtonGroup, Button } from 'react-bootstrap';
import StatusIcon from 'components/StatusIcon';

import Phase from './Phase';

import GamePlay from 'actions/GamePlay';

class CupidoPhase extends Phase {
  constructor() {
    super('Cupido');
  }

  isAvailable(turn) {
    return turn.dayIndex === 1;
  }

  canMoveNext(turn) {
    let loverCount = this.countLovers(turn);

    if(loverCount === 2) {
      this.nextStep();
    }

    return loverCount === 0 && !turn.findAliveRole('Cupido');
  }

  onPhaseCompleted(GameEngine) {
    if( this.countLovers(GameEngine.currentTurn) === 2) {
      GameEngine.currentTurn.marryLovers();
    }
  }

  countLovers(turn) {
    return turn.players
               .toSeq()
               .filter(player => player.hasStatus('lover'))
               .count();
  }

  getPhaseIcon() { return <StatusIcon prefix='hint' icon='cupido' size='3x' pull='left'/>; }

  getDescription(turn) {
    if(!turn.findRole('Cupido')) {
      return this.renderMarkdown('**Cupido** wake up please. And identify yourself. Or skip the turn');
    }

    switch(this.countLovers(turn)) {
      case 0:
        return this.renderMarkdown('**Cupido** pick **2** players as lover.');
      case 1:
        return this.renderMarkdown('**Cupido** you need pick **1** more player.');      
    }
  }

  changeRole(player) {
    GamePlay.changeRole(player, 'Cupido');
  }

  couplePlayer(player) {
    GamePlay.couplePlayer(player);
  }

  renderUncertainActions(player, turn) {
    if(turn.countMissingRole('Cupido') === 0) {
      return null;
    }

    return (
      <ButtonGroup bsSize='xsmall'>
        <Button onClick={this.changeRole.bind(this, player)}>
          <StatusIcon prefix='role' icon='cupido' size='lg'/>
        </Button>
      </ButtonGroup>
    );
  }

  renderDefaultActions(player, turn) {
    if(this.countLovers(turn) >= 2) {
      return null;
    }

    if(player.hasStatus('lover')) {
      return null;
    }

    if(!turn.findAliveRole('Cupido')) {
      return null;
    }

    return (
      <ButtonGroup bsSize='xsmall'>
        <Button onClick={this.couplePlayer.bind(this, player)}>
          <StatusIcon prefix='action' icon='love' size='lg'/>
        </Button>
      </ButtonGroup>
    );
  }
}

export default CupidoPhase;
