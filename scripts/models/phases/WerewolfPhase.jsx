'use strict';

import React from 'reactx';
import { ButtonGroup, Button } from 'react-bootstrap';
import StatusIcon from 'components/StatusIcon';

import Phase from './Phase';

import GamePlay from 'actions/GamePlay';
import {ATTACK_PLAYER} from 'constants/GamePlayConstants';

class WerewolfPhase extends Phase {
  constructor() {
    super('Werewolf');
  }

  canMoveNext(turn) {
    if((turn.dayIndex === 1) && turn.countMissingRole('Werewolf') > 0) {
      return false;
    }

    if(turn.events.has(ATTACK_PLAYER)) {
      this.nextStep();
    }

    return true;
  }

  getPhaseIcon() { return <StatusIcon prefix='hint' icon='werewolf' size='3x' pull='left'/>; }

  getDescription(turn) {
    if((turn.dayIndex === 1) && turn.countMissingRole('Werewolf') > 0) {
      return this.renderMarkdown('**Weresolves** open your eyes, and identify yourselves.');
    }

    return this.renderMarkdown('Pick a player to **attack**. Or skip the turn.');
  }

  changeRole(player) {
    GamePlay.changeRole(player, 'Werewolf');
  }

  attackPlayer(player) {
    GamePlay.attackPlayer(player);
  }

  renderUncertainActions(player, turn) {
    if(turn.countMissingRole('Werewolf') === 0) {
      return null;
    }

    return (
      <ButtonGroup bsSize='xsmall'>
        <Button onClick={this.changeRole.bind(this, player)}>
          <StatusIcon prefix='role' icon='werewolf' size='lg'/>
        </Button>
      </ButtonGroup>
    );
  }

  renderDefaultActions(player, turn) {
    if(!player.alive) {
      return null;
    }

    if(turn.events.has(ATTACK_PLAYER)) {
      return null;
    }

    if((turn.dayIndex === 1) && !turn.findAliveRole('Werewolf')) {
      return null;
    }

    return (
      <ButtonGroup bsSize='xsmall'>
        <Button onClick={this.attackPlayer.bind(this, player)}>
          <StatusIcon prefix='action' icon='attack' size='lg'/>
        </Button>
      </ButtonGroup>
    );
  }
}

export default WerewolfPhase;
