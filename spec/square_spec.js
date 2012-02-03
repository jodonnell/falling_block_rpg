describe("Square", function() {
    var square;

    beforeEach(function() {
	square = new Square();
    });

    it("should have a canvas element", function() {
	expect($('#drawCanvas').length).toEqual(1);
    });

});
