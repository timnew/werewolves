'use strict';

import React, { PropTypes } from 'reactx';
import { Row, Panel, Table } from 'react-bootstrap';
import { FaIcon } from 'react-fa-icon';
import GameStatusRow from './GameStatusRow';

import Phase from 'models/phases/Phase';
import Turn from 'models/Turn';

class GameStatus extends React.Component {
  constructor(props) {
    super(props);
  }

  get players() { return this.turn.players; }
  get phase() { return this.props.phase; }
  get turn() { return this.props.turn; }

  render() {
    return (
      <Row>
        <Panel bsStyle='info' header={this.renderHeader()}>
          <Table striped condensed hover fill className='game-status'>
            <thead>
              <tr>
                <th className='col-md-3 col-sm-4 col-xs-4 status'></th>
                <th className='col-md-3 col-sm-4 col-xs-4 name'>Player</th>
                <th className='col-md-6 col-sm-4 col-xs-4 actions'>Actions</th>
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

  renderHeader() {
    return <h3><FaIcon icon='group'/> Players</h3>;
  }

  renderChildren() {
    return this.players
      .valueSeq()
      .map((player) =>
        <GameStatusRow key={player.name} player={player} phase={this.phase} turn={this.turn}/>
      );
  }
}
GameStatus.propTypes = {
  phase: PropTypes.instanceOf(Phase).isRequired,
  turn: PropTypes.instanceOf(Turn).isRequired
};
GameStatus.defaultProps = {
  phase: Phase.EMPTY,
  turn: Turn.EMPTY
};
// GameStatus.enablePureRender();

export default GameStatus;
