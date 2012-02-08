describe("Draw", function() {
    var draw;

    beforeEach(function() {
        draw = new Draw();
        sinon.spy(draw.context, "fillRect");
    });

    afterEach(function() {
        sinon.spy(draw.context.fillRect.restore());
    });

    it("draws the border", function() {
        draw.border();
        expect(draw.context.fillRect.callCount).toEqual(80);
    });

    it("draw a block", function() {
        draw.block(new Grid(1, 1), "red");
        expect(draw.context.fillRect.calledOnce).toBeTruthy();
    });

    it("can draw the background", function() {
        draw.background();
        expect(draw.context.fillRect.calledOnce).toBeTruthy();
    });

    it("draw a square", function() {
        draw.shapes([new Square(new Grid(7, 1))]);
        expect(draw.context.fillRect.callCount).toEqual(4);
    });

});
