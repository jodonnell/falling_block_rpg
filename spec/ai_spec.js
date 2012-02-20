describe("AI", function() {
    var ai;
    var blockFall;

    beforeEach(function() {
        blockFall = new BlockFall(new CreateShape(true));
        ai = new AI(blockFall);
    });

    it("should start by dropping rotated j against left wall", function() {
        expect(ai.isMovingLeft()).toBeTruthy();
    });

    it("first move should be far left corner", function() {
        expect(ai.getOptimalSpot()).toContainBlocks([new Block(1, 19), new Block(2, 19), new Block(3, 19), new Block(1, 18)]);
    });

});
