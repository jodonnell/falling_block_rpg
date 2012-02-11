describe("BlockFall", function() {
    var blockFall;

    beforeEach(function() {
        this.addMatchers({
            toContainBlock: function(expected) {
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
        expect(blockFall.fallingShape.block.y).toNotEqual(1);
    });

    it("update should work", function() {
        for (var i = 0; i <= 1000; i++)
            blockFall.update(false);
        expect(blockFall.blocks.length).toNotEqual(0);
    });

    it("should stop blocks when they hit the ground", function() {
        blockFall.fallingShape = blockFall.createShape.o();
        for (var i = 0; i <= 24; i++)
            blockFall.fall(false);

        expect(blockFall.fallingShape.block.y).toEqual(19);
    });

    it("should stop shapes when they land on other blocks", function() {
        blockFall.blocks = [new Block(5, 19)];

        blockFall.fallingShape = blockFall.createShape.j();

        blockFall.moveRight();
        for (var i = 0; i <= 25; i++)
            blockFall.fall(false);

        expect(blockFall.fallingShape.block.y).toEqual(18);
    });

    it("should let you move right", function() {
        blockFall.fallingShape = blockFall.createShape.o();
        blockFall.moveRight();
        expect(blockFall.fallingShape.block.x).toEqual(6);
    });

    it("should not let you move right through another object", function() {
        blockFall.blocks = [new Block(7, 1)];
        blockFall.fallingShape = blockFall.createShape.o();
        blockFall.moveRight();
        expect(blockFall.fallingShape.block.x).toEqual(5);
    });

    it("should not let you move left through another object", function() {
        blockFall.blocks = [new Block(4, 1)];
        blockFall.fallingShape = blockFall.createShape.o();
        blockFall.moveLeft();
        expect(blockFall.fallingShape.block.x).toEqual(5);
    });

    it("should not let you move right through wall", function() {
        blockFall.fallingShape = blockFall.createShape.o();
        for (var i = 0; i <= 15; i++)
            blockFall.moveRight();
        expect(blockFall.fallingShape.block.x).toEqual(9);
    });

    it("should be able to remove completed lines", function() {
        for (var i = 1; i <= blockFall.RIGHT_BOUND; i++)
            blockFall.blocks.push(new Block(i, 1))

        expect(blockFall.isLineComplete(1)).toBeTruthy();
        blockFall.completedLines();
        expect(blockFall.blocks.length).toEqual(0);
    });

    it("blocksContain", function() {
        for (var i = 1; i <= blockFall.RIGHT_BOUND; i++)
            blockFall.blocks.push(new Block(i, 1))

        expect(blockFall.blocksContain(new Block(10, 1))).toBeTruthy();
    });

    it("should sink down above when you complete a line", function() {
        for (var i = 1; i <= blockFall.RIGHT_BOUND; i++)
            blockFall.blocks.push(new Block(i, 20))

        for (var i = 1; i <= blockFall.RIGHT_BOUND - 3; i++)
            blockFall.blocks.push(new Block(i, 19))

        blockFall.completedLines();
        expect(blockFall.blocks[0].y).toEqual(20);
    });

    it("should not let you rotate through a wall", function() {
        blockFall.fallingShape = new J(new Block(9, 1));
        blockFall.rotate();
        blockFall.moveRight();
        blockFall.rotate();
        expect(blockFall.fallingShape.rotatedPosition).toEqual(1);
    });

    it("should not let you rotate through another peice", function() {
        blockFall.blocks = [new Block(5, 19), new Block(5, 18), new Block(5, 17), new Block(5, 16)];
        blockFall.fallingShape = new T(new Block(6, 18));
        blockFall.fallingShape.rotatedPosition = 1;
        blockFall.rotate();
        expect(blockFall.fallingShape.rotatedPosition).toEqual(1);
    });

    it("should be able to detect game over", function() {
        for (var i = 0; i <= 400; i++)
            blockFall.update(true);
        expect(blockFall.gameOver).toBeTruthy();
    });

    it("should keep score", function() {
        for (var i = 1; i <= blockFall.RIGHT_BOUND; i++)
            blockFall.blocks.push(new Block(i, 1))

        blockFall.completedLines();
        expect(blockFall.score).toEqual(100);
    });

    function drawMock() {
        return {
            background: function() {},
            border: function() {},
            nextShape: function() {},
            shapes: function() {},
            score: function() {},
            block: function() {}
        };
    };

    it("should draw the next shape", function() {
        var dMock = drawMock();
        var mock = sinon.mock(dMock).expects("nextShape");
        blockFall.draw = dMock;
        blockFall._createFallingShape();
        blockFall.drawScreen();
        mock.verify();
    });

    it("the next block should be the next block", function() {
        blockFall.update(true);
        var nextShape = blockFall.createShape.nextShape;
        
        for (var i = 0; i < 20; i++)
            blockFall.update(true);

        expect(blockFall.fallingShape.color).toEqual(nextShape.color);
    });

});
