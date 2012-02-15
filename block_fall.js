var BlockFall = Class.extend({
    RIGHT_BOUND: 10,
    BOTTOM_BOUND: 20,

    init: function(createShape, draw) {
        this.blocks = [];
        this.fallingShape = null;
        this.frameSkipCounter = 0;
        this.lastFellAt = 0;
        this.gameOver = false;
        this.score = 0;

        this.draw = draw;
        this.createShape = createShape;
        this.collisionDetection = new CollisionDetection(this.RIGHT_BOUND, this.BOTTOM_BOUND);
        this._createFallingShape();
    },

    drawScreen: function() {
        this.draw.background();
        this.draw.nextShape(this.createShape.nextShapeDrawable());
        this.draw.shapes(this.fallingShape);

        this.draw.score(this.score);

        for (var i = 0; i < this.blocks.length; i++)
            this.draw.block(this.blocks[i]);

        this.draw.border();
    },

    update: function(speedFall) {
        this.frameSkipCounter++;

        if (!this.gameOver)
            this.process(speedFall);

        if (this.frameSkipCounter == 60)
            this.frameSkipCounter = 0;
    },

    process: function(speedFall) {
        this.fall(speedFall);

        if (this.isFallFrame() && this.frameSkipCounter != this.lastFellAt && this.isFallingShapeLocked()) {
            this.shapeHitGround();
        }
    },

    shapeHitGround: function() {
        this.breakIntoBlocks();
        this.completedLines();
        this.gameOver = this.isGameOver();
        if (!this.gameOver)
            this._createFallingShape();
    },
    
    shouldFall: function(speedFall) {
        return (this.isFallFrame() || speedFall) && !this.isFallingShapeLocked();
    },

    isFallFrame: function() {
        return (this.frameSkipCounter % 20) == 0;
    },

    _createFallingShape: function() {
        this.fallingShape = this.createShape.nextShapePlayable();
        this.createShape.createNextShape();
    },

    fall: function(speedFall) {
        if (this.shouldFall(speedFall)) {
            this.lastFellAt = this.frameSkipCounter;
            this.fallingShape.fall();
        }
    },

    isFallingShapeLocked: function() {
        return this.collisionDetection.doesBottomCollide(this.fallingShape, this.blocks);
    },

    moveRight: function() {
        if (!this.collisionDetection.doesRightCollide(this.fallingShape, this.blocks))
            this.fallingShape.moveRight();
    },

    moveLeft: function() {
        if (!this.collisionDetection.doesLeftCollide(this.fallingShape, this.blocks))
            this.fallingShape.moveLeft();
    },

    rotate: function() {
        this.fallingShape.rotate();
        if (this.collisionDetection.doesCollide(this.fallingShape, this.blocks))
            this.fallingShape.reverseRotate();
    },

    rotateCounterClockwise: function() {
        this.fallingShape.reverseRotate();
        if (this.collisionDetection.doesCollide(this.fallingShape, this.blocks))
            this.fallingShape.rotate();
    },

    completedLines: function() {
        for (var row = 1; row <= this.BOTTOM_BOUND; row++) {
            if (this.isLineComplete(row)) {
                this.removeLine(row);
                this.sinkLinesAbove(row);
                this.score += 100;
            }
        }
    },

    isLineComplete: function(row) {
        for (var column = 1; column <= this.RIGHT_BOUND; column++) {
            if (!this.blocksContain(new Block(column, row)))
                return false;
        }
        return true;
    },

    blocksContain: function(block) {
        for (var i = 0; i < this.blocks.length; i++) {
            if (this.blocks[i].isEqual(block))
                return true;
        }
        return false;
    },

    removeLine: function(row) {
        this.blocks = $.grep(this.blocks, function(block) {
            if (block.y === row)
                return false;
            return true;
        })
    },

    breakIntoBlocks: function() {
        var blocks = this.fallingShape.occupiedSquares();
        for (var i = 0; i < blocks.length; i++)
            this.blocks.push(blocks[i]);
    },

    sinkLinesAbove: function(row) {
        for (var i = row; i >= 0; i--) {
            $.each(this.blocks, function(index, block) {
                if (block.y === i)
                    block.y++;
            })
        }
    },

    isGameOver: function() {
        var found = false;
        $.each(this.fallingShape.occupiedSquares(), function(index, block) {
            if (block.y == 0)
                found = true;
        });
        return found;
    },

    hardDrop: function() {
        while (!this.isFallingShapeLocked())
            this.fall(true);
        
        this.shapeHitGround();
  
    }
});
