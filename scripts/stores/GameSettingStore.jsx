"use strict";

const Reflux = require('reflux');
const GameSetupActions = require('../actions/GameSetupActions');

const playerSpec = {
    8:  [2, 5],
    9:  [2, 6],
    10: [2, 7],
    11: [2, 8],
    12: [3, 8],
    13: [3, 9],
    14: [3, 10],
    15: [3, 11],
    16: [3, 12],
    17: [3, 13],
    18: [4, 13]
};

var gameSettingStore = Reflux.createStore({
    listenerables: GameSetupActions,

    init(){
        this.lightPlayerCount = 0;
        this.darkPlayerCount = 0;
    },

    onUpdatePlayerCount(count) {
        [this.darkPlayerCount, this.lightPlayerCount] = playerSpec[count];

        this.trigger(this);
    },

    onUpdateRoleCount(role, count) {

    }
});

module.exports = gameSettingStore;
