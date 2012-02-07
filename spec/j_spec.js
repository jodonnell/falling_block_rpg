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

        j = new J(new Grid(1,22));
        j.rotate();
        expect(j.isAtBottom()).toBeTruthy();
    });

    it("can rotate", function() {
        expect(j.occupiedSquares()).toContainGrid(new Grid(7, 1));

        j.rotate();
        expect(j.occupiedSquares()).toContainGrid(new Grid(5, 3));

        j.rotate();
        expect(j.occupiedSquares()).toContainGrid(new Grid(4, 1));
    });

});
