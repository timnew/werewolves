'use strict';

const React = require('react');
const { Row, Col } = require('react-bootstrap');
const { FaIcon, FaStack } = require('react-fa-icon');

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


module.exports = Game;
