describe("BlockFall", function() {
    var blockFall;

    beforeEach(function() {
	blockFall = new BlockFall();
    });

    it("should have a canvas element", function() {
	expect($('#drawCanvas').length).toEqual(1);
    });

    it("draw a square", function() {
	sinon.spy(blockFall.context, "fillRect");
	blockFall.drawSquare();
	expect(blockFall.context.fillRect.calledOnce).toBeTruthy();
    });
});
