'use strict';

import Marty from 'marty';

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
}

export default Marty.register(GameConfigStorage);
