'use strict';

import React, { PropertyBinder } from 'reactx';
import {Grid} from 'react-bootstrap';

import GameEngine from 'stores/GameEngine';
import GamePlay from 'actions/GamePlay'
;
import Phase from './game/Phase';
import GameStatus from './game/GameStatus';

class Game extends React.Component {
    render() {
        return (
          <Grid>
            <Phase description="Night is comming" canMoveNext={true}/>
            <PropertyBinder source={GameEngine} binding={{players: 'players'}}>
              <GameStatus/>
            </PropertyBinder>

          </Grid>
        );
    }
}

export default Game;
