'use strict';

const Reflux = require('reflux');

const Role = require('../models/roles/role');
const Cupido = require('../models/roles/cupido');
const Guardian = require('../models/roles/guardian');
const Werewolf = require('../models/roles/werewolf');
const Girl = require('../models/roles/girl');
const Witch = require('../models/roles/witch');
const Seer = require('../models/roles/seer');
const Hunter = require('../models/roles/hunter');
const Idiot = require('../models/roles/idiot');
const Villager = require('../models/roles/Villager');

const RoleStore = Reflux.createStore({
  roles: {},

  register(role) {
    this.roles[role.name] = role;
    this.trigger(this);
  },

  registerAll() {
    // this.register(new Role('thief', 1));
    this.register(new Cupido('Cupido', 2));
    this.register(new Guardian('Guardian', 3));
    this.register(new Werewolf('Werewolf', 4));
    this.register(new Girl('Girl', 5));
    this.register(new Witch('Witch', 6));
    this.register(new Seer('Seer', 7));
    this.register(new Hunter('Hunter', 0));
    this.register(new Idiot('Idiot', 0));
    this.register(new Villager('Villager', 0));
  }
});

module.exports = RoleStore;
