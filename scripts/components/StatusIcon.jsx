'use strict';

import React, { PropTypes } from 'reactx';

class StatusIcon extends React.Component {
  constructor(props) {
    super(props, {

    });
  }
  get prefix() { return this.props.prefix; }
  get icon() { return this.props.icon.toLowerCase(); }
  get extension() { return this.props.extension; }
  get imageUrl() { return `${this.prefix}-${this.icon}${this.extension}`; }

  render() {
    return <img src={this.imageUrl} className='status-icon'/>;
  }
}
StatusIcon.propTypes = {
  prefix: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  extension: PropTypes.string
};
StatusIcon.defaultProps = {
  extension: '.svg'
};
StatusIcon.enablePureRender();

export default StatusIcon;
