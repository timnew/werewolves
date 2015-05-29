'use strict';

import React, { PropTypes } from 'reactx';
import GameSetup from 'actions/GameSetup';
import StatusIcon from 'components/StatusIcon';

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
        <td className='col-md-1 col-sm-1 col-xs-1 icon'>
          <StatusIcon prefix='role'
                      icon={this.name.toLowerCase()}/>
        </td>
        <td className='col-md-5 col-sm-6 col-xs-5 role'>
          {this.name}
        </td>
        <td className='col-md-6 col-sm-5 col-xs-6 value'>
          <span>{this.count}</span>
          {this.renderInput()}
        </td>
      </tr>
    );
  }

  renderInput() {
    let spec = this.spec;

    if(spec.name === 'Villager' || spec.max === spec.min) {
      return null;
    }

    if(spec.max === 1) {
      return this.renderToggle();
    }

    return this.renderSlide();
  }

  createValueLink(field, onChangedCallback, withField = false) { // TODO push to reactx with props link, state link, value link, data link
    return {
      value: this[field],
      requestChange: withField ? onChangedCallback.bind(this, field) : onChangedCallback.bind(this)
    };
  }

  renderToggle() {
    return (
      <input type='checkbox'
             className='switch-box'
             checkedLink={this.createValueLink('count', this.countChanged)}/>
    );
  }

  renderSlide() {
    return (
      <input type='range'
             min={this.spec.min}
             max={this.spec.max}
             step={1}
             valueLink={this.createValueLink('count', this.countChanged)}/>
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
