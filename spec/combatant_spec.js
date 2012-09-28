describe("Combatant", function() {
    it("should have hp", function() {
        var combatant = new Combatant(100);
        expect(combatant.hp).toEqual(100);
    });
});
