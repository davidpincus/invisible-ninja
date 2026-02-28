class BootScene extends Phaser.Scene {
    constructor() {
        super({ key: 'BootScene' });
    }

    preload() {
        const width = this.cameras.main.width;
        const height = this.cameras.main.height;

        const progressBg = this.add.graphics();
        progressBg.fillStyle(0x2a1a4e, 1);
        progressBg.fillRoundedRect(width / 2 - 200, height / 2 - 15, 400, 30, 8);

        this.add.text(width / 2, height / 2 - 50, 'The Invisible Ninja is getting ready...', {
            fontFamily: 'Arial, sans-serif',
            fontSize: '24px',
            color: '#b39ddb',
        }).setOrigin(0.5);

        this.loadProgress = 0;
    }

    create() {
        // Generate all sprites and tiles
        const spriteGen = new SpriteGenerator(this);
        spriteGen.generateAll();

        const tileGen = new TileGenerator(this);
        tileGen.generateAll();

        // Transition to title
        this.cameras.main.fadeOut(500, 0, 0, 0);
        this.cameras.main.once('camerafadeoutcomplete', () => {
            this.scene.start('TitleScene');
        });
    }
}
