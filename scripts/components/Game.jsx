'use strict';

import React from 'react';
import {Grid} from 'react-bootstrap';
import Phase from './game/Phase';
import GameStatus from './game/GameStatus';

class Game extends React.Component {
    render() {
        return (
          <Grid>
            <Phase description="Night is comming" canMoveNext={true}/>
            <GameStatus/>
          </Grid>
        );
    }
}

export default Game;
