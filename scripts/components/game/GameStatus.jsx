'use strict';

import React, { PropTypes } from 'reactx';
import { Row, Panel, Table } from 'react-bootstrap';
import GameStatusRow from './GameStatusRow';

class GameStatus extends React.Component {
  constructor(props) {
    super(props);
  }

  get players() { return this.props.players; }

  render() {
    return (
      <Row>
        <Panel bsStyle='info' header='Game'>
          <Table striped condensed hover fill>
            <thead>
              <tr>
                <th></th>
                <th>Player</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {this.renderChildren()}
            </tbody>
          </Table>
        </Panel>
      </Row>
    );
  }

  renderChildren() {
    return this.players.map((player) =>
      <GameStatusRow player={player} key={player.name}/>
    );
  }
}
GameStatus.propTypes = {
  players: PropTypes.array.isRequired
};
GameStatus.defaultProps = {
  players: []
};
GameStatus.enablePureRender();

export default GameStatus;
