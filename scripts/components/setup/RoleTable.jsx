'use strict';

import _ from 'lodash';
import React, { PropTypes, shouldComponentUpdate } from 'reactx';
import { Row, Panel, Table } from 'react-bootstrap';
import RoleTableRow from './RoleTableRow';

import { sides } from 'models/roles/roleSpecs';

class RoleTable extends React.Component {
  constructor(props) {
    super(props);
  }

  get playerCount() { return this.props.playerCount; }
  get roleCount() { return this.props.roleCount; }
  get roleSchema() { return this.props.roleSchema; }
  get error() { return this.props.error; }

  shouldComponentUpdate = shouldComponentUpdate;

  render() {
    return (
      <Row>
        <Panel bsStyle={this.panelStyle} header={this.renderTitle()} footer={this.renderError()}>
          <Table condensed hover fill responsive className='setup-table'>
            <thead>
              <tr>
                <th>Role</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {this.renderSide('villager')}
              {this.renderTotal('Villagers', 'sub-total', 'villager')}
              {this.renderSide('werewolf')}
              {this.renderTotal('Werewoles', 'sub-total', 'werewolf')}
              {this.renderTotal('Total', 'total', 'total')}
            </tbody>
          </Table>
        </Panel>
      </Row>
    );
  }

  renderSide(side) {
    return _(sides[side])
      .map((spec) => {
        return (
          <RoleTableRow name={spec.name}
                        spec={spec}
                        key={spec.name}
                        count={this.roleSchema[spec.name]} />
        );
      })
      .value();
  }

  renderTotal(caption, className, field) {
    return (
      <tr className={className}>
        <th>{caption}</th>
        <th>{this.roleCount[field]}</th>
      </tr>
    );
  }

  get panelStyle() {
    if(this.error) {
      return 'danger';
    } else {
      return 'info';
    }
  }

  renderTitle() {
    let { villager, werewolf } = this.roleCount;
    return <h3>Roles ( Villagers: {villager}, Wereolves: {werewolf} )</h3>;  // eslint-disable-line comma-spacing
  }

  renderError() {
    if(this.error) {
      return <span className="text-danger"><b>ERROR: </b>{this.error}</span>;
    }
    else {
      return null;
    }
  }
}
RoleTable.propTypes = {
  playerCount: PropTypes.number.isRequired,
  roleCount: PropTypes.objectOf(PropTypes.number).isRequired,
  roleSchema: PropTypes.objectOf(PropTypes.number).isRequired,
  error: PropTypes.string
};
RoleTable.defaultProps = {
  playerCount: 5,
  roleCount: {
    total: 5,
    villager: 4,
    werewolf: 1
  },
  roleSchema: {
    Werewolf: 1,
    Villager: 4,
    Cupido: 0,
    Hunter: 0,
    Idiot: 0,
    Guardian: 0,
    Seer: 0,
    Witch: 0
  },
  error: null
};

export default RoleTable;
