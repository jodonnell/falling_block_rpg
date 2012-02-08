describe("J", function() {
    var j;

    beforeEach(function() {
        this.addMatchers({
            toContainGrid: function(expected) {
                for (var i = 0; i < this.actual.length; i++) {
                    if (this.actual[i].isEqual(expected))
                        return true;
                }
                return false;
            }
        });

        j = new J(new Grid(5,1));
    });

    it("is at bottom", function() {
        j.rotate();
        expect(j.isAtBottom()).toBeFalsy();

        j = new J(new Grid(1,23));
        j.rotate();
        expect(j.isAtBottom()).toBeTruthy();
    });

    it("cannot go through right wall", function() {
        j = new J(new Grid(2,1));
        j.moveLeft();

        expect(j.grid.x).toEqual(2);
    });
    

    it("can rotate", function() {
        expect(j.occupiedSquares()).toContainGrid(new Grid(6, 1));

        j.rotate();
        expect(j.occupiedSquares()).toContainGrid(new Grid(4, 2));

        j.rotate();
        expect(j.occupiedSquares()).toContainGrid(new Grid(4, 1));
    });

});