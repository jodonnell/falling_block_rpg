describe("J", function() {
    var j;

    beforeEach(function() {
        j = new J(new Block(5,1));
    });

    it("can rotate", function() {
        expect(j.occupiedSquares()).toContainBlock(new Block(6, 1));

        j.rotate();
        expect(j.occupiedSquares()).toContainBlock(new Block(4, 2));

        j.rotate();
        expect(j.occupiedSquares()).toContainBlock(new Block(4, 1));
    });

    it("can reverse rotate", function() {
        j.reverseRotate();
        expect(j.rotatedPosition).toEqual(3);
        j.reverseRotate();
        expect(j.rotatedPosition).toEqual(2);
        j.reverseRotate();
        expect(j.rotatedPosition).toEqual(1);
        j.reverseRotate();
        expect(j.rotatedPosition).toEqual(0);
    });

    
});
