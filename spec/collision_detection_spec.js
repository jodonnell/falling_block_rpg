describe("CollisionDetection", function() {
    var collisionDetection;

    beforeEach(function() {
        collisionDetection = new CollisionDetection();
    });

    it("should have left collision detection", function() {
        var locked = [new O(new Grid(5, 1))];
        var falling = new O(new Grid(7, 1));

        expect(collisionDetection.doesLeftCollide(falling, locked)).toBeTruthy();

        falling = new O(new Grid(8, 1));
        expect(collisionDetection.doesLeftCollide(falling, locked)).toBeFalsy();
    });

    it("should have right collision detection", function() {
        var locked = [new O(new Grid(9, 1))];
        var falling = new O(new Grid(7, 1));

        expect(collisionDetection.doesRightCollide(falling, locked)).toBeTruthy();

        falling = new O(new Grid(6, 1));
        expect(collisionDetection.doesRightCollide(falling, locked)).toBeFalsy();
    });

    it("should have bottom collision detection", function() {
        var locked = [new O(new Grid(7, 4))];
        var falling = new O(new Grid(7, 2));

        expect(collisionDetection.doesBottomCollide(falling, locked)).toBeTruthy();

        falling = new O(new Grid(7, 1));
        expect(collisionDetection.doesBottomCollide(falling, locked)).toBeFalsy();
    });

    it("is at bottom", function() {
        var o = new O(new Grid(7,1));
        expect(collisionDetection.isAtBottom(o)).toBeFalsy();

        o = new O(new Grid(1,23));
        expect(collisionDetection.isAtBottom(o)).toBeTruthy();

        var j = new J(new Grid(1,23));
        j.rotate();
        expect(collisionDetection.isAtBottom(j)).toBeTruthy();
    });

    it("cannot go through right wall", function() {
        var j = new J(new Grid(14,1));
        expect(collisionDetection.isAtRightBound(j)).toBeTruthy();
    });

    it("cannot go through left wall", function() {
        var o = new O(new Grid(1,1));
        expect(collisionDetection.isAtLeftBound(o)).toBeTruthy();
    });

});
