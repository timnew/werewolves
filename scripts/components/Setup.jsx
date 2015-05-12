'use strict';

import React from 'react';
import { Grid } from 'react-bootstrap';

import StoreBinder from './StoreBinder';
import PlayerTable from './setup/PlayerTable';
import PlayerStore from 'stores/PlayerStore';

class Setup extends React.Component {
    render() {
        return (
          <Grid>
            <StoreBinder store={PlayerStore} binding={{playerCount: 'expectedPlayerCount', players: 'players', error: 'validationError', canDecreasePlayer: 'canDecreasePlayer'}}>
              <PlayerTable/>
            </StoreBinder>
          </Grid>
        );
    }
}

export default Setup;
