'use strict';

import React from 'react';
import { Grid } from 'react-bootstrap';

import PlayerTable from './setup/PlayerTable';
import PlayerStore from 'stores/PlayerStore';

class BoundedPlayerTable extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
    this.onStoreChanged();
  }

  onStoreChanged() {
    this.setState({
      expectedPlayerCount: PlayerStore.state.expectedPlayerCount,
      players: PlayerStore.state.players,
      validationError: PlayerStore.state.validationError
    });
  }

  componentDidMount() {
    this.listener = PlayerStore.addChangeListener(this.onStoreChanged.bind(this));
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

export default Setup;
