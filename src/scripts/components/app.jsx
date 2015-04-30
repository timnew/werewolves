var { Navbar, Nav } = Bootstrap;
var { NavItemLink } = RouterBootstrap;

class App extends React.Component {
  render() {
    return (
      <div>
        <Navbar brand="Werewolves" inverse fixedTop toggleNavkey={0}>
          <Nav>
            <NavItemLink to="link1">Link1</NavItemLink>
            <NavItemLink to="link2">Link2</NavItemLink>
          </Nav>
        </Navbar>
        <Router.RouteHandler/>
      </div>
    );
  }
}

module.exports = App;
