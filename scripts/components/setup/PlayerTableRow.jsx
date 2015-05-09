'use strict';

import _ from 'lodash';

import React from 'react';
import { FaIcon } from 'react-fa-icon';
import { ButtonGroup, Button, Input } from 'react-bootstrap';
import shouldPureComponentUpdate from 'react-pure-render/function';

import GameSetup from 'actions/GameSetup';

class PlayerTableRow extends React.Component {
  constructor(props) {
    super(props);

    this.state = { inEditing: false };
  }

  shouldPureComponentUpdate = shouldPureComponentUpdate;

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

    this.setState({ inEditing: true, name: player.name, seat: player.seat });
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
    this.setState((state) => {
      state.inEditing = false;
      return _.omit(state, 'name', 'seat');
    });
  }

  nameValueLink() {
    return {
      value: this.state.name,
      requestChange: this.nameChanged.bind(this)
    };
  }
  nameChanged(name) {
    this.setState({name});
  }

  seatValueLink() {
    return {
      value: this.state.seat,
      requestChange: this.seatChanged.bind(this)
    };
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
          <ButtonGroup bsSize='xsmall'>
            <Button onClick={this.edit.bind(this)}><FaIcon icon='edit'/></Button>
            <Button onClick={this.remove.bind(this)}><FaIcon icon='remove'/></Button>
          </ButtonGroup>
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
            <Button onClick={this.edit.bind(this)}><FaIcon icon='edit'/></Button>
          </ButtonGroup>
        </td>
      </tr>
    );
  }

  renderEditing() {
    return (
      <tr>
        <td>{this.props.index + 1}</td>
        <td><input type='text' className='table-inline' valueLink={this.nameValueLink()}/></td>
        <td><input type='text' className='table-inline' valueLink={this.seatValueLink()}/></td>
        <td>
          <ButtonGroup bsSize='xsmall'>
            <Button bsStyle='success' onClick={this.confirmEdit.bind(this)}><FaIcon icon='check'/></Button>
            <Button bsStyle='danger' onClick={this.abortEdit.bind(this)}><FaIcon icon='remove'/></Button>
          </ButtonGroup>
        </td>
      </tr>
    );
  }
}
PlayerTableRow.propTypes = {
  index: React.PropTypes.number.isRequired,
  player: React.PropTypes.object
};
PlayerTableRow.defaultProps = {
  index: 0,
  player: null
};

export default PlayerTableRow;
