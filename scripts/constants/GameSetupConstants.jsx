'use strict';

const Marty = require('marty');

var GameSetupConstants = Marty.createConstants([
        'UPDATE_PLAYER_COUNT',
        'ADD_PLAYER',
        'REMOVE_PLAYER',
        'UPDATE_PLAYER'
    ]);

module.exports = GameSetupConstants;
