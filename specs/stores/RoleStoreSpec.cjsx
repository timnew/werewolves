describe 'RoleStore', ->
  RoleStore = require(sourceRoot.stores('RoleStore'))
  GameSetup = require(sourceRoot.actions('GameSetup'))

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

  it 'should switch role', ->
    RoleStore.registerAll()

    RoleStore.roles.Witch.enabled.should.be.false

    GameSetup.toggleRole('Witch', true)

    RoleStore.roles.Witch.enabled.should.be.true
