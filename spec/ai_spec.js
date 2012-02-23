describe("AI", function() {
    var ai;
    var blockFall;

    beforeEach(function() {
        blockFall = new BlockFall(new CreateShape(true));
        ai = new AI(blockFall);
    });

    it("should start by dropping rotated j against left wall", function() {
        ai.getOptimalSpot();
        expect(ai.isMovingLeft()).toBeTruthy();
    });

    it("first move should be far left corner", function() {
        ai.getOptimalSpot();
        expect(ai.optimalSpot).blockEqual(new Block(2, 20));
        expect(ai.rotation).toEqual(2);
    });

    it("should test every position", function() {
        blockFall.fallingShape = blockFall.createShape.j();
        sinon.spy(ai, "calculateScore");

        ai.getOptimalSpot();
        expect(ai.calculateScore.callCount).toEqual((4 * 8) + 2);

        ai.calculateScore.restore();
    });

});
