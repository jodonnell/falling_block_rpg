var AI = Class.extend({
    init: function(enemyArena) {
        this.enemyArena = enemyArena;
    },

    isMovingRight: function() {
    },

    isMovingLeft: function() {
    },

    isRotatingClockwise: function() {
    },

    isRotatingCounterClockwise: function() {
    },

    isSoftDropping: function() {
    },

    isHardDropping: function() {
        this.getOptimalSpot();
        return true;
    },

    getOptimalSpot: function() {
        // try every combination
        // go far left, move right one at a time and calc score
        // rotate, repeat

        var currentBlock = this.enemyArena.fallingShape.block;
        this._moveFarLeft();

        var highestScore = 0;
        var bestMove = null;

        do {
            this.enemyArena._fallAsFarAsPossible();
            // var score = 
            debugger;
            var score = this.score();
            if (score > highestScore) {
                highestScore = score;
                bestMove = this.enemyArena.fallingShape.occupiedSquares();
            }
                


            this.enemyArena.fallingShape.block.y = currentBlock.y;

            this.enemyArena.moveRight();
        } while(this.enemyArena.canMoveRight())
        return bestMove;
    },

    score: function() {
        var height = this.enemyArena.fallingShape.block.y;
        return height;
    },

    _moveFarLeft: function() {
        while (this.enemyArena.canMoveLeft())
            this.enemyArena.moveLeft();
    },

    
});
