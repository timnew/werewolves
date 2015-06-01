'use strict';

import React from 'react';
import { Navbar, CollapsibleNav, Nav, NavItem} from 'react-bootstrap';
import { FaIcon } from 'react-fa-icon';
import { NavItemLink } from 'react-router-bootstrap';
import { RouteHandler } from 'react-router';

class AppRoot extends React.Component {
  render() {
    return (
      <div>
        <Navbar brand="Werewolf Judget" inverse fixedTop toggleNavKey={'navbar'}>
          <CollapsibleNav eventKey={'navbar'}>
            <Nav navbar eventKey={'navbar'}>
              <NavItemLink to="Setup"><FaIcon icon='cogs' size='lg'/> Setup Game</NavItemLink>
              <NavItemLink to="Play"><FaIcon icon='gamepad' size='lg'/> Play Game</NavItemLink>
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
