var CollisionDetection = Class.extend({
    init: function(rightBound, bottomBound) {
        this.rightBound = rightBound;
        this.bottomBound = bottomBound;
    },

    doesLeftCollide: function(falling, lockedBlocks) {
        return this.collisionDetection(falling, lockedBlocks, function(block) { return block.left() });
    },

    doesRightCollide: function(falling, lockedBlocks) {
        return this.collisionDetection(falling, lockedBlocks, function(block) { return block.right() });
    },

    doesBottomCollide: function(falling, lockedBlocks) {
        return this.collisionDetection(falling, lockedBlocks, function(block) { return block.bottom() });
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
