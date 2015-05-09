'use strict';

import React from 'react';
import { Navbar, Nav, Grid, Row, Col } from 'react-bootstrap';
import { NavItemLink } from 'react-router-bootstrap';
import { RouteHandler } from 'react-router';

class AppRoot extends React.Component {
  render() {
    return (
      <div>
        <Navbar brand="Werewolves" inverse fixedTop toggleNavkey={0}>
          <Nav>
            <NavItemLink to="Setup">Setup Game</NavItemLink>
            <NavItemLink to="Play">Play Game</NavItemLink>
          </Nav>
        </Navbar>
        <RouteHandler/>
      </div>
    );
  }
}

export default AppRoot;
