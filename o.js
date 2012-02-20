var O = Shape.extend({
    color: "blue",
    startingYPos: -1,

    occupiedSquares: function() {
        return [this.block.copy(), this.block.right(), this.block.bottom(), this.block.bottomRight()];
    }
});
