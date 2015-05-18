'use strict';

import React, { PropTypes } from 'reactx';
import { Row, Panel, Button } from 'react-bootstrap';

import GamePlay from 'actions/GamePlay';

class Phase extends React.Component {
  constructor(props) {
    super(props);
  }

  nextStep() {
    GamePlay.nextStep();
  }

  get description() { return this.props.description; }
  get canMoveNext() { return this.props.canMoveNext; }

  render() {
    return (
      <Row>
        <Panel bsStyle='info' header='Phase' footer={this.renderFooter()}>
          {this.description}
        </Panel>
      </Row>
    );
  }

  renderFooter() {
    return <Button bsStyle='primary' disabled={!this.canMoveNext} onClick={this.nextStep.bind(this)}>Next Step</Button>;
  }
}
Phase.propTypes = {
  description: PropTypes.string.isRequired,
  canMoveNext: PropTypes.bool
};
Phase.defaultProps = {
  canMoveNext: true
};
Phase.enablePureRender();

export default Phase;
