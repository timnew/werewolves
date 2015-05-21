'use strict';

require('./initApp');

require('bootstrap/dist/css/bootstrap.css');
require('bootstrap/dist/css/bootstrap-theme.css');
require('font-awesome-webpack');

import React from 'react';
import Router, { Route, DefaultRoute } from 'react-router';

import AppRoot from 'components/AppRoot';
import Setup from 'components/Setup';
import Game from 'components/Game';

const routes = (
  <Route handler={AppRoot}>
    <DefaultRoute handler={Setup}/>
    <Route name="Setup" path="setup" handler={Setup}/>
    <Route name="Play" path="play" handler={Game}/>
  </Route>
);

Router.run(routes, function(Handler) {
  React.render(<Handler/>, document.getElementById('content'));
});
