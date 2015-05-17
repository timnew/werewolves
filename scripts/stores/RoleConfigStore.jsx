'use strict';

import _ from 'lodash';
import Marty from 'marty';
import GameConfigStorage from 'stateSources/GameConfigStorage';

import {
    UPDATE_PLAYER_COUNT,
    UPDATE_ROLE_CONFIG,
    SAVE_CONFIG,
    LOAD_CONFIG
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
        updateSchema: UPDATE_PLAYER_COUNT,
        updateRoleConfig: UPDATE_ROLE_CONFIG,
        saveConfig: SAVE_CONFIG,
        loadConfig: LOAD_CONFIG
      };
  }

  get playerCount() { return this.state.playerCount; }

  get roleCount() { return this.state.roleCount; }

  get roleSchema() { return this.state.roleSchema; }

  get validationError() { return this.state.validationError; }

  get isValid() { return this.state.validationError == null; }

  updateSchema(count) {
    this.state.playerCount = count;
    this.state.roleSchema = defaultRoleSchemas[count] ? defaultRoleSchemas[count] : defaultRoleSchemas.default;
    this.state.roleSchema = _.cloneDeep(this.state.roleSchema);

    this.validate();

    let difference = count - this.roleCount.total;
    if(difference > 0) {
      this.state.roleSchema.Villager += difference;
      this.validate();
    }

    this.hasChanged();
  }

  updateRoleConfig(name, count) {
    if(this.validateName(name)) {
      this.state.roleSchema[name] = count;
      this.validate();
      this.hasChanged();
    }
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
    let currentConfig = this.state;

    this.state = GameConfigStorage.loadConfig(name, 'roleConfig');

    if(!this.validate()) {
      console.error('Loaded config is invalid, restore to previous one');
      this.state = currentConfig;
      this.validate();
    }
  }
}

export default Marty.register(RoleConfigStore);
