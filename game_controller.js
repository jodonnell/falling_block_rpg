var GameController = Class.extend({
    init: function(gameInit) {
        this.gameInit = gameInit;
        var control1 = new Control1();
        var control2 = new Control2();
        this.arenas = new Arenas(this.gameInit.RIGHT_BOUND, this.gameInit.BOTTOM_BOUND, control1, control2);
        this.images = new Images();
        this.clearScreen();
    },

    update: function() {
        this.arenas.update();
    },

    resetArena: function() {
        this.arenas = new Arenas(this.gameInit.RIGHT_BOUND, this.gameInit.BOTTOM_BOUND, this.control);
    },

    clearScreen: function() {
        $('#gameCanvas').get(0).width = $('#gameCanvas').get(0).width;
    },

    updateWithTime: function() {
        var startTime = new Date().getTime();
        this.update();
        return new Date().getTime() - startTime;
    }
});
