class WorldMapScene extends Phaser.Scene {
    constructor() {
        super({ key: 'WorldMapScene' });
    }

    create() {
        const w = this.cameras.main.width;
        const h = this.cameras.main.height;

        this.cameras.main.fadeIn(500);

        // Ocean background
        this.add.image(w / 2, h / 2, 'world_map_bg');

        // Decorative wave animation
        for (let i = 0; i < 8; i++) {
            const wave = this.add.graphics();
            wave.fillStyle(0x1976d2, 0.15);
            wave.fillEllipse(Math.random() * w, 100 + i * 90, 200, 12);
            this.tweens.add({
                targets: wave, x: (Math.random() - 0.5) * 60,
                duration: 3000 + Math.random() * 2000,
                yoyo: true, repeat: -1, ease: 'Sine.easeInOut',
            });
        }

        // Title bar
        const titleBg = this.add.graphics();
        titleBg.fillStyle(0x0d0d1e, 0.85);
        titleBg.fillRoundedRect(200, 15, 624, 50, 12);
        titleBg.lineStyle(2, 0x7c4dff);
        titleBg.strokeRoundedRect(200, 15, 624, 50, 12);

        this.add.text(w / 2, 40, 'The Invisible Ninja - Island Map', {
            fontFamily: 'Arial, sans-serif', fontSize: '26px', fontStyle: 'bold',
            color: '#b39ddb',
        }).setOrigin(0.5);

        // Star counter
        const starContainer = this.add.container(w - 80, 40);
        starContainer.add(this.add.image(-20, 0, 'star').setScale(0.8));
        starContainer.add(this.add.text(0, 0, `${progressTracker.getTotalStars()}`, {
            fontFamily: 'Arial, sans-serif', fontSize: '24px', fontStyle: 'bold',
            color: '#ffd700',
        }).setOrigin(0, 0.5));

        // Paths between islands
        const pathG = this.add.graphics();
        pathG.lineStyle(3, 0x42a5f5, 0.4);
        this.drawPath(pathG, 200, 300, 500, 200);  // easter -> hannukah
        this.drawPath(pathG, 500, 200, 800, 300);  // hannukah -> christmas
        this.drawPath(pathG, 800, 300, 500, 500);  // christmas -> thanksgiving
        this.drawPath(pathG, 200, 300, 500, 500);  // easter -> thanksgiving
        this.drawPath(pathG, 500, 500, 500, 650);  // thanksgiving -> megamix

        // Island icons
        this.createLandIcon(200, 300, 'easter', 'icon_easter', 'Easter\nIsland', 'EasterIslandScene');
        this.createLandIcon(500, 200, 'hannukah', 'icon_hannukah', 'Hannukah\nIsland', 'HannukahIslandScene');
        this.createLandIcon(800, 300, 'christmas', 'icon_christmas', 'Christmas\nIsland', 'ChristmasIslandScene');
        this.createLandIcon(500, 500, 'thanksgiving', 'icon_thanksgiving', 'Thanksgiving\nIsland', 'ThanksgivingIslandScene');
        this.createLandIcon(500, 660, 'megamix', 'icon_megamix', 'Mega Mix\nIsland', 'MegaMixIslandScene');

        // Back button
        this.createBackButton();

        // Unlock info
        this.createUnlockInfo();

        // Costume selector (if multiple unlocked)
        const costumes = progressTracker.getCostumesUnlocked();
        if (costumes.length > 1) {
            this.createCostumeSelector();
        }
    }

    drawPath(g, x1, y1, x2, y2) {
        const midX = (x1 + x2) / 2 + (Math.random() - 0.5) * 30;
        const midY = (y1 + y2) / 2 + (Math.random() - 0.5) * 30;
        g.beginPath();
        g.moveTo(x1, y1);
        const steps = 20;
        for (let i = 0; i <= steps; i++) {
            const t = i / steps;
            const px = (1-t)*(1-t)*x1 + 2*(1-t)*t*midX + t*t*x2;
            const py = (1-t)*(1-t)*y1 + 2*(1-t)*t*midY + t*t*y2;
            if (i % 2 === 0) g.moveTo(px, py);
            else g.lineTo(px, py);
        }
        g.strokePath();
    }

