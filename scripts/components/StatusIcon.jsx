'use strict';

import React, { PropTypes } from 'reactx';
import classNames from 'classnames';

class StatusIcon extends React.Component {
  constructor(props) {
    super(props);
  }

  get prefix() { return this.props.prefix; }
  get icon() { return this.props.icon.toLowerCase(); }
  get size() { return this.props.size; }
  get inline() { return this.props.inline; }
  get extension() { return this.props.extension; }
  get pull() { return this.props.pull; }
  get valueMode() { return this.props.valueMode; }
  get value() { return this.props.value; }

  get classNames() {
    return classNames(
      'gi',
      `gi-${this.prefix}-${this.icon}`,
      { canceled: this.valueMode && !this.value },
      { 'gi-inline': this.inline },
      {
        'pull-left': this.pull === 'left',
        'pull-right': this.pull === 'right'
      },
      this.buildSizeClassName(),
      this.props.className
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
  valueMode: PropTypes.bool,
  inline: PropTypes.bool,
  value: PropTypes.any,
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
  className: PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.array
    ])
};
StatusIcon.defaultProps = {
  valueMode: false,
  value: null,
  inline: false,
  pull: null,
  size: null,
  prefix: null,
  className: null
};
StatusIcon.enablePureRender();

export default StatusIcon;
