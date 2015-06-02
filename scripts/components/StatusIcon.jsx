'use strict';

import React, { PropTypes } from 'reactx';
import classNames from 'classnames';

class StatusIcon extends React.Component {
  constructor(props) {
    super(props);
  }

  get prefix() { return this.props.prefix; }
  get icon() { return this.props.icon.toLowerCase(); }
  get pull() { return this.props.pull; }
  get size() { return this.props.size; }
  get inline() { return this.props.inline; }
  get valueMode() { return this.props.valueMode; }
  get value() { return this.props.value; }
  get className() { return this.props.className; }
  get renderPrefix() { return this.props.renderPrefix; }
  get renderIcon() { return this.props.renderIcon; }

  get classNames() {
    return classNames(
      'gi',
      `gi-${this.prefix}-${this.icon}`,
      {
        'pull-left': this.pull === 'left',
        'pull-right': this.pull === 'right'
      },
      this.buildSizeClassName(),
      { 'gi-inline': this.inline },
      {
        enabled: this.valueMode && !!this.value,
        disabled: this.valueMode && !this.value
      },
      {
        [this.prefix]: this.renderPrefix,
        [this.icon]: this.renderIcon
      },
      this.className
    );
  }

  buildSizeClassName() {
    if(!this.size) {
      return null;
    }
    return `gi-${this.size}`;
  }

  render() {
    if(this.valueMode && this.value == null) {
      return null;
    }

    return <i className={this.classNames}/>;
  }
}
StatusIcon.propTypes = {
  icon: PropTypes.string.isRequired,
  prefix: PropTypes.string,
  pull: PropTypes.oneOf([
    '',
    'left',
    'right'
  ]),
  size: PropTypes.oneOf([
      '',
      '1x',
      'lg',
      '2x',
      '3x',
      '4x',
      '5x'
  ]),
  inline: PropTypes.bool,
  valueMode: PropTypes.bool,
  value: PropTypes.any,
  renderPrefix: PropTypes.bool,
  renderIcon: PropTypes.bool,
  className: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.object,
      PropTypes.array
    ])
};
StatusIcon.defaultProps = {
  prefix: null,
  pull: null,
  size: null,
  inline: false,
  valueMode: false,
  value: null,
  renderPrefix: false,
  renderIcon: false,
  className: null
};
StatusIcon.enablePureRender();

export default StatusIcon;
