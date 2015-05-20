import Marty from 'marty';

import _ from 'lodash';

import {
  CREATE_GAME,
  NEXT_STEP,

  CHANGE_ROLE,
  KILL_PLAYER,
  VERIFY_PLAYER
} from 'constants/GamePlayConstants';
import GameConfigStorage from 'stateSources/GameConfigStorage';

import Roles, { Uncertain } from 'models/roles';
import { EMPTY_PHASE, Phase, SunSetPhase, SunRisePhase, VotePhase } from 'models/phases';
import Turn from 'models/Turn';

export class GameEngine extends Marty.Store {
  constructor(options) {
    super(options);

    this.state = {
    };

    this.handlers = {
      createGame: CREATE_GAME,
      nextStep: NEXT_STEP,
      changeRole: CHANGE_ROLE,
      killPlayer: KILL_PLAYER,
      verifyPlayer: VERIFY_PLAYER
    };
  }

  get players() { return this.state.players; }
  get roleSchema() { return this.state.roleSchema; }
  get nightPhases() { return this.state.nightPhases; }
  get dayIndex() { return this.currentTurn.dayIndex; }
  get phaseGenerator() { return this.state.phaseGenerator; }
  get currentPhase() { return this.state.currentPhase; }
  get currentTurn() { return this.state.currentTurn; }

  createGame() {
    this.initGame(GameConfigStorage.loadCurrentConfig());
  }

  initGame(config) {
    let {players, roleSchema} = config;

    this.state = {
      players: this.createPlayers(players),
      roleSchema: _.cloneDeep(roleSchema),
      nightPhases: this.populateNightPhases(roleSchema),
      phaseGenerator: this.gamePhaseGenerator(),
      currentPhase: EMPTY_PHASE
    };

    this.state.initialTurn = this.createInitialTurn();
    this.state.currentTurn = this.state.initialTurn;

    this.nextStep();
  }

  createPlayers(players) {
    return _(players)
      .map((player) => new Uncertain(player))
      .map((player) => [player.name, player])
      .zipObject()
      .value();
  }

  createInitialTurn() {
    return new Turn(0);
  }

  nextTurn() {
    this.state.currentTurn = new Turn(this.dayIndex + 1, this.players, this.roleSchema);
  }

  populateNightPhases(roleSchema) {
    return _(roleSchema)
      .pick((count)=>count > 0)
      .keys()
      .map((roleName) => Roles[roleName])
      .filter('hasActiveAction')
      .sortBy('actionOrder')
      .map((role) => role.createPhase())
      .value();
  }

  *turnPhaseGenerator() {
    yield new SunSetPhase();
    yield* this.nightPhases;
    yield new SunRisePhase();
    yield new VotePhase();
  }

  *gamePhaseGenerator() {
    do {
      yield* this.turnPhaseGenerator();
    } while(true);
  }

  nextStep() {
    this.gotoPhase(this.phaseGenerator.next().value);
  }

  gotoPhase(phase) {
    this.currentPhase.onPhaseCompleted(this);

    this.state.currentPhase = phase;

    this.currentPhase.onPhaseBegin(this);

    this.hasChanged();
  }

  changeRole(player, role) {
    this.state.players[player.name] = this.state.players[player.name].changeRole(role);

    this.hasChanged();
  }

  killPlayer(player, reason) {
    if(player.killBy(reason)) {
      this.currentTurn.playerKilled(player, reason);
      this.hasChanged();
    }
  }

  verifyPlayer(player) {
    player.addStatus('verified');
    this.currentTurn.logEvent('verified', player);
    this.hasChanged();
  }
}

export default Marty.register(GameEngine);
