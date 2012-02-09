var J = Shape.extend({
    color: "red",
    rotatePositions: 4,

    occupiedSquares: function() {
        if (this.rotatedPosition === 0)
            return [this.block, this.block.left(), this.block.right(), new Block(this.block.x + 1, this.block.y + 1, this.color)];
        else if(this.rotatedPosition === 1)
            return [this.block, this.block.top(), this.block.bottom(), new Block(this.block.x - 1, this.block.y + 1, this.color)]; // j shape
        else if(this.rotatedPosition === 2)
            return [this.block, this.block.right(), this.block.left(), new Block(this.block.x - 1, this.block.y - 1, this.color)];
        else if(this.rotatedPosition === 3)
            return [this.block, this.block.bottom(), this.block.top(), new Block(this.block.x + 1, this.block.y - 1, this.color)];
    }
});
