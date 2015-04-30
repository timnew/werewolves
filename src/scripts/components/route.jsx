require('../utils/initEnv.jsx');

var App = require('./app');
var { Route:Route, RouteHandler:RouteHandler } = Router;

class Link1 extends React.Component{
  render() {
    return <h1>link 1</h1>
  }
}

class Link2 extends React.Component{
  render() {
    return <h1>link 2</h1>
  }
}

const routes = (
  <Route handler={App}>
    <Route name="link1" path="link1" handler={Link1}/>
    <Route name="link2" path="link2" handler={Link2}/>
  </Route>
);

Router.run(routes, function(Handler) {
  React.render(<Handler/>, document.getElementById("content"));
});
