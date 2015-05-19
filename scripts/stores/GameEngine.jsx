import Marty from 'marty';

import _ from 'lodash';

import {
  CREATE_GAME,
  NEXT_STEP
} from 'constants/GamePlayConstants';
import GameConfigStorage from 'stateSources/GameConfigStorage';

import Player from 'models/Player';
import Roles, { Villager, Uncertain } from 'models/roles';

export class GameEngine extends Marty.Store {
  constructor(options) {
    super(options);

    this.state = {
    };

    this.handlers = {
      createGame: CREATE_GAME,
      nextStep: NEXT_STEP
    };
  }

  get players() { return this.state.players; }
  get unassignedRoles() { return this.state.unassignedRoles; }
  get nightPhases() { return this.state.nightPhases; }
  get dayIndex() { return this.state.dayIndex; }
  get phaseGenerator() { return this.state.phaseGenerator; }
  get currentPhase() { return this.state.currentPhase; }

  createGame() {
    this.initGame(GameConfigStorage.loadCurrentConfig());
  }

  initGame(config) {
    let {players, roleSchema} = config;

    this.state = {
      players: this.createPlayers(players),
      unassignedRoles: _.cloneDeep(roleSchema),
      nightPhases: this.populateNightPhases(roleSchema),
      phaseGenerator: this.gamePhaseGenerator(),
      currentPhase: null,
      dayIndex: 1
    };

    this.nextStep();
  }

  createPlayers(players) {
    return _(players)
      .map((playerDef) => new Player(playerDef.name, playerDef.seat))
      .map((player) => new Uncertain(player))
      .value();
  }

  populateNightPhases(roleSchema) {
    return _(roleSchema)
      .keys()
      .map((roleName) => Roles[roleName])
      .filter('hasActiveAction')
      .sortBy('actionOrder')
      .map((role) => role.createPhase())
      .value();
  }

  *turnPhaseGenerator() {
    yield* this.nightPhases;
    yield Villager.createPhase();
  }

  *gamePhaseGenerator() {
    yield* this.turnPhaseGenerator();
  }

  nextStep() {
    this.setState({currentPhase: this.phaseGenerator.next().value});
  }
}

export default Marty.register(GameEngine);