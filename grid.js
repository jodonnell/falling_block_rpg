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
    }

});
