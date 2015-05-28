'use strict';

import React, { PropTypes } from 'reactx';
import GameSetup from 'actions/GameSetup';

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

  render() {
    return (
      <tr>
        <td>{this.name}</td>
        <td>{this.renderValue()}</td>
      </tr>
    );
  }

  renderValue() {
    let spec = this.spec;

    if(spec.name === 'Villager' || spec.max === spec.min) {
      return this.renderFix();
    }

    if(spec.max === 1) {
      return this.renderToggle();
    }

    return this.renderSlide();
  }

  renderFix() {
    return (
      <span>{this.count}</span>
    );
  }

  createValueLink(field, onChangedCallback, withField = false) { // TODO push to reactx with props link, state link, value link, data link
    return {
      value: this[field],
      requestChange: withField ? onChangedCallback.bind(this, field) : onChangedCallback.bind(this)
    };
  }

  renderToggle() {
    return (
      <span>
        <span className='number'>{this.count}</span>
        <input type='checkbox' className='switch-box'
               checkedLink={this.createValueLink('count', this.countChanged)}/>
      </span>
    );
  }

  renderSlide() {
    return (
      <span>
        <span className='number'>{this.count}</span>
        <input type='range'
               min={this.spec.min}
               max={this.spec.max}
               step={1}
               valueLink={this.createValueLink('count', this.countChanged)}/>
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
RoleTableRow.enablePureRender();

export default RoleTableRow;
