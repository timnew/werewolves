'use strict';

import React from 'react';
import { Navbar, CollapsibleNav, Nav, NavItem} from 'react-bootstrap';
import StatusIcon from 'components/StatusIcon';
import { NavItemLink } from 'react-router-bootstrap';
import { RouteHandler } from 'react-router';
import Footer from './Footer';

class AppRoot extends React.Component {
  render() {
    return (
      <div>
        <Navbar brand="Werewolf Judget" inverse fixedTop toggleNavKey={'navbar'}>
          <CollapsibleNav eventKey={'navbar'}>
            <Nav navbar eventKey={'navbar'}>
              <NavItemLink to='Setup'><StatusIcon inline prefix='view' icon='setup'/>Setup Rules</NavItemLink>
              <NavItemLink to='Roll'><StatusIcon inline prefix='view' icon='roll'/>Role Roller</NavItemLink>
              <NavItemLink to='Play'><StatusIcon inline prefix='view' icon='game'/>Run</NavItemLink>
            </Nav>
            <Nav navbar right>
              <NavItem href='http://timnew.me'>By TimNew & his pals</NavItem>
            </Nav>
          </CollapsibleNav>
        </Navbar>
        <RouteHandler/>
        <Footer/>
      </div>
    );
  }
}

export default AppRoot;
