describe 'PlayerStore', ->
  PlayerStore = require(sourceRoot.stores('PlayerStore'))
  GameSetup = require(sourceRoot.actions('GameSetup'))

  describe 'expected player count', ->
    it 'should default to 5', ->
      PlayerStore.expectedPlayerCount.should.equal 5

    it 'should update', ->
      GameSetup.updatePlayerCount(10)
      PlayerStore.expectedPlayerCount.should.equal 10
