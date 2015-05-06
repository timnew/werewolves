describe 'RoleStore', ->
  RoleStore = require(sourceRoot.stores('RoleStore'))
  RoleManipulations = require(sourceRoot.actions('RoleManipulations'))
  require(sourceRoot.models('roles'))

  it 'should register roles', ->
    RoleStore.should.be.ok
    RoleManipulations.should.be.ok

    RoleStore.roles.should.have.keys [
      'cupido',
      'guardian',
      'werewolf',
      'girl',
      'witch',
      'seer',
      'hunter',
      'idiot'
    ]
