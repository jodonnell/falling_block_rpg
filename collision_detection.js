var CollisionDetection = Class.extend({
    init: function(rightBound, bottomBound) {
        this.rightBound = rightBound;
        this.bottomBound = bottomBound;
    },

    doesLeftCollide: function(fallingShape, lockedBlocks) {
        return this.doesLeftCollideWithBlocks(fallingShape, lockedBlocks) + this.isAtLeftBound(fallingShape);
    },

    doesRightCollide: function(fallingShape, lockedBlocks) {
        return this.doesRightCollideWithBlocks(fallingShape, lockedBlocks) + this.isAtRightBound(fallingShape);
    },

    doesBottomCollide: function(fallingShape, lockedBlocks) {
        return this.doesBottomCollideWithBlocks(fallingShape, lockedBlocks) + this.isAtBottom(fallingShape);
    },

    doesCollide: function(fallingShape, lockedBlocks) {
        return this.doesCollideWithBlocks(fallingShape, lockedBlocks) || this.collidesWithBound(fallingShape)
    },

    doesLeftCollideWithBlocks: function(falling, lockedBlocks) {
        return this.collisionDetection(falling, lockedBlocks, function(block) { return block.left() });
    },

    doesRightCollideWithBlocks: function(falling, lockedBlocks) {
        return this.collisionDetection(falling, lockedBlocks, function(block) { return block.right() });
    },

    doesBottomCollideWithBlocks: function(falling, lockedBlocks) {
        return this.collisionDetection(falling, lockedBlocks, function(block) { return block.bottom() });
    },

    doesBottomHaveHoles: function(falling, lockedBlocks) {
        return this.holesDetection(falling, lockedBlocks, function(block) { return block.bottom() }) - this.isAtBottom(falling);
    },

    doesCollideWithBlocks: function(falling, lockedBlocks) {
        return this.collisionDetection(falling, lockedBlocks, function(block) { return block });
    },

    isAtBound: function(falling, condition) {
        var numberTouches = 0;
        var occupiedSquares = falling.occupiedSquares();
        for (var i = 0; i < occupiedSquares.length; i++) {
            if (condition(occupiedSquares[i]))
                numberTouches++;
        }
        return numberTouches;
    },

    isAtBottom: function(falling) {
        var bottomBound = this.bottomBound;
        return this.isAtBound(falling, function(occupiedSquare) {return occupiedSquare.y == bottomBound});
    },

    isAtRightBound: function(falling) {
        var rightBound = this.rightBound;
        return this.isAtBound(falling, function(occupiedSquare) {return occupiedSquare.x == rightBound});
    },

    isAtLeftBound: function(falling) {
        return this.isAtBound(falling, function(occupiedSquare) {return occupiedSquare.x == 1});
    },

    collidesWithBound: function(falling) {
        var rightBound = this.rightBound;
        var bottomBound = this.bottomBound;
        return this.isAtBound(falling, function(occupiedSquare) {return occupiedSquare.x == 0 || occupiedSquare.x == rightBound + 1 || occupiedSquare.y == bottomBound});
    },

    collisionDetection: function(falling, lockedBlocks, direction) {
        return this._detection(falling, lockedBlocks, direction, falling.occupiedSquares());
    },

    holesDetection: function(falling, lockedBlocks, direction) {
        var bottomSquares = falling.bottomSquares();
        return bottomSquares.length - this._detection(falling, lockedBlocks, direction, bottomSquares);
    },

    _detection: function(falling, lockedBlocks, direction, occupiedSquares) {
        var numberTouches = 0;
        for (var i = 0; i < lockedBlocks.length; i++) {
            for (var j = 0; j < occupiedSquares.length; j++) {
                if (lockedBlocks[i].isEqual(direction(occupiedSquares[j])))
                    numberTouches++;
            }
        }
        return numberTouches;

    }
});
