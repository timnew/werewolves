_ = require('lodash')

describe 'RoleConfigStore', ->
  RoleConfigStore = require(sourceRoot.stores('RoleConfigStore')).RoleConfigStore
  GameSetup = require(sourceRoot.actions('GameSetup'))
  roleSchemas = require(sourceRoot.models('roles', 'roleSchemas'))
  defaultSchema = roleSchemas[5]

  roleConfigStore = null

  beforeEach ->
    roleConfigStore = new RoleConfigStore({})

  afterEach ->
    roleConfigStore.dispose()

  describe 'role schema', ->

    it 'should have default value', ->
      roleConfigStore.roleSchema.should.deep.equal defaultSchema

    it 'should get updated when player count changed', ->
      GameSetup.updatePlayerCount(10)

      roleConfigStore.roleSchema.should.deep.equal roleSchemas[10]

    it 'should be try to fit when specific schema not defined', ->
      GameSetup.updatePlayerCount(100)

      roleConfigStore.roleCount.total.should.equal 100

    describe 'copy schema', ->
      it 'should copy default schema instead of reference it', ->
        originalValue = defaultSchema.Werewolf

        roleConfigStore.roleSchema.Werewolf = 10

        defaultSchema.Werewolf.should.equal originalValue


      it 'should copy default schema instead of reference it', ->
        originalValue = roleSchemas[10].Werewolf
        GameSetup.updatePlayerCount(10)

        roleConfigStore.roleSchema.Werewolf = 100

        roleSchemas[10].Werewolf.should.equal originalValue

  describe 'role numbers', ->

    it 'should count roles', ->
      GameSetup.updateRoleConfig('Werewolf', 2)

      roleConfigStore.playerCount.should.equal 5
      roleConfigStore.roleCount.should.deep.equal
        total: 6
        werewolf: 2
        villager: 4

    it 'should count by side', ->
      GameSetup.updateRoleConfig('Witch', true)
      GameSetup.updateRoleConfig('Werewolf', 2)

      roleConfigStore.roleCount.should.deep.equal
        total: 7
        werewolf: 2 # 2 Werevoles
        villager: 5 # 4 Villagers + 1 Witch

  describe 'roles', ->
    it 'should update by number', ->
      GameSetup.updateRoleConfig('Werewolf', 2)

      roleConfigStore.roleSchema.should.deep.equal _.defaults(Werewolf: 2, defaultSchema)

    it 'should update by boolean', ->
      GameSetup.updateRoleConfig('Witch', true)
      roleConfigStore.roleSchema.should.deep.equal _.defaults(Witch: 1, defaultSchema)

      GameSetup.updateRoleConfig('Witch', false)
      roleConfigStore.roleSchema.should.deep.equal _.defaults(Witch: 0, defaultSchema)

    it 'should not update if invalid name provided', ->
      GameSetup.updateRoleConfig('SuperMan', 2)

      roleConfigStore.roleSchema.should.deep.equal defaultSchema

  describe 'validations', ->
    describe 'name validation', ->
      it 'return true for valid name', ->
        roleConfigStore.validateName('Witch').should.be.true

      it 'return false and raise validation error for invalid name ', ->
        roleConfigStore.validateName('SuperMan').should.be.false

        roleConfigStore.validationError.should.equal 'Invalid role name "SuperMan"'

    describe 'role count validation', ->
      it 'should check role lower boundry', ->
        GameSetup.updateRoleConfig('Werewolf', 0)

        roleConfigStore.validationError.should.equal 'You need at least 1 Werewolf to start the game.'

      it 'should check role upper boundry', ->
        GameSetup.updateRoleConfig('Witch', 5)

        roleConfigStore.validationError.should.equal 'You have more than 1 Witch, which is not allowed.'

      it 'should validate player count', ->
        GameSetup.updateRoleConfig('Witch', true)

        roleConfigStore.validationError.should.equal '6 roles enabled for 5 players'
