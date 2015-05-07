'use strict';

const React = require('react');
const Router = require('react-router');
const { Route, RouteHandler } = Router;

const Reflux = require('reflux');
Reflux.setPromise(require('bluebird'));

const App = require('./app');
const Setup = require('./components/Setup');
const Game = require('./components/Game');

const routes = (
  <Route handler={App}>
    <Route name="Setup" path="setup" handler={Setup}/>
    <Route name="Play" path="play" handler={Game}/>
  </Route>
);

Router.run(routes, function(Handler) {
  React.render(<Handler/>, document.getElementById("content"));
});
