'use strict';

import React from 'react';
import { Row, Col } from 'react-bootstrap';
import { FaIcon, FaStack } from 'react-fa-icon';

class Game extends React.Component {
    render() {
        return (
            <FaStack>
                <FaIcon icon='square-o' stack='2x'/>
                <FaIcon icon='twitter' stack='1x'/>
            </FaStack>
        );
    }
}

export default Game;
