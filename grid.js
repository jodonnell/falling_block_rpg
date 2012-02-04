var Grid = Class.extend({
    init: function(x, y) {
	this.x = x;
	this.y = y;
    },

    getX: function() {
	return this.x * 20;
    },
    
    getY: function() {
	return this.y * 20;
    },

    right: function() {
	return new Grid(this.x + 1, this.y);
    },

    bottom: function() {
	return new Grid(this.x, this.y + 1);
    },

    bottomRight: function() {
	return new Grid(this.x + 1, this.y + 1);
    }

});
