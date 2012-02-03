var BlockFall = Class.extend({
    RIGHT_BOUND: 520,
    BOTTOM_BOUND: 320,

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
            this.drawBlock(i * 20, this.RIGHT_BOUND - 20, "grey");

        for (var i = 1; i < 25; i++)
            this.drawBlock(0, i * 20, "grey");

        for (var i = 1; i < 25; i++)
            this.drawBlock(this.BOTTOM_BOUND - 20, i * 20, "grey");
    },

    drawSquare: function(x, y) {
	var square = new Square(x, y);
	var blocks = square.drawShape();
	for (var i = 0; i < blocks.length; i++)
	    this.drawBlock.apply(this, blocks[i]);
    },

    drawScreen: function() {
	this.drawBackground();
	this.drawBorder();
    },

    drawBackground: function() {
	this.context.fillStyle = "black";
	this.context.fillRect(0, 0, this.BOTTOM_BOUND, this.RIGHT_BOUND);
	
    }
});
