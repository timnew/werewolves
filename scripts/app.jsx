'use strict';

const React = require('react');
const { Navbar, Nav, Grid, Row, Col } = require('react-bootstrap');
const { NavItemLink } = require('react-router-bootstrap');
const { RouteHandler } = require('react-router');

class App extends React.Component {
  render() {
    return (
      <div>
        <Navbar brand="Werewolves" inverse fixedTop toggleNavkey={0}>
          <Nav>
            <NavItemLink to="Setup">Setup Game</NavItemLink>
            <NavItemLink to="Play">Play Game</NavItemLink>
          </Nav>
        </Navbar>
        <Grid>
          <RouteHandler/>
        </Grid>
      </div>
    );
  }
}

module.exports = App;
