var Square = Shape.extend({
    drawShape: function() {
        return [[this.grid, "blue"], [this.grid.right(), "blue"], [this.grid.bottom(), "blue"], [this.grid.bottomRight(), "blue"]];
    }
});
