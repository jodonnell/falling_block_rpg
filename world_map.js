var WorldMap = Class.extend({
    LEFT: 1,
    UP: 2,
    RIGHT: 3,
    DOWN: 4,

    init: function(images, control) {
        this.context = $('#gameCanvas').get(0).getContext("2d");
        this.images = images;
        this.control = control;
        this.direction = this.UP;
    },

    draw: function() {
        for (var i = 0; i < 20; i++)
            for (var j = 0; j < 15; j++)
                this.context.drawImage(this.images.grass, i * 60, j * 60);

        if (this.direction == this.UP)
            this.cecilWalkUpFrame();
        else if (this.direction == this.LEFT)
            this.cecilWalkLeftFrame();
        else if (this.direction == this.RIGHT)
            this.cecilWalkRightFrame();
        else if (this.direction == this.DOWN)
            this.cecilWalkDownFrame();
    },

    update: function() {
        this.respondToControls();
        this.draw();
    },

    respondToControls: function(input, arena) {
        if (this.control.isMovingRight())
            this.moveRight();
        if (this.control.isMovingLeft())
            this.moveLeft();
        if (this.control.isHardDropping())
            this.moveUp();
        if (this.control.isSoftDropping())
            this.moveDown();
    },

    cecilWalkUpFrame: function() {
        this.context.drawImage.apply(this.context, [this.images.cecil, 0, 0, 60, 60].concat(this.centerOfScreen()).concat([60, 60]));
    },

    cecilWalkRightFrame: function() {
        this.context.drawImage.apply(this.context, [this.images.cecil, 395, 0, 45, 60].concat(this.centerOfScreen()).concat([45, 60]));
    },

    cecilWalkDownFrame: function() {
        this.context.drawImage.apply(this.context, [this.images.cecil, 230, 0, 45, 60].concat(this.centerOfScreen()).concat([45, 60]));
    },

    moveRight: function() {
        this.direction = this.RIGHT;
    },

    moveLeft: function() {
        this.direction = this.LEFT;
    },

    moveUp: function() {
        this.direction = this.UP;
    },

    moveDown: function() {
        this.direction = this.DOWN;
    },

    cecilWalkLeftFrame: function() {
        this.context.drawImage.apply(this.context, [this.images.cecil, 120, 0, 45, 60].concat(this.centerOfScreen()).concat([45, 60]));
    },

    centerOfScreen: function() {
        return [9 * 60, 7 * 60];
    },

    scaleToSize: function() {
        return [60, 60];
    }

});
