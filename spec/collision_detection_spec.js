describe("CollisionDetection", function() {
    var collisionDetection;

    beforeEach(function() {
        collisionDetection = new CollisionDetection();
    });

    it("should have left collision detection", function() {
        var locked = [new Square(new Grid(5, 1))];
        var falling = new Square(new Grid(7, 1));

        expect(collisionDetection.doesLeftCollide(falling, locked)).toBeTruthy();

        falling = new Square(new Grid(8, 1));
        expect(collisionDetection.doesLeftCollide(falling, locked)).toBeFalsy();
    });

    it("should have right collision detection", function() {
        var locked = [new Square(new Grid(9, 1))];
        var falling = new Square(new Grid(7, 1));

        expect(collisionDetection.doesRightCollide(falling, locked)).toBeTruthy();

        falling = new Square(new Grid(6, 1));
        expect(collisionDetection.doesRightCollide(falling, locked)).toBeFalsy();
    });

    it("should have bottom collision detection", function() {
        var locked = [new Square(new Grid(7, 4))];
        var falling = new Square(new Grid(7, 2));

        expect(collisionDetection.doesBottomCollide(falling, locked)).toBeTruthy();

        falling = new Square(new Grid(7, 1));
        expect(collisionDetection.doesBottomCollide(falling, locked)).toBeFalsy();
    });

});
