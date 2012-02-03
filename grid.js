var Grid = Class.extend({
    init: function(x, y) {
	this.x = x;
	this.y = y;
    },

    toPos: function() {
	return [this.x * 20, this.y * 20];
    }

});
