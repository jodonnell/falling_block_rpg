var BlockFall = Class.extend({
    RIGHT_BOUND: 10,
    BOTTOM_BOUND: 20,

    init: function() {
        this.createCanvas();
        this.blocks = [];
        this.fallingShape = null;
        this.frameSkipCounter = 0;
        this.lastFellAt = 0;

        this.draw = new Draw(this.RIGHT_BOUND, this.BOTTOM_BOUND);
        this.createShape = new CreateShape();
        this.collisionDetection = new CollisionDetection(this.RIGHT_BOUND, this.BOTTOM_BOUND);
    },

    createCanvas: function() {
        var width = $(document).width();
        var height = $(document).height();

        var canvas = '<canvas id="drawCanvas" width="' + width + '" height="' + height + '"></canvas>';
        $('body').append(canvas);
        $("#drawCanvas").css('position', 'absolute');
        $("#drawCanvas").css('top', '0px');
        $("#drawCanvas").css('left', '0px');
    },

    drawScreen: function() {
        this.draw.background();
        this.draw.border();
        if (this.fallingShape)
            this.draw.shapes(this.fallingShape);

        for (var i = 0; i < this.blocks.length; i++)
            this.draw.block(this.blocks[i]);
    },

    update: function(speedFall) {
        this.frameSkipCounter++;

        this.process(speedFall);

        if (this.frameSkipCounter == 60)
            this.frameSkipCounter = 0;
    },

    process: function(speedFall) {
        if (!this.fallingShape)
            this.fallingShape = this.createShape.randomShape();

        this.fall(speedFall);

        if (this.isFallFrame() && this.frameSkipCounter != this.lastFellAt && this.isFallingShapeLocked()) {
            this.breakIntoBlocks();
            this.completedLines();
            this.fallingShape = this.createShape.randomShape();
        }
    },

    shouldFall: function(speedFall) {
        return (this.isFallFrame() || speedFall) && !this.isFallingShapeLocked();
    },

    isFallFrame: function() {
        return (this.frameSkipCounter % 20) == 0;
    },

    fall: function(speedFall) {
        if (this.shouldFall(speedFall)) {
            this.lastFellAt = this.frameSkipCounter;
            this.fallingShape.fall();
        }
    },

    isFallingShapeLocked: function() {
        return this.collisionDetection.isAtBottom(this.fallingShape) || this.collisionDetection.doesBottomCollide(this.fallingShape, this.blocks);
    },

    moveRight: function() {
        if (!this.collisionDetection.doesRightCollide(this.fallingShape, this.blocks) && !this.collisionDetection.isAtRightBound(this.fallingShape))
            this.fallingShape.moveRight();
    },

    moveLeft: function() {
        if (!this.collisionDetection.doesLeftCollide(this.fallingShape, this.blocks) && !this.collisionDetection.isAtLeftBound(this.fallingShape))
            this.fallingShape.moveLeft();
    },

    rotate: function() {
        this.fallingShape.rotate();
    },

    completedLines: function() {
        for (var row = 1; row <= this.BOTTOM_BOUND; row++) {
            if (this.isLineComplete(row)) {
                this.removeLine(row);
                this.sinkLinesAbove(row);
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
    }
});
