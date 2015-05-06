'use strict';

const Reflux = require('reflux');

const RoleManipulations = require('../actions/RoleManipulations');

const RoleStore = Reflux.createStore({
    listenables: RoleManipulations,

    roles: {},

    onRegisterRole(role) {
        this.roles[role.name] = role;

        this.trigger(this);
    }    
});

module.exports = RoleStore;
