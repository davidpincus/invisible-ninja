class TitleScene extends Phaser.Scene {
    constructor() {
        super({ key: 'TitleScene' });
    }

    create() {
        const w = this.cameras.main.width;
        const h = this.cameras.main.height;

        this.cameras.main.fadeIn(500);

        // Dark ninja background
        const bg = this.add.graphics();
        bg.fillStyle(0x0d0d1e);
        bg.fillRect(0, 0, w, h);
        bg.fillStyle(0x1a0a2e, 0.6);
        bg.fillRect(0, 0, w, h / 2);
        bg.fillStyle(0x2a1a4e, 0.3);
        bg.fillEllipse(w / 2, h / 3, w, h / 2);

        // Stars
        for (let i = 0; i < 50; i++) {
            const star = this.add.graphics();
            const sx = Math.random() * w;
            const sy = Math.random() * h * 0.7;
            const size = Math.random() * 2 + 0.5;
            star.fillStyle(0xffffff, Math.random() * 0.5 + 0.2);
            star.fillCircle(sx, sy, size);
            this.tweens.add({
                targets: star, alpha: 0.1,
                duration: 800 + Math.random() * 2000,
                yoyo: true, repeat: -1,
            });
        }

        // Title
        const title1 = this.add.text(w / 2, 120, 'The Invisible', {
            fontFamily: 'Arial, sans-serif', fontSize: '58px', fontStyle: 'bold',
            color: '#b39ddb', stroke: '#1a0a2e', strokeThickness: 6,
        }).setOrigin(0.5);

        const title2 = this.add.text(w / 2, 200, 'NINJA', {
            fontFamily: 'Arial, sans-serif', fontSize: '80px', fontStyle: 'bold',
            color: '#7c4dff', stroke: '#1a0a2e', strokeThickness: 8,
        }).setOrigin(0.5);

        // Animate titles
        this.tweens.add({
            targets: title1, y: 115, duration: 2000,
            yoyo: true, repeat: -1, ease: 'Sine.easeInOut',
        });
        this.tweens.add({
            targets: title2, y: 205, duration: 2000,
            yoyo: true, repeat: -1, ease: 'Sine.easeInOut', delay: 200,
        });

        // Axolotl character
        const axolotl = this.add.image(w / 2, 390, 'axolotl_stand').setScale(5);
        this.tweens.add({
            targets: axolotl, y: 380, duration: 1500,
            yoyo: true, repeat: -1, ease: 'Sine.easeInOut',
        });

        // Ninja sparkles
        this.time.addEvent({
            delay: 200,
            loop: true,
            callback: () => {
                const sparkle = this.add.image(
                    w / 2 + (Math.random() - 0.5) * 240,
                    390 + (Math.random() - 0.5) * 140,
                    'sparkle_small'
                ).setScale(Math.random() + 0.5).setTint(0x7c4dff);
                this.tweens.add({
                    targets: sparkle, alpha: 0, scale: 0, y: sparkle.y - 30,
                    duration: 800, onComplete: () => sparkle.destroy(),
                });
            },
        });

        // Play button
        const playBtn = this.add.container(w / 2, 540);
        const playBg = this.add.image(0, 0, 'button_blue').setScale(1.3, 1.2);
        const playText = this.add.text(0, -2, 'Play!', {
            fontFamily: 'Arial, sans-serif', fontSize: '32px', fontStyle: 'bold', color: '#ffffff',
        }).setOrigin(0.5);
        playBtn.add([playBg, playText]);
        playBg.setInteractive({ useHandCursor: true });

        playBg.on('pointerover', () => playBtn.setScale(1.05));
        playBg.on('pointerout', () => playBtn.setScale(1));
        playBg.on('pointerdown', () => {
            this.cameras.main.fadeOut(400, 0, 0, 0);
            this.cameras.main.once('camerafadeoutcomplete', () => {
                this.scene.start('WorldMapScene');
            });
        });

        // Continue / New
        if (progressTracker.hasSave() && progressTracker.getTotalStars() > 0) {
            playText.setText('Continue');
            const newBtn = this.add.container(w / 2, 620);
            const newBg = this.add.image(0, 0, 'button_orange').setScale(1, 0.8);
            const newText = this.add.text(0, -2, 'New Game', {
                fontFamily: 'Arial, sans-serif', fontSize: '22px', fontStyle: 'bold', color: '#ffffff',
            }).setOrigin(0.5);
            newBtn.add([newBg, newText]);
            newBg.setInteractive({ useHandCursor: true });
            newBg.on('pointerdown', () => {
                progressTracker.resetProgress();
                this.cameras.main.fadeOut(400, 0, 0, 0);
                this.cameras.main.once('camerafadeoutcomplete', () => {
                    this.scene.start('WorldMapScene');
                });
            });

            this.add.text(w / 2, 690, `Stars: ${progressTracker.getTotalStars()}`, {
                fontFamily: 'Arial, sans-serif', fontSize: '18px',
                color: '#ffd700',
            }).setOrigin(0.5);
        }

        // Subtitle
        this.add.text(w / 2, h - 30, "An Axolotl Adventure for Madeline", {
            fontFamily: 'Arial, sans-serif', fontSize: '16px',
            color: '#7c6fae', fontStyle: 'italic',
        }).setOrigin(0.5);
    }
}
