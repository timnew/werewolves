'use strict';

require('bootstrap-webpack');
require('../styles/main.styl');

import Marty from 'marty';
global.Marty = Marty;

import Promise from 'bluebird';
global.Promise = Promise;
