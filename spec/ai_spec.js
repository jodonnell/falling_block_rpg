describe("AI", function() {
    var ai;
    var blockFall;

    beforeEach(function() {
        blockFall = new BlockFall(new CreateShape(true));
        ai = new AI(blockFall);
        ai.calcOptimalSpot();
    });

    it("should start by dropping rotated j against left wall", function() {
        expect(ai.isMovingLeft()).toBeTruthy();
    });

    it("first move should be far left corner", function() {
        expect(ai.bestMove).blockEqual(new Block(2, 20));
        expect(ai.rotation).toEqual(2);
    });

});
