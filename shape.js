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
        this.grid = this.grid.right();
    },

    moveLeft: function() {
        this.grid = this.grid.left();
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
    }
});
