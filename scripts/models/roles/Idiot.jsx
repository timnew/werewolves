'use strict';

import Role from './Role';

class Idiot extends Role {
  constructor(player) {
    super('Idiot', player);
  }
}

export default Idiot;
