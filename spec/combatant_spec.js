describe("Combatant", function() {
    it("should be able to covert to normal position", function() {
        var combatant = new Combatant(100);
        expect(combatant.hp).toEqual(100);
    });
});
