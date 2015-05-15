'use strict';

import _ from 'lodash';
import React from 'react';
import Immutable from 'immutable';

const { PropTypes } = React;

class PropertyBinder extends React.Component {
  constructor(props) {
    super(props);

    this.initData({
        childProps: {},
        listeners: {}
    });
  }

  get source() { return this.props.source; }
  get binding() { return this.props.binding; }
  get multiSource() { return this.props.multiSource; }
  get childProps() { return this.data.get('childProps'); }
  get listeners() { return this.data.get('listeners'); }

  initData(value = {}) {
    this.state = {
      data: Immutable.fromJS(value)
    };
  }
  get data() { return this.state.data; }
  updateData(updates) {
    if(typeof updates === 'function') {
      this.setState((prev, props) => {
        return { data: updates(prev.data, props) };
      });
    } else {
      this.setState({ data: updates });
    }
  }

  onSourceChanged(name) {
    let source = this.multiSource ? this.source[name] : this.source;
    let binding = this.multiSource ? this.binding[name] : this.binding;

    let updatedValues = _.mapValues(binding, (valuePath) => _.get(source, valuePath));

    this.updateData(data => data.mergeIn(['childProps'], updatedValues));
  }

  componentDidMount() {
    if(this.multiSource) {
      _.forEach(this.source, (source, name) => {
        this.registerListener(name, source);
        this.onSourceChanged(name);
      });
    }else {
      this.registerListener('default', this.props.source);
      this.onSourceChanged();
    }
  }

  registerListener(name, source) {
    this.updateData(data => data.setIn(['listeners', name], source.addChangeListener(this.onSourceChanged.bind(this, name))));
  }

  componentWillUnmount() {
    this.listeners.forEach((listener) => listener.dispose());
    this.updateData( (data) => data.set('listeners', new Immutable.Map()));
  }

  render() {
    let childElement = React.Children.only(this.props.children);
    return React.cloneElement(childElement, this.childProps.toJS());
  }
}
PropertyBinder.propTypes = {
  source: PropTypes.object.isRequired,
  binding: PropTypes.objectOf(PropTypes.string).isRequired,
  multiSource: PropTypes.boolean
};
PropertyBinder.defaultProps = {
  multiSource: false
};

export default PropertyBinder;
