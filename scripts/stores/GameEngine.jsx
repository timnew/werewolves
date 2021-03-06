import Marty from 'marty';

import _ from 'lodash';

import {
  CREATE_GAME,
  NEXT_STEP,

  CHANGE_ROLE,
  COUPLE_PLAYER,
  GUARD_PLAYER,
  ATTACK_PLAYER,
  HEAL_PLAYER,
  POISON_PLAYER,
  VERIFY_PLAYER,
  SHOOT_PLAYER,
  VOTE_PLAYER
} from 'constants/GamePlayConstants';
import GameConfigStorage from 'stateSources/GameConfigStorage';

import Roles, { Uncertain } from 'models/roles';
import { EMPTY_PHASE, Phase, SunsetPhase, SunrisePhase, PollPhase, IdiotPhase, PollCountPhase } from 'models/phases'; // eslint-disable-line no-unused-vars
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
      couplePlayer: COUPLE_PLAYER,
      guardPlayer: GUARD_PLAYER,
      attackPlayer: ATTACK_PLAYER,
      healPlayer: HEAL_PLAYER,
      poisonPlayer: POISON_PLAYER,
      verifyPlayer: VERIFY_PLAYER,
      shootPlayer: SHOOT_PLAYER,
      votePlayer: VOTE_PLAYER
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
    yield new SunsetPhase();
    yield* this.nightPhases;
    yield new SunrisePhase();
    yield new PollPhase();
    yield new IdiotPhase(); // TODO avoid to create it if not necessary
    yield new PollCountPhase();
  }

  *gamePhaseGenerator() {
    do {
      yield* this.turnPhaseGenerator();
    } while(true);
  }

  nextStep() {
    this.currentPhase.onPhaseCompleted(this);

    let nextPhase = null;

    while(nextPhase == null) {
      let nextPhaseResult = this.phaseGenerator.next();

      if(nextPhaseResult.done) {
        console.error('Finished');
        nextPhase = false;
        continue;
      }

      nextPhase = nextPhaseResult.value.isAvailable(this.currentTurn) ? nextPhaseResult.value : null;
    }

    if(nextPhase) {
      this.gotoPhase(nextPhase);
    }
  }

  gotoPhase(phase) {
    this.state.currentPhase = phase;

    this.currentPhase.onPhaseBegin(this);

    this.hasChanged();
  }

  changeRole(player, role) {
    this.currentTurn.changeRole(player, role);

    this.hasChanged();
  }

  couplePlayer(player) {
    player.addStatus('lover', true);
    this.hasChanged();
  }

  guardPlayer(player) {
    player.addStatus('guarded');
    this.currentTurn.logEvent(GUARD_PLAYER, player.name);
    this.hasChanged();
  }

  attackPlayer(player) {
    let attachStatus = !player.hasStatus('guarded');
    player.addStatus('attacked', attachStatus);
    this.currentTurn.logEvent(ATTACK_PLAYER, player.name);
    this.hasChanged();
  }

  healPlayer(player) {
    player.addStatus('attacked', false);
    this.currentTurn.findAliveRole('Witch').addStatus('heal-potion', false);
    this.currentTurn.logEvent(HEAL_PLAYER, player.name);
    this.hasChanged();
  }

  poisonPlayer(player) {
    player.addStatus('poisoned');
    this.currentTurn.findAliveRole('Witch').addStatus('poison-potion', false);
    this.currentTurn.logEvent(POISON_PLAYER, player.name);
    this.hasChanged();
  }

  verifyPlayer(player) {
    player.addStatus('verified');
    this.currentTurn.logEvent(VERIFY_PLAYER, player.name);
    this.hasChanged();
  }

  shootPlayer(player) {
    player.kill('shoot', this.currentTurn);
    this.currentTurn.logEvent(SHOOT_PLAYER, player.name);
    this.hasChanged();
  }

  votePlayer(player, tickets) {
    player.updateStatusValue('voted', (number) => number + tickets, 0);
    this.hasChanged();
  }

  populateDeath() {
    this.currentTurn.populateDeath();
    this.hasChanged();
  }

  pollCount() {
    this.currentTurn.pollCount();
    // this.hasChanged();
  }

  sentencePlayer() {
    if(this.currentTurn.sentencePlayer()) {
      this.hasChanged();
    }
  }
}

export default Marty.register(GameEngine, 'GameEngine');
