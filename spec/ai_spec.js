describe("Arenas", function() {
    var ai;
    var blockFall;

    beforeEach(function() {
        blockFall = new BlockFall(new CreateShape(true));
        ai = new AI(blockFall);
    });

    it("should start by dropping the first peice in the center", function() {
        expect(ai.isHardDropping()).toBeTruthy();
    });

});
