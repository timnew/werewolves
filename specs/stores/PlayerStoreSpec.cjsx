xdescribe 'PlayerStore', ->
  PlayerStore = require(sourceRoot.stores('PlayerStore')).PlayerStore
  GameSetup = require(sourceRoot.actions('GameSetup'))

  playerStore = null

  beforeEach ->
    playerStore = new PlayerStore({})

  afterEach ->
    playerStore.dispose()

  describe 'expected player count', ->
    it 'should default to 5', ->
      playerStore.expectedPlayerCount.should.equal 5

    it 'should update', ->
      GameSetup.updatePlayerCount(10)
      playerStore.expectedPlayerCount.should.equal 10

  describe 'players', ->
    it 'should add', ->
      GameSetup.addPlayer name: 'Tim'
      GameSetup.addPlayer name: 'Dylan'
      GameSetup.addPlayer name: 'Crab'
      GameSetup.addPlayer name: 'SemiCircle'

      playerStore.players.should.deep.have.members [
          { name: 'Tim' }
          { name: 'Dylan' }
          { name: 'Crab' }
          { name: 'SemiCircle' }
        ]

    it 'should remove', ->
      GameSetup.addPlayer name: 'Tim'
      GameSetup.addPlayer name: 'Dylan'
      GameSetup.addPlayer name: 'Crab'
      GameSetup.addPlayer name: 'SemiCircle'

      playerStore.players.should.have.length 4

      GameSetup.removePlayer 1

      playerStore.players.length.should.equal 3

      playerStore.players.should.deep.have.members [
          { name: 'Tim' }
          { name: 'Crab' }
          { name: 'SemiCircle' }
        ]

    it 'should update', ->
      GameSetup.addPlayer name: 'Tim'
      GameSetup.addPlayer name: 'Dylan'
      GameSetup.addPlayer name: 'Crab'
      GameSetup.addPlayer name: 'SemiCircle'

      GameSetup.updatePlayer 1, name: 'Dalu'

      playerStore.players.should.deep.have.members [
          { name: 'Tim' }
          { name: 'Dalu' }
          { name: 'Crab' }
          { name: 'SemiCircle' }
        ]

    it 'should remove all', ->
      GameSetup.addPlayer name: 'Tim'
      GameSetup.addPlayer name: 'Dylan'
      GameSetup.addPlayer name: 'Crab'
      GameSetup.addPlayer name: 'SemiCircle'

      GameSetup.removeAllPlayers()

      playerStore.players.should.have.length 0

  describe 'player count limit', ->

    it 'should not limit player count when it is in the range', ->
      GameSetup.updatePlayerCount 7
      playerStore.canDecreasePlayer.should.be.true

    it 'should limit down when player count is equal to lower boundry', ->
      GameSetup.updatePlayerCount 5
      playerStore.canDecreasePlayer.should.be.false

    it 'should limit down when player count smaller than lower boundry', ->
      GameSetup.updatePlayerCount 4
      playerStore.canDecreasePlayer.should.be.false

  describe 'validation', ->
    beforeEach ->
      GameSetup.addPlayer name: 'Tim'
      GameSetup.addPlayer name: 'Dylan'
      GameSetup.addPlayer name: 'Crab'
      GameSetup.addPlayer name: 'SemiCircle'
      GameSetup.addPlayer name: '007'

    it 'should be invalid by default', ->
      new PlayerStore({}).isValid.should.be.false

    it 'should check expected player count less less then 5', ->
      GameSetup.updatePlayerCount 3
      playerStore.validationError.should.equal 'At least 5 players'

    it 'should check player count', ->
      GameSetup.removePlayer 0
      playerStore.validationError.should.equal 'Expected 5 players, but got 4'

    it 'should check player name', ->
      GameSetup.updatePlayer 1, { name: '' }
      playerStore.validationError.should.equal 'Player name is empty'

    it 'should check duplicate name', ->
      GameSetup.updatePlayer 1, { name: 'Tim' }
      playerStore.validationError.should.equal 'Duplicate player name'
