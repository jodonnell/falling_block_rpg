var O = Shape.extend({
    color: "blue",

    occupiedSquares: function() {
        return [this.block, this.block.right(), this.block.bottom(), this.block.bottomRight()];
    }
});
