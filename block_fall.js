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

    drawSquare: function() {
	this.context.fillRect(50, 25, 20, 20);
    }
});
