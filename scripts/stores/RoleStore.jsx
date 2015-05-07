'use strict';

const Marty = require('marty');
const GameSetupConstants = require('../constants/GameSetupConstants');
const { Cupido, Guardian, Werewolf, Girl, Witch, Seer, Hunter, Idiot, Villager } = require('../models/roles/index');

class RoleStore extends Marty.Store {
  constructor(options) {
      super(options);

      this.state = {
        roles: {}
      };

      this.handlers = {
        toggleRole: GameSetupConstants.TOOGLE_ROLE
      };
  }

  register(role) {
    this.setState({
      [role.name]: role
    });
  }

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
  }

  toggleRole(name, enabled) {
    this.state.role[name].enabled = true;
    this.hasChanged();
  }
}

module.exports = Marty.register(RoleStore);
