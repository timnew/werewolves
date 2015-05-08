'use strict';

const React = require('react');
const { FaIcon } = require('react-fa-icon');
const { ButtonGroup, Button } = require('react-bootstrap');

class PlayerTableRow extends React.Component {
  render() {
    if(this.props.player) {
      return this.renderPlayer();
    }
    else{
      return this.renderEmpty();
    }
  }

  renderPlayer() {
    return (
      <tr>
        <td>{this.props.index + 1}</td>
        <td>{player.name}</td>
        <td>{player.seat}</td>
        <td>
          <ButtonGroup bsSize='xsmall'>
            <Button><FaIcon icon='edit'/></Button>
            <Button><FaIcon icon='remove'/></Button>
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
            <Button><FaIcon icon='edit'/></Button>
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

module.exports = PlayerTableRow;
