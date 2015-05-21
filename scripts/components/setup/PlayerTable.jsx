'use strict';

import _ from 'lodash';
import React, { PropTypes } from 'reactx';
import { Row, Panel, Table, ButtonToolbar, ButtonGroup, Button } from 'react-bootstrap';
import { FaIcon } from 'react-fa-icon';
import PlayerTableRow from './PlayerTableRow';
import GameSetup from 'actions/GameSetup';

class PlayerTable extends React.Component {
  constructor(props) {
    super(props, {
      childrenInEditing: 0
    });
  }

  get playerCount() { return this.props.playerCount; }
  get canDecreasePlayer() { return this.props.canDecreasePlayer; }
  get players() { return this.props.players; }
  get error() { return this.props.error; }

  get childrenInEditing() { return this.data.get('childrenInEditing'); }
  setChildrenInEditing(value) { this.updateData(data => data.set('childrenInEditing', value)); }

  increasePlayer() {
    GameSetup.updatePlayerCount(this.playerCount + 1);
  }

  decreasePlayer() {
    GameSetup.updatePlayerCount(this.playerCount - 1);
  }

  editAll() {
    _.forEach(this.refs, (row) => row.edit());
    this.setChildrenInEditing(this.playerCount);
  }

  trashAll() {
    GameSetup.removeAllPlayers();
  }

  confirmAll() {
    _.forEach(this.refs, (row) => row.confirmEdit());
    this.setChildrenInEditing(0);
  }
  abortAll() {
    _.forEach(this.refs, (row) => row.abortEdit());
    this.setChildrenInEditing(0);
  }

  childEditingStatusChanged(index, state) {
    let children = _(this.refs).values().pluck('state').pluck('inEditing').value();
    children[index] = state;
    this.setChildrenInEditing(_.filter(children, (v)=>v).length);
  }

  render() {
    return (
      <Row>
        <Panel bsStyle={this.panelStyle} header={this.renderTitle()} footer={this.renderError()}>
          <Table striped condensed hover fill>
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Seat</th>
                <th>
                  <ButtonToolbar>
                    <ButtonGroup bsSize='xsmall'>
                      <Button onClick={this.increasePlayer.bind(this)}><FaIcon icon='user-plus'/></Button>
                      <Button onClick={this.decreasePlayer.bind(this)} disabled={!this.canDecreasePlayer}><FaIcon icon='user-times'/></Button>
                    </ButtonGroup>
                    {this.renderEditAll()}
                    {this.renderTrashAll()}
                    {this.renderChildrenEditControl()}
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

  get panelStyle() {
    if(this.error) {
      return 'danger';
    } else {
      return 'info';
    }
  }

  renderTitle() {
    return <h3><FaIcon icon='group'/> Players: {this.playerCount}</h3>;
  }

  renderError() {
    if(this.error) {
      return <span className="text-danger"><b>ERROR: </b>{this.error}</span>;
    }
    else {
      return null;
    }
  }

  renderEditAll() {
    let allChildrenInEditing = this.childrenInEditing === this.playerCount;
    if(allChildrenInEditing) {
      return null;
    }

    return (
      <ButtonGroup bsSize='xsmall'>
        <Button onClick={this.editAll.bind(this)} bsStyle='info'>
          <FaIcon icon='pencil'/>
        </Button>
      </ButtonGroup>
    );
  }

  renderTrashAll() {
    let hasPlayer = this.players.length > 0;
    if(!hasPlayer) {
      return null;
    }

    return (
      <ButtonGroup bsSize='xsmall'>
        <Button bsStyle="danger" onClick={this.trashAll.bind(this)}><FaIcon icon="trash"/></Button>
      </ButtonGroup>
    );
  }

  renderChildrenEditControl() {
    let hasChildInEditing = this.childrenInEditing > 0;
    if(!hasChildInEditing) {
      return null;
    }

    return (
      <ButtonGroup bsSize='xsmall'>
        <Button bsStyle="primary" onClick={this.confirmAll.bind(this)}><FaIcon icon="check"/></Button>
        <Button onClick={this.abortAll.bind(this)}><FaIcon icon="times"/></Button>
      </ButtonGroup>
    );
  }

  renderChildren() {
    let {playerCount, players} = this.props;
    let rowCount = Math.max(playerCount, players.length);
    return _.map(_.range(rowCount), (index) => {
      return (
        <PlayerTableRow ref={index}
                        key={index}
                        index={index}
                        player={players[index]}
                        editingStatusChanged={this.childEditingStatusChanged.bind(this)} />
        );
    });
  }
}
PlayerTable.propTypes = {
  playerCount: PropTypes.number,
  players: PropTypes.arrayOf(PropTypes.object),
  error: PropTypes.string,
  canDecreasePlayer: PropTypes.bool
};
PlayerTable.defaultProps = {
  playerCount: 5,
  players: [],
  error: null,
  canDecreasePlayer: false
};

PlayerTable.enablePureRender();

export default PlayerTable;
