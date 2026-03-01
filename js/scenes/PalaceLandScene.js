class PalaceLandScene extends BaseLandScene {
    constructor() {
        super('PalaceLandScene', 'halloween');
    }

    getLandName() { return 'Halloween Palace Grounds'; }

    create() {
        this.mapWidth = 1600;
        this.mapHeight = 1200;
        super.create();

        // Royal costume chest (separate from post-game 5-outfit system)
        this.royalChest = null;
        if (!progressTracker.getCostumesUnlocked().includes(10)) {
            const cx = 900, cy = 500;
            const chest = this.add.image(cx, cy, 'costume_chest').setDepth(85);
            this.tweens.add({
                targets: chest, scale: 1.1, duration: 800,
                yoyo: true, repeat: -1, ease: 'Sine.easeInOut',
            });
            const label = this.add.text(cx, cy - 24, 'Royal Outfit!', {
                fontFamily: 'Arial, sans-serif', fontSize: '12px', fontStyle: 'bold',
                color: '#ffd700', stroke: '#000000', strokeThickness: 2,
            }).setOrigin(0.5).setDepth(86);
            this.tweens.add({
                targets: label, y: cy - 28, duration: 500,
                yoyo: true, repeat: -1, ease: 'Sine.easeInOut',
            });
            this.royalChest = { sprite: chest, label: label, x: cx, y: cy };
        }
    }

    getHouses() {
        return [
            { id: 'palace_interior', doorX: 800, doorY: 340 },
        ];
    }

    getSpiders() {
        return [
            { id: 'palace_spider_1', x: 400, y: 600, patrolX1: 350, patrolY1: 570, patrolX2: 480, patrolY2: 650, sprite: 'spider_rainbow' },
            { id: 'palace_spider_2', x: 1200, y: 700, patrolX1: 1140, patrolY1: 660, patrolX2: 1280, patrolY2: 760, sprite: 'spider_rainbow' },
        ];
    }

    getCollectibles() {
        return [
            { id: 'palace_egg_0', x: 300, y: 400, type: 'halloween_pumpkin' },
            { id: 'palace_egg_1', x: 1300, y: 500, type: 'halloween_ghost' },
            { id: 'palace_egg_2', x: 600, y: 900, type: 'halloween_candy' },
        ];
    }

    getWaterZones() {
        return [];
    }

    createMap() {
        // Dark stone ground
        for (let x = 0; x < this.mapWidth; x += 32) {
            for (let y = 0; y < this.mapHeight; y += 32) {
                this.add.image(x + 16, y + 16, 'tile_stone');
            }
        }

        // Dark grass patches along edges
        this.fillArea(0, 0, this.mapWidth, 96, 'tile_grass');
        this.fillArea(0, this.mapHeight - 96, this.mapWidth, 96, 'tile_grass');
        this.fillArea(0, 0, 96, this.mapHeight, 'tile_grass');
        this.fillArea(this.mapWidth - 96, 0, 96, this.mapHeight, 'tile_grass');

        // Path from entrance to palace
        this.pathLine(800, this.mapHeight - 100, 800, 340, 'tile_path');
        // Side paths
        this.pathLine(300, 600, 1300, 600, 'tile_path');
        this.pathLine(800, 600, 800, 900, 'tile_path');

        // --- Palace building ---
        const palaceG = this.add.graphics().setDepth(79);
        const px = 650, py = 150;
        // Main structure
        palaceG.fillStyle(0x0d0518);
        palaceG.fillRect(px, py, 300, 200);
        // Towers
        palaceG.fillRect(px - 30, py - 50, 60, 250);
        palaceG.fillRect(px + 270, py - 50, 60, 250);
        // Tower roofs
        palaceG.fillStyle(0x4a148c);
        palaceG.fillTriangle(px - 30, py - 50, px, py - 100, px + 30, py - 50);
        palaceG.fillTriangle(px + 270, py - 50, px + 300, py - 100, px + 330, py - 50);
        // Central spire
        palaceG.fillStyle(0x0d0518);
        palaceG.fillRect(px + 120, py - 30, 60, 230);
        palaceG.fillStyle(0x4a148c);
        palaceG.fillTriangle(px + 120, py - 30, px + 150, py - 80, px + 180, py - 30);
        // Windows
        palaceG.fillStyle(0xffa000, 0.6);
        for (let row = 0; row < 2; row++) {
            for (let col = 0; col < 3; col++) {
                palaceG.fillRect(px + 40 + col * 90, py + 40 + row * 60, 16, 24);
            }
        }
        // Tower windows
        palaceG.fillRect(px - 15, py, 12, 18);
        palaceG.fillRect(px + 285, py, 12, 18);
        // Door
        palaceG.fillStyle(0x4a148c);
        palaceG.fillRoundedRect(px + 125, py + 140, 50, 60, { tl: 25, tr: 25, bl: 0, br: 0 });
        palaceG.fillStyle(0xffd700);
        palaceG.fillCircle(px + 160, py + 170, 3);

        // Pumpkin decorations
        const pumpkinPositions = [
            [400, 550], [500, 520], [1100, 530], [1200, 560],
            [700, 380], [900, 380], [600, 800], [1000, 850],
        ];
        pumpkinPositions.forEach(([ppx, ppy]) => {
            const pg = this.add.graphics().setDepth(81);
            pg.fillStyle(0xff8f00);
            pg.fillEllipse(ppx, ppy, 20, 16);
            pg.fillStyle(0xf57f17);
            pg.fillEllipse(ppx, ppy, 12, 14);
            pg.fillStyle(0x33691e);
            pg.fillRect(ppx - 1.5, ppy - 10, 3, 5);
            // Face
            pg.fillStyle(0xffd700, 0.8);
            pg.fillTriangle(ppx - 4, ppy - 3, ppx - 2, ppy - 6, ppx, ppy - 3);
            pg.fillTriangle(ppx + 4, ppy - 3, ppx + 2, ppy - 6, ppx, ppy - 3);
        });

        // Torches along paths
        const torchPositions = [
            [750, 400], [850, 400], [750, 600], [850, 600],
            [400, 600], [1200, 600], [800, 900],
        ];
        torchPositions.forEach(([tx, ty]) => {
            this.add.image(tx, ty, 'tiki_torch').setDepth(81);
        });

        // Dead trees
        const treePositions = [
            [200, 300], [1400, 250], [150, 800], [1450, 900],
            [500, 1000], [1100, 1000], [300, 150], [1300, 180],
        ];
        treePositions.forEach(([tx, ty]) => {
            const tree = this.add.graphics().setDepth(80);
            tree.fillStyle(0x3e2723);
            tree.fillRect(tx - 3, ty - 20, 6, 40);
            // Bare branches
            tree.lineStyle(2, 0x4e342e);
            tree.lineBetween(tx, ty - 18, tx - 14, ty - 30);
            tree.lineBetween(tx, ty - 12, tx + 12, ty - 26);
            tree.lineBetween(tx - 14, ty - 30, tx - 20, ty - 36);
            tree.lineBetween(tx + 12, ty - 26, tx + 18, ty - 34);
        });

        // Bats flying around
        for (let i = 0; i < 5; i++) {
            const bat = this.add.graphics().setDepth(200);
            const bx = 200 + Math.random() * (this.mapWidth - 400);
            const by = 100 + Math.random() * 400;
            bat.fillStyle(0x1a1a1a);
            bat.fillTriangle(-8, 0, 0, -4, -2, 2);
            bat.fillTriangle(8, 0, 0, -4, 2, 2);
            bat.fillCircle(0, 0, 3);
            bat.setPosition(bx, by);
            this.tweens.add({
                targets: bat,
                x: bx + (Math.random() - 0.5) * 200,
                y: by + (Math.random() - 0.5) * 80,
                duration: 3000 + Math.random() * 2000,
                yoyo: true, repeat: -1, ease: 'Sine.easeInOut',
            });
        }

        // Fences
        for (let x = 96; x < this.mapWidth - 96; x += 32) {
            this.add.image(x + 16, 96, 'fence').setDepth(81);
            this.add.image(x + 16, this.mapHeight - 96, 'fence').setDepth(81);
        }
        for (let y = 96; y < this.mapHeight - 96; y += 32) {
            this.add.image(96, y + 16, 'fence').setDepth(81);
            this.add.image(this.mapWidth - 96, y + 16, 'fence').setDepth(81);
        }
    }

    createParticles() {
        // Spooky floating wisps
        this.time.addEvent({
            delay: 1500,
            loop: true,
            callback: () => {
                const wisp = this.add.graphics();
                wisp.fillStyle(0xb39ddb, 0.3 + Math.random() * 0.3);
                wisp.fillCircle(0, 0, 3 + Math.random() * 4);
                wisp.setPosition(
                    this.cameras.main.scrollX + Math.random() * 1024,
                    this.cameras.main.scrollY + Math.random() * 768
                ).setDepth(200);
                this.tweens.add({
                    targets: wisp,
                    x: wisp.x + (Math.random() - 0.5) * 100,
                    y: wisp.y - 80 - Math.random() * 100,
                    alpha: 0,
                    duration: 3000 + Math.random() * 2000,
                    onComplete: () => wisp.destroy(),
                });
            },
        });
    }

    enterHouse(house) {
        if (house.id === 'palace_interior') {
            this.cameras.main.fadeOut(300);
            this.cameras.main.once('camerafadeoutcomplete', () => {
                this.scene.start('PalaceInteriorScene', {
                    returnScene: 'PalaceLandScene',
                });
            });
        } else {
            super.enterHouse(house);
        }
    }

    update(time, delta) {
        super.update(time, delta);

        // Royal costume chest proximity
        if (this.royalChest) {
            const dist = Phaser.Math.Distance.Between(
                this.player.x, this.player.y,
                this.royalChest.x, this.royalChest.y
            );
            if (dist < 50) {
                this.openRoyalChest();
            }
        }
    }

    openRoyalChest() {
        if (!this.royalChest) return;

        progressTracker.unlockCostume(10);
        this.currentCostume = 10;

        // Update player appearance
        const prefix = this.isSwimming ? 'axolotl_swim_' : 'axolotl_';
        this.player.setTexture(`${prefix}${this.currentCostume}_${this.playerDir}_${this.playerFrame}`);

        // Sparkle burst on player
        for (let i = 0; i < 12; i++) {
            const angle = (i / 12) * Math.PI * 2;
            const ps = this.add.image(this.player.x, this.player.y, 'sparkle')
                .setScale(0.8).setDepth(200).setTint(0xffd700);
            this.tweens.add({
                targets: ps,
                x: this.player.x + Math.cos(angle) * 50,
                y: this.player.y + Math.sin(angle) * 40,
                alpha: 0, scale: 0, duration: 600, delay: i * 30,
                onComplete: () => ps.destroy(),
            });
        }

        const chestSprite = this.royalChest.sprite;
        const chestLabel = this.royalChest.label;

        this.tweens.add({
            targets: chestSprite,
            y: chestSprite.y - 30, alpha: 0, scale: 1.5,
            duration: 400,
            onComplete: () => {
                chestSprite.destroy();
                chestLabel.destroy();
            },
        });

        // Sparkle burst at chest location
        const cx = this.royalChest.x;
        const cy = this.royalChest.y;
        for (let i = 0; i < 10; i++) {
            const sparkle = this.add.image(
                cx + (Math.random() - 0.5) * 40,
                cy + (Math.random() - 0.5) * 30,
                'sparkle'
            ).setDepth(200).setTint(0xffd700);
            this.tweens.add({
                targets: sparkle, alpha: 0, scale: 0, y: sparkle.y - 30,
                duration: 500, delay: i * 40,
                onComplete: () => sparkle.destroy(),
            });
        }

        this.dialogSystem.show('New Outfit!',
            'You found the Royal Ninja outfit! A golden robe with a magnificent crown! Fit for the true Ninja Champion!');

        this.royalChest = null;
    }
}
