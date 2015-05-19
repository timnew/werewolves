'use strict';

import React, { PropTypes } from 'reactx';
import { Row, Panel, Button } from 'react-bootstrap';

import GamePlay from 'actions/GamePlay';

import Phase from 'models/phases/Phase';
import Turn from 'models/Turn';

class GamePhase extends React.Component {
  constructor(props) {
    super(props);
  }

  nextStep() {
    GamePlay.nextStep();
  }

  get dayIndex() { return this.turn.dayIndex; }
  get turn() { return this.props.turn; }
  get phase() { return this.props.phase; }
  get description() { return this.phase.getDescription(this.turn); }
  get canMoveNext() { return this.phase.canMoveNext(this.turn); }

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
  phase: PropTypes.instanceOf(Phase),
  turn: PropTypes.instanceOf(Turn)
};
GamePhase.defaultProps = {
  dayIndex: 1,
  phase: new Phase(),
  turn: new Turn(0)
};
// GamePhase.enablePureRender();

export default GamePhase;
