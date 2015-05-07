'use strict';

const Role = require('./Role');

class FirstTurnRole extends Role {
    constructor(name, turnPriority) {
        super(name, turnPriority);
    }

    initPlayer(player) {
        super.initPlayer(player);

        player.state.applied = false;

        return player.state;
    }

    isInTurn(player) {
        return super.isInTurn(player) && !player.state.applied;
    }

    playTurn(player) {
        super.playTurn(player);

        player.state.applied = true;
    }
}

module.exports = FirstTurnRole;
