// Room layout data for each holiday house
const HOUSE_LAYOUTS = {
    // Easter Island - Ancient Stone Temple
    easter_house_1: {
        wallColor: 0x8d6e63, floorColor: 0xa0845c, trimColor: 0x5d4037,
        furniture: [
            { type: 'furn_fireplace', x: 500, y: 130 },
            { type: 'furn_bookshelf', x: 200, y: 130 },
            { type: 'furn_table', x: 650, y: 340 },
            { type: 'furn_chair', x: 610, y: 380 },
            { type: 'furn_rug', x: 400, y: 440 },
            { type: 'furn_plant', x: 140, y: 420 },
            { type: 'furn_plant', x: 860, y: 420 },
            { type: 'furn_lamp', x: 300, y: 340 },
            { type: 'furn_painting', x: 400, y: 120 },
            { type: 'furn_chest', x: 800, y: 480, isTreasure: true },
            { type: 'furn_window', x: 700, y: 110 },
        ],
        treasure: { id: 'easter_moai_idol', name: 'Moai Idol', desc: 'A tiny carved Moai statue! The ancient spirits smile upon you!' },
    },
    // Hannukah Island - Synagogue
    hannukah_house_1: {
        wallColor: 0x1a237e, floorColor: 0x283593, trimColor: 0xc0c0c0,
        furniture: [
            { type: 'furn_menorah', x: 500, y: 130 },
            { type: 'furn_bookshelf', x: 200, y: 130 },
            { type: 'furn_bookshelf', x: 800, y: 130 },
            { type: 'furn_table', x: 500, y: 340 },
            { type: 'furn_chair', x: 460, y: 380 },
            { type: 'furn_chair', x: 540, y: 380 },
            { type: 'furn_rug', x: 500, y: 460 },
            { type: 'furn_lamp', x: 140, y: 350 },
            { type: 'furn_lamp', x: 860, y: 350 },
            { type: 'furn_chest', x: 300, y: 500, isTreasure: true },
            { type: 'furn_window', x: 350, y: 110 },
            { type: 'furn_window', x: 650, y: 110 },
        ],
        treasure: { id: 'hannukah_golden_dreidel', name: 'Golden Dreidel', desc: 'A beautiful golden dreidel that spins forever! Nun Gimel Hei Shin!' },
    },
    // Christmas Island - Santa's Workshop
    christmas_house_1: {
        wallColor: 0xb71c1c, floorColor: 0x4e342e, trimColor: 0x2e7d32,
        furniture: [
            { type: 'furn_xmas_tree', x: 200, y: 220 },
            { type: 'furn_fireplace', x: 500, y: 130 },
            { type: 'furn_stocking', x: 500, y: 180 },
            { type: 'furn_table', x: 700, y: 340 },
            { type: 'furn_chair', x: 660, y: 380 },
            { type: 'furn_chair', x: 740, y: 380 },
            { type: 'furn_rug', x: 500, y: 440 },
            { type: 'furn_bookshelf', x: 850, y: 130 },
            { type: 'furn_lamp', x: 140, y: 400 },
            { type: 'furn_chest', x: 350, y: 500, isTreasure: true },
            { type: 'furn_window', x: 350, y: 110 },
            { type: 'furn_window', x: 700, y: 110 },
        ],
        treasure: { id: 'christmas_magic_star', name: 'Magic Star Topper', desc: 'A glowing star for the top of the tree! It sparkles with holiday magic!' },
    },
    // Thanksgiving Island - Cozy Log Cabin
    thanksgiving_house_1: {
        wallColor: 0x6d4c41, floorColor: 0xa0845c, trimColor: 0x4e342e,
        furniture: [
            { type: 'furn_feast_table', x: 500, y: 320 },
            { type: 'furn_chair', x: 380, y: 360 },
            { type: 'furn_chair', x: 460, y: 360 },
            { type: 'furn_chair', x: 540, y: 360 },
            { type: 'furn_chair', x: 620, y: 360 },
            { type: 'furn_fireplace', x: 200, y: 130 },
            { type: 'furn_rug', x: 500, y: 480 },
            { type: 'furn_bookshelf', x: 800, y: 130 },
            { type: 'furn_plant', x: 860, y: 400 },
            { type: 'furn_lamp', x: 140, y: 380 },
            { type: 'furn_chest', x: 760, y: 500, isTreasure: true },
            { type: 'furn_window', x: 400, y: 110 },
            { type: 'furn_window', x: 600, y: 110 },
            { type: 'furn_painting', x: 500, y: 120 },
        ],
        treasure: { id: 'thanksgiving_golden_cornucopia', name: 'Golden Cornucopia', desc: 'A golden horn of plenty overflowing with tiny harvest treats!' },
    },
    // Mega Mix Island - Grand Palace
    megamix_house_1: {
        wallColor: 0x4a148c, floorColor: 0x311b92, trimColor: 0xffd700,
        furniture: [
            { type: 'furn_menorah', x: 200, y: 180 },
            { type: 'furn_xmas_tree', x: 800, y: 220 },
            { type: 'furn_feast_table', x: 500, y: 320 },
            { type: 'furn_chair', x: 420, y: 360 },
            { type: 'furn_chair', x: 580, y: 360 },
            { type: 'furn_fireplace', x: 500, y: 130 },
            { type: 'furn_rug', x: 500, y: 460 },
            { type: 'furn_lamp', x: 140, y: 350 },
            { type: 'furn_lamp', x: 860, y: 350 },
            { type: 'furn_bookshelf', x: 350, y: 130 },
            { type: 'furn_bookshelf', x: 650, y: 130 },
            { type: 'furn_plant', x: 140, y: 480 },
            { type: 'furn_plant', x: 860, y: 480 },
            { type: 'furn_chest', x: 500, y: 520, isTreasure: true },
            { type: 'furn_window', x: 300, y: 110 },
            { type: 'furn_window', x: 700, y: 110 },
            { type: 'furn_painting', x: 500, y: 115 },
        ],
        treasure: { id: 'megamix_rainbow_crystal', name: 'Rainbow Crystal', desc: 'A dazzling crystal that contains the spirit of every holiday! Ultimate treasure!' },
    },
};

