'use strict';

require('./initApp');

const React = require('react');
const Router = require('react-router');
const { Route, RouteHandler } = Router;

const AppRoot = require('./components/AppRoot');
const Setup = require('./components/Setup');
const Game = require('./components/Game');

const routes = (
  <Route handler={AppRoot}>
    <Route name="Setup" path="setup" handler={Setup}/>
    <Route name="Play" path="play" handler={Game}/>
  </Route>
);

Router.run(routes, function(Handler) {
  React.render(<Handler/>, document.getElementById("content"));
});
