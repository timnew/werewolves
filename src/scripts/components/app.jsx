var { Navbar, Nav, Grid, Row, Col } = Bootstrap;
var { NavItemLink } = RouterBootstrap;

class App extends React.Component {
  render() {
    return (
      <div>
        <Navbar brand="Werewolves" inverse fixedTop toggleNavkey={0}>
          <Nav>
            <NavItemLink to="Setup">Setup</NavItemLink>
            <NavItemLink to="Play">Play</NavItemLink>
          </Nav>
        </Navbar>
        <Grid>
          <Router.RouteHandler/>
        </Grid>
      </div>
    );
  }
}

module.exports = App;