    createLandIcon(x, y, landKey, textureKey, label, sceneKey) {
        const isUnlocked = progressTracker.isLandUnlocked(landKey);
        const container = this.add.container(x, y);

        const icon = this.add.image(0, 0, textureKey);
        container.add(icon);

        if (!isUnlocked) {
            icon.setTint(0x333344);
            const lock = this.add.image(0, 0, 'lock_icon').setScale(1.2);
            container.add(lock);
        }

        const nameText = this.add.text(0, 60, label, {
            fontFamily: 'Arial, sans-serif', fontSize: '16px', fontStyle: 'bold',
            color: isUnlocked ? '#ffffff' : '#666688',
            align: 'center', stroke: '#000000', strokeThickness: 3,
        }).setOrigin(0.5);
        container.add(nameText);

        const stars = progressTracker.getLandStars(landKey);
        if (stars > 0) {
            container.add(this.add.text(0, 82, `* ${stars}`, {
                fontFamily: 'Arial, sans-serif', fontSize: '14px',
                color: '#ffd700', stroke: '#000000', strokeThickness: 2,
            }).setOrigin(0.5));
        }

        if (isUnlocked) {
            icon.setInteractive({ useHandCursor: true });
            icon.on('pointerover', () => this.tweens.add({ targets: container, scale: 1.1, duration: 150 }));
            icon.on('pointerout', () => this.tweens.add({ targets: container, scale: 1, duration: 150 }));
            icon.on('pointerdown', () => {
                this.cameras.main.fadeOut(400, 0, 0, 0);
                this.cameras.main.once('camerafadeoutcomplete', () => this.scene.start(sceneKey));
            });
            this.tweens.add({
                targets: container, y: y - 4,
                duration: 1500 + Math.random() * 500,
                yoyo: true, repeat: -1, ease: 'Sine.easeInOut',
            });
        }
    }

    createBackButton() {
        const btn = this.add.container(70, 40);
        const bg = this.add.graphics();
        bg.fillStyle(0x0d0d1e, 0.9);
        bg.fillRoundedRect(-40, -18, 80, 36, 8);
        bg.lineStyle(2, 0x7c4dff);
        bg.strokeRoundedRect(-40, -18, 80, 36, 8);
        btn.add(bg);
        btn.add(this.add.text(0, 0, '< Back', {
            fontFamily: 'Arial, sans-serif', fontSize: '18px', fontStyle: 'bold', color: '#b39ddb',
        }).setOrigin(0.5));
        const hitArea = this.add.rectangle(70, 40, 80, 36, 0x000000, 0).setInteractive({ useHandCursor: true });
        hitArea.on('pointerdown', () => {
            this.cameras.main.fadeOut(300);
            this.cameras.main.once('camerafadeoutcomplete', () => this.scene.start('TitleScene'));
        });
    }

    createUnlockInfo() {
        const total = progressTracker.getTotalStars();
        let nextUnlock = '';
        if (!progressTracker.isLandUnlocked('hannukah')) {
            nextUnlock = `${Math.max(0, 8 - total)} more stars to unlock Hannukah Island!`;
        } else if (!progressTracker.isLandUnlocked('christmas')) {
            nextUnlock = `${Math.max(0, 18 - total)} more stars to unlock Christmas Island!`;
        } else if (!progressTracker.isLandUnlocked('thanksgiving')) {
            nextUnlock = `${Math.max(0, 30 - total)} more stars to unlock Thanksgiving Island!`;
        } else if (!progressTracker.isLandUnlocked('megamix')) {
            nextUnlock = `${Math.max(0, 42 - total)} more stars to unlock Mega Mix Island!`;
        } else if (!progressTracker.isWeblordDefeated()) {
            nextUnlock = "All islands unlocked! Find The Weblord on Mega Mix Island!";
        } else {
            nextUnlock = "You defeated The Weblord! You're the ultimate ninja!";
        }

        if (nextUnlock) {
            const infoBg = this.add.graphics();
            infoBg.fillStyle(0x0d0d1e, 0.8);
            infoBg.fillRoundedRect(212, 710, 600, 40, 8);
            this.add.text(512, 730, nextUnlock, {
                fontFamily: 'Arial, sans-serif', fontSize: '17px',
                color: '#b39ddb', fontStyle: 'italic',
            }).setOrigin(0.5);
        }
    }

    createCostumeSelector() {
        const costumes = progressTracker.getCostumesUnlocked();
        const names = ['Black Ninja', 'Blue Ninja', 'Red Ninja', 'Harvest Ninja', 'Rainbow Ninja'];
        const current = progressTracker.getCurrentCostume();

        const y = 730;
        this.add.text(900, y - 10, 'Costume:', {
            fontFamily: 'Arial, sans-serif', fontSize: '13px', color: '#b39ddb',
        }).setOrigin(0.5);
        this.add.text(900, y + 8, names[current], {
            fontFamily: 'Arial, sans-serif', fontSize: '12px', fontStyle: 'bold', color: '#ffd700',
        }).setOrigin(0.5);
    }
}
