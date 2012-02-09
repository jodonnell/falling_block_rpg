var Block = Class.extend({
    init: function(x, y, color) {
        this.x = x;
        this.y = y;
        this.color = color;
    },

    getX: function() {
        return this.x * 20;
    },
    
    getY: function() {
        return this.y * 20;
    },

    right: function() {
        return new Block(this.x + 1, this.y, this.color);
    },

    left: function() {
        return new Block(this.x - 1, this.y, this.color);
    },

    bottom: function() {
        return new Block(this.x, this.y + 1, this.color);
    },

    top: function() {
        return new Block(this.x, this.y - 1, this.color);
    },

    bottomRight: function() {
        return new Block(this.x + 1, this.y + 1, this.color);
    },

    isEqual: function(other) {
        return other.x === this.x && other.y === this.y;
    }

});
