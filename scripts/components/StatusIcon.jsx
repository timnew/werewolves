'use strict';

import React, { PropTypes } from 'reactx';
import classNames from 'classnames';

class StatusIcon extends React.Component {
  constructor(props) {
    super(props, {

    });
  }
  get prefix() { return this.props.prefix; }
  get icon() { return this.props.icon.toLowerCase(); }
  get extension() { return this.props.extension; }
  get availability() { return this.props.availability; }
  get imageUrl() { return `${this.prefix}-${this.icon}${this.extension}`; }

  get availabilityClassNames() {
    if(this.availability == null) {
      return null;
    }
    return {
      available: this.availability,
      unavailable: !this.availability
    };
  }

  get classNames() {
    return classNames(
      'status-icon',
      this.availabilityClassNames
    );
  }

  render() {
    return <img src={this.imageUrl} className={this.classNames}/>;
  }
}
StatusIcon.propTypes = {
  prefix: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  availability: PropTypes.bool,
  extension: PropTypes.string
};
StatusIcon.defaultProps = {
  availability: null,
  extension: '.svg'
};
StatusIcon.enablePureRender();

export default StatusIcon;
