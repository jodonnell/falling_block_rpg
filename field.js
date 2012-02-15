var Field = Class.extend({
    init: function(gameInit, control) {
        var draw = new Draw(gameInit.RIGHT_BOUND, gameInit.BOTTOM_BOUND, 0, 0);
        this.playerArena = new BlockFall(new CreateShape(), draw);

        draw = new Draw(gameInit.RIGHT_BOUND, gameInit.BOTTOM_BOUND, 400, 0);
        this.enemyArena = new BlockFall(new CreateShape(), draw);

        this.control = control;
    },

    update: function() {
        this.respondToControls();

        this.playerArena.drawScreen(); 
        this.enemyArena.drawScreen();

        this.playerArena.update(this.control.isSoftDropping());
        this.enemyArena.update(false);

        this.ai();

    },

    ai: function() {
        this.enemyArena.moveRight();
    },

    respondToControls: function() {
        if (this.control.isMovingRight())
            this.playerArena.moveRight();
        if (this.control.isMovingLeft())
            this.playerArena.moveLeft();
        if (this.control.isRotatingClockwise())
            this.playerArena.rotate();
        if (this.control.isRotatingCounterClockwise())
            this.playerArena.rotateCounterClockwise();

        if (this.control.isHardDropping())
            this.playerArena.hardDrop();
    }

});
