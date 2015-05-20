'use strict';

import Phase from './Phase';

class SunRisePhase extends Phase {
  constructor() {
    super();
  }

  getDescription() { return 'The sun goes up'; }
}

export default SunRisePhase;
