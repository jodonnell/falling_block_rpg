var Z = Shape.extend({
    color: "white",
    rotatePositions: 2,

    occupiedSquares: function() {
        if (this.rotatedPosition === 0)
            return [this.block, this.block.right(), this.block.top(), new Block(this.block.x - 1, this.block.y - 1, this.color)];
        else if(this.rotatedPosition === 1)
            return [this.block, this.block.bottom(), this.block.right(), new Block(this.block.x + 1, this.block.y - 1, this.color)];
    }
});
