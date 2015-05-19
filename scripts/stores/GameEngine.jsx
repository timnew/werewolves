import Marty from 'marty';

import _ from 'lodash';

import {CREATE_GAME} from 'constants/GameSetupConstants';
import GameSetup from 'actions/GameSetup';
import GameConfigStorage from 'stateSources/GameConfigStorage';

import Player from 'models/Player';
import Roles, { Uncertain } from 'models/roles';

export class GameEngine extends Marty.Store {
  constructor(options) {
    super(options);

    this.state = {
    };

    this.handlers = {
      createGame: CREATE_GAME
    };
  }

  get players() { return this.state.players; }
  get unassignedRoles() { return this.state.unassignedRoles; }
  get nightSequence() { return this.state.nightSequence; }

  createGame() {
    GameSetup.submitConfig();
    this.initGame(GameConfigStorage.loadCurrentGameConfig());
  }

  initGame(config) {
    let {players, roleSchema} = config;

    this.state = {
      players: this.createPlayers(players),
      unassignedRoles: _.cloneDeep(roleSchema),
      nightSequence: this.createNightSequence(roleSchema)
    };

    this.hasChanged();
  }

  createPlayers(players) {
    return _(players)
      .map((playerDef) => new Player(playerDef.name, playerDef.seat))
      .map((player) => new Uncertain(player))
      .value();
  }

  createNightSequence(roleSchema) {
    return _(roleSchema).keys().map((roleName) => Roles[roleName]).filter('actionInNightTurn').sortBy('nightTurnOrder').value();
  }
}

export default Marty.register(GameEngine);
