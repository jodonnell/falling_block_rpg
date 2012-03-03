describe("WorldMap", function() {
    var worldMap;
    var gameInit;

    beforeEach(function() {
        gameInit = new GameInit(true);
        worldMap = new WorldMap();
    });

    afterEach(function() {
        gameInit.destroyCanvas();
    });

    it("should have 2 arenas", function() {

    });

});
