var CollisionDetection = Class.extend({
    init: function() {
    },

    doesLeftCollide: function(falling, lockedBlocks) {
        return this.collisionDetection2(falling, lockedBlocks, function(block) { return block.left() });
    },

    doesRightCollide: function(falling, lockedBlocks) {
        return this.collisionDetection2(falling, lockedBlocks, function(block) { return block.right() });
    },

    doesBottomCollide: function(falling, lockedBlocks) {
        return this.collisionDetection2(falling, lockedBlocks, function(block) { return block.bottom() });
        for (var i = 0; i < locked.length; i++) {
            if (this.isShapeBelow(falling, locked[i]))
                return true;
        }
        return false;
    },

    isAtBottom: function(falling) {
        for (var i = 0; i < falling.occupiedSquares().length; i++) {
            if (falling.occupiedSquares()[i].y == 24)
                return true;
        }
        return false;
    },

    isAtRightBound: function(falling) {
        for (var i = 0; i < falling.occupiedSquares().length; i++) {
            if (falling.occupiedSquares()[i].x == 14)
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

    // private
    isShapeBelow: function(falling, other) {
        return this.collisionDetection(falling, other, function(block) { return block.bottom() });
    },

    isShapeToRight: function(falling, other) {
        return this.collisionDetection(falling, other, function(block) { return block.right() });
    },

    isShapeToLeft: function(falling, other) {
        return this.collisionDetection(falling, other, function(block) { return block.left() });
    },

    collisionDetection: function(falling, other, direction) {
        var occupiedSquares = other.occupiedSquares();
        for (var i = 0; i < occupiedSquares.length; i++)
            for (var j = 0; j < falling.occupiedSquares().length; j++) {
                if (occupiedSquares[i].isEqual(direction(falling.occupiedSquares()[j])))
                    return true;
            }
        return false;

    },

    collisionDetection2: function(falling, lockedBlocks, direction) {
        for (var i = 0; i < lockedBlocks.length; i++) {
            for (var j = 0; j < falling.occupiedSquares().length; j++) {
                if (lockedBlocks[i].isEqual(direction(falling.occupiedSquares()[j])))
                    return true;
            }
        }
        return false;
    },

});
