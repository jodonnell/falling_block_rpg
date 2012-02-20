var AI = Class.extend({
    init: function(enemyArena) {
        this.enemyArena = enemyArena;
    },

    isMovingRight: function() {
        var bestMove = this.getOptimalSpot();
        if (bestMove[0].x > this.enemyArena.fallingShape.block.x)
            return true;
        return false;
    },

    isMovingLeft: function() {
        var bestMove = this.getOptimalSpot();
        if (bestMove[0].x < this.enemyArena.fallingShape.block.x)
            return true;
        return false;
    },

    isRotatingClockwise: function() {
    },

    isRotatingCounterClockwise: function() {
    },

    isSoftDropping: function() {
    },

    isHardDropping: function() {
        this.getOptimalSpot();
        return false;
    },

    getOptimalSpot: function() {
        // try every combination
        // go far left, move right one at a time and calc score
        // rotate, repeat

        this.currentBlock = this.enemyArena.fallingShape.block;
        

        this.highestScore = 0;
        this.bestMove = null;

        for(this._moveFarLeft(); this.enemyArena.canMoveRight(); this.enemyArena.moveRight()) {
            this.calculateScore();
        }
        this.calculateScore();

        this.enemyArena.fallingShape.block.x = this.currentBlock.x;
        return this.bestMove;
    },

    calculateScore: function() {
        this.enemyArena._fallAsFarAsPossible();
        // var score = 
        var score = this.score();
        if (score > this.highestScore) {
            this.highestScore = score;
            this.bestMove = this.enemyArena.fallingShape.occupiedSquares();
        }

        this.enemyArena.fallingShape.block.y = this.currentBlock.y;
    },

    score: function() {
        var height = this.enemyArena.fallingShape.block.y; // should get highest block in shape
        return height * this.snugness();
        return height;
    },

    snugness: function() {
        return 1;
    },
    
    _moveFarLeft: function() {
        while (this.enemyArena.canMoveLeft())
            this.enemyArena.moveLeft();
    },

    
});
