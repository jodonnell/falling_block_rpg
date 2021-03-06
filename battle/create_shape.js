var CreateShape = Class.extend({
    init: function(randomOff) {
        this.randomOff = randomOff;
        this.createNextShape();
    },

    createNextShape: function() {
        this.nextShape = this._randomShape();
    },

    nextShapeDrawable: function() {
        this.nextShape.block.x = 13;
        this.nextShape.block.y = 2;
        return this.nextShape;
    },

    nextShapePlayable: function() {
        this.nextShape.block.x = 5;
        this.nextShape.block.y = this.nextShape.startingYPos;
        return this.nextShape;
    },

    _randomShape: function() {
        if (this.randomOff)
            return this.j();

        var randomNumber = Math.floor(Math.random()*7);
        if (randomNumber === 1)
            return this.o();
        else if (randomNumber === 2)
            return this.l();
        else if (randomNumber === 3)
            return this.t();
        else if (randomNumber === 4)
            return this.i();
        else if (randomNumber === 5)
            return this.s();
        else if (randomNumber === 6)
            return this.z();
        else
            return this.j();
    },


    j: function() {
        return new J(new Block(5, -1, "red"));
    },

    o: function() {
        return new O(new Block(5, -1, "blue"));
    },

    l: function() {
        return new L(new Block(5, -1, "green"));
    },
    
    t: function() {
        return new T(new Block(5, 0, "orange"));
    },

    i: function() {
        return new I(new Block(5, 0, "magenta"));
    },

    s: function() {
        return new S(new Block(5, 0, "brown"));
    },

    z: function() {
        return new Z(new Block(5, 0, "white"));
    }
});
