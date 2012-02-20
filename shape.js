var Shape = Class.extend({
    init: function(block) {
        this.block = block;
        this.rotatedPosition = 0;
    },

    occupiedSquares: function() {
        // must override
    },

    fall: function() {
        this.block = this.block.bottom();
    },

    moveRight: function() {
        this.block = this.block.right();
    },

    moveLeft: function() {
        this.block = this.block.left();
    },
    
    drawShape: function() {
        var array = [];
        for (var i = 0; i < this.occupiedSquares().length; i++) {
            array.push([this.occupiedSquares()[i], this.color]);
        }
        return array;
    },

    rotate: function() {
        this.rotatedPosition++;
        if (this.rotatedPosition === this.rotatePositions)
            this.rotatedPosition = 0;
    },

    reverseRotate: function() {
        this.rotatedPosition--;
        if (this.rotatedPosition === -1)
            this.rotatedPosition = this.rotatePositions - 1;
    },

    highestBlock: function() {
        var highestY = 21;
        var highestBlock = null;
        $.each(this.occupiedSquares(), function(index, block){
            if (block.y < highestY) {
                highestY = block.y;
                highestBlock = block;
            }
        });
        return highestBlock;
    }
});
