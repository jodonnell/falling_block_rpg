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
            this.switchToBattleTime();
        }

        if (this.arenas.gameOver) {
            this.switchToWorldMap();
        }

        if (this.isWorldMapScene)
            this.worldMap.update();
        else
            this.arenas.update();
    },

    switchToBattleTime: function() {
        this.isWorldMapScene = false;
        this.clearScreen();
        this.worldMap.isBattleTime = false;
    },

    switchToWorldMap: function() {
        this.isWorldMapScene = true;
        this.clearScreen();
        this.resetArena();

        this.hero.addXp(10);
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
