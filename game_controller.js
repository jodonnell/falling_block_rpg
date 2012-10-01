var GameController = Class.extend({
    init: function(gameInit, options) {
        this.gameInit = gameInit;
        var control1 = new Control1();
        var control2 = new Control2();
        this.arenas = new Arenas(this.gameInit.RIGHT_BOUND, this.gameInit.BOTTOM_BOUND, control1, control2, options);
        this.images = new Images();
        this.clearScreen();
        this.hadGameOver = false;

        this.options = options;
    },

    update: function() {
        if (!this.arenas.gameOver)
            this.arenas.update();
        else if (!this.hadGameOver) {
            this.displayWinner();
            this.submitWinner();
            this.hadGameOver = true;
        }
    },

    submitWinner: function() {
        if (this.arenas.winner == 1)
            $.post('/player_wins', {winner: this.options.player1Name, loser: this.options.player2Name});
        else
            $.post('/player_wins', {winner: this.options.player2Name, loser: this.options.player1Name});
    },

    displayWinner: function() {
        var context = $('#gameCanvas').get(0).getContext("2d");
        context.fillStyle = "black";
        context.font = "bold 18px sans-serif";
        context.fillText(this.arenas.winner + ' Wins!', 400, 730);

    },

    resetArena: function() {
        this.arenas = new Arenas(this.gameInit.RIGHT_BOUND, this.gameInit.BOTTOM_BOUND, this.control);
    },

    clearScreen: function() {
        $('#gameCanvas').get(0).width = $('#gameCanvas').get(0).width;
    },

    updateWithTime: function() {
        var startTime = new Date().getTime();
        this.update();
        return new Date().getTime() - startTime;
    }
});
