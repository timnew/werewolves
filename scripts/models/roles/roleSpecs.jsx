'use strict';

module.exports = {
  Cupido: { order: 2, side: 'villager', min: 0, max: 1 },
  Guardian: { order: 3, side: 'villager', min: 0, max: 1 },
  Werewolf: { order: 4, side: 'werewolf', min: 1, max: 4 },
  Witch: { order: 5, side: 'villager', min: 0, max: 1 },
  Seer: { order: 6, side: 'villager', min: 1, max: 1 },
  Hunter: { order: 0, side: 'villager', min: 0, max: 1 },
  Idiot: { order: 0, side: 'villager', min: 0, max: 1 },
  Villager: { order: 0, side: 'villager', min: 1, max: 13 }
};
