var CollisionDetection = Class.extend({
    init: function(rightBound, bottomBound) {
        this.rightBound = rightBound;
        this.bottomBound = bottomBound;
    },

    doesLeftCollide: function(fallingShape, lockedBlocks) {
        return this.doesLeftCollideWithBlocks(fallingShape, lockedBlocks) || this.isAtLeftBound(fallingShape);
    },

    doesRightCollide: function(fallingShape, lockedBlocks) {
        return this.doesRightCollideWithBlocks(fallingShape, lockedBlocks) || this.isAtRightBound(fallingShape);
    },

    doesBottomCollide: function(fallingShape, lockedBlocks) {
        return this.doesBottomCollideWithBlocks(fallingShape, lockedBlocks) || this.isAtBottom(fallingShape);
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
        for (var i = 0; i < falling.occupiedSquares().length; i++) {
            if (falling.occupiedSquares()[i].y == this.bottomBound)
                return true;
        }
        return false;
    },

    isAtRightBound: function(falling) {
        for (var i = 0; i < falling.occupiedSquares().length; i++) {
            if (falling.occupiedSquares()[i].x == this.rightBound)
                return true;
        }
        return false;
    },

    isAtLeftBound: function(falling) {
        for (var i = 0; i < falling.occupiedSquares().length; i++) {
            if (falling.occupiedSquares()[i].x == 1)
                return true;
        }
        return false;
    },

    collidesWithBound: function(falling) {
        for (var i = 0; i < falling.occupiedSquares().length; i++) {
            if (falling.occupiedSquares()[i].x == 0 || falling.occupiedSquares()[i].x == this.rightBound + 1 || falling.occupiedSquares()[i].y == this.bottomBound)
                return true;
        }
        return false;
    },

    collisionDetection: function(falling, lockedBlocks, direction) {
        for (var i = 0; i < lockedBlocks.length; i++) {
            for (var j = 0; j < falling.occupiedSquares().length; j++) {
                if (lockedBlocks[i].isEqual(direction(falling.occupiedSquares()[j])))
                    return true;
            }
        }
        return false;
    },

});
