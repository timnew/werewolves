'use strict';

import React from 'reactx';
import { ButtonGroup, Button } from 'react-bootstrap';
import StatusIcon from 'components/StatusIcon';

import Phase from './Phase';

import GamePlay from 'actions/GamePlay';

class WitchPhase extends Phase {
  constructor() {
    super('Witch');
  }

  getPhaseIcon() { return <StatusIcon prefix='hint' icon='witch' size='3x' pull='left'/>; }

  getDescription() {
    return (
      <div>
        <p><b>Witch!</b> Please open your eyes.</p>
      </div>
    );
  }

  changeRole(player) {
    GamePlay.changeRole(player, 'Witch');
  }

  healPlayer(player) {
    GamePlay.healPlayer(player);
  }

  poisonPlayer(player) {
    GamePlay.poisonPlayer(player);
  }

  renderUncertainActions(player, turn) {
    if(turn.countMissingRole('Witch') === 0) {
      return null;
    }

    return (
      <ButtonGroup bsSize='xsmall'>
        <Button onClick={this.changeRole.bind(this, player)}>
          <StatusIcon prefix='role' icon='witch'/>
        </Button>
      </ButtonGroup>
    );
  }

  renderDefaultActions(player, turn) {
    if(!player.alive) {
      return null;
    }

    if(!turn.findAliveRole('Witch')) {
      return null;
    }

    let witch = turn.findAliveRole('Witch');
    return (
      <ButtonGroup bsSize='xsmall'>
        {this.renderHealAction(player, witch)}
        {this.renderPoisonAction(player, witch)}
      </ButtonGroup>
    );
  }

  renderHealAction(player, witch) {
    if(!witch.getStatus('heal-potion')) {
      return null;
    }

    if(!player.getStatus('attacked', false)) {
      return null;
    }

    return (
      <Button onClick={this.healPlayer.bind(this, player)}>
        <StatusIcon prefix='action' icon='heal'/>
      </Button>
    );
  }

  renderPoisonAction(player, witch) {
    if(!witch.getStatus('poison-potion')) {
      return null;
    }

    if(player === witch) {
      return null;
    }

    return (
      <Button onClick={this.poisonPlayer.bind(this, player)}>
        <StatusIcon prefix='action' icon='poison'/>
      </Button>
    );
  }
}

export default WitchPhase;
