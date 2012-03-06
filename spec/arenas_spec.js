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

    it("should let you move right", sinon.test(function() {
        var control = new Control();
        this.stub(control, 'isMovingRight').returns(true);
        arenas = new Arenas(10, 20, control);

        arenas.update();
        expect(arenas.playerArena.fallingShape.block.x).toEqual(6);
    }));

    it("should be able to detect a game over", function() {
        arenas.playerArena.gameOver = true;
        arenas.update();
        expect(arenas.gameOver).toBeTruthy();

        arenas.playerArena.gameOver = false;
        arenas.enemyArena.gameOver = true;
        arenas.update();
        expect(arenas.gameOver).toBeTruthy();
    });

});
