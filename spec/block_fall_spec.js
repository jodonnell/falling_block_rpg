describe("BlockFall", function() {
    var blockFall;

    beforeEach(function() {
        this.addMatchers({
            toContainGrid: function(expected) {
                for (var i = 0; i < this.actual.length; i++) {
                    if (this.actual[i].isEqual(expected))
                        return true;
                }
                return false;
            }
        });

        blockFall = new BlockFall();
    });

    it("should have a canvas element", function() {
        expect($('#drawCanvas').length).toEqual(1);
    });

    it("should be able to create a o", function() {
        blockFall.addShape();
        expect(blockFall.shapes.length).toEqual(1);
    });

    it("should have shapes fall every 1/3 of a second", function() {
        for (var i = 0; i <= 20; i++)
            blockFall.update(false);
        expect(blockFall.shapes[0].grid.y).toEqual(2);
    });

    it("update should work", function() {
        for (var i = 0; i <= 1000; i++)
            blockFall.update(false);
        expect(blockFall.blocks).toContainGrid(new Grid(7, 23));
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

        blockFall.breakIntoBlocks();
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

    it("should not let you move right through another object", function() {
        blockFall.addShape(new O(new Grid(9, 1)));
        blockFall.breakIntoBlocks();
        blockFall.addShape(blockFall.createShape.o());
        blockFall.moveRight();
        expect(blockFall.fallingShape().grid.x).toEqual(7);
    });

    it("should not let you move left through another object", function() {
        blockFall.addShape(new O(new Grid(5, 1)));
        blockFall.breakIntoBlocks();
        blockFall.addShape(blockFall.createShape.o());
        blockFall.moveLeft();
        expect(blockFall.fallingShape().grid.x).toEqual(7);
    });

    it("should not let you move right through wall", function() {
        blockFall.addShape(blockFall.createShape.o());
        for (var i = 0; i <= 20; i++)
            blockFall.moveRight();
        expect(blockFall.fallingShape().grid.x).toEqual(13);
    });

    it("should have a falling shape", function() {
        var lastShape = new O(new Grid(7, 1));
        blockFall.addShape(new O(new Grid(5, 1)));
        blockFall.addShape(lastShape);

        expect(blockFall.fallingShape()).toEqual(lastShape);
    });

    it("should have some locked shapes", function() {
        var firstShape = new O(new Grid(5, 1));
        blockFall.addShape(firstShape);
        blockFall.addShape(new O(new Grid(7, 1)));

        expect(blockFall.lockedShapes()).toEqual([firstShape]);
    });

    it("should be able to remove completed lines", function() {
        blockFall.addShape(new O(new Grid(1, 1)));
        blockFall.addShape(new O(new Grid(3, 1)));
        blockFall.addShape(new O(new Grid(5, 1)));
        blockFall.addShape(new O(new Grid(7, 1)));
        blockFall.addShape(new O(new Grid(9, 1)));
        blockFall.addShape(new O(new Grid(11, 1)));
        blockFall.addShape(new O(new Grid(13, 1)));
        blockFall.completedLines();
//        expect(blockFall.shapes.length).toEqual(0);
    });
});
