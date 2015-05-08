'use strict';

const Marty = require('marty');
const GameSetupConstants = require('../constants/GameSetupConstants');
const { Cupido, Guardian, Werewolf, Girl, Witch, Seer, Hunter, Idiot, Villager } = require('../models/roles/index');

class RoleStore extends Marty.Store {
  constructor(options) {
      super(options);

      this.state = {
      };

      this.handlers = {
        toggleRole: GameSetupConstants.TOGGLE_ROLE
      };
  }

  get roles() {
    return this.state;
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
    let role = this.roles[name];

    if(role){
      this.roles[name].enabled = true;
      this.hasChanged();
    }
    else{
      throw new Error(`Invalid role name ${name}`);
    }
  }
}

module.exports = Marty.register(RoleStore);
