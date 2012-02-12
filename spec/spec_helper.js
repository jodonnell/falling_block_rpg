beforeEach(function() {
    this.addMatchers({
        toContainBlock: function(expected) {
            for (var i = 0; i < this.actual.length; i++) {
                if (this.actual[i].isEqual(expected))
                    return true;
            }
            return false;
        }
    });
});
