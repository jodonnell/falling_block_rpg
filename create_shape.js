var CreateShape = Class.extend({
    init: function() {
    },

    randomShape: function() {
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
        return new J(new Block(5, 1, "red"));
    },

    o: function() {
        return new O(new Block(5, 1, "blue"));
    },

    l: function() {
        return new L(new Block(5, 1, "green"));
    },
    
    t: function() {
        return new T(new Block(5, 2, "orange"));
    },

    i: function() {
        return new I(new Block(5, 1, "magenta"));
    },

    s: function() {
        return new S(new Block(5, 2, "brown"));
    },

    z: function() {
        return new Z(new Block(5, 2, "white"));
    }
});
