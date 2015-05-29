'use strict';

import _ from 'lodash';
import React, { PropTypes } from 'reactx';
import { FaIcon } from 'react-fa-icon';
import { Row, Panel, Table } from 'react-bootstrap';
import StatusIcon from 'components/StatusIcon';
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

  render() {
    return (
      <Row>
        <Panel bsStyle={this.panelStyle} header={this.renderTitle()} footer={this.renderError()}>
          <Table condensed hover fill responsive className='role-table'>
            <tbody>
              {this.renderHeader('Villagers', 'villager')}
              {this.renderSide('villager')}
              {this.renderHeader('Werewoles', 'werewolf')}
              {this.renderSide('werewolf')}
              <tr className='total'>
                <th className='col-md-1 col-sm-1 col-xs-1 icon'></th>
                <th className='col-md-5 col-sm-6 col-xs-5 role'>Total</th>
                <th className='col-md-6 col-sm-5 col-xs-6 value'><span>{this.roleCount.total}</span></th>
              </tr>
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

  renderHeader(caption, side) {
    return (
      <tr className='header'>
        <th className='col-md-1 col-sm-1 col-xs-1 icon'>
          <StatusIcon prefix='family'
                      icon={side}/>
        </th>
        <th className='col-md-5 col-sm-6 col-xs-5 role'>{caption}</th>
        <th className='col-md-6 col-sm-5 col-xs-6 value'><span>{this.roleCount[side]}</span></th>
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
    let { villager, werewolf, total } = this.roleCount;
    return <h3><FaIcon icon='list-alt'/> Roles ( <FaIcon icon='sun-o'/> {villager} + <FaIcon icon='moon-o'/> {werewolf} = <FaIcon icon='adjust'/> {total} )</h3>;
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
RoleTable.enablePureRender();

export default RoleTable;
