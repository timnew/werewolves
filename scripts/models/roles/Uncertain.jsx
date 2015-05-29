'use strict';

import Villager from './Villager';

class Uncertain extends Villager {
  constructor(player) {
    super(player);
  }

  static get roleName() { return 'Uncertain'; }
}

export default Uncertain;