class HouseInteriorScene extends Phaser.Scene {
    constructor() {
        super({ key: 'HouseInteriorScene' });
    }

    init(data) {
        this.houseId = data.houseId;
        this.returnScene = data.returnScene;
        this.layout = HOUSE_LAYOUTS[this.houseId];
    }

    create() {
        this.cameras.main.fadeIn(300);

        const w = 1024, h = 768;
        const layout = this.layout;

        if (!layout) {
            // Fallback if layout not found
            this.exitHouse();
            return;
        }

        // Draw room background
        const bg = this.add.graphics();
        // Floor
        bg.fillStyle(layout.floorColor);
        bg.fillRect(0, 0, w, h);
        // Floor pattern (checkerboard)
        for (let tx = 0; tx < w; tx += 64) {
            for (let ty = 160; ty < h; ty += 64) {
                if ((tx + ty) % 128 === 0) {
                    bg.fillStyle(0xffffff, 0.05);
                    bg.fillRect(tx, ty, 64, 64);
                }
            }
        }
        // Wall
        bg.fillStyle(layout.wallColor);
        bg.fillRect(40, 40, w - 80, 120);
        // Wall trim/molding
        bg.fillStyle(layout.trimColor);
        bg.fillRect(40, 155, w - 80, 8);
        bg.fillRect(40, 40, w - 80, 6);
        // Side walls
        bg.fillStyle(layout.trimColor, 0.3);
        bg.fillRect(30, 40, 14, h - 80);
        bg.fillRect(w - 44, 40, 14, h - 80);
        // Baseboard
        bg.fillStyle(layout.trimColor, 0.5);
        bg.fillRect(40, h - 44, w - 80, 6);

        // Place furniture
        this.furnitureSprites = [];
        layout.furniture.forEach(f => {
            const sprite = this.add.image(f.x, f.y, f.type).setDepth(f.y);
            this.furnitureSprites.push({ sprite, data: f });

            // Treasure item sparkles
            if (f.isTreasure && layout.treasure && !progressTracker.hasCollectible(layout.treasure.id)) {
                sprite.sparkleTimer = this.time.addEvent({
                    delay: 400,
                    loop: true,
                    callback: () => {
                        const sparkle = this.add.image(
                            f.x + (Math.random() - 0.5) * 30,
                            f.y + (Math.random() - 0.5) * 20,
                            'sparkle_small'
                        ).setScale(0.6 + Math.random() * 0.6).setDepth(9000);
                        this.tweens.add({
                            targets: sparkle,
                            alpha: 0, scale: 0, y: sparkle.y - 20,
                            duration: 500,
                            onComplete: () => sparkle.destroy(),
                        });
                    },
                });

                // Subtle glow pulse
                this.tweens.add({
                    targets: sprite,
                    alpha: 0.7,
                    duration: 600,
                    yoyo: true,
                    repeat: -1,
                    ease: 'Sine.easeInOut',
                });
            }
        });

        // Exit door at bottom center
        this.add.image(w / 2, h - 28, 'furn_door').setDepth(h - 28);
        this.add.image(w / 2, h - 4, 'furn_doormat').setDepth(h - 4);

        // Player - use axolotl with current costume
        const costume = progressTracker.getCurrentCostume();
        this.costumeIndex = costume;
        this.player = this.physics.add.sprite(w / 2, h - 100, `axolotl_${costume}_down_0`);
        this.player.setCollideWorldBounds(true);
        this.player.setDepth(10000);
        this.player.body.setSize(24, 16);
        this.player.body.setOffset(12, 36);
        this.player.setScale(1.2);
        this.playerDir = 'up';
        this.playerFrame = 0;
        this.animTimer = 0;

        this.physics.world.setBounds(50, 170, w - 100, h - 220);

        // Controls
        this.cursors = this.input.keyboard.createCursorKeys();
        this.wasd = this.input.keyboard.addKeys('W,S,D');

        // Joystick
        this.createJoystick();

        // Interact hint
        this.interactHint = this.add.container(w / 2, 50).setDepth(10001).setVisible(false);
        const hBg = this.add.graphics();
        hBg.fillStyle(0x0d0d1e, 0.9);
        hBg.fillRoundedRect(-100, -18, 200, 36, 10);
        hBg.lineStyle(2, 0x7c4dff);
        hBg.strokeRoundedRect(-100, -18, 200, 36, 10);
        this.interactHint.add(hBg);
        this.interactHintText = this.add.text(0, 0, 'Press Space!', {
            fontFamily: 'Arial, sans-serif', fontSize: '18px', fontStyle: 'bold', color: '#b39ddb',
        }).setOrigin(0.5);
        this.interactHint.add(this.interactHintText);

        // Exit hint
        this.exitHint = this.add.text(w / 2, h - 58, 'Exit', {
            fontFamily: 'Arial, sans-serif', fontSize: '16px', fontStyle: 'bold',
            color: '#b39ddb', stroke: '#000000', strokeThickness: 3,
        }).setOrigin(0.5).setDepth(10001).setVisible(false);

        // Keyboard interaction
        this.input.keyboard.on('keydown-SPACE', () => this.handleInteract());
        this.input.keyboard.on('keydown-ENTER', () => this.handleInteract());

        // Treasure popup state
        this.showingTreasure = false;

        // Back button
        const backHit = this.add.rectangle(60, 30, 90, 32, 0x000000, 0)
            .setDepth(10002).setInteractive({ useHandCursor: true });
        backHit.on('pointerdown', () => {
            if (!this.showingTreasure) this.exitHouse();
        });
        const backBtn = this.add.container(60, 30).setDepth(10001);
        const backBg = this.add.graphics();
        backBg.fillStyle(0x0d0d1e, 0.9);
        backBg.fillRoundedRect(-45, -16, 90, 32, 8);
        backBg.lineStyle(2, 0x7c4dff);
        backBg.strokeRoundedRect(-45, -16, 90, 32, 8);
        backBtn.add(backBg);
        backBtn.add(this.add.text(0, 0, '< Exit', {
            fontFamily: 'Arial, sans-serif', fontSize: '16px', fontStyle: 'bold', color: '#b39ddb',
        }).setOrigin(0.5));

        // Room label
        this.add.text(w / 2, 24, this.getRoomName(), {
            fontFamily: 'Arial, sans-serif', fontSize: '20px', fontStyle: 'bold',
            color: '#ffffff', stroke: '#000000', strokeThickness: 4,
        }).setOrigin(0.5).setDepth(10001);

        // Treasure count
        const treasureCount = this.getTreasureCount();
        if (treasureCount > 0) {
            this.add.text(w - 80, 24, `${treasureCount}/5`, {
                fontFamily: 'Arial, sans-serif', fontSize: '18px', fontStyle: 'bold',
                color: '#ffd700', stroke: '#000000', strokeThickness: 3,
            }).setOrigin(0.5).setDepth(10001);
        }
    }

