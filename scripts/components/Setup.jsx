'use strict';

const React = require('react');
const { Grid } = require('react-bootstrap');
const { ButtonToolbar, ButtonGroup, Button } = require('react-bootstrap');
const { FaIcon } = require('react-fa-icon');

const PlayerTable = require('./setup/PlayerTable');

class Setup extends React.Component {
    render() {
        return (
          <Grid>
            <PlayerTable/>
          </Grid>
        );
    }
}

module.exports = Setup;
