var BlockFall = Class.extend({
    RIGHT_BOUND: 520,
    BOTTOM_BOUND: 320,

    init: function() {
        this.createCanvas();
        this.context = $('#drawCanvas').get(0).getContext("2d");
        this.shapes = [];
        this.frameSkipCounter = 0;

        this.isMovingLeft = false;
        this.isMovingRight = false;
    },

    createCanvas: function() {
        var width = $(document).width();
        var height = $(document).height();

        var canvas = '<canvas id="drawCanvas" width="' + width + '" height="' + height + '"></canvas>';
        $('body').append(canvas);
        $("#drawCanvas").css('position', 'absolute');
        $("#drawCanvas").css('top', '0px');
        $("#drawCanvas").css('left', '0px');
        $("#drawCanvas").css('z-index', '-1');
    },

    drawBlock: function(grid, color) {
        var x = grid.getX();
        var y = grid.getY();
        this.context.fillStyle = color;
        this.context.fillRect(x, y, 20, 20);

        this.context.strokeStyle = "black";
        this.context.strokeRect(x, y, 20, 20);
    },

    drawBorder: function() {
        for (var i = 0; i < 16; i++)
            this.drawBlock(new Grid(i, 0), "grey");

        for (var i = 0; i < 16; i++)
            this.drawBlock(new Grid(i, 25), "grey");

        for (var i = 1; i < 25; i++)
            this.drawBlock(new Grid(0, i), "grey");

        for (var i = 1; i < 25; i++)
            this.drawBlock(new Grid(15, i), "grey");
    },

    createShape: function() {
        var randomNumber = Math.floor(Math.random()*2);
        if (randomNumber === 1)
            this.createSquare();
        else
            this.createJ();
    },

    createJ: function() {
        this.shapes.push(new J(new Grid(7, 1)));
    },

    createSquare: function() {
        this.shapes.push(new Square(new Grid(7, 1)));
    },

    drawShapes: function(x, y) {
        for (var i = 0; i < this.shapes.length; i++)
            this.drawBlocks(this.shapes[i].drawShape());
    },

    drawBlocks: function(blocks) {
        for (var i = 0; i < blocks.length; i++)
            this.drawBlock.apply(this, blocks[i]);
    },

    drawScreen: function() {
        this.drawBackground();
        this.drawBorder();
        this.drawShapes();
    },

    update: function(speedFall) {
        this.frameSkipCounter++;
        if (this.shapes.length == 0)
            this.createShape();

        this.fall(speedFall);

        if (this.isShapeLocked())
            this.createShape();

        if (this.frameSkipCounter == 60)
            this.frameSkipCounter = 0;
    },

    shouldFall: function(speedFall) {
        return ((this.frameSkipCounter % 20) == 0 || speedFall) && !this.isShapeLocked();
    },

    fall: function(speedFall) {
        if (this.shouldFall(speedFall))
            this.lastShape().fall();
    },

    isShapeLocked: function() {
        return this.lastShape().grid.isAtBottom() || this.doesBottomCollide();
    },

    doesBottomCollide: function() {
        for (var i = 0; i < this.shapes.length - 1; i++) {
            if (this.lastShape().isShapeBelow(this.shapes[i]))
                return true;
        }
        return false;
    },

    doesRightCollide: function() {
        for (var i = 0; i < this.shapes.length - 1; i++) {
            if (this.lastShape().isShapeToRight(this.shapes[i]))
                return true;
        }
        return false;
    },

    doesLeftCollide: function() {
        for (var i = 0; i < this.shapes.length - 1; i++) {
            if (this.lastShape().isShapeToLeft(this.shapes[i]))
                return true;
        }
        return false;
    },

    lastShape: function() {
        return this.shapes[this.shapes.length - 1];
    },

    moveRight: function() {
        if (!this.doesRightCollide())
            this.lastShape().moveRight();
    },

    moveLeft: function() {
        if (!this.doesLeftCollide())
            this.lastShape().moveLeft();
    },

    drawBackground: function() {
        this.context.fillStyle = "black";
        this.context.fillRect(0, 0, this.BOTTOM_BOUND, this.RIGHT_BOUND);
    }
});
