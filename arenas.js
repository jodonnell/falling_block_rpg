var Arenas = Class.extend({
    init: function(rightBound, bottomBound, control) {
        var draw = new Draw(rightBound, bottomBound, 0, 0);
        this.playerArena = new BlockFall(new CreateShape(), draw);

        draw = new Draw(rightBound, bottomBound, 400, 0);
        this.enemyArena = new BlockFall(new CreateShape(), draw);

        this.control = control;
        this.ai = new AI(this.enemyArena);
    },

    update: function() {
        this.respondToControls();
        this.respondToAI();

        this.playerArena.drawScreen(); 
        this.enemyArena.drawScreen();

        this.playerArena.update(this.control.isSoftDropping());
        this.enemyArena.update(this.ai.isSoftDropping());
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
