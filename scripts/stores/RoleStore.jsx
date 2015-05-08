'use strict';

const Marty = require('marty');
const GameSetupConstants = require('../constants/GameSetupConstants');
const roleSettings = require('../modles/roles').settings;
const { Cupido, Guardian, Werewolf, Girl, Witch, Seer, Hunter, Idiot, Villager } = require('../models/roles').Roles;
const GameRuleStore = require('./GameRuleStore');
const _ = require('lodash');

class RoleStore extends Marty.Store {
  constructor(options) {
      super(options);

      this.state = {
        roles: {},
        isValid: false
      };

      this.handlers = {
        toggleRole: GameSetupConstants.TOGGLE_ROLE,
        revalidate: GameSetupConstants.UPDATE_PLAYER_COUNT
      };
  }

  get roles() {
    return this.state.roles;
  }

  register(role) {
    this.roles[role.name] = role;
    this.hasChanged();
  }

  toggleRole(name, enabled) {
    let role = this.roles[name];

    if(role){
      this.roles[name].enabled = true;
      this.validate();
      this.hasChanged();
    }
    else{
      throw new Error(`Invalid role name ${name}`);
    }
  }

  populateEnabledRoles() {
    return _(this.roles)
      .filter('enabled')
      .value();
  }

  revalidate() {
    this.validate();
    this.hasChanged();
  }

  validate() {
    this.waitFor(GameRuleStore);

    let enabledRoles = this.populateEnabledRoles();
    let enabledLightRoles = _.reject(enabledRoles, 'defaultSide', 'werewolf');

    this.state.isValid = this.roles.Werewolf.enabled &&
                         this.roles.Seer.enabled &&
                         this.roles.Villager.enabled &&
                         _.size(enabledLightRoles) <= GameRuleStore.lightPlayerCount &&
                         _.size(enabledRoles)  <= GameRuleStore.playerCount;
  }
}

module.exports = Marty.register(RoleStore);
