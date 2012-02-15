describe("Arenas", function() {
    var arenas;
    var gameInit;

    beforeEach(function() {
        gameInit = new GameInit(true);
        arenas = new Arenas(10, 20, new Control());
    });

    afterEach(function() {
        gameInit.destroyCanvas();
    });

    it("should have 2 arenas", function() {
        expect(arenas.playerArena).toBeTruthy();
        expect(arenas.enemyArena).toBeTruthy();
    });

    it("should let you move right", function() {
        var control = new Control();
        var stub = sinon.stub(control, 'isMovingRight').returns(true);
        arenas = new Arenas(10, 20, control);

        arenas.update();
        expect(arenas.playerArena.fallingShape.block.x).toEqual(6);

        stub.restore();
    });

});
