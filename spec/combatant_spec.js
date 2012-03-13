describe("Combatant", function() {
    it("should have hp", function() {
        var combatant = new Combatant(100);
        expect(combatant.hp).toEqual(100);
    });

    it("should have xp", function() {
        var combatant = new Combatant(100);
        expect(combatant.xp).toEqual(0);
    });

    it("should be able to give xp", function() {
        var combatant = new Combatant(100);
        combatant.addXp(5);
        expect(combatant.xp).toEqual(5);
    });

    it("should be able to gain levels", function() {
        var combatant = new Combatant(100);
        combatant.addXp(100);
        expect(combatant.level).toEqual(2);
        expect(combatant.max_hp).toEqual(110);
        expect(combatant.hp).toEqual(110);
    });

});
