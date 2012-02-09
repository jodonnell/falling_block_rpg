describe("J", function() {
    var j;

    beforeEach(function() {
        this.addMatchers({
            toContainBlock: function(expected) {
                for (var i = 0; i < this.actual.length; i++) {
                    if (this.actual[i].isEqual(expected))
                        return true;
                }
                return false;
            }
        });

        j = new J(new Block(5,1));
    });

    it("can rotate", function() {
        expect(j.occupiedSquares()).toContainBlock(new Block(6, 1));

        j.rotate();
        expect(j.occupiedSquares()).toContainBlock(new Block(4, 2));

        j.rotate();
        expect(j.occupiedSquares()).toContainBlock(new Block(4, 1));
    });

});
