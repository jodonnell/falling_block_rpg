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
        this.enemyArena.update(false);
    },

    respondToControls: function() {
        this.respondToInput(this.control);
    },

    respondToAI: function() {
        this.respondToInput(this.ai);
    },

    respondToInput: function(input) {
        if (input.isMovingRight())
            this.playerArena.moveRight();
        if (input.isMovingLeft())
            this.playerArena.moveLeft();
        if (input.isRotatingClockwise())
            this.playerArena.rotate();
        if (input.isRotatingCounterClockwise())
            this.playerArena.rotateCounterClockwise();

        if (input.isHardDropping())
            this.playerArena.hardDrop();
    }

});