    getTreasureCount() {
        let count = 0;
        const treasureIds = [
            'easter_moai_idol', 'hannukah_golden_dreidel', 'christmas_magic_star',
            'thanksgiving_golden_cornucopia', 'megamix_rainbow_crystal',
        ];
        treasureIds.forEach(id => {
            if (progressTracker.hasCollectible(id)) count++;
        });
        return count;
    }

    getRoomName() {
        if (this.houseId.includes('easter')) return 'Ancient Temple';
        if (this.houseId.includes('hannukah')) return 'Synagogue';
        if (this.houseId.includes('christmas')) return "Santa's Workshop";
        if (this.houseId.includes('thanksgiving')) return 'Harvest Cabin';
        if (this.houseId.includes('megamix')) return 'Grand Palace';
        return 'House';
    }

    createJoystick() {
        this.joystickBase = this.add.image(140, 620, 'joystick_base').setDepth(10001).setAlpha(0.6);
        this.joystickThumb = this.add.image(140, 620, 'joystick_thumb').setDepth(10002).setAlpha(0.8);
        this.joystickActive = false;
        this.joystickVector = { x: 0, y: 0 };
        this.joystickRadius = 50;

        this.joystickZone = this.add.rectangle(160, 580, 320, 380, 0x000000, 0)
            .setDepth(10000).setInteractive();
        this.joystickZone.on('pointerdown', (pointer) => {
            if (this.showingTreasure) return;
            this.joystickActive = true;
            this.joystickBase.setPosition(pointer.x, pointer.y);
            this.joystickThumb.setPosition(pointer.x, pointer.y);
            this.joystickBase.setAlpha(0.8);
        });
        this.input.on('pointermove', (pointer) => {
            if (this.joystickActive && pointer.isDown) {
                const dx = pointer.x - this.joystickBase.x;
                const dy = pointer.y - this.joystickBase.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                const clampDist = Math.min(dist, this.joystickRadius);
                if (dist > 0) {
                    this.joystickThumb.setPosition(
                        this.joystickBase.x + (dx / dist) * clampDist,
                        this.joystickBase.y + (dy / dist) * clampDist
                    );
                    this.joystickVector = {
                        x: (dx / dist) * (clampDist / this.joystickRadius),
                        y: (dy / dist) * (clampDist / this.joystickRadius),
                    };
                }
            }
        });
        this.input.on('pointerup', () => {
            if (this.joystickActive) {
                this.joystickActive = false;
                this.joystickThumb.setPosition(this.joystickBase.x, this.joystickBase.y);
                this.joystickVector = { x: 0, y: 0 };
                this.joystickBase.setAlpha(0.6);
            }
        });
    }

