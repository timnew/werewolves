'use strict';

const React = require('react');
const { Grid } = require('react-bootstrap');
const { ButtonToolbar, ButtonGroup, Button } = require('react-bootstrap');
const { FaIcon } = require('react-fa-icon');

const PlayerTable = require('./setup/PlayerTable');
const playerStore = global.playerStore;

class BoundedPlayerTable extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
    this.onStoreChanged();
  }

  onStoreChanged() {
    this.setState({
      expectedPlayerCount: playerStore.state.expectedPlayerCount,
      players: playerStore.state.players,
      validationError: playerStore.state.validationError
    });
  }

  componentDidMount() {
    this.listener = playerStore.addChangeListener(this.onStoreChanged.bind(this));
  }

  componentWillUnmount() {
    this.listener.dispose();
  }

  render() {
    return (
      <PlayerTable playerCount={this.state.expectedPlayerCount}
                   players={this.state.players}
                   error={this.state.validationError}/>
    );
  }
}
BoundedPlayerTable.propTypes = {};
BoundedPlayerTable.defaultProps = {};

class Setup extends React.Component {
    render() {
        return (
          <Grid>
            <BoundedPlayerTable/>
          </Grid>
        );
    }
}

module.exports = Setup;
