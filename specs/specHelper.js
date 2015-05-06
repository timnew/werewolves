'use strict';

require('coffee-script/register');
require('node-jsx').install({extension: '.jsx', harmony: true});

require('chai').should();
global.expect = require('chai');

global.sourceRoot = require('approot')(__dirname, '..', 'scripts').consolidate();

global.Promise = require('bluebird');

require('./configReflux.jsx');
