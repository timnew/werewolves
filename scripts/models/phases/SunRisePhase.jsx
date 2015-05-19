'use strict';

import Phase from './Phase';

class SunRisePhase extends Phase {
  constructor() {
    super();
  }

  get description() { return 'The sun goes up'; }
}

export default SunRisePhase;
