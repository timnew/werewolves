'use strict';

import React from 'reactx';
import { ButtonGroup, Button } from 'react-bootstrap';
import StatusIcon from 'components/StatusIcon';

import Phase from './Phase';

// import { HEAL_PLAYER, POISON_PLAYER, ATTACK_PLAYER } from 'constants/GamePlayConstants';
import GamePlay from 'actions/GamePlay';

class WitchPhase extends Phase {
  constructor() {
    super('Witch');
  }

  canMoveNext() {
    // So complicate now to determine whether to skip witch's turn
    // let witch = turn.findAliveRole('Witch');

    // console.log(turn.events.toJS());
    // if(witch) {
    //   let hasHeal = witch.getStatus('heal-potion');
    //   let hasPoison = witch.getStatus('poison-potion');
    //   let usedHeal = turn.events.has(HEAL_PLAYER);
    //   let usedPoison = turn.events.has(POISON_PLAYER);
    //   let attackedPlayer = turn.events.get(ATTACK_PLAYER);
    //   let noKill = !attackedPlayer;
    //   let killFailed = !noKill && !turn.players.get(attackedPlayer).getStatus('attacked');
    //
    //   console.log({
    //     hasHeal,
    //     hasPoison,
    //     usedHeal,
    //     usedPoison,
    //     noKill,
    //     killFailed
    //   });
    //   if((usedPoison || !hasPoison) && (usedHeal || (hasHeal && noKill) || (hasHeal && killFailed))) {
    //     this.nextStep();
    //   }
    // }

    return true;
  }

  getPhaseIcon() { return <StatusIcon prefix='hint' icon='witch' size='3x' pull='left'/>; }

  getDescription(turn) {
    if(turn.countMissingRole('Witch') > 0) {
      return this.renderMarkdown('**Witch**, wake up. And identify yourself.');
    }

    return this.renderMarkdown('Heal someone or poison someone');
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
          <StatusIcon prefix='role' icon='witch' size='lg'/>
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
        <StatusIcon prefix='action' icon='heal' size='lg'/>
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
        <StatusIcon prefix='action' icon='poison' size='lg'/>
      </Button>
    );
  }
}

export default WitchPhase;
