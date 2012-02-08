describe("Draw", function() {
    var draw;

    beforeEach(function() {
        draw = new Draw();
        sinon.stub(draw.context, "fillRect");
        sinon.stub(draw.context, "strokeRect");
    });

    afterEach(function() {
        sinon.stub(draw.context.fillRect.restore());
        sinon.stub(draw.context.strokeRect.restore());
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

    it("draw an o", function() {
        draw.shapes([new O(new Grid(7, 1))]);
        expect(draw.context.fillRect.callCount).toEqual(4);
    });

});
