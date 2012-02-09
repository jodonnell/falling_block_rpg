describe("Block", function() {
    it("should be able to covert to normal position", function() {
        var block = new Block(0, 0);
        expect(block.getX()).toEqual(0);
        expect(block.getY()).toEqual(0);

        block = new Block(1, 1);
        expect(block.getX()).toEqual(20);
        expect(block.getY()).toEqual(20);
    });

});
