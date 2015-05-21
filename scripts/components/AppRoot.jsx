'use strict';

import React from 'react';
import { Navbar, CollapsibleNav, Nav, NavItem} from 'react-bootstrap';
import { NavItemLink } from 'react-router-bootstrap';
import { RouteHandler } from 'react-router';

class AppRoot extends React.Component {
  render() {
    return (
      <div>
        <Navbar brand="Werewolves App" inverse fixedTop toggleNavKey={'navbar'}>
          <CollapsibleNav eventKey={'navbar'}>
            <Nav navbar eventKey={'navbar'}>
              <NavItemLink to="Setup">Setup Game</NavItemLink>
              <NavItemLink to="Play">Play Game</NavItemLink>
            </Nav>
            <Nav navbar right>
              <NavItem href='http://timnew.me'>By TimNew & his pals</NavItem>
            </Nav>
          </CollapsibleNav>
        </Navbar>
        <RouteHandler/>
      </div>
    );
  }
}

export default AppRoot;
