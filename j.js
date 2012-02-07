var J = Shape.extend({
    color: "red",

    occupiedSquares: function() {
        if (!this.isRotated)
            return [this.grid, this.grid.right(), new Grid(this.grid.x + 2, this.grid.y), new Grid(this.grid.x + 2, this.grid.y + 1)];
        else
            return [this.grid, this.grid.bottom(), new Grid(this.grid.x + 1, this.grid.y), new Grid(this.grid.x, this.grid.y + 2)];
    }
});
