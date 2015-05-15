'use strict';

import React, { shouldComponentUpdate } from 'reactx';
import { Row, Panel, ButtonToolbar, Button } from 'react-bootstrap';
import { FaIcon } from 'react-fa-icon';

class GameControlPanel extends React.Component {
  constructor(props) {
    super(props);
  }

  shouldComponentUpdate = shouldComponentUpdate;

  get isValid() {
    return this.props.isPlayerValid && this.props.isRoleConfigValid;
  }

  render() {
    return (
      <Row>
        <Panel bsStyle={this.panelStyle} header='Game Control'>
          <ButtonToolbar>
            <Button bsStyle='primary' disabled={!this.isValid}><FaIcon icon='flag-checkered'/> Start Game</Button>

            <Button disabled={!this.isValid}><FaIcon icon='save'/> Save</Button>
            <Button><FaIcon icon='folder-open'/> Load</Button>
          </ButtonToolbar>
        </Panel>
      </Row>
    );
  }

  get panelStyle() {
    return this.isValid ? 'info' : 'danger';
  }
}
GameControlPanel.propTypes = {};
GameControlPanel.defaultProps = {};

export default GameControlPanel;
