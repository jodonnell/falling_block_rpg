var J = Shape.extend({
    color: "red",

    occupiedSquares: function() {
        return [this.grid, this.grid.right(), new Grid(this.grid.x + 2, this.grid.y), new Grid(this.grid.x + 2, this.grid.y + 1)];
    }
});
