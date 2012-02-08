var CreateShape = Class.extend({
    init: function() {
    },

    randomShape: function() {
        var randomNumber = Math.floor(Math.random()*2);
        if (randomNumber === 1)
            return this.o();
        else
            return this.j();
    },

    j: function() {
        return new J(new Grid(7, 1));
    },

    o: function() {
        return new Square(new Grid(7, 1));
    }
});
