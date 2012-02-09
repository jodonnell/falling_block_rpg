var J = Shape.extend({
    color: "red",

    occupiedSquares: function() {
        if (this.rotatedPosition === 0)
            return [this.grid, this.grid.left(), this.grid.right(), new Grid(this.grid.x + 1, this.grid.y + 1, this.color)];
        else if(this.rotatedPosition === 1)
            return [this.grid, this.grid.top(), this.grid.bottom(), new Grid(this.grid.x - 1, this.grid.y + 1, this.color)]; // j shape
        else if(this.rotatedPosition === 2)
            return [this.grid, this.grid.right(), this.grid.left(), new Grid(this.grid.x - 1, this.grid.y - 1, this.color)];
        else if(this.rotatedPosition === 3)
            return [this.grid, this.grid.bottom(), this.grid.top(), new Grid(this.grid.x + 1, this.grid.y - 1, this.color)];
    }
});
