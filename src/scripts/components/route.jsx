require('../utils/initEnv.jsx');

var { Route:Route, RouteHandler:RouteHandler } = Router;

var App = require('./app');
var Setup = require('./pages/Setup');
var Game = require('./pages/Game');


const routes = (
  <Route handler={App}>
    <Route name="Setup" path="setup" handler={Setup}/>
    <Route name="Play" path="play" handler={Game}/>
  </Route>
);

Router.run(routes, function(Handler) {
  React.render(<Handler/>, document.getElementById("content"));
});
