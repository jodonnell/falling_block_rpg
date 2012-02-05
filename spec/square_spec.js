describe("Square", function() {
    var square;

    beforeEach(function() {
	square = new Square(new Grid(1,1));
    });

    it("should be able to fall", function() {
	square.fall();
	expect(square.grid.y).toEqual(2);
    });

    it("can move right", function() {
	square.moveRight();
	expect(square.grid.x).toEqual(2);
    });

    it("can move left", function() {
	square = new Square(new Grid(2,1));
	square.moveLeft();
	expect(square.grid.x).toEqual(1);
    });

    it("can give you the occupied squares", function() {
	expect(square.occupiedSquares().length).toEqual(4);
    });

    it("can do some basic bottom collision detection", function() {
	var squareNoCollide = new Square(new Grid(1,5));
	expect(square.isShapeBelow(squareNoCollide)).toBeFalsy();

	var squareCollide = new Square(new Grid(1,3));
	expect(square.isShapeBelow(squareCollide)).toBeTruthy();
    });

    it("can do some basic right collision detection", function() {
	var squareNoCollide = new Square(new Grid(5,1));
	expect(square.isShapeToRight(squareNoCollide)).toBeFalsy();

	var squareCollide = new Square(new Grid(3,1));
	expect(square.isShapeToRight(squareCollide)).toBeTruthy();
    });

    it("can do some basic left collision detection", function() {
	square = new Square(new Grid(5,1));
	var squareNoCollide = new Square(new Grid(1,1));
	expect(square.isShapeToLeft(squareNoCollide)).toBeFalsy();

	var squareCollide = new Square(new Grid(3,1));
	expect(square.isShapeToLeft(squareCollide)).toBeTruthy();
    });

});
