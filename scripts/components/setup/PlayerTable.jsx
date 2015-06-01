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

  get playerCount() { return this.players.length; }
  get canIncreasePlayer() { return this.props.canIncreasePlayer; }
  get canDecreasePlayer() { return this.props.canDecreasePlayer; }
  get players() { return this.props.players; }
  get error() { return this.props.error; }

  get childrenInEditing() { return this.data.get('childrenInEditing'); }
  setChildrenInEditing(value) { this.updateData(data => data.set('childrenInEditing', value)); }

  increasePlayer() {
    GameSetup.addPlayer();
  }

  decreasePlayer() {
    GameSetup.removePlayer();
  }

  editAll() {
    _.forEach(this.refs, (row) => row.edit());
    this.setChildrenInEditing(this.playerCount);
  }

  resetAllPlayer() {
    GameSetup.resetAllPlayer();
  }

  confirmAll() {
    _.forEach(this.refs, (row) => row.confirmEdit());
    this.setChildrenInEditing(0);
  }
  abortAll() {
    _.forEach(this.refs, (row) => row.abortEdit());
    this.setChildrenInEditing(0);
  }

  childEditingStatusChanged(index, inEditing) {
    let children = _(this.refs).values().pluck('inEditing').value();
    children[index] = inEditing;
    this.setChildrenInEditing(_.filter(children, (v)=>v).length);
  }

  render() {
    return (
      <Row>
        <Panel bsStyle={this.panelStyle} header={this.renderTitle()} footer={this.renderError()}>
          <Table striped condensed hover fill className='player-table'>
            <thead>
              <tr>
                <th className='col-md-1 col-sm-1 col-xs-1 index'>#</th>
                <th className='col-md-5 col-sm-6 col-xs-5 name'>Name</th>
                <th className='col-md-6 col-sm-5 col-xs-6 actions'>
                  <ButtonToolbar>
                    <ButtonGroup bsSize='xsmall'>
                      <Button onClick={this.increasePlayer.bind(this)} disabled={!this.canIncreasePlayer}><FaIcon icon='user-plus'/></Button>
                      <Button onClick={this.decreasePlayer.bind(this)} disabled={!this.canDecreasePlayer}><FaIcon icon='user-times'/></Button>
                    </ButtonGroup>
                    {this.renderEditAll()}
                    {this.renderResetAll()}
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
    return <h3><FaIcon icon='group'/> Players ( <FaIcon icon='user'/> {this.playerCount} )</h3>;
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

    return (
      <ButtonGroup bsSize='xsmall'>
        <Button onClick={this.editAll.bind(this)} bsStyle='info' disabled={allChildrenInEditing}>
          <FaIcon icon='pencil'/>
        </Button>
      </ButtonGroup>
    );
  }

  renderResetAll() {
    return (
      <ButtonGroup bsSize='xsmall'>
        <Button bsStyle="danger" onClick={this.resetAllPlayer.bind(this)}><FaIcon icon="recycle"/></Button>
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
    return this.players.map((player, index) =>
        <PlayerTableRow ref={index}
                        key={index}
                        index={index}
                        player={player}
                        editingStatusChanged={this.childEditingStatusChanged.bind(this)} />
    );
  }
}
PlayerTable.propTypes = {
  players: PropTypes.arrayOf(PropTypes.object),
  error: PropTypes.string,
  canIncreasePlayer: PropTypes.bool,
  canDecreasePlayer: PropTypes.bool
};
PlayerTable.defaultProps = {
  players: [],
  error: null,
  canIncreasePlayer: true,
  canDecreasePlayer: false
};

PlayerTable.enablePureRender();

export default PlayerTable;
