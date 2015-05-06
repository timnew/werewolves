describe 'RoleStore', ->
  RoleStore = require(sourceRoot.stores('RoleStore'))
  RoleManipulations = require(sourceRoot.actions('RoleManipulations'))

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

  it 'should switch role', (done) ->
    RoleStore.registerAll()

    RoleStore.roles.Witch.enabled.should.be.false

    RoleManipulations.switchRole('Witch', true)

    Scheduler
      .execute()
      .then ->
        RoleStore.roles.Witch.enabled.should.be.true
      .nodeify(done)
