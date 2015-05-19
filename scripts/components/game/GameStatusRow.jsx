'use strict';

import React, { PropTypes } from 'reactx';
import StatusIcon from 'components/StatusIcon';

class GameStatusRow extends React.Component {
  constructor(props) {
    super(props, {

    });
  }

  get player() { return this.props.player; }

  render() {
    return (
      <tr>
        <td>
          {this.renderDeadStatus()}
          {this.renderSheriffStatus()}
          {this.renderLoverStatus()}
          <StatusIcon prefix='role' icon={this.player.roleName.toLowerCase()}/>
        </td>
        <td>{this.player.name} (this.player.seat)</td>
        <td></td>
      </tr>
    );
  }

  renderDeadStatus() {
    if(!this.player.alive) {
      return <StatusIcon prefix='status' icon='dead'/>;
    }
  }

  renderSheriffStatus() {
    if(this.player.sheriff) {
      return <StatusIcon prefix='status' icon='sheriff'/>;
    }
  }

  renderLoverStatus() {
    if(this.player.lover) {
      return <StatusIcon prefix='status' icon='lover'/>;
    }
  }
}
GameStatusRow.propTypes = {
  player: PropTypes.object.isRequired
};
GameStatusRow.defaultProps = {};
GameStatusRow.enablePureRender();

export default GameStatusRow;
