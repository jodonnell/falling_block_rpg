var Shape = Class.extend({
    init: function(grid) {
        this.grid = grid;
        this.rotatedPosition = 0;
    },

    drawShape: function() {
        // must override
    },

    occupiedSquares: function() {
        // must override
    },

    fall: function() {
        this.grid = this.grid.bottom();
    },

    moveRight: function() {
        if (!this.isAtRightBound())
            this.grid = this.grid.right();
    },

    moveLeft: function() {
        if (this.grid.x > 1)
            this.grid = this.grid.left();
    },
    
    isShapeBelow: function(other) {
        return this.collisionDetection(other, function(grid) { return grid.bottom() });
    },

    isShapeToRight: function(other) {
        return this.collisionDetection(other, function(grid) { return grid.right() });
    },

    isShapeToLeft: function(other) {
        return this.collisionDetection(other, function(grid) { return grid.left() });
    },

    collisionDetection: function(other, direction) {
        var occupiedSquares = other.occupiedSquares();
        for (var i = 0; i < occupiedSquares.length; i++)
            for (var j = 0; j < this.occupiedSquares().length; j++) {
                if (occupiedSquares[i].isEqual(direction(this.occupiedSquares()[j])))
                    return true;
            }
        return false;

    },

    drawShape: function() {
        var array = [];
        for (var i = 0; i < this.occupiedSquares().length; i++) {
            array.push([this.occupiedSquares()[i], this.color]);
        }
        return array;
    },

    rotate: function() {
        this.rotatedPosition++;
        if (this.rotatedPosition === 4)
            this.rotatedPosition = 0;
    },

    isAtBottom: function() {
        for (var i = 0; i < this.occupiedSquares().length; i++) {
            if (this.occupiedSquares()[i].y == 24)
                return true;
        }
        return false;
    },

    isAtRightBound: function() {
        for (var i = 0; i < this.occupiedSquares().length; i++) {
            if (this.occupiedSquares()[i].x == 14)
                return true;
        }
        return false;
    }
});
