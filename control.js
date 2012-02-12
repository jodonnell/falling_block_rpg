var Control = Class.extend({
    LEFT_KEY: 37,
    UP_KEY: 38,
    RIGHT_KEY: 39,
    DOWN_KEY: 40,
    Z_KEY: 90,
    X_KEY: 88,
    Z_DVORAK: 186,
    X_DVORAK: 81,

    init: function() {
        this.left = 0;
        this.right = 0;
        this.softDrop = 0;
        this.hardDrop = 0;
        this.rotatingClockwise = 0;
        this.rotatingCounterClockwise = 0;
        this.getKey();
    },

    getKey: function() {
        $(document).keydown( $.proxy( function(event) {
            switch (event.keyCode) {
            case this.LEFT_KEY: this.left = 1; break;
            case this.RIGHT_KEY: this.right = 1; break;

            case this.DOWN_KEY: this.softDrop = 1; break;
            case this.UP_KEY: this.hardDrop = 1; break;

            case this.Z_KEY: this.rotatingCounterClockwise = 1; break;
            case this.Z_DVORAK: this.rotatingCounterClockwise = 1; break;

            case this.X_KEY: this.rotatingClockwise = 1; break;
            case this.X_DVORAK: this.rotatingClockwise = 1; break;

            }
        }, this));
        $(document).keyup( $.proxy( function(event) {
            switch (event.keyCode) {
            case this.LEFT_KEY: ; break;
            case this.RIGHT_KEY: ; break;
            case this.UP_KEY: this.hardDrop = 0; break;
            case this.DOWN_KEY: this.softDrop = 0; break;
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

    isRotatingClockwise: function() {
        var old_up = this.rotatingClockwise;
        this.rotatingClockwise = 0;
        return old_up;
    },

    isRotatingCounterClockwise: function() {
        var old_up = this.rotatingCounterClockwise;
        this.rotatingCounterClockwise = 0;
        return old_up;
    },

    isSoftDropping: function() {
        return this.softDrop;
    },

    isHardDropping: function() {
        var old_up = this.hardDrop;
        this.hardDrop = 0;
        return old_up;
    }
});
