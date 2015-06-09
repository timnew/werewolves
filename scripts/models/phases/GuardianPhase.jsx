'use strict';

import React from 'reactx';
import { ButtonGroup, Button } from 'react-bootstrap';
import StatusIcon from 'components/StatusIcon';

import Phase from './Phase';

import GamePlay from 'actions/GamePlay';
import {GUARD_PLAYER} from 'constants/GamePlayConstants';

class GuardianPhase extends Phase {
  constructor() {
    super('Guardian');
  }

  onPhaseBegin(turn) {
    this.obseletePreviousGuard(turn);
  }

  canMoveNext(turn) {
    if(turn.events.has(GUARD_PLAYER)) {
      this.nextStep();
    }

    return true;
  }

  obseletePreviousGuard(turn) {
    turn.players
        .toSeq()
        .filter(player => player.hasStatus('guard-ban'))
        .forEach(player => player.removeStatus('guard-ban'));

    turn.players
        .toSeq()
        .filter(player => player.hasStatus('guarded'))
        .forEach(player => player.shiftStatus('guarded', 'guard-ban'));
  }

  getPhaseIcon() { return <StatusIcon prefix='hint' icon='guardian' size='3x' pull='left'/>; }

  getDescription(turn) {
    if(!turn.findRole('Guardian')) {
      return this.renderMarkdown('**Guardian** wake up please. And identify yourself. Or skip the turn.');
    }

    return this.renderMarkdown('**Guardian**, pick a player to guard');
  }

  changeRole(player) {
    GamePlay.changeRole(player, 'Guardian');
  }

  guardPlayer(player) {
    GamePlay.guardPlayer(player);
  }

  renderUncertainActions(player, turn) {
    if(turn.countMissingRole('Guardian') === 0) {
      return null;
    }

    return (
      <ButtonGroup bsSize='xsmall'>
        <Button onClick={this.changeRole.bind(this, player)}>
          <StatusIcon prefix='role' icon='guardian' size='lg'/>
        </Button>
      </ButtonGroup>
    );
  }

  renderDefaultActions(player, turn) {
    if(!player.alive) {
      return null;
    }

    if(!turn.findAliveRole('Guardian')) {
      return null;
    }

    if(player.getStatus('guard-ban', false)){
      return null;
    }

    if(turn.events.has(GUARD_PLAYER)) {
      return null;
    }

    return (
      <ButtonGroup bsSize='xsmall'>
        <Button onClick={this.guardPlayer.bind(this, player)}>
          <StatusIcon prefix='action' icon='guard' size='lg'/>
        </Button>
      </ButtonGroup>
    );
  }
}

export default GuardianPhase;
