'use strict';

import React from 'react';
import { Grid } from 'react-bootstrap';

import PropertyBinder from './PropertyBinder';

import PlayerTable from './setup/PlayerTable';
import PlayerStore from 'stores/PlayerStore';

import RoleTable from './setup/RoleTable';
import RoleConfigStore from 'stores/RoleConfigStore';

import GameControlPanel from './setup/GameControlPanel';

class Setup extends React.Component {
    render() {
        return (
          <Grid>
            <PropertyBinder multiSource
                            source={{PlayerStore, RoleConfigStore}}
                            binding={{
                              PlayerStore: { isPlayerValid: 'isValid' },
                              RoleConfigStore: { isRoleConfigValid: 'isValid' }
                            }}>
              <GameControlPanel />
            </PropertyBinder>
            <PropertyBinder source={PlayerStore}
                            binding={{
                              playerCount: 'expectedPlayerCount',
                              players: 'players',
                              error: 'validationError',
                              canDecreasePlayer: 'canDecreasePlayer'
                            }}>
              <PlayerTable/>
            </PropertyBinder>
            <PropertyBinder source={RoleConfigStore}
                            binding={{
                              playerCount: 'playerCount',
                              roleCount: 'roleCount',
                              roleSchema: 'roleSchema',
                              error: 'validationError'
                            }}>
              <RoleTable/>
            </PropertyBinder>
            <PropertyBinder multiSource
                            source={{PlayerStore, RoleConfigStore}}
                            binding={{
                              PlayerStore: { isPlayerValid: 'isValid' },
                              RoleConfigStore: { isRoleConfigValid: 'isValid' }
                            }}>
               <GameControlPanel />
            </PropertyBinder>
          </Grid>
        );
    }
}

export default Setup;
