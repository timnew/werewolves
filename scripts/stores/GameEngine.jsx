import Marty from 'marty';

import _ from 'lodash';

import {
  CREATE_GAME,
  NEXT_STEP,

  SETTLE_ROLE,
  KILL_PLAYER
} from 'constants/GamePlayConstants';
import GameConfigStorage from 'stateSources/GameConfigStorage';

import Player from 'models/Player';
import Roles, { Uncertain } from 'models/roles';
import { Phase, SunSetPhase, SunRisePhase, VotePhase } from 'models/phases';
import Turn from 'models/Turn';

export class GameEngine extends Marty.Store {
  constructor(options) {
    super(options);

    this.state = {
    };

    this.handlers = {
      createGame: CREATE_GAME,
      nextStep: NEXT_STEP,
      settleRole: SETTLE_ROLE,
      killPlayer: KILL_PLAYER
    };
  }

  get players() { return _.values(this.state.players); }
  get unassignedRoles() { return this.state.unassignedRoles; }
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
      unassignedRoles: _.cloneDeep(roleSchema),
      nightPhases: this.populateNightPhases(roleSchema),
      phaseGenerator: this.gamePhaseGenerator(),
      currentPhase: new Phase(),
      currentTurn: new Turn(0)
    };

    this.nextStep();
  }

  createPlayers(players) {
    return _(players)
      .map((playerDef) => new Player(playerDef.name, playerDef.seat))
      .map((player) => new Uncertain(player))
      .map((player) => [player.name, player])
      .zipObject()
      .value();
  }

  nextTurn() {
    this.state.currentTurn = new Turn(this.dayIndex + 1);
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

  settleRole(player, role) {
    this.state.players[player.name] = this.state.players[player.name].settleRole(role);
    this.hasChanged();
  }

  killPlayer(player, reason) {
    if(player.killBy(reason)) {
      this.currentTurn.deadPlayers.push(player);
      this.hasChanged();
    }
  }
}

export default Marty.register(GameEngine);
