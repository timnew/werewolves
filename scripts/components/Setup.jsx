'use strict';

import React from 'react';
import { Grid } from 'react-bootstrap';

import PropertyBinder from './PropertyBinder';
import PlayerTable from './setup/PlayerTable';
import PlayerStore from 'stores/PlayerStore';

class Setup extends React.Component {
    render() {
        return (
          <Grid>
            <PropertyBinder source={PlayerStore} binding={{playerCount: 'expectedPlayerCount', players: 'players', error: 'validationError', canDecreasePlayer: 'canDecreasePlayer'}}>
              <PlayerTable/>
            </PropertyBinder>
          </Grid>
        );
    }
}

export default Setup;
