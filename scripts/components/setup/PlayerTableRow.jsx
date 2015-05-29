'use strict';

import _ from 'lodash';

import React, { PropTypes } from 'reactx';

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

  get playerName() { return this.player.name; }

  edit() {
    this.updateData({
        inEditing: true,
        name: this.playerName
    });

    this.editingStatusChanged(this.props.index, true);
  }

  remove() {
    GameSetup.removePlayer(this.props.index);
  }

  confirmEdit() {
    let playerDefinition = _.pick(this.data.toJS(), 'name');

    if(this.player) {
      GameSetup.updatePlayer(this.props.index, playerDefinition);
    }

    this.abortEdit();
  }

  abortEdit() {
    this.updateData({ inEditing: false });
    this.editingStatusChanged(this.props.index, false);
  }

  updatePlayer(field, value) {
    this.updateData(data => {
      let newData = data.set(field, value);
      return newData;
    });
  }

  render() {
    return (
      <tr>
        <td className='col-md-1 col-sm-1 col-xs-1 index'>{this.props.index + 1}</td>
        <td className='col-md-8 col-sm-6 col-xs-5 name'>{this.renderName()}</td>
        <td className='col-md-3 col-sm-5 col-xs-6 action'>
          <ButtonToolbar>
            <ButtonGroup bsSize='xsmall'>
              <Button bsStyle='info' onClick={this.edit.bind(this)} disabled={this.inEditing}>
                <FaIcon icon='pencil'/>
              </Button>
            </ButtonGroup>
            <ButtonGroup bsSize='xsmall'>
              <Button bsStyle='danger' onClick={this.remove.bind(this)}><FaIcon icon='trash'/></Button>
            </ButtonGroup>
            {this.renderEditingControl()}
          </ButtonToolbar>
        </td>
      </tr>
    );
  }

  createStateLink(field) {
    return super.createStateLink(field, this.updatePlayer, true);
  }

  renderName() {
    if(this.inEditing) {
      return (
        <input type='text' className='editable' valueLink={this.createStateLink('name')}/>
      );
    } else {
      return (
        <span className='editable'>{this.props.player.name}</span>
      );
    }
  }

  renderEditingControl() {
    if(!this.inEditing) {
      return null;
    }

    return (
      <ButtonGroup bsSize='xsmall'>
        <Button bsStyle='primary' onClick={this.confirmEdit.bind(this)}><FaIcon icon='check'/></Button>
        <Button onClick={this.abortEdit.bind(this)}><FaIcon icon='times'/></Button>
      </ButtonGroup>
    );
  }
}
PlayerTableRow.propTypes = {
  index: PropTypes.number,
  player: PropTypes.shape({
    name: PropTypes.string
  }),
  editingStatusChanged: PropTypes.func
};
PlayerTableRow.defaultProps = {
  index: 0,
  player: null,
  editingStatusChanged: function(){}
};
PlayerTableRow.enablePureRender();

export default PlayerTableRow;
