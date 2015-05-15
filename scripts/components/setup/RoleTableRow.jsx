'use strict';

import React, { PropTypes, shouldComponentUpdate } from 'reactx';
import { FaIcon } from 'react-fa-icon';
import GameSetup from 'actions/GameSetup';

const ICON_NAMES = {
  villager: 'sun-o',
  werewolf: 'moon-o'
};

class RoleTableRow extends React.Component {
  constructor(props) {
    super(props);
  }

  get name() { return this.props.name; }
  get spec() { return this.props.spec; }
  get count() { return this.props.count; }

  countChanged(value) {
    if(typeof value === 'string') {
      value = Number.parseInt(value);
    }

    GameSetup.updateRoleConfig(this.name, value);
  }

  shouldComponentUpdate = shouldComponentUpdate;

  render() {
    return (
      <tr>
        <td><FaIcon icon={this.iconName()}/> {this.name}</td>
        <td>{this.renderValue()}</td>
      </tr>
    );
  }

  iconName() {
    return ICON_NAMES[this.spec.side];
  }

  renderValue() {
    let spec = this.spec;

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
      <span>{this.count}</span>
    );
  }

  renderToggle() {
    return (
      <span>
        {this.count}
        <input type='checkbox'
               checkedLink={{
                 value: !!this.count,
                 requestChange: this.countChanged.bind(this)
               }}/>
      </span>
    );
  }

  renderNumber() {
    return (
      <span>
        {this.count}
        <input type='range'
               min={this.spec.min}
               max={this.spec.max}
               step={1}
               valueLink={{
                 value: this.count,
                 requestChange: this.countChanged.bind(this)
               }}/>
      </span>
    );
  }
}
RoleTableRow.propTypes = {
  name: PropTypes.string.isRequired,
  spec: PropTypes.shape({
    min: PropTypes.number,
    max: PropTypes.number,
    side: PropTypes.string
  }).isRequired,
  count: PropTypes.number.isRequired
};
RoleTableRow.defaultProps = {
  name: 'Villager',
  spec: {
    side: 'villager', min: 0, max: 17
  },
  count: 1
};

export default RoleTableRow;
