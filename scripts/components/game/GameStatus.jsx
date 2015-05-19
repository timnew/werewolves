'use strict';

import React, { PropTypes } from 'reactx';
import { Row, Panel, Table } from 'react-bootstrap';
import GameStatusRow from './GameStatusRow';

import Phase from 'models/phases/Phase';

class GameStatus extends React.Component {
  constructor(props) {
    super(props);
  }

  get players() { return this.props.players; }
  get phase() { return this.props.phase; }

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
      <GameStatusRow key={player.name} player={player} phase={this.phase}/>
    );
  }
}
GameStatus.propTypes = {
  players: PropTypes.array.isRequired,
  phase: PropTypes.instanceOf(Phase)
};
GameStatus.defaultProps = {
  players: [],
  phase: new Phase()
};
GameStatus.enablePureRender();

export default GameStatus;
