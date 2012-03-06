var Arenas = Class.extend({
    init: function(rightBound, bottomBound, control, hero) {
        var draw = new Draw(rightBound, bottomBound, 0, 0);
        this.playerArena = new BlockFall(new CreateShape(), draw, hero);

        draw = new Draw(rightBound, bottomBound, 600, 0);
        this.enemyArena = new BlockFall(new CreateShape(), draw, new Combatant(10));

        this.control = control;
        this.ai = new AI(this.enemyArena);
        this.gameOver = false;
    },

    update: function() {
        this.respondToControls();
        this.respondToAI();

        this.playerArena.drawScreen(); 
        this.enemyArena.drawScreen();

        this.playerArena.update(this.control.isSoftDropping());
        this.enemyArena.update(this.ai.isSoftDropping());

        this.doDamage();

        this.determineGameOver();
    },

    determineGameOver: function() {
        if (this.playerArena.gameOver || this.enemyArena.gameOver)
            this.gameOver = true;

        if (this.playerArena.combatant.hp < 1 || this.enemyArena.combatant.hp < 1)
            this.gameOver = true;

    },

    doDamage: function() {
        this.enemyArena.combatant.hp -= this.playerArena.damageDone;
        this.playerArena.damageDone = 0;

        this.playerArena.combatant.hp -= this.enemyArena.damageDone;
        this.enemyArena.damageDone = 0;
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
