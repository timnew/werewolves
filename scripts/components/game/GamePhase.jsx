'use strict';

import React, { PropTypes } from 'reactx';
import { Row, Panel, Button } from 'react-bootstrap';

import GamePlay from 'actions/GamePlay';

class GamePhase extends React.Component {
  constructor(props) {
    super(props);
  }

  nextStep() {
    GamePlay.nextStep();
  }

  get dayIndex() { return this.props.dayIndex; }
  get description() { return this.props.description; }
  get canMoveNext() { return this.props.canMoveNext; }

  render() {
    return (
      <Row>
        <Panel bsStyle='info' header={this.renderHeader()} footer={this.renderFooter()}>
          {this.description}
        </Panel>
      </Row>
    );
  }

  renderHeader() {
    return `Description ( Day ${this.dayIndex} )`;
  }

  renderFooter() {
    return <Button bsStyle='primary' disabled={!this.canMoveNext} onClick={this.nextStep.bind(this)}>Next Step</Button>;
  }
}
GamePhase.propTypes = {
  dayIndex: PropTypes.number,
  description: PropTypes.string,
  canMoveNext: PropTypes.bool
};
GamePhase.defaultProps = {
  dayIndex: 1,
  description: '',
  canMoveNext: true
};
GamePhase.enablePureRender();

export default GamePhase;
