var Z = Shape.extend({
    color: "white",
    rotatePositions: 2,
    startingYPos: 0,

    occupiedSquares: function() {
        if (this.rotatedPosition === 0)
            return [this.block.copy(), this.block.right(), this.block.top(), new Block(this.block.x - 1, this.block.y - 1, this.color)];
        else if(this.rotatedPosition === 1)
            return [this.block.copy(), this.block.bottom(), this.block.right(), new Block(this.block.x + 1, this.block.y - 1, this.color)];
    },

    bottomSquares: function() {
        if (this.rotatedPosition === 0)
            return [this.block.copy(), this.block.right(), new Block(this.block.x - 1, this.block.y - 1, this.color)];
        else if(this.rotatedPosition === 1)
            return [this.block.bottom(), this.block.right()];
    },
});
