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
          {this.renderVoteTicket()}
        </td>
        <td>{this.player.name} ({this.player.seat})</td>
        <td>
          {this.renderActionBar()}
        </td>
      </tr>
    );
  }

  renderStatusTags() {
    return ['dead', 'sheriff', 'lover', 'verified', 'attacked']
            .filter(status => this.player.hasStatus(status))
            .map(status => <StatusIcon prefix='status' icon={status}/>);
  }

  renderVoteTicket() {
    if(this.player.hasStatus('voted')) {
      return (
        <span>
          <StatusIcon prefix='status' icon='voted'/>
          {this.player.getStatus('voted')}
        </span>
      );
    }
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
