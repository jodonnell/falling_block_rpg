var Arenas = Class.extend({
    init: function(rightBound, bottomBound, control1, control2, junkOn) {
        var draw = new Draw(rightBound, bottomBound, 80, 0);
        this.playerArena = new BlockFall(new CreateShape(), draw, new Combatant(30));

        draw = new Draw(rightBound, bottomBound, $(window).width() - 700, 0);
        this.enemyArena = new BlockFall(new CreateShape(), draw, new Combatant(30));

        this.control1 = control1;
        this.control2 = control2;
        this.gameOver = false;
        this.junkOn = junkOn;
    },

    update: function() {
        this.respondToControls();

        this.playerArena.drawScreen(); 
        this.enemyArena.drawScreen();

        this.playerArena.update(this.control1.isSoftDropping());
        this.enemyArena.update(this.control2.isSoftDropping());

        this.doDamage();

        this.determineGameOver();
    },

    determineGameOver: function() {
        if (this.playerArena.gameOver || this.enemyArena.gameOver)
            this.gameOver = true;

        if (this.playerArena.combatant.hp < 1 || this.enemyArena.combatant.hp < 1)
            this.gameOver = true;

        if (this.gameOver) {
            if (this.playerArena.gameOver || this.playerArena.combatant.hp < 1)
                this.winner = 'Player 2';
            else
                this.winner = 'Player 1';
        }

    },

    doDamage: function() {
        this.enemyArena.combatant.hp -= this.playerArena.damageDone;
        this.addJunkRows(this.playerArena, this.enemyArena);
        this.playerArena.damageDone = 0;

        this.playerArena.combatant.hp -= this.enemyArena.damageDone;
        this.addJunkRows(this.enemyArena, this.playerArena);
        this.enemyArena.damageDone = 0;
    },

    addJunkRows: function(damageDoer, damageTaker) {
        if (!this.junkOn)
            return;

        if (damageDoer.damageDone == 2)
            damageTaker.addJunkRows(2);
        else if (damageDoer.damageDone == 3)
            damageTaker.addJunkRows(5);
        else if (damageDoer.damageDone == 4)
            damageTaker.addJunkRows(8);

    },

    updateWithTime: function() {
        var startTime = new Date().getTime();
        this.update();
        return new Date().getTime() - startTime;
    },

    respondToControls: function() {
        this.respondToInput(this.control1, this.playerArena);
        this.respondToInput(this.control2, this.enemyArena);
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
