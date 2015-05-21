'use strict';

import React from 'react';
import StatusIcon from 'components/StatusIcon';

import Role from './Role';
import WitchPhase from 'models/phases/WitchPhase';

class Witch extends Role {
  constructor(player) {
    super(player);

    if(!this.hasStatus('heal-potion')) {
      this.addStatus('heal-potion', true);
    }

    if(!this.hasStatus('poison-potion')) {
      this.addStatus('poison-potion', true);
    }
  }

  get canHeal() { return this.getStatus('heal-potion'); }
  get canPoison() { return this.getStatus('poison-potion'); }

  renderRoleCapabily() {
    return [
      <StatusIcon key='heal-potion'
                  prefix='capability'
                  icon='heal'
                  valueMode
                  value={this.canHeal}/>,

      <StatusIcon key='poison-potion'
                  prefix='capability'
                  icon='poison'
                  valueMode
                  value={this.canPoison}/>
    ];
  }

  static createPhase() {
    return new WitchPhase();
  }
}

export default Witch;
