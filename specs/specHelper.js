'use strict';

require('coffee-script/register');
require("babel/register");

require('chai').should();
global.expect = require('chai');

global.sourceRoot = require('approot')(__dirname, '..', 'scripts').consolidate();

global.Promise = require('bluebird');
