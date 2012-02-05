var Square = Class.extend({
    init: function(grid) {
	this.grid = grid;
	this.color = 'blue';
    },

    drawShape: function() {
	return [[this.grid, "blue"], [this.grid.right(), "blue"], [this.grid.bottom(), "blue"], [this.grid.bottomRight(), "blue"]];
    },

    occupiedSquares: function() {
	return [this.grid, this.grid.right(), this.grid.bottom(), this.grid.bottomRight()];
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
    
    isShapeBelow: function(other) {
	var occupiedSquares = other.occupiedSquares();
	for (var i = 0; i < occupiedSquares.length; i++)
	    for (var j = 0; j < this.occupiedSquares().length; j++) {
		if (occupiedSquares[i].isEqual(this.occupiedSquares()[j].bottom()))
		    return true;
	    }
	return false;
    }

});
