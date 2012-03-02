var Draw = Class.extend({
    BLOCK_SIZE: 30,
    WIDTH_BLOCKS: 12,
    HEIGHT_BLOCKS: 22,

    init: function(rightBorder, bottomBorder, offsetX, offsetY) {
        this.context = $('#gameCanvas').get(0).getContext("2d");
        this.rightBorder = rightBorder;
        this.bottomBorder = bottomBorder;
        this.offsetX = offsetX;
        this.offsetY = offsetY;
    },

    rightBound: function() {
        return this.WIDTH_BLOCKS * this.BLOCK_SIZE;
    },

    bottomBound: function() {
        return this.HEIGHT_BLOCKS * this.BLOCK_SIZE;
    },

    block: function(block) {
        var x = block.getX();
        var y = block.getY();
        this.blockInner(x + this.offsetX, y + this.offsetY, this.BLOCK_SIZE, this.BLOCK_SIZE, block.color);
        this.blockBorder(x + this.offsetX, y + this.offsetY, this.BLOCK_SIZE, this.BLOCK_SIZE);
    },

    blockInner: function(x, y, width, height, color) {
        this.fill(x, y, width, height, color);
    },

    blockBorder: function(x, y, width, height) {
        this.context.strokeStyle = "black";
        this.context.strokeRect(x, y, width, height);
    },

    blocks: function(blocks) {
        for (var i = 0; i < blocks.length; i++)
            this.block.apply(this, blocks[i]);
    },

    border: function() {
        this.mainPlayAreaBorder();
        this.nextShapeBorder();
    },

    mainPlayAreaBorder: function() {
        for (var i = 0; i <= this.rightBorder + 1; i++)
            this.block(new Block(i, 0, "grey"));

        for (var i = 0; i <= this.rightBorder + 1; i++)
            this.block(new Block(i, this.bottomBorder + 1, "grey"));

        for (var i = 1; i <= this.bottomBorder + 1; i++)
            this.block(new Block(0, i, "grey"));

        for (var i = 1; i <= this.bottomBorder + 1; i++)
            this.block(new Block(this.rightBorder + 1, i, "grey"));
    },

    nextShapeBorder: function() {
        for (var i = this.rightBorder + 1; i <= this.rightBorder + 6; i++)
            this.block(new Block(i, 0, "grey"));

        for (var i = this.rightBorder + 1; i <= this.rightBorder + 6; i++)
            this.block(new Block(i, 4, "grey"));

        for (var i = 0; i <= 4; i++)
            this.block(new Block(this.rightBorder + 6, i, "grey"));
    },

    background: function() {
        this.fillBackground(this.offsetX, this.offsetY, this.rightBound(), this.bottomBound());
    },

    nextShape: function(shape) {
        this.fillBackground(this.rightBound() + this.offsetX, this.offsetY, 5 * this.BLOCK_SIZE, 5 * this.BLOCK_SIZE);
        this.shapes(shape);
    },

    fillBackground: function(x, y, width, height) {
        this.fill(x, y, width, height, "black");
    },

    shapes: function(shape) {
        this.blocks(shape.drawShape());
    },

    score: function(score) {
        this.coverScore();
        this.scoreText(score);
    },

    coverScore: function() {
        this.context.fillStyle = "white";
        this.context.fillRect(this.rightBound() + 5 + this.offsetX, 5.25 * this.BLOCK_SIZE + this.offsetY, 100, 100);
    },

    scoreText: function(score) {
        this.context.fillStyle = "black";
        this.context.font = "bold 18px sans-serif";
        this.context.fillText(score, this.rightBound() + this.offsetX + 20, 6.25 * this.BLOCK_SIZE + this.offsetY);
    },

    fill: function(x, y, width, height, color) {
        this.context.fillStyle = color;
        this.context.fillRect(x, y, width, height);
    }
});
