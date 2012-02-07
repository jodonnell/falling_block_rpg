describe("J", function() {
    var j;

    beforeEach(function() {
        j = new J(new Grid(5,1));
    });

    it("is at bottom", function() {
        j.rotate();
        expect(j.isAtBottom()).toBeFalsy();

        j = new J(new Grid(1,22));
        j.rotate();
        expect(j.isAtBottom()).toBeTruthy();
    });
});
