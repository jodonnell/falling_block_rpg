describe("GameController", function() {
    var gameController;
    var gameInit;

    beforeEach(function() {
        gameInit = new GameInit(true);
        gameController = new GameController(gameInit);
    });

    afterEach(function() {
        gameInit.destroyCanvas();
    });


});
