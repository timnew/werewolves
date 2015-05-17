'use strict';

class Player {
    constructor(name, seat) {
        this._name = name;
        this._seat = seat;
    }

    get name(){ return this._name; }
    get seat() { return this._seat; }

    settleRole(Role) {
      return new Role(this);
    }
}

export default Player;
