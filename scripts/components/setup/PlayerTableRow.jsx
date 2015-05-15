'use strict';

import _ from 'lodash';

import React, { PropTypes } from 'react';
import { FaIcon } from 'react-fa-icon';
import { ButtonToolbar, ButtonGroup, Button } from 'react-bootstrap';
import {shouldComponentUpdate} from 'reactx';

import GameSetup from 'actions/GameSetup';

class PlayerTableRow extends React.Component {
  constructor(props) {
    super(props);

    this.state = { inEditing: false };
  }

  shouldComponentUpdate = shouldComponentUpdate;

  render() {
    if(this.state.inEditing) {
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
    let player = this.props.player || {};

    this.setState({
        inEditing: true,
        name: player.name || `Player ${this.props.index + 1}`,
        seat: player.seat || `Seat ${this.props.index + 1}`
      });
    this.props.editingStatusChanged(this.props.index, true);
  }

  remove() {
    GameSetup.removePlayer(this.props.index);
  }

  confirmEdit() {
    let playerDefinition = _.pick(this.state, 'name', 'seat');

    if(this.props.player) {
      GameSetup.updatePlayer(this.props.index, playerDefinition);
    }else{
      GameSetup.addPlayer(playerDefinition);
    }

    this.abortEdit();
  }

  abortEdit() {
    this.setState({ inEditing: false });
    this.props.editingStatusChanged(this.props.index, false);
  }

  createStateLink(stateName) {
    return {
      value: this.state[stateName],
      requestChange: this[stateName+'Changed'].bind(this)
    };
  }
  nameChanged(name) {
    this.setState({name});
  }
  seatChanged(seat) {
    this.setState({seat});
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
  player: PropTypes.object,
  editingStatusChanged: PropTypes.func
};
PlayerTableRow.defaultProps = {
  index: 0,
  player: null,
  editingStatusChanged: function(){}
};

export default PlayerTableRow;
