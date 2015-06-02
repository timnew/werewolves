'use strict';

import React from 'reactx';
import StatusIcon from 'components/StatusIcon';

class Phase {
  constructor(name) {
    this._name = name ? name : this.constructor.name;
  }

  get name() { return this._name; }

  isAvailable() { return true; }

  getPhaseIcon() { return <StatusIcon prefix='hint' icon='announcement' size='3x' pull='left'/>; }
  getDescription() { return '-- Game Not Started --'; }

  canMoveNext() { return true; }

  onPhaseCompleted() { }
  onPhaseBegin() { }

  static get EMPTY() {
    return new Phase('EMPTY_PHASE');
  }
}

export default Phase;
