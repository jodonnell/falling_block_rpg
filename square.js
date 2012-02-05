var Square = Class.extend({
    init: function(grid) {
	this.grid = grid;
	this.color = 'blue';
    },

    drawShape: function() {
	return [[this.grid, "blue"], [this.grid.right(), "blue"], [this.grid.bottom(), "blue"], [this.grid.bottomRight(), "blue"]];
    },

    fall: function() {
	this.grid = this.grid.bottom();
    }

});
