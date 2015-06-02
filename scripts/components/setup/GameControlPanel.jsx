'use strict';

import React from 'reactx';
import { Row, Panel, ButtonToolbar, Button } from 'react-bootstrap';
import StatusIcon from 'components/StatusIcon';

import GameSetup from 'actions/GameSetup';

class GameControlPanel extends React.Component {
  constructor(props) {
    super(props);
  }

  get isValid() {
    return this.props.isPlayerValid && this.props.isRoleConfigValid;
  }

  startGame() {
    GameSetup.submitConfig();
    this.router.transitionTo('Play');
  }

  loadConfig() {
    GameSetup.loadConfig('default');
  }

  saveConfig() {
    GameSetup.saveConfig('default');
  }

  render() {
    return (
      <Row>
        <Panel bsStyle={this.panelStyle} header={this.renderHeader()}>
          <ButtonToolbar>
            <Button bsStyle='primary'
                    disabled={!this.isValid}
                    onClick={this.startGame.bind(this)}>
              <StatusIcon inline prefix='action' icon='launch'/>Start Game
            </Button>

            <Button disabled={!this.isValid}
                    onClick={this.saveConfig.bind(this)}>
              <StatusIcon inline prefix='action' icon='save'/>Save
            </Button>
            <Button onClick={this.loadConfig.bind(this)}>
              <StatusIcon inline prefix='action' icon='load'/>Load
            </Button>
          </ButtonToolbar>
        </Panel>
      </Row>
    );
  }

  renderHeader() {
    return <h3><StatusIcon inline prefix='panel' icon='control'/>Game Control</h3>;
  }

  get panelStyle() {
    return this.isValid ? 'info' : 'danger';
  }
}
GameControlPanel.propTypes = {};
GameControlPanel.defaultProps = {};

GameControlPanel.enablePureRender();
GameControlPanel.enableReactRouter();

export default GameControlPanel;
