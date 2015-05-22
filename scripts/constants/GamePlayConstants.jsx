'use strict';

import _ from 'lodash';

const React = {
  createConstants(constants) {
    return _(constants)
            .map(c => [c, c])
            .zipObject()
            .value();
  }
};

const GamePlayConstants = React.createConstants([
    'CREATE_GAME',
    'NEXT_STEP',

    'CHANGE_ROLE',
    'GUARD_PLAYER',
    'ATTACK_PLAYER',
    'HEAL_PLAYER',
    'POISON_PLAYER',
    'VERIFY_PLAYER',
    'VOTE_PLAYER'
  ]);

export default GamePlayConstants;
