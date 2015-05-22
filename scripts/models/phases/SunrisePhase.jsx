'use strict';

import React from 'reactx';
import { ButtonGroup, Button } from 'react-bootstrap';
import StatusIcon from 'components/StatusIcon';

import Phase from './Phase';

import GamePlay from 'actions/GamePlay';
import {SHOOT_PLAYER} from 'constants/GamePlayConstants';

class SunrisePhase extends Phase {
  constructor() {
    super('Sunrise');
  }

  onPhaseBegin(GameEngine) {
    GameEngine.currentTurn.prepareDeathList(this);
    GameEngine.populateDeath();
  }

  getDescription(turn) {
    return (
      <div>
        <p>The sun goes up.</p>
        {this.renderDeathNames(turn)}
      </div>
    );
  }

  renderDeathNames(turn) {
    let deathNames = turn.getDeathList(this);

    if (deathNames.count() > 0) {
      return <p><b>{deathNames.join(', ')}</b> died last night, {this.renderLastWords(turn)}.</p>;
    } else {
      return <p>Last night is a peaceful night, everybody survives.</p>;
    }
  }

  renderLastWords(turn) {
    if(turn.dayIndex <= turn.roleSchema.get('Werewolf')) {
      return 'please leave the last words';
    } else {
      return 'no last words';
    }
  }

  changeRoleToHunter(player) {
    GamePlay.changeRole(player, 'Hunter');
  }

  renderUncertainActions(player, turn) {
    if(!turn.getDeathList().includes(player.name)) {
      return null;
    }

    if(turn.countMissingRole('Hunter') === 0) {
      return null;
    }

    if(player.getStatus('dead') === 'poisoned') {
      return null;
    }

    return (
      <ButtonGroup bsSize='xsmall'>
        <Button onClick={this.changeRoleToHunter.bind(this, player)}>
          <StatusIcon prefix='role' icon='hunter'/>
        </Button>
      </ButtonGroup>
    );
  }

  shootPlayer(player) {
    GamePlay.shootPlayer(player);
  }

  renderDefaultActions(player, turn) {
    if(!player.alive) {
      return null;
    }

    if(turn.roleSchema.Hunter === 0) { // No Hunter
      return null;
    }

    if(turn.countMissingRole('Hunter') > 0) { // Hunter haven't been declared
      return null;
    }

    if(turn.events.has(SHOOT_PLAYER)) {
      return null;
    }

    let hunterJustDied = turn.getDeathList()
                             .some(playerName => turn.players.get(playerName).roleName === 'Hunter');
    if(!hunterJustDied) {
      return false;
    }

    return (
      <ButtonGroup bsSize='xsmall'>
        <Button onClick={this.shootPlayer.bind(this, player)}>
          <StatusIcon prefix='action' icon='shoot'/>
        </Button>
      </ButtonGroup>
    );
  }
}

export default SunrisePhase;
