var WorldMap = Class.extend({
    init: function() {
        this.context = $('#gameCanvas').get(0).getContext("2d");
        var cat = new Image();
        cat.src = "images/grassTile.jpg";
        var me = this;
        cat.onload = function() {
            me.context.drawImage(cat, 10, 10);
        };
    },

});
