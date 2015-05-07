'use strict';

const Reflux = require('reflux');

const RoleManipulations = require('../actions/RoleManipulations');
const { Cupido, Guardian, Werewolf, Girl, Witch, Seer, Hunter, Idiot, Villager } = require('../models/roles/index');

const RoleStore = Reflux.createStore({
  listenables: RoleManipulations,

  roles: {},

  register(role) {
    this.roles[role.name] = role;
    this.trigger(this);
  },

  registerAll() {
    this.register(new Cupido('Cupido', 2));
    this.register(new Guardian('Guardian', 3));
    this.register(new Werewolf('Werewolf', 4));
    this.register(new Girl('Girl', 5));
    this.register(new Witch('Witch', 6));
    this.register(new Seer('Seer', 7));
    this.register(new Hunter('Hunter', 0));
    this.register(new Idiot('Idiot', 0));
    this.register(new Villager('Villager', 0));
  },

  onSwitchRole(name, enabled) {
    let role = this.roles[name];

    if (!role) throw new Error(`Invalid role name: ${name}`);

    role.enabled = enabled;

    this.trigger(this.roles);
  }
});

module.exports = RoleStore;
