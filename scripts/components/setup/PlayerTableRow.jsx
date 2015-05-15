'use strict';

import _ from 'lodash';

import React, { PropTypes, shouldComponentUpdate } from 'reactx';

import { FaIcon } from 'react-fa-icon';
import { ButtonToolbar, ButtonGroup, Button } from 'react-bootstrap';

import GameSetup from 'actions/GameSetup';

class PlayerTableRow extends React.Component {
  constructor(props) {
    super(props, {
      inEditing: false
    });
  }

  get index() { return this.props.index; }
  get player() { return this.props.player || {}; }
  get editingStatusChanged() { return this.props.editingStatusChanged; }

  get inEditing() { return this.data.get('inEditing'); }

  get playerName() { return this.player.name || `Player ${this.props.index + 1}`; }
  get playerSeat() { return this.player.seat || `Seat ${this.props.index + 1}`; }

  shouldComponentUpdate = shouldComponentUpdate;

  render() {
    if(this.inEditing) {
        return this.renderEditing();
    }

    if(this.props.player) {
      return this.renderPlayer();
    }
    else{
      return this.renderEmpty();
    }
  }

  edit() {
    this.updateData({
        inEditing: true,
        name: this.playerName,
        seat: this.playerSeat
    });

    this.editingStatusChanged(this.props.index, true);
  }

  remove() {
    GameSetup.removePlayer(this.props.index);
  }

  confirmEdit() {
    let playerDefinition = _.pick(this.data.toJS(), 'name', 'seat');

    if(this.player) {
      GameSetup.updatePlayer(this.props.index, playerDefinition);
    } else {
      GameSetup.addPlayer(playerDefinition);
    }

    this.abortEdit();
  }

  abortEdit() {
    this.updateData({ inEditing: false });
    this.editingStatusChanged(this.props.index, false);
  }

  createStateLink(field) {
    return super.createStateLink(field, this.updatePlayer.bind(this, field));
  }

  updatePlayer(field, value) {
    this.updateData(data => {
      let newData = data.set(field, value);
      return newData;
    });
  }

  renderPlayer() {
    return (
      <tr>
        <td>{this.props.index + 1}</td>
        <td>{this.props.player.name}</td>
        <td>{this.props.player.seat}</td>
        <td>
          <ButtonToolbar>
            <ButtonGroup bsSize='xsmall'>
              <Button onClick={this.edit.bind(this)}><FaIcon icon='pencil'/></Button>
            </ButtonGroup>
            <ButtonGroup bsSize='xsmall'>
              <Button bsStyle='danger' onClick={this.remove.bind(this)}><FaIcon icon='trash'/></Button>
            </ButtonGroup>
          </ButtonToolbar>
        </td>
      </tr>
    );
  }

  renderEmpty() {
    return (
      <tr>
        <td>{this.props.index + 1}</td>
        <td>--Empty--</td>
        <td>--Empty--</td>
        <td>
          <ButtonGroup bsSize='xsmall'>
            <Button onClick={this.edit.bind(this)}><FaIcon icon='pencil'/></Button>
          </ButtonGroup>
        </td>
      </tr>
    );
  }

  renderEditing() {
    return (
      <tr>
        <td>{this.props.index + 1}</td>
        <td><input type='text' className='table-inline' valueLink={this.createStateLink('name')}/></td>
        <td><input type='text' className='table-inline' valueLink={this.createStateLink('seat')}/></td>
        <td>
          <ButtonGroup bsSize='xsmall'>
            <Button bsStyle='primary' onClick={this.confirmEdit.bind(this)}><FaIcon icon='check'/></Button>
            <Button onClick={this.abortEdit.bind(this)}><FaIcon icon='times'/></Button>
          </ButtonGroup>
        </td>
      </tr>
    );
  }
}
PlayerTableRow.propTypes = {
  index: PropTypes.number,
  player: PropTypes.shape({
    name: PropTypes.string,
    seat: PropTypes.string
  }),
  editingStatusChanged: PropTypes.func
};
PlayerTableRow.defaultProps = {
  index: 0,
  player: null,
  editingStatusChanged: function(){}
};

export default PlayerTableRow;
