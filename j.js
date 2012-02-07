var J = Shape.extend({
    color: "red",

    occupiedSquares: function() {
        if (this.rotatedPosition === 0)
            return [this.grid, this.grid.right(), new Grid(this.grid.x + 2, this.grid.y), new Grid(this.grid.x + 2, this.grid.y + 1)];
        else if(this.rotatedPosition === 1)
            return [new Grid(this.grid.x - 1, this.grid.y), this.grid, new Grid(this.grid.x, this.grid.y - 1), new Grid(this.grid.x, this.grid.y - 2)];
        else if(this.rotatedPosition === 2)
            return [this.grid, new Grid(this.grid.x, this.grid.y - 1), new Grid(this.grid.x + 1, this.grid.y), new Grid(this.grid.x + 2, this.grid.y)];
        else if(this.rotatedPosition === 3)
            return [this.grid, new Grid(this.grid.x, this.grid.y + 1), new Grid(this.grid.x + 1, this.grid.y), new Grid(this.grid.x, this.grid.y + 2)];
    }
});
