var O = Shape.extend({
    color: "blue",

    occupiedSquares: function() {
        return [this.grid, this.grid.right(), this.grid.bottom(), this.grid.bottomRight()];
    }
});
