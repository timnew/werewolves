'use strict';

import _ from 'lodash';
import React from 'react';

const { PropTypes } = React;

class PropertyBinder extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
    this.onStoreChanged();
  }

  onStoreChanged() {
    let newState = _.mapValues(this.props.binding, (valuePath) => _.get(this.props.source, valuePath));
    this.setState(newState);
  }

  componentDidMount() {
    this.listener = this.props.source.addChangeListener(this.onStoreChanged.bind(this));
  }

  componentWillUnmount() {
    this.listener.dispose();
  }

  render() {
    let childElement = React.Children.only(this.props.children);
    return React.cloneElement(childElement, this.state);
  }
}
PropertyBinder.propTypes = {
  source: PropTypes.object.isRequired,
  binding: PropTypes.objectOf(PropTypes.string).isRequired
};
PropertyBinder.defaultProps = {
};

export default PropertyBinder;
