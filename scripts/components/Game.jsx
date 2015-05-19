'use strict';

import React, { PropertyBinder } from 'reactx';
import {Grid} from 'react-bootstrap';

import GameEngine from 'stores/GameEngine';
import GamePlay from 'actions/GamePlay'
;
import GamePhase from './game/GamePhase';
import GameStatus from './game/GameStatus';

class Game extends React.Component {
    render() {
        return (
          <Grid>
            <PropertyBinder source={GameEngine} binding={{
                dayIndex: 'dayIndex',
                phase: 'currentPhase'
              }}>
              <GamePhase description="Night is comming" canMoveNext={true}/>
            </PropertyBinder>
            <PropertyBinder source={GameEngine} binding={{players: 'players'}}>
              <GameStatus/>
            </PropertyBinder>
          </Grid>
        );
    }

    componentWillMount() {
      GamePlay.createGame();
    }
}

export default Game;
