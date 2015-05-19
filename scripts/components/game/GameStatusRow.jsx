'use strict';

import React, { PropTypes } from 'reactx';
import StatusIcon from 'components/StatusIcon';
import { ButtonToolbar } from 'react-bootstrap';

import Phase from 'models/phases/Phase';

class GameStatusRow extends React.Component {
  constructor(props) {
    super(props);
  }

  get player() { return this.props.player; }
  get phase() { return this.props.phase; }

  render() {
    return (
      <tr>
        <td>
          {this.renderDeadStatus()}
          {this.renderSheriffStatus()}
          {this.renderLoverStatus()}
          <StatusIcon prefix='role' icon={this.player.roleName.toLowerCase()}/>
        </td>
        <td>{this.player.name} ({this.player.seat})</td>
        <td>
          {this.renderActionBar()}
        </td>
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
      return method.call(this.phase, this.player);
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
  phase: PropTypes.instanceOf(Phase).isRequired
};
GameStatusRow.defaultProps = {};
// GameStatusRow.enablePureRender(); // TODO Renable this by making everything immutable

export default GameStatusRow;
