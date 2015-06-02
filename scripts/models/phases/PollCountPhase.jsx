'use strict';

import React from 'reactx';
import { ButtonGroup, Button } from 'react-bootstrap';
import StatusIcon from 'components/StatusIcon';

import Phase from './Phase';

import { VOTE_PLAYER, SHOOT_PLAYER, IDIOT_VOTED } from 'constants/GamePlayConstants';
import GamePlay from 'actions/GamePlay';

class PollCountPhase extends Phase {
  constructor() {
    super('Poll Count');
  }

  onPhaseBegin(GameEngine) {
    GameEngine.currentTurn.prepareDeathList(this);
    GameEngine.sentencePlayer();
  }

  getPhaseIcon() { return <StatusIcon prefix='hint' icon='judgement' size='3x' pull='left'/>; }

  getDescription(turn) {
    if(!turn.events.has(VOTE_PLAYER)) {
      return <p>It is a peaceful day, no one is setenced.</p>;
    }

    let pollResult = turn.events.get(VOTE_PLAYER);

    if(pollResult.count() > 1) {
      return <p><b>Flat vote</b>, so no one is sentenced.</p>; // eslint-disable-line comma-spacing
    }

    if(turn.events.has(IDIOT_VOTED)) {
      let idiotName = turn.events.get(IDIOT_VOTED);

      return <p><b>{idiotName}</b> has been most voted, whom later annouced as an <b>idiot</b>. The sentence is canceled.</p>;
    }

    let sentencedPlayer = pollResult.first();
    let deathList = turn.getDeathList(this);

    if(deathList.count() === 1 ) {
      return <p><b>{sentencedPlayer}</b> is most voted, who is sentenced.</p>;
    } else {
      return <p><b>{sentencedPlayer}</b> is sentenced, and <b>{deathList.join(', ')}</b> died.</p>;
    }
  }

  renderUncertainActions(player, turn) {
    if(!turn.getDeathList().includes(player.name)) {
      return null;
    }

    return (
      <ButtonGroup bsSize='xsmall'>
        {this.renderHunterRole(player, turn)}
      </ButtonGroup>
    );
  }

  changeRole(player, roleName) {
    GamePlay.changeRole(player, roleName);
  }

  renderHunterRole(player, turn) {
    if(turn.countMissingRole('Hunter') === 0) {
      return null;
    }

    return (
      <Button onClick={this.changeRole.bind(this, player, 'Hunter')}>
        <StatusIcon prefix='role' icon='hunter'/>
      </Button>
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

export default PollCountPhase;
