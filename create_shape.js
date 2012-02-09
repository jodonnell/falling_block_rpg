var CreateShape = Class.extend({
    init: function() {
    },

    randomShape: function() {
        var randomNumber = Math.floor(Math.random()*3);
        if (randomNumber === 1)
            return this.o();
        else if (randomNumber === 2)
            return this.l();
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
    }
});
