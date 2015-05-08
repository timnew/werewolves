'use strict';

global.Promise = require('bluebird');

const PlayerStore = require('./stores/PlayerStore');
global.playerStore = PlayerStore.register();
