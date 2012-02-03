describe("BlockFall", function() {
    var blockFall;

    beforeEach(function() {
	blockFall = new BlockFall();
    });

    it("should have a canvas element", function() {
	expect($('#drawCanvas').length).toEqual(1);
    });

    it("can draw the background", function() {
	sinon.spy(blockFall.context, "fillRect");
	blockFall.drawBackground();
	expect(blockFall.context.fillRect.calledOnce).toBeTruthy();
	sinon.spy(blockFall.context.fillRect.restore());
    });

    it("draw a block", function() {
	sinon.spy(blockFall.context, "fillRect");
	blockFall.drawBlock(new Grid(1, 1), "red");
	expect(blockFall.context.fillRect.calledOnce).toBeTruthy();
	sinon.spy(blockFall.context.fillRect.restore());
    });

    it("draws the border", function() {
	sinon.spy(blockFall.context, "fillRect");
	blockFall.drawBorder();
	expect(blockFall.context.fillRect.callCount).toEqual(80);
	sinon.spy(blockFall.context.fillRect.restore());
    });

    it("draw a square", function() {
	sinon.spy(blockFall.context, "fillRect");
	blockFall.drawSquare(2, 2);
	expect(blockFall.context.fillRect.callCount).toEqual(4);
	sinon.spy(blockFall.context.fillRect.restore());
    });

});
