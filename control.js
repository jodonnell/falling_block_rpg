var Control = Class.extend({
    LEFT_KEY: 37,
    UP_KEY: 38,
    RIGHT_KEY: 39,
    DOWN_KEY: 40,

    init: function() {
        this.left = 0;
        this.right = 0;
        this.down = 0;
        this.up = 0;
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
            case this.LEFT_KEY: ; break;
            case this.RIGHT_KEY: ; break;
            case this.UP_KEY: ; break;
            case this.DOWN_KEY: this.down = 0; break;
            }
        }, this));
    },

    isMovingRight: function() {
        var old_right = this.right;
        this.right = 0;
        return old_right;
    },

    isMovingLeft: function() {
        var old_left = this.left;
        this.left = 0;
        return old_left;
    },

    isRotating: function() {
        var old_up = this.up;
        this.up = 0;
        return old_up;
    },

    isMovingDown: function() {
        return this.down;
    }
});
