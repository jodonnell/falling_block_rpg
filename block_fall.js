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

    drawSquare: function(x, y, color) {
	this.context.fillStyle = color;
	this.context.fillRect(x, y, 20, 20);

	this.context.strokeStyle = "black";
	this.context.strokeRect(x, y, 20, 20);
    },

    drawBorder: function() {
        for (var i = 0; i < 20; i++)
            this.drawSquare(i * 20, 0, "grey");
    }
});
