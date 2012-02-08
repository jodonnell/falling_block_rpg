describe("O", function() {
    var o;

    beforeEach(function() {
        o = new O(new Grid(1,1));
    });

    it("should be able to fall", function() {
        o.fall();
        expect(o.grid.y).toEqual(2);
    });

    it("can move right", function() {
        o.moveRight();
        expect(o.grid.x).toEqual(2);
    });

    it("can move left", function() {
        o = new O(new Grid(2,1));
        o.moveLeft();
        expect(o.grid.x).toEqual(1);
    });

    it("can give you the occupied os", function() {
        expect(o.occupiedSquares().length).toEqual(4);
    });
});
