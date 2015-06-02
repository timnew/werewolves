import React from 'reactx';

import {Grid, Row} from 'react-bootstrap';
import StatusIcon from 'components/StatusIcon';

class Footer extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Grid className='page-footer'>
        <Row>
          <div className="pull-right">
            <span >Created by <a target="_blank" href="http://timnew.me">TimNew</a></span>
            <a className="btn btn-default btn-xs" href="https://github.com/timnew/werewolves" target="_blank">
              <StatusIcon prefix='code' icon='star'/>Star
            </a>
            <a className="btn btn-default btn-xs" href="https://github.com/timnew/werewolves/fork" target="_blank">
              <StatusIcon prefix='code' icon='fork'/>Fork
            </a>
          </div>
        </Row>
      </Grid>
    );
  }
}
Footer.enablePureRender();

export default Footer;
