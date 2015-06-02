'use strict';

require('./initApp');

require('bootstrap-webpack');
require('font-awesome-webpack');
require('../styles/main.styl');

import React from 'react';
import Router, { Route, DefaultRoute } from 'react-router';

import AppRoot from 'components/AppRoot';
import Setup from 'components/Setup';
import Roller from 'components/Roller';
import Game from 'components/Game';

const routes = (
  <Route handler={AppRoot}>
    <DefaultRoute handler={Setup}/>
    <Route name="Setup" path='setup' handler={Setup}/>
    <Route name='Roll' path='roll' handler={Roller}/>
    <Route name="Play" path='play' handler={Game}/>
  </Route>
);

Router.run(routes, function(Handler) {
  React.render(<Handler/>, document.getElementById('content'));
});
