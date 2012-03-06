var Images = Class.extend({
    init: function(callback) {
        this.loadedImages = 0;
        this.grass = new Image();
        this.grass.src = "assets/grassTile.jpg";
        //this.grass.onload = callback;

        this.cecil = new Image();
        this.cecil.src = "assets/cecil.png";
        this.cecil.onload = callback;

    },

});
