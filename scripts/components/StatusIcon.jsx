'use strict';

import React, { PropTypes } from 'reactx';
import classNames from 'classnames';

class StatusIcon extends React.Component {
  constructor(props) {
    super(props);
  }

  get prefix() { return this.props.prefix; }
  get icon() { return this.props.icon.toLowerCase(); }
  get extension() { return this.props.extension; }
  get valueMode() { return this.props.valueMode; }
  get value() { return this.props.value; }

  get classNames() {
    return classNames(
      'status-icon',
      'ww',
      this.prefix,
      `ww-${this.prefix}-${this.icon}`,
      { canceled: this.valueMode && !this.value },
      this.props.className
    );
  }

  render() {
    if(this.valueMode && this.value == null) {
      return null;
    }

    return <i className={this.classNames}/>;
  }
}
StatusIcon.propTypes = {
  prefix: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  valueMode: PropTypes.bool,
  value: PropTypes.any,
  className: PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.array
    ]),
  extension: PropTypes.string
};
StatusIcon.defaultProps = {
  valueMode: false,
  value: null,
  className: {},
  extension: '.svg'
};
StatusIcon.enablePureRender();

export default StatusIcon;
