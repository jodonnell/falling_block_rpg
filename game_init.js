var GameInit = Class.extend({
    RIGHT_BOUND: 10,
    BOTTOM_BOUND: 20,

    init: function(createShape, draw) {
        this.createCanvas();
    },

    createCanvas: function() {
        var width = $(document).width();
        var height = $(document).height();

        var canvas = '<canvas id="gameCanvas" width="' + width + '" height="' + height + '"></canvas>';
        $('body').append(canvas);
        $("#gameCanvas").css('position', 'absolute');
        $("#gameCanvas").css('top', '0px');
        $("#gameCanvas").css('left', '0px');
    }
});
