'use strict';

import React from 'reactx';
import { ButtonGroup, Button } from 'react-bootstrap';
import StatusIcon from 'components/StatusIcon';

import Phase from './Phase';

import GamePlay from 'actions/GamePlay';

class SeerPhase extends Phase {
  constructor() {
    super();
  }

  canMoveNext() {
    return true;
  }
  getDescription() {
    return (
      <div>
        <p><b>Seer!</b> Please open your eyes.</p>
        <p>Pick a guy to verify.</p>
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
    if(!turn.unassignedRoles.Seer) {
      return null;
    }

    return (
      <ButtonGroup bsSize='xsmall'>
        <Button onClick={this.changeRole.bind(this, player)}>
          <StatusIcon prefix='role' icon='seer'/>
        </Button>
      </ButtonGroup>
    );
  }

  renderDefaultActions(player, turn) {
    if(!player.alive) {
      return null;
    }

    if(player.roleName === 'Seer') {
      return null;
    }

    if(turn.events.verified) {
      return null;
    }

    if(player.hasStatus('verified')) {
      return null;
    }

    return (
      <ButtonGroup bsSize='xsmall'>
        <Button onClick={this.verifyPlayer.bind(this, player)}>
          <StatusIcon prefix='action' icon='verify'/>
        </Button>
      </ButtonGroup>
    );
  }
}

export default SeerPhase;