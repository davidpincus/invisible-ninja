const config = {
    type: Phaser.AUTO,
    parent: 'game-container',
    width: 1024,
    height: 768,
    backgroundColor: '#1a1a2e',
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
            debug: false
        }
    },
    input: {
        activePointers: 3
    },
    scene: [
        BootScene,
        TitleScene,
        WorldMapScene,
        EasterIslandScene,
        HannukahIslandScene,
        ChristmasIslandScene,
        ThanksgivingIslandScene,
        MegaMixIslandScene,
        HalloweenPalaceScene,
        DancePartyScene,
        ThroneRoomScene,
        VictoryScene,
        MathChallengeScene,
        HouseInteriorScene
    ]
};

const game = new Phaser.Game(config);
