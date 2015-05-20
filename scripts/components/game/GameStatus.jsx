'use strict';

import _ from 'lodash';
import React, { PropTypes } from 'reactx';
import { Row, Panel, Table } from 'react-bootstrap';
import GameStatusRow from './GameStatusRow';

import Phase from 'models/phases/Phase';
import Turn from 'models/Turn';

class GameStatus extends React.Component {
  constructor(props) {
    super(props);
  }

  get players() { return this.props.players; }
  get phase() { return this.props.phase; }
  get turn() { return this.props.turn; }

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
    return _(this.players)
      .values()
      .map((player) =>
        <GameStatusRow key={player.name} player={player} phase={this.phase} turn={this.turn}/>
      )
      .value();
  }
}
GameStatus.propTypes = {
  players: PropTypes.array.isRequired,
  phase: PropTypes.instanceOf(Phase),
  turn: PropTypes.instanceOf(Turn)
};
GameStatus.defaultProps = {
  players: {},
  phase: new Phase(),
  turn: new Turn(0)
};
GameStatus.enablePureRender();

export default GameStatus;
