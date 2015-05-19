describe 'GameEngine', ->
  _ = require('lodash')
  GameEngine = require(sourceRoot.stores('GameEngine')).GameEngine
  GamePlay = require(sourceRoot.actions('GamePlay'))
  Roles = require(sourceRoot.models('roles'))
  { Uncertain } = Roles

  gameEngine = null

  populateIterator = (iterator) ->
    result = []

    until current?.done
      current = iterator.next()
      result.push current.value unless current.done

    result

  beforeEach ->
    gameEngine = new GameEngine({})
    gameEngine.initGame
      players: ({name: "Player #{i}", seat: "Seat #{i}"} for i in [1..9])
      roleSchema:
        Werewolf: 2,
        Villager: 1,
        Cupido: 1,
        Hunter: 1,
        Idiot: 1,
        Guardian: 1,
        Seer: 1,
        Witch: 1

  afterEach ->
    gameEngine.dispose()

  describe 'initialization', ->
    it 'should create players', ->
      gameEngine.players.should.have.length 9
      gameEngine.players.forEach (player) ->
        player.should.be.an.instanceOf Uncertain
        player.name.should.be.a 'string'
        player.seat.should.be.a 'string'
        player.alive.should.be.true

    it 'should prepare unassigned roles', ->
      gameEngine.unassignedRoles.should.deep.equal
        Werewolf: 2,
        Villager: 1,
        Cupido: 1,
        Hunter: 1,
        Idiot: 1,
        Guardian: 1,
        Seer: 1,
        Witch: 1

  describe 'game rules', ->

    it 'should iterate through phases', ->
      phases = populateIterator gameEngine.turnPhaseGenerator()
      phases.map((p)->p.name).should.have.members [
        'SunRisePhase'
        'Cupido'
        'Guardian'
        'Werewolf'
        'Witch'
        'Seer'
        'SunSetPhase'
        'VotePhase'
      ]
