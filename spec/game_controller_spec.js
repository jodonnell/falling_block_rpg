describe("GameController", function() {
    var gameController;
    var gameInit;

    beforeEach(function() {
        gameInit = new GameInit(true);
        gameController = new GameController(new Control());
    });

    afterEach(function() {
        gameInit.destroyCanvas();
    });

    it("should default to the world map", sinon.test(function() {
        this.spy(gameController.worldMap, 'update');
        gameController.update();
        expect(gameController.worldMap.update.calledOnce).toEqual(true);
    }));

    it("should be able to switch to battle", sinon.test(function() {
        this.spy(gameController.arenas, 'update');
        gameController.worldMap.isBattleTime = true;
        gameController.update();
        expect(gameController.arenas.update.calledOnce).toEqual(true);
    }));

    it("should clear the screen on transition", sinon.test(function() {
        this.spy(gameController, 'clearScreen');
        gameController.worldMap.isBattleTime = true;
        gameController.update();
        expect(gameController.clearScreen.calledOnce).toEqual(true);
    }));

    it("should reset arena after a transition out", sinon.test(function() {
        this.spy(gameController, 'resetArena');
        gameController.worldMap.isWorldMapScene = false;
        gameController.arenas.gameOver = true;
        gameController.update();
        expect(gameController.resetArena.calledOnce).toEqual(true);
    }));

    it("should reset arena after a transition out", sinon.test(function() {
        this.spy(gameController, 'resetArena');
        this.spy(gameController.hero, 'addXp');
        gameController.worldMap.isWorldMapScene = false;
        gameController.arenas.gameOver = true;
        gameController.update();
        expect(gameController.hero.addXp.calledOnce).toEqual(true);
    }));

});
