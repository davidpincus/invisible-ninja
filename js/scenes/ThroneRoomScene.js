class ThroneRoomScene extends Phaser.Scene {
    constructor() {
        super({ key: 'ThroneRoomScene' });
    }

    create() {
        const w = this.cameras.main.width;
        const h = this.cameras.main.height;
        this.cameras.main.fadeIn(500);

        // Grand throne room background
        const bg = this.add.graphics();
        bg.fillStyle(0x1a0a2e);
        bg.fillRect(0, 0, w, h);

        // Marble floor
        for (let x = 0; x < w; x += 64) {
            for (let y = h / 2; y < h; y += 64) {
                bg.fillStyle((x / 64 + y / 64) % 2 === 0 ? 0x2a1a4e : 0x1a0a3e, 0.8);
                bg.fillRect(x, y, 64, 64);
            }
        }

        // Red carpet
        bg.fillStyle(0xb71c1c, 0.8);
        bg.fillRect(w / 2 - 60, h / 2 + 50, 120, h);
        bg.fillStyle(0xd32f2f, 0.5);
        bg.fillRect(w / 2 - 50, h / 2 + 50, 100, h);
        bg.fillStyle(0xffd700, 0.4);
        bg.fillRect(w / 2 - 60, h / 2 + 50, 4, h);
        bg.fillRect(w / 2 + 56, h / 2 + 50, 4, h);

        // Walls
        bg.fillStyle(0x2d1b4e, 0.6);
        bg.fillRect(0, 0, w, h / 2 + 50);

        // Pillars
        for (let i = 0; i < 4; i++) {
            const px = 100 + i * (w - 200) / 3;
            bg.fillStyle(0xbdbdbd);
            bg.fillRect(px - 15, 100, 30, h / 2);
            bg.fillStyle(0xe0e0e0);
            bg.fillRect(px - 10, 100, 20, h / 2);
            bg.fillStyle(0xffd700);
            bg.fillRect(px - 20, 90, 40, 15);
        }

        // Throne
        const throneX = w / 2;
        const throneY = h / 2 - 40;

        bg.fillStyle(0x6a1b9a);
        bg.fillRoundedRect(throneX - 60, throneY - 100, 120, 140, { tl: 30, tr: 30, bl: 0, br: 0 });
        bg.fillStyle(0x9c27b0, 0.6);
        bg.fillRoundedRect(throneX - 50, throneY - 90, 100, 120, { tl: 25, tr: 25, bl: 0, br: 0 });

        bg.fillStyle(0x4a148c);
        bg.fillRoundedRect(throneX - 55, throneY + 20, 110, 40, 5);
        bg.fillStyle(0x7b1fa2, 0.6);
        bg.fillRoundedRect(throneX - 45, throneY + 25, 90, 30, 4);

        bg.fillStyle(0x6a1b9a);
        bg.fillRect(throneX - 55, throneY, 10, 60);
        bg.fillRect(throneX + 45, throneY, 10, 60);

        // Throne gems
        bg.fillStyle(0xffd700);
        bg.fillCircle(throneX, throneY - 70, 8);
        bg.fillStyle(0xff1744);
        bg.fillCircle(throneX - 25, throneY - 50, 5);
        bg.fillCircle(throneX + 25, throneY - 50, 5);
        bg.fillStyle(0x2196f3);
        bg.fillCircle(throneX - 15, throneY - 30, 4);
        bg.fillCircle(throneX + 15, throneY - 30, 4);

        // Banners
        bg.fillStyle(0x4a148c, 0.7);
        bg.fillRect(w / 2 - 250, 0, 60, 200);
        bg.fillRect(w / 2 + 190, 0, 60, 200);
        bg.fillStyle(0xffd700, 0.5);
        bg.fillCircle(w / 2 - 220, 100, 15);
        bg.fillCircle(w / 2 + 220, 100, 15);

        // Torches
        [[100, 150], [w - 100, 150], [250, 200], [w - 250, 200]].forEach(([tx, ty]) => {
            bg.fillStyle(0x5d4037);
            bg.fillRect(tx - 3, ty, 6, 30);
            bg.fillStyle(0xff6f00);
            bg.fillTriangle(tx, ty - 8, tx - 6, ty + 4, tx + 6, ty + 4);
            bg.fillStyle(0xffd54f);
            bg.fillTriangle(tx, ty - 4, tx - 3, ty + 2, tx + 3, ty + 2);
        });

        // Axolotl walking up to throne
        const axolotl = this.add.image(w / 2, h - 50, 'axolotl_stand').setScale(3).setDepth(10);

        // Sparkle trail during walk
        this.time.addEvent({
            delay: 100, repeat: 28,
            callback: () => {
                if (axolotl.y > throneY + 50) {
                    const s = this.add.image(
                        axolotl.x + (Math.random() - 0.5) * 30,
                        axolotl.y + 20, 'sparkle_small'
                    ).setScale(0.8).setDepth(5).setTint(0xffd700);
                    this.tweens.add({
                        targets: s, alpha: 0, scale: 0, y: s.y + 20,
                        duration: 400, onComplete: () => s.destroy(),
                    });
                }
            },
        });

        // Walk animation
        this.tweens.add({
            targets: axolotl, y: throneY + 35,
            duration: 3000, ease: 'Sine.easeInOut',
            onComplete: () => {
                this.tweens.add({
                    targets: axolotl, scale: 2.5,
                    duration: 500, ease: 'Back.easeOut',
                    onComplete: () => this.showCrown(w / 2, throneY - 10),
                });
            },
        });
    }

    showCrown(x, y) {
        const crown = this.add.image(x, -50, 'crown').setScale(2).setDepth(20);

        this.tweens.add({
            targets: crown, y: y,
            duration: 2000, ease: 'Bounce.easeOut',
            onComplete: () => {
                progressTracker.setCrownObtained();

                // Sparkle explosion
                for (let i = 0; i < 30; i++) {
                    const angle = (i / 30) * Math.PI * 2;
                    const sparkle = this.add.image(x, y, 'sparkle')
                        .setScale(Math.random() + 0.5).setDepth(25)
                        .setTint([0xffd700, 0xff69b4, 0x7c4dff, 0x42a5f5][Math.floor(Math.random() * 4)]);
                    this.tweens.add({
                        targets: sparkle,
                        x: x + Math.cos(angle) * (100 + Math.random() * 100),
                        y: y + Math.sin(angle) * (80 + Math.random() * 80),
                        alpha: 0, scale: 0, duration: 1000, delay: i * 30,
                        onComplete: () => sparkle.destroy(),
                    });
                }

                const w = this.cameras.main.width;

                const victoryText = this.add.text(w / 2, 50,
                    'All Hail the Ninja Champion!', {
                        fontFamily: 'Arial, sans-serif', fontSize: '36px', fontStyle: 'bold',
                        color: '#ffd700', stroke: '#1a0a2e', strokeThickness: 6,
                    }).setOrigin(0.5).setAlpha(0).setDepth(30);
                this.tweens.add({ targets: victoryText, alpha: 1, duration: 500 });

                const subText = this.add.text(w / 2, 100,
                    'You wear the crown with honor!', {
                        fontFamily: 'Arial, sans-serif', fontSize: '22px',
                        color: '#b39ddb', fontStyle: 'italic',
                    }).setOrigin(0.5).setAlpha(0).setDepth(30);
                this.tweens.add({ targets: subText, alpha: 1, duration: 500, delay: 500 });

                const exploreText = this.add.text(w / 2, 150,
                    'Now explore each island for special outfits and hidden treats!', {
                        fontFamily: 'Arial, sans-serif', fontSize: '18px', color: '#66bb6a',
                    }).setOrigin(0.5).setAlpha(0).setDepth(30);
                this.tweens.add({ targets: exploreText, alpha: 1, duration: 500, delay: 1000 });

                // Continue button
                this.time.delayedCall(2000, () => {
                    const continueBtn = this.add.container(w / 2, this.cameras.main.height - 60).setDepth(100);
                    const btnBg = this.add.image(0, 0, 'button_green').setScale(1.3, 1);
                    const btnText = this.add.text(0, -2, 'Explore!', {
                        fontFamily: 'Arial, sans-serif', fontSize: '24px', fontStyle: 'bold', color: '#ffffff',
                    }).setOrigin(0.5);
                    continueBtn.add([btnBg, btnText]);
                    btnBg.setInteractive({ useHandCursor: true });
                    continueBtn.setScale(0);
                    this.tweens.add({ targets: continueBtn, scale: 1, duration: 300, ease: 'Back.easeOut' });
                    btnBg.on('pointerdown', () => {
                        this.cameras.main.fadeOut(500);
                        this.cameras.main.once('camerafadeoutcomplete', () => {
                            this.scene.start('WorldMapScene');
                        });
                    });
                });
            },
        });
    }
}
