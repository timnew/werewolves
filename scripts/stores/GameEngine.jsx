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
      nightPhases: [],
      phaseGenerator: null,
      currentPhase: EMPTY_PHASE,
      initialTurn: Turn.EMPTY,
      currentTurn: Turn.EMPTY
    };

    this.handlers = {
      createGame: CREATE_GAME,
      nextStep: NEXT_STEP,
      changeRole: CHANGE_ROLE,
      killPlayer: KILL_PLAYER,
      verifyPlayer: VERIFY_PLAYER
    };
  }

  get initialTurn() { return this.state.initialTurn; }
  get nightPhases() { return this.state.nightPhases; }
  get phaseGenerator() { return this.state.phaseGenerator; }

  get currentPhase() { return this.state.currentPhase; }
  get currentTurn() { return this.state.currentTurn; }

  get dayIndex() { return this.currentTurn.dayIndex; } //TODO remove this
  get players() { return this.currentTurn.players; } //TODO remove this
  get roleSchema() { return this.currentTurn.roleSchema; }//TODO remove this

  createGame() {
    this.initGame(GameConfigStorage.loadCurrentConfig());
  }

  initGame(config) {
    this.state = {
      nightPhases: this.populateNightPhases(config.roleSchema),
      phaseGenerator: this.gamePhaseGenerator(),
      currentPhase: EMPTY_PHASE,
      initialTurn: this.createInitialTurn(config)
    };

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

  createInitialTurn(config) {
    let turnData = {
      players: this.createPlayers(config.players),
      roleSchema: config.roleSchema
    };
    return new Turn(turnData);
  }

  nextTurn() {
    this.state.currentTurn = this.currentTurn.nextTurn();
    this.hasChanged();
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
