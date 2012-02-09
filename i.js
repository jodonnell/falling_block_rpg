var I = Shape.extend({
    color: "magenta",
    rotatePositions: 2,

    occupiedSquares: function() {
        if (this.rotatedPosition === 0)
            return [this.block, this.block.left(), this.block.right(), new Block(this.block.x + 2, this.block.y, this.color)];
        else if (this.rotatedPosition === 1)
            return [this.block, this.block.bottom(), this.block.top(), new Block(this.block.x, this.block.y + 2, this.color)];
    }
});
