'use strict';

import React from 'react';
import { Row, Panel, Table, ButtonToolbar, ButtonGroup, Button } from 'react-bootstrap';
import { FaIcon } from 'react-fa-icon';
import PlayerTableRow from './PlayerTableRow';
import GameSetup from 'actions/GameSetup';

class PlayerTable extends React.Component {
  constructor(props) {
    super(props);
  }

  increasePlayer() {
    GameSetup.updatePlayerCount(this.props.playerCount + 1);
  }

  decreasePlayer() {
    GameSetup.updatePlayerCount(this.props.playerCount - 1);
  }

  render() {
    return (
      <Row>
        <Panel bsStyle={this.panelStyle()} header={this.renderTitle()} footer={this.renderError()}>
          <Table striped condensed hover fill>
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Seat</th>
                <th>
                  <ButtonToolbar>
                    <ButtonGroup bsSize='xsmall'>
                      <Button onClick={this.increasePlayer.bind(this)}><FaIcon icon='plus'/></Button>
                      <Button onClick={this.decreasePlayer.bind(this)}><FaIcon icon='minus'/></Button>
                    </ButtonGroup>
                    <ButtonGroup bsSize='xsmall'>
                      <Button><FaIcon icon='pencil'/></Button>
                    </ButtonGroup>
                  </ButtonToolbar>
                </th>
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

  panelStyle() {
    if(this.props.error) {
      return 'danger';
    } else {
      return 'info';
    }
  }

  renderTitle() {
    return <h3>Players: {this.props.playerCount}</h3>;
  }

  renderError() {
    if(this.props.error) {
      return <span className="text-danger"><b>ERROR: </b>{this.props.error}</span>;
    }
    else {
      return null;
    }
  }

  renderChildren() {
    let rows = [];
    for (var index = 0; index < this.props.playerCount; index++) {
      let player = this.props.players[index];

      rows.push(<PlayerTableRow index={index} player={player}/>);
    }
    return rows;
  }
}
PlayerTable.propTypes = {
  playerCount: React.PropTypes.number,
  players: React.PropTypes.arrayOf(React.PropTypes.object),
  error: React.PropTypes.string
};
PlayerTable.defaultProps = {
  playerCount: 5,
  players: [],
  error: null
};

export default PlayerTable;
