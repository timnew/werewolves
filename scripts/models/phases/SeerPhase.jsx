'use strict';

import React from 'reactx';
import { ButtonGroup, Button } from 'react-bootstrap';
import StatusIcon from 'components/StatusIcon';

import Phase from './Phase';

import GamePlay from 'actions/GamePlay';

class SeerPhase extends Phase {
  constructor() {
    super('Seer');
  }

  getPhaseIcon() { return <StatusIcon prefix='hint' icon='seer' size='3x' pull='left'/>; }

  getDescription() {
    return (
      <div>
        <p><b>Seer!</b> Please open your eyes. Pick a guy to verify.</p>
      </div>
    );
  }

  changeRole(player) {
    GamePlay.changeRole(player, 'Seer');
  }

  verifyPlayer(player) {
    GamePlay.verifyPlayer(player);
  }

  renderUncertainActions(player, turn) {
    if(turn.countMissingRole('Seer') === 0) {
      return null;
    }

    return (
      <ButtonGroup bsSize='xsmall'>
        <Button onClick={this.changeRole.bind(this, player)}>
          <StatusIcon prefix='role' icon='seer' size='lg'/>
        </Button>
      </ButtonGroup>
    );
  }

  renderDefaultActions(player, turn) {
    if(!player.alive) {
      return null;
    }

    if(!turn.findAliveRole('Seer')) {
      return null;
    }

    if(player.roleName === 'Seer') {
      return null;
    }

    if(turn.events.has('VERIFY_PLAYER')) {
      return null;
    }

    if(player.hasStatus('verified')) {
      return null;
    }

    return (
      <ButtonGroup bsSize='xsmall'>
        <Button onClick={this.verifyPlayer.bind(this, player)}>
          <StatusIcon prefix='action' icon='verify' size='lg'/>
        </Button>
      </ButtonGroup>
    );
  }
}

export default SeerPhase;