    handleInteract() {
        if (this.showingTreasure) {
            this.closeTreasurePopup();
            return;
        }

        // Check if near treasure item
        const treasureItem = this.getNearbyTreasureItem();
        if (treasureItem) {
            this.collectTreasure(treasureItem);
            return;
        }

        // Check if near exit door
        if (this.player.y > 620 && Math.abs(this.player.x - 512) < 60) {
            this.exitHouse();
        }
    }

    getNearbyTreasureItem() {
        if (!this.layout.treasure || progressTracker.hasCollectible(this.layout.treasure.id)) return null;
        for (const f of this.furnitureSprites) {
            if (f.data.isTreasure) {
                const dist = Phaser.Math.Distance.Between(this.player.x, this.player.y, f.data.x, f.data.y);
                if (dist < 60) return f;
            }
        }
        return null;
    }

    collectTreasure(item) {
        this.showingTreasure = true;
        this.player.body.setVelocity(0, 0);

        const treasure = this.layout.treasure;
        // Determine which land this treasure belongs to
        const land = this.houseId.split('_')[0];
        progressTracker.collectItem(treasure.id, land);

        // Stop sparkle
        if (item.sprite.sparkleTimer) item.sprite.sparkleTimer.remove();
        this.tweens.killTweensOf(item.sprite);
        item.sprite.setAlpha(1);

        // Treasure popup
        const w = 1024, h = 768;
        this.treasureOverlay = this.add.rectangle(w / 2, h / 2, w, h, 0x000000, 0.7)
            .setDepth(20000).setInteractive();
        this.treasureOverlay.on('pointerdown', () => this.closeTreasurePopup());

        this.treasurePopup = this.add.container(w / 2, h / 2).setDepth(20001);

        const popBg = this.add.graphics();
        popBg.fillStyle(0x0d0d1e, 0.95);
        popBg.fillRoundedRect(-200, -180, 400, 360, 20);
        popBg.lineStyle(3, 0x7c4dff);
        popBg.strokeRoundedRect(-200, -180, 400, 360, 20);
        this.treasurePopup.add(popBg);

        this.treasurePopup.add(this.add.text(0, -140, 'Treasure Found!', {
            fontFamily: 'Arial, sans-serif', fontSize: '28px', fontStyle: 'bold', color: '#ffd700',
        }).setOrigin(0.5));

        const treasureImg = this.add.image(0, -40, 'treasure_chest').setScale(2);
        this.treasurePopup.add(treasureImg);

        this.treasurePopup.add(this.add.text(0, 40, treasure.name, {
            fontFamily: 'Arial, sans-serif', fontSize: '26px', fontStyle: 'bold', color: '#ffffff',
        }).setOrigin(0.5));

        this.treasurePopup.add(this.add.text(0, 80, treasure.desc, {
            fontFamily: 'Arial, sans-serif', fontSize: '18px', color: '#b39ddb',
            align: 'center', wordWrap: { width: 340 },
        }).setOrigin(0.5));

        const countText = `${this.getTreasureCount()} of 5 treasures collected!`;
        this.treasurePopup.add(this.add.text(0, 120, countText, {
            fontFamily: 'Arial, sans-serif', fontSize: '16px', color: '#ffd700', fontStyle: 'italic',
        }).setOrigin(0.5));

        this.treasurePopup.add(this.add.text(0, 155, '[ Click or Space ]', {
            fontFamily: 'Arial, sans-serif', fontSize: '14px', color: '#666688',
        }).setOrigin(0.5));

        // Animate in
        this.treasurePopup.setScale(0.3).setAlpha(0);
        this.tweens.add({
            targets: this.treasurePopup,
            scale: 1, alpha: 1, duration: 500, ease: 'Back.easeOut',
        });
        this.tweens.add({
            targets: treasureImg, angle: 360, duration: 800, ease: 'Cubic.easeOut',
        });

        // Confetti!
        for (let i = 0; i < 30; i++) {
            this.time.delayedCall(i * 40, () => {
                const colors = [0x7c4dff, 0xb39ddb, 0xff69b4, 0x87ceeb, 0x2ecc71, 0xffd700];
                const sparkle = this.add.image(
                    w / 2 + (Math.random() - 0.5) * 500,
                    h / 2 - 100,
                    'sparkle'
                ).setTint(colors[Math.floor(Math.random() * colors.length)])
                 .setScale(0.5 + Math.random()).setDepth(20002);
                this.tweens.add({
                    targets: sparkle,
                    y: sparkle.y + 200 + Math.random() * 300,
                    x: sparkle.x + (Math.random() - 0.5) * 100,
                    rotation: Math.random() * 6,
                    alpha: 0,
                    duration: 1000 + Math.random() * 1000,
                    onComplete: () => sparkle.destroy(),
                });
            });
        }
    }

