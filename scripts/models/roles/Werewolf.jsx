'use strict';

const Role = require('./Role');

class Werewolf extends Role {

    get defaultSide() {
        return 'werewolf';
    }

    playTurn(player){

    }
}

module.exports = Werewolf;
