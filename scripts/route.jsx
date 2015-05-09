'use strict';

require('./initApp');

import React from 'react';
import Router, { Route, RouteHandler } from 'react-router';

import AppRoot from 'components/AppRoot';
import Setup from 'components/Setup';
import Game from 'components/Game';

const routes = (
  <Route handler={AppRoot}>
    <Route name="Setup" path="setup" handler={Setup}/>
    <Route name="Play" path="play" handler={Game}/>
  </Route>
);

Router.run(routes, function(Handler) {
  React.render(<Handler/>, document.getElementById("content"));
});
