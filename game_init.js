var GameInit = Class.extend({
    RIGHT_BOUND: 10,
    BOTTOM_BOUND: 20,

    init: function(hide) {
        this.createCanvas();
        if (hide)
            this.hide = true;
    },

    createCanvas: function() {
        var width = $(document).width();
        var height = $(document).height() - 40;

        var canvas = '<canvas id="gameCanvas" width="' + width + '" height="' + height + '"></canvas>';
        $('body').append(canvas);
        $("#gameCanvas").css('position', 'absolute');
        $("#gameCanvas").css('top', '40px');
        $("#gameCanvas").css('left', '0px');
        if (this.hide)
            $("#gameCanvas").css('visibilty', 'hidden');
    },

    destroyCanvas: function() {
        $("#gameCanvas").remove();
    }
});
