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
          {this.renderStatus()}
          {this.renderRoleCapabily()}
          {this.renderVoteTicket()}
        </td>
        <td>{this.player.name} ({this.player.seat})</td>
        <td>
          {this.renderActionBar()}
        </td>
      </tr>
    );
  }

  tryRender(host, methodName) {
    let method = host[methodName];
    if(method) {
      return method.call(host, this.player, this.turn, this.phase); //TODO refact to this.props
    }
  }

  renderStatus() {
    return ['dead', 'sheriff', 'lover', 'verified', 'attacked', 'poisoned']
            .filter(status => this.player.getStatus(status, false))
            .map(status => <StatusIcon key={status} prefix='status' icon={status}/>);
  }

  renderRoleCapabily() {
    return this.tryRender(this.player, 'renderRoleCapabily');
  }

  renderVoteTicket() {
    if(this.player.hasStatus('voted')) {
      return (
        <span key='voteTicket'>
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

  renderRoleActions() {
    return this.tryRender(this.phase, `render${this.player.roleName}Actions`);
  }

  renderDefaultActions() {
    return this.tryRender(this.phase, 'renderDefaultActions');
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
