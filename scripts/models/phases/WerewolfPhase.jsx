'use strict';

import React from 'reactx';
import { ButtonGroup, Button } from 'react-bootstrap';
import StatusIcon from 'components/StatusIcon';

import Phase from './Phase';

import GamePlay from 'actions/GamePlay';

class WerewolfPhase extends Phase {
  constructor() {
    super();
  }

  canMoveNext(turn) {
    return turn.deadPlayers.length > 0;
  }
  getDescription() {
    return (
      <div>
        <p><b>Weresolves!</b> Please open your eyes.</p>
        <p>Pick a guy to kill.</p>
      </div>
    );
  }

  settleRole(player) {
    GamePlay.settleRole(player, 'Werewolf');
  }

  killPlayer(player) {
    GamePlay.killPlayer(player, 'werewolf');
  }

  renderUncertainActions(player) {
    if(!player.alive) {
      return null;
    }

    return (
      <ButtonGroup bsSize='xsmall'>
        <Button onClick={this.settleRole.bind(this, player)}>
          <StatusIcon prefix='role' icon='werewolf'/>
        </Button>
      </ButtonGroup>
    );
  }

  renderDefaultActions(player) {
    if(!player.alive) {
      return null;
    }

    return (
      <ButtonGroup bsSize='xsmall'>
        <Button onClick={this.killPlayer.bind(this, player)}>
          <StatusIcon prefix='action' icon='kill'/>
        </Button>
      </ButtonGroup>
    );
  }
}

export default WerewolfPhase;
