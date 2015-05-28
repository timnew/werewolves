'use strict';

import _ from 'lodash';
import Marty from 'marty';
import GameConfigStorage from 'stateSources/GameConfigStorage';
import PlayerStore, { MIN_PLAYER_COUNT, RECOMMENDED_MAX_PLAYER_COUNT } from './PlayerStore';

import {
  ADD_PLAYER,
  REMOVE_PLAYER,
  UPDATE_ROLE_CONFIG,
  SAVE_CONFIG,
  LOAD_CONFIG,
  INIT_CONFIG,
  CURRENT_CONFIG
} from 'constants/GameSetupConstants';

import roleSpecs from 'models/roles/roleSpecs';
import defaultRoleSchemas from 'models/roles/roleSchemas';

export class RoleConfigStore extends Marty.Store {
  constructor(options) {
    super(options);

    this.state = {
    };

    this.updateSchema(5);

    this.handlers = {
      updateSchema: [ADD_PLAYER, REMOVE_PLAYER],
      updateRoleConfig: UPDATE_ROLE_CONFIG,
      saveConfig: SAVE_CONFIG,
      loadConfig: LOAD_CONFIG,
      initConfig: INIT_CONFIG
    };
  }

  get playerCount() { return this.state.playerCount; }

  get roleCount() { return this.state.roleCount; }

  get roleSchema() { return this.state.roleSchema; }

  get validationError() { return this.state.validationError; }

  get isValid() { return this.state.validationError == null; }

  updateSchema() {
    let count = PlayerStore.playerCount;

    this.state.playerCount = count;

    if (count < MIN_PLAYER_COUNT) {
      this.state.roleSchema = _.cloneDeep(defaultRoleSchemas[MIN_PLAYER_COUNT]);
    } else if(count > RECOMMENDED_MAX_PLAYER_COUNT) {
      this.state.roleSchema = _.cloneDeep(defaultRoleSchemas.default);
      this.repopulateVillager();
    } else {
      this.state.roleSchema = _.cloneDeep(defaultRoleSchemas[count]);
    }

    this.validate();
    this.hasChanged();
  }

  updateRoleConfig(name, count) {
    if(this.validateName(name)) {
      this.state.roleSchema[name] = count;
      this.repopulateVillager();
      this.validate();
      this.hasChanged();
    }
  }

  repopulateVillager() {
    let withoutVillagers = _(this.roleSchema).omit('Villager')
                                             .values()
                                             .reduce((total, count) => total + count);
    console.log(withoutVillagers);
    this.roleSchema.Villager = Math.max(0, this.playerCount - withoutVillagers);
  }

  validateName(name) {
    if(roleSpecs[name] == null){
      this.setError(`Invalid role name "${name}"`);
      return false;
    }

    return true;
  }

  validateRoleCount(roleName, count) {
    let spec = roleSpecs[roleName];

    if(count > spec.max) {
      this.setError(`You have more than ${spec.max} ${roleName}, which is not allowed.`); // eslint-disable-line comma-spacing
    }
    if(count < spec.min) {
      this.setError(`You need at least ${spec.min} ${roleName} to start the game.`);
    }
  }

  validate() {
    this.setError(null);

    let roleCount = {
      total: 0,
      villager: 0,
      werewolf: 0
    };

    for(var roleName in this.roleSchema) {
      let count = this.roleSchema[roleName];
      let side = roleSpecs[roleName].side;
      roleCount.total += count;
      roleCount[side] += count;

      this.validateRoleCount(roleName, count);
    }

    this.state.roleCount = roleCount;

    if(!this.isValid) {
      return false;
    }

    if (this.playerCount < MIN_PLAYER_COUNT) {
      this.setError(`At least ${MIN_PLAYER_COUNT} players`);
      return false;
    }

    if(roleCount.total !== this.playerCount) {
      this.setError(`${roleCount.total} roles enabled for ${this.playerCount} players`);
      return false;
    }

    return true;
  }

  setError(error) {
    this.setState({validationError: error});
  }

  saveConfig(name) {
    if(!this.validate()) {
      return;
    }

    GameConfigStorage.saveConfig(name, 'roleConfig', this.state);
  }

  loadConfig(name) {
    if(!GameConfigStorage.hasConfig(name, 'roleConfig')) {
      console.error(`Config ${name} doesn't exist`);
      return;
    }

    let currentConfig = this.state;

    this.state = GameConfigStorage.loadConfig(name, 'roleConfig');

    if(!this.validate()) {
      console.error('Loaded config is invalid, restore to previous one');
      this.state = currentConfig;
      this.validate();
    }
  }

  initConfig() {
    this.loadConfig(CURRENT_CONFIG);
  }
}

export default Marty.register(RoleConfigStore, 'RoleConfigStore');
