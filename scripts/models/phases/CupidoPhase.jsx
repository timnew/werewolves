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
    return this.countLovers(turn) === 2;
  }

  onPhaseCompleted(GameEngine) {
    GameEngine.currentTurn.marryLovers();
  }

  countLovers(turn) {
    return turn.players
               .toSeq()
               .filter(player => player.hasStatus('lover'))
               .count();
  }

  getPhaseIcon() { return <StatusIcon prefix='hint' icon='cupido' size='3x' pull='left'/>; }

  getDescription() {
    return (
      <div>
        <p><b>Cupido!</b> Please open your eyes.</p>
        <p>Pick 2 players as lovers.</p>
      </div>
    );
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
