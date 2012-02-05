var Control = Class.extend({
    LEFT_KEY: 37,
    RIGHT_KEY: 39,
    UP_KEY: 38,
    DOWN_KEY: 40,

    init: function() {
        this.left = 0;
        this.right = 0;
        this.up = 0;
        this.down = 0;
        this.getKey();
    },

    getKey: function() {
        $(document).keydown( $.proxy( function(event) {
            switch (event.keyCode) {
            case this.LEFT_KEY: this.left = 1; break;
            case this.UP_KEY: this.up = 1; break;
            case this.RIGHT_KEY: this.right = 1; break;
            case this.DOWN_KEY: this.down = 1; break;
            }
        }, this));
        $(document).keyup( $.proxy( function(event) {
            switch (event.keyCode) {
            case this.LEFT_KEY: this.left = 0; break;
            case this.UP_KEY: this.up = 0; break;
            case this.RIGHT_KEY: this.right = 0; break;
            case this.DOWN_KEY: this.down = 0; break;
            }
        }, this));
    },

    isMovingRight: function() {
        return this.right;
    },

    isMovingLeft: function() {
        return this.left;
    },

    isMovingDown: function() {
        return this.down;
    },

    isMovingUp: function() {
        return this.up;
    }
});
