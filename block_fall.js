var BlockFall = Class.extend({
    init: function() {
        this.createCanvas();
        this.shapes = [];
        this.blocks = [];
        this.frameSkipCounter = 0;

        this.draw = new Draw();
        this.createShape = new CreateShape();
        this.collisionDetection = new CollisionDetection();
    },

    createCanvas: function() {
        var width = $(document).width();
        var height = $(document).height();

        var canvas = '<canvas id="drawCanvas" width="' + width + '" height="' + height + '"></canvas>';
        $('body').append(canvas);
        $("#drawCanvas").css('position', 'absolute');
        $("#drawCanvas").css('top', '0px');
        $("#drawCanvas").css('left', '0px');
    },

    addShape: function(shape) {
        this.shapes.push(shape);
    },

    drawScreen: function() {
        this.draw.background();
        this.draw.border();
        this.draw.shapes(this.shapes);
    },

    update: function(speedFall) {
        this.frameSkipCounter++;

        this.process(speedFall);

        if (this.frameSkipCounter == 60)
            this.frameSkipCounter = 0;
    },

    process: function(speedFall) {
        if (this.shapes.length == 0)
            this.addShape(this.createShape.randomShape());

        this.fall(speedFall);

        if (this.isFallingShapeLocked()) {
            this.completedLines();
            this.breakIntoBlocks();
            this.addShape(this.createShape.randomShape());
        }
    },

    shouldFall: function(speedFall) {
        return ((this.frameSkipCounter % 20) == 0 || speedFall) && !this.isFallingShapeLocked();
    },

    fall: function(speedFall) {
        if (this.shouldFall(speedFall))
            this.fallingShape().fall();
    },

    isFallingShapeLocked: function() {
        return this.collisionDetection.isAtBottom(this.fallingShape()) || this.collisionDetection.doesBottomCollide(this.fallingShape(), this.blocks);
    },

    fallingShape: function() {
        return this.shapes[this.shapes.length - 1];
    },

    lockedShapes: function() {
        return this.shapes.slice(0, this.shapes.length - 1);
    },

    moveRight: function() {
        if (!this.collisionDetection.doesRightCollide(this.fallingShape(), this.blocks) && !this.collisionDetection.isAtRightBound(this.fallingShape()))
            this.fallingShape().moveRight();
    },

    moveLeft: function() {
        if (!this.collisionDetection.doesLeftCollide(this.fallingShape(), this.blocks) && !this.collisionDetection.isAtLeftBound(this.fallingShape()))
            this.fallingShape().moveLeft();
    },

    rotate: function() {
        this.fallingShape().rotate();
    },

    completedLines: function() {

    },

    breakIntoBlocks: function() {
        var blocks = this.fallingShape().occupiedSquares();
        for (var i = 0; i < blocks.length; i++)
            this.blocks.push(blocks[i]);
    }
});
