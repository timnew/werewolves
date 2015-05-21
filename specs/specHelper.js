'use strict';

require('coffee-script/register');
require('babel/register')({ // TODO Temp solution
  ignore: false,
  extensions: ['.jsx', '.es6', '.es' ]
});

require('chai').should();
global.expect = require('chai');

global.sourceRoot = require('approot')(__dirname, '..', 'scripts').consolidate();
process.env.NODE_PATH = global.sourceRoot();
require('module').Module._initPaths();

global.Promise = require('bluebird');
