'use strict';

import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { NavItemLink } from 'react-router-bootstrap';
import { RouteHandler } from 'react-router';

class AppRoot extends React.Component {
  render() {
    return (
      <div>
        <Navbar brand="Werewolves" inverse fixedTop toggleNavKey={'navbar'}>
          <Nav eventKey={'navbar'}>
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
