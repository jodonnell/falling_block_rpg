var Draw = Class.extend({
    RIGHT_BOUND: 240,
    BOTTOM_BOUND: 440,

    init: function(rightBorder, bottomBorder) {
        this.context = $('#drawCanvas').get(0).getContext("2d");
        this.rightBorder = rightBorder;
        this.bottomBorder = bottomBorder;
    },

    block: function(block) {
        var x = block.getX();
        var y = block.getY();
        this.context.fillStyle = block.color;
        this.context.fillRect(x, y, 20, 20);

        this.context.strokeStyle = "black";
        this.context.strokeRect(x, y, 20, 20);
    },

    blocks: function(blocks) {
        for (var i = 0; i < blocks.length; i++)
            this.block.apply(this, blocks[i]);
    },

    border: function() {
        for (var i = 0; i <= this.rightBorder + 1; i++)
            this.block(new Block(i, 0, "grey"));

        for (var i = 0; i <= this.rightBorder + 1; i++)
            this.block(new Block(i, this.bottomBorder + 1, "grey"));

        for (var i = 1; i <= this.bottomBorder + 1; i++)
            this.block(new Block(0, i, "grey"));

        for (var i = 1; i <= this.bottomBorder + 1; i++)
            this.block(new Block(this.rightBorder + 1, i, "grey"));
    },

    background: function() {
        this.context.fillStyle = "black";
        this.context.fillRect(0, 0, this.RIGHT_BOUND, this.BOTTOM_BOUND);
    },

    shapes: function(shape) {
        this.blocks(shape.drawShape());
    }
});
