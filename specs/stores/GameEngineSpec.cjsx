describe 'GameEngine', ->
  GameEngine = require(sourceRoot.stores('GameEngine')).GameEngine
  GamePlay = require(sourceRoot.actions('GamePlay'))
  Roles = require(sourceRoot.models('roles'))
  {UncertainRole} = Roles

  gameEngine = null

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
        player.should.be.an.instanceOf UncertainRole
        player.name.should.be.a 'string'
        player.seat.should.be.a 'string'
        player.alive.should.be.true

    it 'should create night sequence', ->
      gameEngine.nightSequence.should.have.length 5
      gameEngine.nightSequence.map((r)->r.name).should.deep.equal [ 'Cupido', 'Guardian', 'Werewolf', 'Witch', 'Seer' ]

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

  describe '', ->
    
