describe("BlockFall", function() {
    var blockFall;

    beforeEach(function() {
	blockFall = new BlockFall();
    });

    it("should have a canvas element", function() {
	expect($('#drawCanvas').length).toEqual(1);
    });

    it("should be able to create a square", function() {
	blockFall.createSquare();
	expect(blockFall.shapes.length).toEqual(2);
    });

    it("should have shapes fall every 1/3 of a second", function() {
	for (var i = 0; i <= 20; i++)
	    blockFall.update();	    
	expect(blockFall.shapes[0].grid.y).toEqual(2);
    });

    it("shold stop blocks when they hit the ground", function() {
	for (var i = 0; i <= 40; i++)
	    blockFall.fall();

	expect(blockFall.shapes[0].grid.y).toEqual(23);
    });


    describe("drawing operations", function() {
	beforeEach(function() {
	    sinon.spy(blockFall.context, "fillRect");
	});

	afterEach(function() {
	    sinon.spy(blockFall.context.fillRect.restore());
	});

	it("can draw the background", function() {
	    blockFall.drawBackground();
	    expect(blockFall.context.fillRect.calledOnce).toBeTruthy();
	});

	it("draw a block", function() {
	    blockFall.drawBlock(new Grid(1, 1), "red");
	    expect(blockFall.context.fillRect.calledOnce).toBeTruthy();
	});

	it("draws the border", function() {
	    blockFall.drawBorder();
	    expect(blockFall.context.fillRect.callCount).toEqual(80);
	});

	it("draw a square", function() {
	    blockFall.createSquare();
	    blockFall.drawShapes();
	    expect(blockFall.context.fillRect.callCount).toEqual(4);
	});
    });
});
