describe("Speed", function() {
    it("should run under 100 ms per frame", function() {
        var gameInit = new GameInit(true);
        var control = new Control();
        var arenas = new Arenas(gameInit.RIGHT_BOUND, gameInit.BOTTOM_BOUND, control);

        for (var i = 0; i < 300; i++)
            expect(arenas.updateWithTime()).toBeLessThan(17);
    });
});