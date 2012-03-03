var WorldMap = Class.extend({
    init: function(images) {
        this.context = $('#gameCanvas').get(0).getContext("2d");
        this.images = images;
    },

    draw: function() {
        for (var i = 0; i < 20; i++)
            for (var j = 0; j < 15; j++)
            this.context.drawImage(this.images.grass, i * 60, j * 60);

        this.context.drawImage(this.images.cecil, 0, 0, 60, 60, 9 * 60, 7 * 60, 60, 60);
    }

});
