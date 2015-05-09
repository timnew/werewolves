'use strict';

import Role from './Role';

class Werewolf extends Role {
  constructor(player) {
    super('Werewolf', player);
  }
}

export default Werewolf;
