'use strict';

module.exports = {
  Roles: {
    Role : require('./Role'),
    Cupido : require('./Cupido'),
    Guardian : require('./Guardian'),
    Werewolf : require('./Werewolf'),
    Witch : require('./Witch'),
    Seer : require('./Seer'),
    Hunter : require('./Hunter'),
    Idiot : require('./Idiot'),
    Villager : require('./Villager')
  },
  roleSpecs: require('./roleSpecs'),
  roleSchemas: require('./roleSchemas')
};
