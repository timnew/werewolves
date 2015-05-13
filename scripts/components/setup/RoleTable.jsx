'use strict';

import _ from 'lodash';
import React, { PropTypes } from 'react';
import { Row, Panel, Table } from 'react-bootstrap';
import RoleTableRow from './RoleTableRow';

import { sides } from 'models/roles/roleSpecs';

class RoleTable extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
    };
  }

  render() {
    return (
      <Row>
        <Panel bsStyle={this.panelStyle()} header={this.renderTitle()} footer={this.renderError()}>
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
                        count={this.props.roleSchema[spec.name]} />
        );
      })
      .value();
  }

  renderTotal(caption, className, field) {
    return (
      <tr className={className}>
        <th>{caption}</th>
        <th>{this.props.roleCount[field]}</th>
      </tr>
    );
  }

  panelStyle() {
    if(this.props.error) {
      return 'danger';
    } else {
      return 'info';
    }
  }

  renderTitle() {
    let { villager, werewolf } = this.props.roleCount;
    return <h3>Roles ( Villagers: {villager}, Wereolves: {werewolf} )</h3>;  // eslint-disable-line comma-spacing
  }

  renderError() {
    if(this.props.error) {
      return <span className="text-danger"><b>ERROR: </b>{this.props.error}</span>;
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
