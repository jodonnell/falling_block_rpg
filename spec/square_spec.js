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

    it("is at bottom", function() {
        expect(square.isAtBottom()).toBeFalsy();

        square = new Square(new Grid(1,23));
        expect(square.isAtBottom()).toBeTruthy();
    });

    it("can give you the occupied squares", function() {
        expect(square.occupiedSquares().length).toEqual(4);
    });
});
