var T = Shape.extend({
    color: "orange",
    rotatePositions: 4,
    startingYPos: 0,

    occupiedSquares: function() {
        if (this.rotatedPosition === 0)
            return [this.block, this.block.left(), this.block.right(), this.block.top()];
        else if(this.rotatedPosition === 1)
            return [this.block, this.block.bottom(), this.block.top(), this.block.right()];
        else if(this.rotatedPosition === 2)
            return [this.block, this.block.right(), this.block.left(), this.block.bottom()];
        else if(this.rotatedPosition === 3)
            return [this.block, this.block.top(), this.block.bottom(), this.block.left()];
    }
});
