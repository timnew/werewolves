'use strict';

const React = require('react');
React.initializeTouchEvents(true);

const Marty = require('marty');
global.Marty = Marty;

global.Promise = require('bluebird');

const PlayerStore = require('./stores/PlayerStore');
global.playerStore = Marty.register(PlayerStore);
