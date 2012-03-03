var WorldMap = Class.extend({
    init: function(images) {
        this.context = $('#gameCanvas').get(0).getContext("2d");
        this.images = images;
    },

    draw: function() {
        for (var i = 0; i < 20; i++)
            for (var j = 0; j < 15; j++)
                this.context.drawImage(this.images.grass, i * 60, j * 60);

        this.cecilWalkUpFrame();
    },

    cecilWalkUpFrame: function() {
        this.context.drawImage.apply(this.context, [this.images.cecil, 0, 0, 60, 60].concat(this.centerOfScreen()).concat(this.scaleToSize()));
    },

    

    centerOfScreen: function() {
        return [9 * 60, 7 * 60];
    },

    scaleToSize: function() {
        return [60, 60];
    }

});
