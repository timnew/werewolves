'use strict';

const { registerRole } = require('../../actions/RoleManipulations');

const Role = require('./role');
const Cupido = require('./cupido');
const Guardian = require('./guardian');
const Werewolf = require('./werewolf');
const Girl = require('./girl');
const Witch = require('./witch');
const Seer = require('./seer');
const Hunter = require('./hunter');
const Idiot = require('./idiot');

// RoleManager.register(new Role('thief', 1));
registerRole(new Cupido('cupido', 2));
registerRole(new Guardian('guardian', 3));
registerRole(new Werewolf('werewolf', 4));
registerRole(new Role('girl', 5));
registerRole(new Role('witch', 6));
registerRole(new Role('seer', 7));
registerRole(new Role('hunter', 0));
registerRole(new Role('idiot', 0));
