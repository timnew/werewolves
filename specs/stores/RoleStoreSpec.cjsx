describe 'RoleStore', ->
  RoleStore = require(sourceRoot.stores('RoleStore'))

  it 'should register roles', ->
    RoleStore.should.be.ok

    RoleStore.registerAll()

    RoleStore.roles.should.have.keys [
      'Cupido',
      'Guardian',
      'Werewolf',
      'Girl',
      'Witch',
      'Seer',
      'Hunter',
      'Idiot',
      'Villager'
    ]
