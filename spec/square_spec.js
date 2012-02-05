describe("Square", function() {
    var square;

    beforeEach(function() {
	square = new Square(new Grid(1,1));
    });

    it("should be able to fall", function() {
	square.fall();
	expect(square.grid.y).toEqual(2);
    });

});
