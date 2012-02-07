describe("Grid", function() {
    it("should be able to covert to normal position", function() {
        var grid = new Grid(0, 0);
        expect(grid.getX()).toEqual(0);
        expect(grid.getY()).toEqual(0);

        grid = new Grid(1, 1);
        expect(grid.getX()).toEqual(20);
        expect(grid.getY()).toEqual(20);
    });

});
