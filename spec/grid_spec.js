describe("Grid", function() {
    it("should be able to covert to normal position", function() {
	var grid = new Grid(0, 0);
	expect(grid.toPos()).toEqual([0, 0]);

	var grid = new Grid(1, 1);
	expect(grid.toPos()).toEqual([20, 20]);

    });
});
