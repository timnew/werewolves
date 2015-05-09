'use strict';

class Player {
    constructor(name, seat) {
        this._name = name;
        this._seat = seat;
    }

    get name(){ return this._name; }
    set name(name) { this._name = name; }

    get seat() { return this._seat; }
    set seat(seat) { this._seat = seat; }

    swapSeatWith(anotherHuman) {
        let mySeat = this.seat;

        this.seat = anotherHuman.seat;
        anotherHuman.seat = mySeat;
    }

    assignRole(role) {
        return new Player(this, role);
    }
}

export default Player;
