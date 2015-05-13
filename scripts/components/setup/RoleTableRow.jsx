'use strict';

import React, { PropTypes } from 'react';
import { FaIcon } from 'react-fa-icon';
import GameSetup from 'actions/GameSetup';

const ICON_NAMES = {
  villager: 'sun-o',
  werewolf: 'moon-o'
};

class RoleTableRow extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  countChanged(value) {
    if(typeof value === 'string') {
      value = Number.parseInt(value);
    }

    GameSetup.updateRoleConfig(this.props.name, value);
  }

  render() {
    return (
      <tr>
        <td><FaIcon icon={this.iconName()}/> {this.props.name}</td>
        <td>{this.renderValue()}</td>
      </tr>
    );
  }

  iconName() {
    return ICON_NAMES[this.props.spec.side];
  }

  renderValue() {
    let spec = this.props.spec;

    if(spec.max === spec.min) {
      return this.renderFix();
    }

    if(spec.max === 1) {
      return this.renderToggle();
    }

    return this.renderNumber();
  }

  renderFix() {
    return (
      <span>{this.props.count}</span>
    );
  }

  renderToggle() {
    return (
      <span>
        {this.props.count}
        <input type='checkbox'
               checkedLink={{
                 value: !!this.props.count,
                 requestChange: this.countChanged.bind(this)
               }}/>
      </span>
    );
  }

  renderNumber() {
    return (
      <span>
        {this.props.count}
        <input type='range'
               min={this.props.spec.min}
               max={this.props.spec.max}
               step={1}
               valueLink={{
                 value: this.props.count,
                 requestChange: this.countChanged.bind(this)
               }}/>
      </span>
    );
  }
}
RoleTableRow.propTypes = {
  name: PropTypes.name,
  spec: PropTypes.object,
  count: PropTypes.count
};
RoleTableRow.defaultProps = {
  name: 'Villager',
  spec: {
    side: 'villager', min: 0, max: 17
  },
  count: 1
};

export default RoleTableRow;
