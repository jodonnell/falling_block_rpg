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

    getOptimalSpot: function() {
        var currentX = this.enemyArena.fallingShape.block.x;
        var currentRotation = this.enemyArena.fallingShape.rotatedPosition;

        this.highestScore = 0;
        this.optimalSpot = null;
        this.rotation = null;

        for (var i = 0; i < this.enemyArena.fallingShape.rotatePositions; i++) {
            for(this._moveFarLeft(); this.enemyArena.canMoveRight(); this.enemyArena.moveRight()) {
                this.calculateScore();
            }
            this.calculateScore();

            this.rotateToNextPos();
        }

        this.enemyArena.fallingShape.block.x = currentX;
        this.enemyArena.fallingShape.rotatedPosition = currentRotation;
    },

    rotateToNextPos: function() {
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
