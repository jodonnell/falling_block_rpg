var BlockFall = Class.extend({
    init: function() {
	this.createCanvas();
	this.context = $('#drawCanvas').get(0).getContext("2d");
    },

    createCanvas: function() {
	var width = $(document).width();
	var height = $(document).height();

	var canvas = '<canvas id="drawCanvas" width="' + width + '" height="' + height + '"></canvas>';
	$('body').append(canvas);
	$("#drawCanvas").css('position', 'absolute');
	$("#drawCanvas").css('top', '0px');
	$("#drawCanvas").css('left', '0px');
	$("#drawCanvas").css('z-index', '1000000000');
    },

    drawBlock: function(x, y, color) {
	this.context.fillStyle = color;
	this.context.fillRect(x, y, 20, 20);

	this.context.strokeStyle = "black";
	this.context.strokeRect(x, y, 20, 20);
    },

    drawBorder: function() {
        for (var i = 0; i < 16; i++)
            this.drawBlock(i * 20, 0, "grey");

        for (var i = 0; i < 16; i++)
            this.drawBlock(i * 20, 500, "grey");

        for (var i = 1; i < 25; i++)
            this.drawBlock(0, i * 20, "grey");

        for (var i = 1; i < 25; i++)
            this.drawBlock(300, i * 20, "grey");
    },

    drawSquare: function(x, y) {
	var square = new Square(x, y);
	var blocks = square.drawShape();
	for (var i = 0; i < blocks.length; i++)
	    this.drawBlock.apply(this, blocks[i]);
    }
});
