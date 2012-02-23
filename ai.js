var AI = Class.extend({
    init: function(enemyArena) {
        this.enemyArena = enemyArena;
    },

    isMovingRight: function() {
        if (this.optimalSpot.x > this.enemyArena.fallingShape.block.x)
            return true;
        return false;
    },

    isMovingLeft: function() {
        if (this.optimalSpot.x < this.enemyArena.fallingShape.block.x)
            return true;
        return false;
    },

    isRotatingClockwise: function() {
        if (this.enemyArena.fallingShape.rotatedPosition != this.rotation)
            return true;
        return false;
    },

    isRotatingCounterClockwise: function() {
    },

    isSoftDropping: function() {
        return false; return this.couldDrop();
    },

    isHardDropping: function() {
        return this.couldDrop();
    },

    couldDrop: function() {
        return (this.optimalSpot.x == this.enemyArena.fallingShape.block.x) && (this.rotation == this.enemyArena.fallingShape.rotatedPosition);
    },

    getOptimalSpot: function() {
        this.saveStartingPosition();
        this.calcOptimalSpot();
        this.restoreStartingPosition();
    },

    calcOptimalSpot: function() {
        this.highestScore = 0;
        this.optimalSpot = null;
        this.rotation = null;

        for (var i = 0; i < this.enemyArena.fallingShape.rotatePositions; i++) {
            for(this._moveFarLeft(); this.enemyArena.canMoveRight(); this.enemyArena.moveRight()) {
                this.calculateScore();
            }
            this.calculateScore(); // loop ends one early

            this.rotateShape();
        }
    },

    saveStartingPosition: function() {
        this.currentX = this.enemyArena.fallingShape.block.x;
        this.currentRotation = this.enemyArena.fallingShape.rotatedPosition;

    },

    restoreStartingPosition: function() {
        this.enemyArena.fallingShape.block.x = this.currentX;
        this.enemyArena.fallingShape.rotatedPosition = this.currentRotation;

    },

    rotateShape: function() {
        this.enemyArena.moveLeft(); // because can not always rotate on far right
        this.enemyArena.rotate();
    },

    calculateScore: function() {
        var startingY = this.enemyArena.fallingShape.block.y;
        this.enemyArena._fallAsFarAsPossible();

        var score = this.score();
        if (score > this.highestScore) {
            this.highestScore = score;
            this.optimalSpot = this.enemyArena.fallingShape.block.copy();
            this.rotation = this.enemyArena.fallingShape.rotatedPosition;
        }

        this.enemyArena.fallingShape.block.y = startingY;
    },

    score: function() {
        return (this.height() / 38) + (this.snugness() / 8);
    },

    height: function() {
        return this.enemyArena.fallingShape.highestBlock().y;
    },

    snugness: function() {
        return this.enemyArena.howManyTouches();
    },
    
    _moveFarLeft: function() {
        while (this.enemyArena.canMoveLeft())
            this.enemyArena.moveLeft();
    }
});
