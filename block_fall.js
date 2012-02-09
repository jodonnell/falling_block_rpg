var BlockFall = Class.extend({
    init: function() {
        this.createCanvas();
        this.blocks = [];
        this.fallingShape = null;
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

    drawScreen: function() {
        this.draw.background();
        this.draw.border();
        if (this.fallingShape)
            this.draw.shapes(this.fallingShape);


        var array = [];
        for (var i = 0; i < this.blocks.length; i++) {
            array.push([this.blocks[i], "red"]);
        }

        this.draw.blocks(array);
    },

    update: function(speedFall) {
        this.frameSkipCounter++;

        this.process(speedFall);

        if (this.frameSkipCounter == 60)
            this.frameSkipCounter = 0;
    },

    process: function(speedFall) {
        if (!this.fallingShape)
            this.fallingShape = this.createShape.randomShape();

        this.fall(speedFall);

        if (this.isFallingShapeLocked()) {
            this.completedLines();
            this.breakIntoBlocks();
            this.fallingShape = this.createShape.randomShape();
        }
    },

    shouldFall: function(speedFall) {
        return ((this.frameSkipCounter % 20) == 0 || speedFall) && !this.isFallingShapeLocked();
    },

    fall: function(speedFall) {
        if (this.shouldFall(speedFall))
            this.fallingShape.fall();
    },

    isFallingShapeLocked: function() {
        return this.collisionDetection.isAtBottom(this.fallingShape) || this.collisionDetection.doesBottomCollide(this.fallingShape, this.blocks);
    },

    moveRight: function() {
        if (!this.collisionDetection.doesRightCollide(this.fallingShape, this.blocks) && !this.collisionDetection.isAtRightBound(this.fallingShape))
            this.fallingShape.moveRight();
    },

    moveLeft: function() {
        if (!this.collisionDetection.doesLeftCollide(this.fallingShape, this.blocks) && !this.collisionDetection.isAtLeftBound(this.fallingShape))
            this.fallingShape.moveLeft();
    },

    rotate: function() {
        this.fallingShape.rotate();
    },

    completedLines: function() {

    },

    breakIntoBlocks: function() {
        var blocks = this.fallingShape.occupiedSquares();
        for (var i = 0; i < blocks.length; i++)
            this.blocks.push(blocks[i]);
    }
});
