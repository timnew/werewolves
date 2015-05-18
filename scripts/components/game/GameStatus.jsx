'use strict';

import React, { PropTypes } from 'reactx';
import { Row, Panel, Table } from 'react-bootstrap';

class GameStatus extends React.Component {
  constructor(props) {
    super(props);
  }

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

  }
}
GameStatus.propTypes = {
  players: PropTypes.array.isRequired,
  turn: PropTypes.object.isRequired
};
GameStatus.defaultProps = {};
GameStatus.enablePureRender();

export default GameStatus;
