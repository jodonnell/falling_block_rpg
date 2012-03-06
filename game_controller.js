var GameController = Class.extend({
    init: function(gameInit) {
        this.gameInit = gameInit;
        this.control = new Control();
        this.arenas = new Arenas(this.gameInit.RIGHT_BOUND, this.gameInit.BOTTOM_BOUND, this.control);
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
        this.arenas = new Arenas(this.gameInit.RIGHT_BOUND, this.gameInit.BOTTOM_BOUND, this.control);
    },

    clearScreen: function() {
        $('#gameCanvas').get(0).width = $('#gameCanvas').get(0).width;
    },

    updateWithTime: function() {
        var startTime = new Date().getTime();
        this.update();
        return new Date().getTime() - startTime;
    },

    respondToControls: function() {
        this.respondToInput(this.control, this.playerArena);
    },

    respondToAI: function() {
        if (this.enemyArena.isFallFrame()) {
            this.ai.getOptimalSpot();
            this.respondToInput(this.ai, this.enemyArena);
        }
    },

    respondToInput: function(input, arena) {
        if (input.isMovingRight())
            arena.moveRight();
        if (input.isMovingLeft())
            arena.moveLeft();
        if (input.isRotatingClockwise())
            arena.rotate();
        if (input.isRotatingCounterClockwise())
            arena.rotateCounterClockwise();

        if (input.isHardDropping())
            arena.hardDrop();
    }

});
