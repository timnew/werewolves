'use strict';

import React, { PropTypes } from 'reactx';
import StatusIcon from 'components/StatusIcon';

class GameStatusRow extends React.Component {
  constructor(props) {
    super(props, {

    });
  }

  render() {
    return (
      <tr>
        <td>
          <StatusIcon prefix='status' icon='dead'/>
          <StatusIcon prefix='status' icon='sheriff'/>
          <StatusIcon prefix='status' icon='lover'/>
          <StatusIcon prefix='role' icon='werewolf'/>
        </td>
        <td>Player1 (Seat 1)</td>
        <td></td>
      </tr>
    );
  }
}
GameStatusRow.propTypes = {
  player: PropTypes.object.isRequired
};
GameStatusRow.defaultProps = {};
GameStatusRow.enablePureRender();

export default GameStatusRow;
