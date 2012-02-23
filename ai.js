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
        return this.optimalSpot.x == this.enemyArena.fallingShape.block.x;
    },

    isHardDropping: function() {
        return false;
        return this.optimalSpot.x == this.enemyArena.fallingShape.block.x;
    },

    calcOptimalSpot: function() {
        this.optimalSpot = this.getOptimalSpot();
    },

    getOptimalSpot: function() {
        this.currentBlock = this.enemyArena.fallingShape.block.copy();
        this.currentRotation = this.enemyArena.fallingShape.rotatedPosition;

        this.highestScore = 0;
        this.bestMove = null;
        this.rotation = null;

        for (var i = 0; i < this.enemyArena.fallingShape.rotatePositions; i++) {
            for(this._moveFarLeft(); this.enemyArena.canMoveRight(); this.enemyArena.moveRight()) {
                this.calculateScore();
            }
            this.calculateScore();

            this.enemyArena.moveLeft(); // because can not always rotate on far right
            this.enemyArena.rotate();
        }

        this.enemyArena.fallingShape.block.x = this.currentBlock.x;
        this.enemyArena.fallingShape.rotatedPosition = this.currentRotation;

        return this.bestMove;
    },

    calculateScore: function() {
        this.enemyArena._fallAsFarAsPossible();

        var score = this.score();
        if (score > this.highestScore) {
            this.highestScore = score;
            this.bestMove = this.enemyArena.fallingShape.block.copy();
            this.rotation = this.enemyArena.fallingShape.rotatedPosition;
        }

        this.enemyArena.fallingShape.block.y = this.currentBlock.y;
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
    },

    
});
