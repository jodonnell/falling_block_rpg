var BlockFall = Class.extend({
    RIGHT_BOUND: 10,
    BOTTOM_BOUND: 20,

    init: function(createShape, draw, combatant) {
        this.blocks = [];
        this.fallingShape = null;
        this.frameSkipCounter = 0;
        this.lastFellAt = 0;
        this.gameOver = false;
        this.damageDone = 0;

        this.draw = draw;
        this.createShape = createShape;
        this.combatant = combatant;
        this.collisionDetection = new CollisionDetection(this.RIGHT_BOUND, this.BOTTOM_BOUND);
        this._createFallingShape();
    },

    drawScreen: function() {
        this.draw.background();
        this.draw.nextShape(this.createShape.nextShapeDrawable());
        this.draw.shapes(this.fallingShape);

        this.draw.score(this.combatant.hp);
        for (var i = 0; i < this.blocks.length; i++)
            this.draw.block(this.blocks[i]);

        this.draw.border();
    },

    update: function(speedFall) {
        this.frameSkipCounter++;

        if (!this.gameOver)
            this.process(speedFall);

        if (this.frameSkipCounter == 400)
            this.frameSkipCounter = 0;
    },

    process: function(speedFall) {
        if (this.shouldFall(speedFall))
            this.fall();

        if (this.didShapeHitGround())
            this.shapeHitGround();
    },

    didShapeHitGround: function() {
        return this.isFallFrame() && this.frameSkipCounter != this.lastFellAt && this.isFallingShapeLocked();
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
        return (this.frameSkipCounter % 40) == 0;
    },

    _createFallingShape: function() {
        this.fallingShape = this.createShape.nextShapePlayable();
        this.createShape.createNextShape();
    },

    fall: function() {
        this.lastFellAt = this.frameSkipCounter;
        this.fallingShape.fall();
    },

    isFallingShapeLocked: function() {
        return this.collisionDetection.doesBottomCollide(this.fallingShape, this.blocks);
    },

    moveRight: function() {
        if (this.canMoveRight())
            this.fallingShape.moveRight();
    },

    canMoveRight: function() {
        return !this.collisionDetection.doesRightCollide(this.fallingShape, this.blocks);
    },

    moveLeft: function() {
        if (this.canMoveLeft())
            this.fallingShape.moveLeft();
    },

    canMoveLeft: function() {
        return !this.collisionDetection.doesLeftCollide(this.fallingShape, this.blocks);
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
                this.damageDone += 1;
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
            this.addBlock(blocks[i]);
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
        this._fallAsFarAsPossible();
        this.shapeHitGround();
    },

    _fallAsFarAsPossible: function() {
        while (!this.isFallingShapeLocked())
            this.fall();
    },

    howManyTouches: function() {
        return this.collisionDetection.doesLeftCollide(this.fallingShape, this.blocks) + this.collisionDetection.doesRightCollide(this.fallingShape, this.blocks) + this.collisionDetection.doesBottomCollide(this.fallingShape, this.blocks);
    },

    howManyHolesUnderneath: function() {
        return this.collisionDetection.doesBottomHaveHoles(this.fallingShape, this.blocks);;
    },
    
    addBlock: function(block) {
        this.blocks.push(block)
    },

    addJunkRows: function(rows) {
        for (var i = 0; i < rows; i++) {
            this.moveBlocksUp();
            this.addJunkRow();
        }
    },

    addJunkRow: function() {
        var colors = ['white', 'blue', 'green', 'orange', 'magenta', 'brown', 'red'];

        var numJunkToCreate = this._getRandomInt(6, 8);
        var elements = this._shuffle([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
        for (var i = 0; i < numJunkToCreate; i++) {
            var color = colors[this._getRandomInt(0, colors.length)];
            this.addBlock(new Block(elements[i], 20, color));            
        }
    },

    moveBlocksUp: function() {
        for (var i = 0; i < this.blocks.length; i++) {
            this.blocks[i] = this.blocks[i].top();
        }
    },

    _getRandomInt: function (min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    },

    _shuffle: function(array) {
        var tmp, current, top = array.length;

        if(top) while(--top) {
            current = Math.floor(Math.random() * (top + 1));
            tmp = array[current];
            array[current] = array[top];
            array[top] = tmp;
        }

        return array;
    }
});
