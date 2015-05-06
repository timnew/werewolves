'use strict';

class Player {
    constructor(human, role) {
        this._human = human;
        this._role = role;
    }

    get role() { return this._role; }
    get human() { return this._human; }

    get roleName() { return this.role.name; }
    get priority() { return this.role.priority; }

    get name() { return this.human.name; }
    get seat() { return this.human.seat; }

    get alive() { return this._alive; }
}

module.exports = Player;
