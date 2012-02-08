var CollisionDetection = Class.extend({
    init: function() {
    },

    doesLeftCollide: function(falling, locked) {
        for (var i = 0; i < locked.length; i++) {
            if (this.isShapeToLeft(falling, locked[i]))
                return true;
        }
        return false;
    },

    doesRightCollide: function(falling, locked) {
        for (var i = 0; i < locked.length; i++) {
            if (this.isShapeToRight(falling, locked[i]))
                return true;
        }
        return false;
    },

    doesBottomCollide: function(falling, locked) {
        for (var i = 0; i < locked.length; i++) {
            if (this.isShapeBelow(falling, locked[i]))
                return true;
        }
        return false;
    },

    // private
    isShapeBelow: function(falling, other) {
        return this.collisionDetection(falling, other, function(grid) { return grid.bottom() });
    },

    isShapeToRight: function(falling, other) {
        return this.collisionDetection(falling, other, function(grid) { return grid.right() });
    },

    isShapeToLeft: function(falling, other) {
        return this.collisionDetection(falling, other, function(grid) { return grid.left() });
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


});