    closeTreasurePopup() {
        if (!this.showingTreasure) return;
        this.showingTreasure = false;
        this.tweens.add({
            targets: this.treasurePopup,
            scale: 0.3, alpha: 0, duration: 300, ease: 'Back.easeIn',
            onComplete: () => {
                this.treasurePopup.destroy();
                this.treasureOverlay.destroy();
            },
        });
    }

    exitHouse() {
        this.cameras.main.fadeOut(300);
        this.cameras.main.once('camerafadeoutcomplete', () => {
            this.scene.start(this.returnScene);
        });
    }

    update(time, delta) {
        if (this.showingTreasure) {
            this.player.body.setVelocity(0, 0);
            return;
        }

        let vx = 0, vy = 0;
        const speed = 150;
        if (this.joystickActive) { vx = this.joystickVector.x * speed; vy = this.joystickVector.y * speed; }
        if (this.cursors.left.isDown) vx = -speed;
        if (this.cursors.right.isDown || this.wasd.D.isDown) vx = speed;
        if (this.cursors.up.isDown || this.wasd.W.isDown) vy = -speed;
        if (this.cursors.down.isDown || this.wasd.S.isDown) vy = speed;
        this.player.body.setVelocity(vx, vy);
        if (vx !== 0 && vy !== 0) this.player.body.velocity.normalize().scale(speed);

        if (Math.abs(vx) > 10 || Math.abs(vy) > 10) {
            if (Math.abs(vx) > Math.abs(vy)) this.playerDir = vx < 0 ? 'left' : 'right';
            else this.playerDir = vy < 0 ? 'up' : 'down';
            this.animTimer += delta;
            if (this.animTimer > 150) { this.animTimer = 0; this.playerFrame = (this.playerFrame + 1) % 4; }
        } else { this.playerFrame = 0; }
        this.player.setTexture(`axolotl_${this.costumeIndex}_${this.playerDir}_${this.playerFrame}`);

        // Check proximity to treasure item
        const treasureItem = this.getNearbyTreasureItem();
        const nearDoor = this.player.y > 620 && Math.abs(this.player.x - 512) < 60;

        this.interactHint.setVisible(!!treasureItem);
        this.exitHint.setVisible(nearDoor);
    }
}
