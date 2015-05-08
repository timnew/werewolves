'use strict';

const React = require('react');
const { Row, Col, Panel, Table, ButtonGroup, Button } = require('react-bootstrap');
const { FaIcon } = require('react-fa-icon');
const PlayerTableRow = require('./PlayerTableRow');
const _ = require('lodash');

class PlayerTable extends React.Component {
  constructor(props) {
    super(props);
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
                  <ButtonGroup bsSize='xsmall'>
                    <Button><FaIcon icon='minus'/></Button>
                    <Button><FaIcon icon='plus'/></Button>
                  </ButtonGroup>
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

  renderChildren() {
    let rows = [];
    for (var index = 0; index < this.props.playerCount; index ++) {
      let player = this.props.players[index];

      rows.push(<PlayerTableRow index={index} player={player}/>);
    }
    return rows;
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

module.exports = PlayerTable;
