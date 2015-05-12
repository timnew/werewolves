'use strict';

import _ from 'lodash';
import React from 'react';
import {Store} from 'marty';

const { PropTypes } = React;

class StoreBinder extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
    this.onStoreChanged();
  }

  onStoreChanged() {
    let newState = _.mapValues(this.props.binding, (valuePath) => _.get(this.props.store.state, valuePath));
    this.setState(newState);
  }

  componentDidMount() {
    this.listener = this.props.store.addChangeListener(this.onStoreChanged.bind(this));
  }

  componentWillUnmount() {
    this.listener.dispose();
  }

  render() {
    let childElement = React.Children.only(this.props.children);
    return React.cloneElement(childElement, this.state);
  }
}
StoreBinder.propTypes = {
  store: PropTypes.instanceOf(Store).isRequired,
  binding: PropTypes.objectOf(PropTypes.string).isRequired
};
StoreBinder.defaultProps = {
};

export default StoreBinder;
