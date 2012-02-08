var CollisionDetection = Class.extend({
    init: function() {
    },

    doesLeftCollide: function(falling, locked) {
        for (var i = 0; i < locked.length; i++) {
            if (falling.isShapeToLeft(locked[i]))
                return true;
        }
        return false;
    },

    doesRightCollide: function(falling, locked) {
        for (var i = 0; i < locked.length; i++) {
            if (falling.isShapeToRight(locked[i]))
                return true;
        }
        return false;
    },

    doesBottomCollide: function(falling, locked) {
        for (var i = 0; i < locked.length; i++) {
            if (falling.isShapeBelow(locked[i]))
                return true;
        }
        return false;
    },

});
