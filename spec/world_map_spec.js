describe("WorldMap", function() {
    var worldMap;
    var gameInit;

    beforeEach(function() {
        gameInit = new GameInit(true);
        worldMap = new WorldMap(window.Images, new Control());
        sinon.spy(worldMap.context, "drawImage");
    });

    afterEach(function() {
        sinon.spy(worldMap.context.drawImage.restore());
        gameInit.destroyCanvas();
    });

    it("should draw an image", function() {
        worldMap.draw();
        expect(worldMap.context.drawImage.callCount).toEqual(301);
    });


    it("should let you move left", sinon.test(function() {
        var worldMap = stubControl.call(this, 'isMovingLeft');
        this.stub(worldMap, 'cecilWalkLeftFrame');
        worldMap.update();
        expect(worldMap.cecilWalkLeftFrame.callCount).toEqual(1);

    }));

    it("should let you move up", sinon.test(function() {
        var worldMap = stubControl.call(this, 'isHardDropping');
        this.stub(worldMap, 'cecilWalkUpFrame');
        worldMap.update();
        expect(worldMap.cecilWalkUpFrame.callCount).toEqual(1);
    }));

    it("should let you move right", sinon.test(function() {
        var worldMap = stubControl.call(this, 'isMovingRight');
        this.stub(worldMap, 'cecilWalkRightFrame');
        worldMap.update();
        expect(worldMap.cecilWalkRightFrame.callCount).toEqual(1);
    }));

    it("should let you move down", sinon.test(function() {
        var worldMap = stubControl.call(this, 'isSoftDropping');
        this.stub(worldMap, 'cecilWalkDownFrame');
        worldMap.update();
        expect(worldMap.cecilWalkDownFrame.callCount).toEqual(1);
    }));

    function stubControl(directionMethod) {
        var control = new Control();
        var stub = this.stub(control, directionMethod).returns(true);
        return new WorldMap(window.Images, control);
    };

});
