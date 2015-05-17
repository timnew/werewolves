'use strict';

import Marty from 'marty';

import { CURRENT_GAME } from 'constants/GameSetupConstants';

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

  loadCurrentGameConfig() {
    return {
      'players': this.loadConfig(CURRENT_GAME, 'players'),
      'roleSchema': this.loadConfig(CURRENT_GAME, 'roleConfig').roleSchema
    };
  }
}

export default Marty.register(GameConfigStorage);
