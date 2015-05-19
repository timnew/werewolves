'use strict';

import React, { PropTypes } from 'reactx';
import { Row, Panel, Button } from 'react-bootstrap';

import GamePlay from 'actions/GamePlay';

import {Phase} from 'models/phases';

class GamePhase extends React.Component {
  constructor(props) {
    super(props);
  }

  nextStep() {
    GamePlay.nextStep();
  }

  get dayIndex() { return this.props.dayIndex; }
  get phase() { return this.props.phase; }
  get description() { return this.phase.description; }
  get canMoveNext() { return this.phase.canMoveNext; }

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
    return `Description ( Day ${this.dayIndex} ): ${this.phase.name}`;
  }

  renderFooter() {
    return <Button bsStyle='primary' disabled={!this.canMoveNext} onClick={this.nextStep.bind(this)}>Next Step</Button>;
  }
}
GamePhase.propTypes = {
  dayIndex: PropTypes.number,
  phase: PropTypes.object
};
GamePhase.defaultProps = {
  dayIndex: 1,
  phase: new Phase()
};
GamePhase.enablePureRender();

export default GamePhase;
