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

        var currentShape = this.enemyArena.fallingShape;
        this._moveFarLeft();
        
        do {
            this.enemyArena._fallAsFarAsPossible();
            // var score = 

            this.enemyArena.moveRight();
        } while(this.enemyArena.canMoveRight())
        return this.enemyArena.fallingShape.occupiedSquares();
    },

    _moveFarLeft: function() {
        while (this.enemyArena.canMoveLeft())
            this.enemyArena.moveLeft();
    },

    
});
