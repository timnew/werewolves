'use strict';

import _ from 'lodash';
import React from 'react';
import { Row, Panel, Table, ButtonToolbar, ButtonGroup, Button } from 'react-bootstrap';
import { FaIcon } from 'react-fa-icon';
import PlayerTableRow from './PlayerTableRow';
import GameSetup from 'actions/GameSetup';

class PlayerTable extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      childrenInEditing: 0
    };
  }

  increasePlayer() {
    GameSetup.updatePlayerCount(this.props.playerCount + 1);
  }

  decreasePlayer() {
    GameSetup.updatePlayerCount(this.props.playerCount - 1);
  }

  editAll() {
    _.forEach(this.refs, (row) => {
      row.edit();
    });
    this.setState({childrenInEditing: this.props.playerCount});
  }

  confirmAll() {
    _.forEach(this.refs, (row) => {
      row.confirmEdit();
    });
    this.setState({childrenInEditing: 0});
  }
  abortAll() {
    _.forEach(this.refs, (row) => {
      row.abortEdit();
    });
    this.setState({childrenInEditing: 0});
  }

  childEditingStatusChanged(index, state) {
    let children = _(this.refs).values().pluck('state').pluck('inEditing').value();
    children[index] = state;
    let newState = {
      childrenInEditing: _.filter(children, (v)=>v).length
    };
    this.setState(newState);
  }

  render() {
    return (
      <Row>
        <Panel bsStyle={this.panelStyle()} header={this.renderTitle()} footer={this.renderError()}>
          <Table striped condensed hover fill>
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Seat</th>
                <th>
                  <ButtonToolbar>
                    <ButtonGroup bsSize='xsmall'>
                      <Button onClick={this.increasePlayer.bind(this)}><FaIcon icon='plus'/></Button>
                      <Button onClick={this.decreasePlayer.bind(this)}><FaIcon icon='minus'/></Button>
                    </ButtonGroup>
                    {this.renderEditControl()}
                    {this.renderChildrenControl()}
                  </ButtonToolbar>
                </th>
              </tr>
            </thead>
            <tbody>
              {this.renderChildren()}
            </tbody>
          </Table>
        </Panel>
      </Row>
    );
  }

  panelStyle() {
    if(this.props.error) {
      return 'danger';
    } else {
      return 'info';
    }
  }

  renderTitle() {
    return <h3>Players: {this.props.playerCount}</h3>;
  }

  renderError() {
    if(this.props.error) {
      return <span className="text-danger"><b>ERROR: </b>{this.props.error}</span>;
    }
    else {
      return null;
    }
  }

  renderEditControl() {
    let allChildrenInEditing = this.state.childrenInEditing === this.props.playerCount;
    if(allChildrenInEditing) {
      return null;
    }

    return (
      <ButtonGroup bsSize='xsmall'>
        <Button onClick={this.editAll.bind(this)}>
          <FaIcon icon='pencil'/>
        </Button>
      </ButtonGroup>
    );
  }

  renderChildrenControl() {
    let hasChildInEditing = this.state.childrenInEditing > 0;
    if(!hasChildInEditing) {
      return null;
    }

    return (
      <ButtonGroup bsSize='xsmall'>
        <Button bsStyle="success" onClick={this.confirmAll.bind(this)}><FaIcon icon="check"/></Button>
        <Button bsStyle="danger" onClick={this.abortAll.bind(this)}><FaIcon icon="remove"/></Button>
      </ButtonGroup>
    );
  }

  renderChildren() {
    let {playerCount, players} = this.props;
    let rowCount = Math.max(playerCount, players.length);
    return _.map(_.range(rowCount), (index) => {
      return (
        <PlayerTableRow ref={index}
                        index={index}
                        player={players[index]}
                        editingStatusChanged={this.childEditingStatusChanged.bind(this)} />
        );
    });
  }
}
PlayerTable.propTypes = {
  playerCount: React.PropTypes.number,
  players: React.PropTypes.arrayOf(React.PropTypes.object),
  error: React.PropTypes.string
};
PlayerTable.defaultProps = {
  playerCount: 5,
  players: [],
  error: null
};

export default PlayerTable;
