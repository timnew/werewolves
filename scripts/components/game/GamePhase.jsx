'use strict';

import React, { PropTypes } from 'reactx';
import { Row, Panel, Button } from 'react-bootstrap';
import { FaIcon } from 'react-fa-icon';

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

  get turn() { return this.props.turn; }
  get phase() { return this.props.phase; }
  get dayIndex() { return this.turn.dayIndex; }  
  get canMoveNext() { return this.phase.canMoveNext(this.turn); }

  render() {
    return (
      <Row>
        <Panel bsStyle='info' header={this.renderHeader()} footer={this.renderFooter()}>
          { this.renderPhaseIcon() }
          { this.renderDescription() }
        </Panel>
      </Row>
    );
  }

  renderPhaseIcon() {
    return this.phase.getPhaseIcon(this.turn);
  }

  renderDescription() {
    return this.phase.getDescription(this.turn);
  }

  renderHeader() {
    return (
      <h3>
        <FaIcon icon='newspaper-o'/> {this.phase.name}
        &nbsp;&nbsp;
        ( <FaIcon icon='calendar' />: {this.dayIndex} day )
      </h3>
    );
  }

  renderFooter() {
    return (
      <Button bsStyle='primary'
              disabled={!this.canMoveNext}
              onClick={this.nextStep.bind(this)}>
        Next Step <FaIcon icon='step-forward'/>
      </Button>
    );
  }
}
GamePhase.propTypes = {
  phase: PropTypes.instanceOf(Phase).isRequired,
  turn: PropTypes.instanceOf(Turn).isRequired
};
GamePhase.defaultProps = {
  phase: Phase.EMPTY,
  turn: Turn.EMPTY
};
// GamePhase.enablePureRender();

export default GamePhase;
