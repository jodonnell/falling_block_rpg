var Combatant = Class.extend({
    init: function(hp) {
        this.hp = hp;
        this.max_hp = hp;
        this.xp = 0;
        this.level = 1;
    },

    addXp: function(xp) {
        this.xp += xp;
        if (this.didGainLevel())
            this.gainLevel();
    },

    didGainLevel: function() {
        return this.xp >= 100;
    },

    gainLevel: function() {
        this.level++;
        this.max_hp += 10;
        this.hp = this.max_hp;
    }
});
