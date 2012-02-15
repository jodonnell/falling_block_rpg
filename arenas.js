var Arenas = Class.extend({
    init: function(rightBound, bottomBound, control) {
        var draw = new Draw(rightBound, bottomBound, 0, 0);
        this.playerArena = new BlockFall(new CreateShape(), draw);

        draw = new Draw(rightBound, bottomBound, 400, 0);
        this.enemyArena = new BlockFall(new CreateShape(), draw);

        this.control = control;
    },

    update: function() {
        this.respondToControls();
        this.ai();

        this.playerArena.drawScreen(); 
        this.enemyArena.drawScreen();

        this.playerArena.update(this.control.isSoftDropping());
        this.enemyArena.update(false);
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
