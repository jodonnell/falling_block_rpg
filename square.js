var Square = Class.extend({
    init: function(x, y) {
	this.x = x;
	this.y = y;
	this.color = 'blue';
    },

    drawShape: function() {
	return [[this.x, this.y, "blue"], [this.x + 20, this.y, "blue"], [this.x, this.y + 20, "blue"], [this.x + 20, this.y + 20, "blue"]];
    }

});
