var J = Shape.extend({
    drawShape: function() {
        return [[this.grid, "red"], [this.grid.right(), "red"], [new Grid(this.grid.x + 2, this.grid.y), "red"], [new Grid(this.grid.x + 2, this.grid.y + 1), "red"]];
    },

    occupiedSquares: function() {
        return [this.grid, this.grid.right(), new Grid(this.grid.x + 2, this.grid.y), new Grid(this.grid.x + 2, this.grid.y + 1)];
    }
});
