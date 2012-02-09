var CreateShape = Class.extend({
    init: function() {
    },

    randomShape: function() {
        var randomNumber = Math.floor(Math.random()*6);
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
        else
            return this.j();
    },

    j: function() {
        return new J(new Block(7, 1, "red"));
    },

    o: function() {
        return new O(new Block(7, 1, "blue"));
    },

    l: function() {
        return new L(new Block(7, 1, "green"));
    },
    
    t: function() {
        return new T(new Block(7, 2, "orange"));
    },

    i: function() {
        return new I(new Block(7, 1, "magenta"));
    },

    s: function() {
        return new S(new Block(7, 2, "brown"));
    }

});
