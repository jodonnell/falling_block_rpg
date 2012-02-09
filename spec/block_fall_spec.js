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

    it("should have shapes fall every 1/3 of a second", function() {
        for (var i = 0; i <= 20; i++)
            blockFall.update(false);
        expect(blockFall.fallingShape.grid.y).toEqual(2);
    });

    it("update should work", function() {
        for (var i = 0; i <= 1000; i++)
            blockFall.update(false);
        expect(blockFall.blocks).toContainGrid(new Grid(7, 23));
    });

    it("should stop blocks when they hit the ground", function() {
        blockFall.fallingShape = blockFall.createShape.o();
        for (var i = 0; i <= 24; i++)
            blockFall.fall(false);

        expect(blockFall.fallingShape.grid.y).toEqual(23);
    });

    it("should stop shapes when they land on other blocks", function() {
        blockFall.blocks = [new Grid(7, 23)];

        blockFall.fallingShape = blockFall.createShape.j();

        blockFall.moveRight();
        for (var i = 0; i <= 25; i++)
            blockFall.fall(false);

        expect(blockFall.fallingShape.grid.y).toEqual(22);
    });

    it("should let you move right", function() {
        blockFall.fallingShape = blockFall.createShape.o();
        blockFall.moveRight();
        expect(blockFall.fallingShape.grid.x).toEqual(8);
    });

    it("should not let you move right through another object", function() {
        blockFall.blocks = [new Grid(9, 1)];
        blockFall.fallingShape = blockFall.createShape.o();
        blockFall.moveRight();
        expect(blockFall.fallingShape.grid.x).toEqual(7);
    });

    it("should not let you move left through another object", function() {
        blockFall.blocks = [new Grid(6, 1)];
        blockFall.fallingShape = blockFall.createShape.o();
        blockFall.moveLeft();
        expect(blockFall.fallingShape.grid.x).toEqual(7);
    });

    it("should not let you move right through wall", function() {
        blockFall.fallingShape = blockFall.createShape.o();
        for (var i = 0; i <= 20; i++)
            blockFall.moveRight();
        expect(blockFall.fallingShape.grid.x).toEqual(13);
    });

    it("should be able to remove completed lines", function() {
        blockFall.blocks = [new Grid(1, 1),
                            new Grid(2, 1),
                            new Grid(3, 1),
                            new Grid(4, 1),
                            new Grid(5, 1),
                            new Grid(6, 1),
                            new Grid(7, 1),
                            new Grid(8, 1),
                            new Grid(9, 1),
                            new Grid(10, 1),
                            new Grid(11, 1),
                            new Grid(12, 1),
                            new Grid(13, 1),
                            new Grid(14, 1)
                           ];
        blockFall.completedLines();
//        expect(blockFall.shapes.length).toEqual(0);
    });
});
