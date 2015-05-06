'use strict';

const Role = require('./role');

class Werewolf extends Role {

    get defaultSide() {
        return 'werewolf';
    }

    playTurn(player){

    }
}

module.exports = Werewolf;
