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

    doesCollideWithBlocks: function(falling, lockedBlocks) {
        return this.collisionDetection(falling, lockedBlocks, function(block) { return block });
    },

    isAtBottom: function(falling) {
        var numberTouches = 0;
        var occupiedSquares = falling.occupiedSquares();
        for (var i = 0; i < occupiedSquares.length; i++) {
            if (occupiedSquares[i].y == this.bottomBound)
                numberTouches++;
        }
        return numberTouches;
    },

    isAtRightBound: function(falling) {
        var numberTouches = 0;
        var occupiedSquares = falling.occupiedSquares();
        for (var i = 0; i < occupiedSquares.length; i++) {
            if (occupiedSquares[i].x == this.rightBound)
                numberTouches++;
        }
        return numberTouches;
    },

    isAtLeftBound: function(falling) {
        var numberTouches = 0;
        var occupiedSquares = falling.occupiedSquares();
        for (var i = 0; i < occupiedSquares.length; i++) {
            if (occupiedSquares[i].x == 1)
                numberTouches++;
        }
        return numberTouches;
    },

    collidesWithBound: function(falling) {
        var numberTouches = 0;
        var occupiedSquares = falling.occupiedSquares();
        for (var i = 0; i < occupiedSquares.length; i++) {
            if (occupiedSquares[i].x == 0 || occupiedSquares[i].x == this.rightBound + 1 || occupiedSquares[i].y == this.bottomBound)
                numberTouches++;
        }
        return numberTouches;
    },

    collisionDetection: function(falling, lockedBlocks, direction) {
        var numberTouches = 0;
        var occupiedSquares = falling.occupiedSquares();
        for (var i = 0; i < lockedBlocks.length; i++) {
            for (var j = 0; j < occupiedSquares.length; j++) {
                if (lockedBlocks[i].isEqual(direction(occupiedSquares[j])))
                    numberTouches++;
            }
        }
        return numberTouches;
    },

});
