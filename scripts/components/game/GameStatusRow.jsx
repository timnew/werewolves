'use strict';

import React, { PropTypes } from 'reactx';
import StatusIcon from 'components/StatusIcon';
import { ButtonToolbar } from 'react-bootstrap';

import Phase from 'models/phases/Phase';
import Turn from 'models/Turn';

class GameStatusRow extends React.Component {
  constructor(props) {
    super(props);
  }

  get player() { return this.props.player; }
  get phase() { return this.props.phase; }
  get turn() { return this.props.turn; }

  render() {
    return (
      <tr>
        <td>
          <StatusIcon prefix='role' icon={this.player.roleName.toLowerCase()}/>
          {this.renderStatusTags()}
        </td>
        <td>{this.player.name} ({this.player.seat})</td>
        <td>
          {this.renderActionBar()}
        </td>
      </tr>
    );
  }

  renderStatusTags() {
    let tagIcons = [];

    if(!this.player.alive) {
      tagIcons.push(<StatusIcon prefix='status' icon='dead'/>);
    }

    if(this.player.hasStatus('sheriff')) {
      tagIcons.push(<StatusIcon prefix='status' icon='sheriff'/>);
    }

    if(this.player.hasStatus('lover')) {
      tagIcons.push(<StatusIcon prefix='status' icon='lover'/>);
    }

    if(this.player.hasStatus('verified')) {
      tagIcons.push(<StatusIcon prefix='status' icon='verified'/>);
    }

    return tagIcons;
  }

  renderActionBar() {
    return (
      <ButtonToolbar>
        {this.renderRoleActions()}
        {this.renderDefaultActions()}
      </ButtonToolbar>
    );
  }

  tryRender(methodName) {
    let method = this.phase[methodName];
    if(method) {
      return method.call(this.phase, this.player, this.turn);
    }
  }

  renderRoleActions() {
    return this.tryRender(`render${this.player.roleName}Actions`);
  }

  renderDefaultActions() {
    return this.tryRender('renderDefaultActions');
  }
}
GameStatusRow.propTypes = {
  player: PropTypes.object.isRequired,
  phase: PropTypes.instanceOf(Phase).isRequired,
  turn: PropTypes.instanceOf(Turn).isRequired
};
GameStatusRow.defaultProps = {};
// GameStatusRow.enablePureRender(); // TODO Renable this by making everything immutable

export default GameStatusRow;
