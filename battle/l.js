var L = Shape.extend({
    color: "green",
    rotatePositions: 4,
    startingYPos: -1,

    occupiedSquares: function() {
        if (this.rotatedPosition === 0)
            return [this.block.copy(), this.block.left(), this.block.right(), new Block(this.block.x - 1, this.block.y + 1, this.color)];
        else if(this.rotatedPosition === 1)
            return [this.block.copy(), this.block.bottom(), this.block.top(), new Block(this.block.x - 1, this.block.y - 1, this.color)];
        else if(this.rotatedPosition === 2)
            return [this.block.copy(), this.block.right(), this.block.left(), new Block(this.block.x + 1, this.block.y - 1, this.color)];
        else if(this.rotatedPosition === 3)
            return [this.block.copy(), this.block.top(), this.block.bottom(), new Block(this.block.x + 1, this.block.y + 1, this.color)]; // l shape
    },

    bottomSquares: function() {
        if (this.rotatedPosition === 0)
            return [this.block.copy(), this.block.left(), this.block.right()];
        else if(this.rotatedPosition === 1)
            return [this.block.bottom(), new Block(this.block.x - 1, this.block.y - 1, this.color)];
        else if(this.rotatedPosition === 2)
            return [this.block.copy(), this.block.left(), new Block(this.block.x + 1, this.block.y - 1, this.color)];
        else if(this.rotatedPosition === 3)
            return [this.block.bottom(), new Block(this.block.x + 1, this.block.y + 1, this.color)]; // l shape
    }

});
