describe("BlockFall", function() {
    var blockFall;

    beforeEach(function() {
        blockFall = new BlockFall();
    });

    it("should have a canvas element", function() {
        expect($('#drawCanvas').length).toEqual(1);
    });

    it("should be able to create a square", function() {
        blockFall.addShape();
        expect(blockFall.shapes.length).toEqual(1);
    });

    it("should have shapes fall every 1/3 of a second", function() {
        for (var i = 0; i <= 20; i++)
            blockFall.update(false);
        expect(blockFall.shapes[0].grid.y).toEqual(2);
    });

    it("should stop blocks when they hit the ground", function() {
        blockFall.addShape(blockFall.createShape.o());
        for (var i = 0; i <= 24; i++)
            blockFall.fall(false);

        expect(blockFall.shapes[0].grid.y).toEqual(23);
    });

    it("should stop blocks when they land on other blocks", function() {
        blockFall.addShape(blockFall.createShape.o());
        for (var i = 0; i <= 25; i++)
            blockFall.fall(false);

        blockFall.addShape(blockFall.createShape.j());
        blockFall.moveRight();
        for (var i = 0; i <= 25; i++)
            blockFall.fall(false);

        expect(blockFall.shapes[1].grid.y).toEqual(22);
    });

    it("should let you move right", function() {
        blockFall.addShape(blockFall.createShape.o());
        blockFall.moveRight();
        expect(blockFall.fallingShape().grid.x).toEqual(8);
    });

    it("should not let you move right through wall", function() {
        blockFall.addShape(blockFall.createShape.o());
        for (var i = 0; i <= 20; i++)
            blockFall.moveRight();
        expect(blockFall.fallingShape().grid.x).toEqual(13);
    });

    it("should have right collision detection", function() {
        blockFall.shapes.push(new Square(new Grid(9, 1)));
        blockFall.shapes.push(new Square(new Grid(7, 1)));
        blockFall.moveRight();

        expect(blockFall.fallingShape().grid.x).toEqual(7);
    });

    it("should have left collision detection", function() {
        blockFall.shapes.push(new Square(new Grid(5, 1)));
        blockFall.shapes.push(new Square(new Grid(7, 1)));
        blockFall.moveLeft();

        expect(blockFall.fallingShape().grid.x).toEqual(7);
    });
});
