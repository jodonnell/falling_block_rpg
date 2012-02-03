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
	blockFall.drawSquare(20, 20, "red");
	expect(blockFall.context.fillRect.calledOnce).toBeTruthy();
	sinon.spy(blockFall.context.fillRect.restore());
    });

    it("draws the border", function() {
	sinon.spy(blockFall.context, "fillRect");
	blockFall.drawBorder();
	expect(blockFall.context.fillRect.callCount).toEqual(20);
	sinon.spy(blockFall.context.fillRect.restore());
    });

});
