var GameController = Class.extend({
    init: function(gameInit) {
        this.gameInit = gameInit;
        this.control = new Control();
        this.hero = new Combatant(100);
        this.arenas = new Arenas(this.gameInit.RIGHT_BOUND, this.gameInit.BOTTOM_BOUND, this.control, this.hero);
        this.images = new Images();
        this.worldMap = new WorldMap(this.images, this.control);
        this.isWorldMapScene = true;
    },

    update: function() {
        if (this.worldMap.isBattleTime) {
            this.isWorldMapScene = false;
            this.clearScreen();
            this.worldMap.isBattleTime = false;
        }

        if (this.arenas.gameOver) {
            this.isWorldMapScene = true;
            this.clearScreen();
            this.resetArena();
        }

        if (this.isWorldMapScene)
            this.worldMap.update();
        else
            this.arenas.update();
    },

    resetArena: function() {
        this.arenas = new Arenas(this.gameInit.RIGHT_BOUND, this.gameInit.BOTTOM_BOUND, this.control, this.hero);
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