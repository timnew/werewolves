describe 'PlayerStore', ->
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
      GameSetup.addPlayer name: 'Tim', seat: 1
      GameSetup.addPlayer name: 'Dylan', seat: 2
      GameSetup.addPlayer name: 'Crab', seat: 3
      GameSetup.addPlayer name: 'SemiCircle', seat: 4

      playerStore.players.should.deep.have.members [
          { name: 'Tim', seat:1 }
          { name: 'Dylan', seat: 2 }
          { name: 'Crab', seat: 3 }
          { name: 'SemiCircle', seat: 4 }
        ]

    it 'should remove', ->
      GameSetup.addPlayer name: 'Tim', seat: 1
      GameSetup.addPlayer name: 'Dylan', seat: 2
      GameSetup.addPlayer name: 'Crab', seat: 3
      GameSetup.addPlayer name: 'SemiCircle', seat: 4

      playerStore.players.should.have.length 4

      GameSetup.removePlayer 1

      playerStore.players.length.should.equal 3

      playerStore.players.should.deep.have.members [
          { name: 'Tim', seat:1 }
          { name: 'Crab', seat: 3 }
          { name: 'SemiCircle', seat: 4 }
        ]

    it 'should update', ->
      GameSetup.addPlayer name: 'Tim', seat: 1
      GameSetup.addPlayer name: 'Dylan', seat: 2
      GameSetup.addPlayer name: 'Crab', seat: 3
      GameSetup.addPlayer name: 'SemiCircle', seat: 4

      GameSetup.updatePlayer 1, name: 'Dalu', seat: 2

      playerStore.players.should.deep.have.members [
          { name: 'Tim', seat:1 }
          { name: 'Dalu', seat: 2 }
          { name: 'Crab', seat: 3 }
          { name: 'SemiCircle', seat: 4 }
        ]

    it 'should remove all', ->
      GameSetup.addPlayer name: 'Tim', seat: 1
      GameSetup.addPlayer name: 'Dylan', seat: 2
      GameSetup.addPlayer name: 'Crab', seat: 3
      GameSetup.addPlayer name: 'SemiCircle', seat: 4

      GameSetup.removeAllPlayers()

      playerStore.players.should.have.length 0

  describe 'validation', ->
    beforeEach ->
      GameSetup.addPlayer name: 'Tim', seat: 1
      GameSetup.addPlayer name: 'Dylan', seat: 2
      GameSetup.addPlayer name: 'Crab', seat: 3
      GameSetup.addPlayer name: 'SemiCircle', seat: 4
      GameSetup.addPlayer name: '007', seat: 5

    it 'should be valid by default', ->
      new PlayerStore({}).isValid.should.be.true

    it 'should check expected player count less less then 5', ->
      GameSetup.updatePlayerCount 3
      playerStore.validationError.should.equal 'At least 5 players'

    it 'should check player count', ->
      GameSetup.removePlayer 0
      playerStore.validationError.should.equal 'Expected 5 players, but got 4'

    it 'should check player name', ->
      GameSetup.updatePlayer 1, { name: '', seat: 2 }
      playerStore.validationError.should.equal 'Player name is empty'

    it 'should check player name', ->
      GameSetup.updatePlayer 1, { name: 'Dylan', seat: null }
      playerStore.validationError.should.equal 'Player seat is empty'

    it 'should check duplicate name', ->
      GameSetup.updatePlayer 1, { name: 'Tim', seat: 2 }
      playerStore.validationError.should.equal 'Duplicate player name'

    it 'should check duplicate seat', ->
      GameSetup.updatePlayer 1, { name: 'Dylan', seat: 1 }
      playerStore.validationError.should.equal 'Duplicate player seat'
