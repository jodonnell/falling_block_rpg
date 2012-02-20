var O = Shape.extend({
    color: "blue",
    rotatePositions: 1,
    startingYPos: -1,

    occupiedSquares: function() {
        return [this.block.copy(), this.block.right(), this.block.bottom(), this.block.bottomRight()];
    }
});
