describe("Square", function() {
    var square;

    beforeEach(function() {
	square = new Square(new Grid(1,1));
    });

    it("should be able to fall", function() {
	square.fall();
	expect(square.grid.y).toEqual(2);
    });

    it("can give you the occupied squares", function() {
	expect(square.occupiedSquares().length).toEqual(4);
    });

    it("can do some basic collision detection", function() {
	var squareNoCollide = new Square(new Grid(1,5));
	expect(square.isShapeBelow(squareNoCollide)).toBeFalsy();

	var squareCollide = new Square(new Grid(1,3));
	expect(square.isShapeBelow(squareCollide)).toBeTruthy();
    });

});
