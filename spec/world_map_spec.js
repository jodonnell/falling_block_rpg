describe("WorldMap", function() {
    var worldMap;
    var gameInit;

    beforeEach(function() {
        gameInit = new GameInit(true);
        worldMap = new WorldMap(window.Images);
        sinon.spy(worldMap.context, "drawImage");
    });

    afterEach(function() {
        sinon.spy(worldMap.context.drawImage.restore());
        //gameInit.destroyCanvas();
    });

    it("should draw an image", function() {
        worldMap.draw();
        expect(worldMap.context.drawImage.callCount).toEqual(300);
    });

});
