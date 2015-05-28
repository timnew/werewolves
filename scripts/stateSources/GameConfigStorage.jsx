'use strict';

import Marty from 'marty';

import { CURRENT_CONFIG } from 'constants/GameSetupConstants';

function buildName(...args) {
  return args.join(':');
}

export class GameConfigStorage extends Marty.LocalStorageStateSource {
  constructor(options) {
    super(options);

    this.namespace = 'GameConfig:';
  }

  saveConfig(name, spec, config) {
    this.set(buildName(name, spec), JSON.stringify(config));
  }
  loadConfig(name, spec) {
    return JSON.parse(this.get(buildName(name, spec)));
  }

  hasConfig(name, spec) {
    return !!this.get(buildName(name, spec));
  }

  loadCurrentConfig() {
    return {
      'players': this.loadConfig(CURRENT_CONFIG, 'players').players,
      'roleSchema': this.loadConfig(CURRENT_CONFIG, 'roleConfig').roleSchema
    };
  }
}

export default Marty.register(GameConfigStorage, 'GameConfigStorage');
