var Square = Class.extend({
    init: function(x, y) {
	this.x = x;
	this.y = y;
	this.color = 'blue';
    },

    drawShape: function() {
	return [[new Grid(this.x, this.y), "blue"], [new Grid(this.x + 1, this.y), "blue"], [new Grid(this.x, this.y + 1), "blue"], [new Grid(this.x + 1, this.y + 1), "blue"]];
    }

});
