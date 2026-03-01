class PalaceInteriorScene extends Phaser.Scene {
    constructor() {
        super({ key: 'PalaceInteriorScene' });
    }

    init(data) {
        this.returnScene = data.returnScene || 'PalaceLandScene';
        this.currentRoom = data.room || 'grand_hall';
    }

    create() {
        this.cameras.main.fadeIn(300);
        const w = 1024, h = 768;

        this.drawRoom(this.currentRoom);

        // Player
        const costume = progressTracker.getCurrentCostume();
        this.costumeIndex = costume;
        const spawn = this.getSpawnPoint(this.currentRoom);
        this.player = this.physics.add.sprite(spawn.x, spawn.y, `axolotl_${costume}_down_0`);
        this.player.setCollideWorldBounds(true);
        this.player.setDepth(10000);
        this.player.body.setSize(24, 16);
        this.player.body.setOffset(12, 36);
        this.player.setScale(1.2);
        this.playerDir = 'down';
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
        hBg.fillRoundedRect(-120, -18, 240, 36, 10);
        hBg.lineStyle(2, 0x7c4dff);
        hBg.strokeRoundedRect(-120, -18, 240, 36, 10);
        this.interactHint.add(hBg);
        this.interactHintText = this.add.text(0, 0, 'Press Space!', {
            fontFamily: 'Arial, sans-serif', fontSize: '18px', fontStyle: 'bold', color: '#b39ddb',
        }).setOrigin(0.5);
        this.interactHint.add(this.interactHintText);

        // Keyboard interaction
        this.input.keyboard.on('keydown-SPACE', () => this.handleInteract());
        this.input.keyboard.on('keydown-ENTER', () => this.handleInteract());

        this.sittingOnThrone = false;
        this.transitioning = false;

        // Back button
        const backHit = this.add.rectangle(60, 30, 90, 32, 0x000000, 0)
            .setDepth(10002).setInteractive({ useHandCursor: true });
        backHit.on('pointerdown', () => {
            if (!this.transitioning && !this.sittingOnThrone) this.exitPalace();
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
        this.roomLabel = this.add.text(w / 2, 24, this.getRoomName(this.currentRoom), {
            fontFamily: 'Arial, sans-serif', fontSize: '20px', fontStyle: 'bold',
            color: '#ffffff', stroke: '#000000', strokeThickness: 4,
        }).setOrigin(0.5).setDepth(10001);

        // Door labels
        this.doorLabels = [];
        this.createDoorLabels();
    }

    getRoomName(room) {
        const names = {
            grand_hall: 'Grand Hall',
            throne_room: 'Throne Room',
            treasury: 'Treasury',
            tower: 'Tower Observatory',
        };
        return names[room] || 'Palace';
    }

    getSpawnPoint(room) {
        const spawns = {
            grand_hall: { x: 512, y: 600 },
            throne_room: { x: 512, y: 600 },
            treasury: { x: 900, y: 400 },
            tower: { x: 150, y: 400 },
        };
        return spawns[room] || { x: 512, y: 600 };
    }

    getRoomDoors(room) {
        switch (room) {
            case 'grand_hall':
                return [
                    { x: 512, y: 700, w: 80, h: 40, target: null, label: 'Exit', dir: 'bottom' },
                    { x: 512, y: 180, w: 80, h: 40, target: 'throne_room', label: 'Throne Room', dir: 'top' },
                ];
            case 'throne_room':
                return [
                    { x: 512, y: 700, w: 80, h: 40, target: 'grand_hall', label: 'Grand Hall', dir: 'bottom' },
                    { x: 60, y: 400, w: 40, h: 60, target: 'treasury', label: 'Treasury', dir: 'left' },
                    { x: 964, y: 400, w: 40, h: 60, target: 'tower', label: 'Tower', dir: 'right' },
                ];
            case 'treasury':
                return [
                    { x: 964, y: 400, w: 40, h: 60, target: 'throne_room', label: 'Throne Room', dir: 'right' },
                ];
            case 'tower':
                return [
                    { x: 60, y: 400, w: 40, h: 60, target: 'throne_room', label: 'Throne Room', dir: 'left' },
                ];
        }
        return [];
    }

    drawRoom(room) {
        // Clear previous room graphics if any
        if (this.roomContainer) this.roomContainer.destroy();
        this.roomContainer = this.add.container(0, 0).setDepth(0);

        const w = 1024, h = 768;
        const bg = this.add.graphics();
        this.roomContainer.add(bg);

        switch (room) {
            case 'grand_hall':
                this.drawGrandHall(bg, w, h);
                break;
            case 'throne_room':
                this.drawThroneRoom(bg, w, h);
                break;
            case 'treasury':
                this.drawTreasury(bg, w, h);
                break;
            case 'tower':
                this.drawTower(bg, w, h);
                break;
        }
    }

    drawGrandHall(bg, w, h) {
        // Floor - dark marble
        bg.fillStyle(0x1a0a2e);
        bg.fillRect(0, 0, w, h);
        for (let tx = 0; tx < w; tx += 64) {
            for (let ty = 160; ty < h; ty += 64) {
                bg.fillStyle((tx + ty) % 128 === 0 ? 0x2d1b4e : 0x1a0a2e, 0.8);
                bg.fillRect(tx, ty, 64, 64);
            }
        }
        // Red carpet down center
        bg.fillStyle(0xb71c1c, 0.7);
        bg.fillRect(w / 2 - 50, 160, 100, h - 200);
        bg.fillStyle(0xffd700, 0.3);
        bg.fillRect(w / 2 - 50, 160, 3, h - 200);
        bg.fillRect(w / 2 + 47, 160, 3, h - 200);

        // Walls
        bg.fillStyle(0x2d1b4e);
        bg.fillRect(40, 40, w - 80, 120);
        bg.fillStyle(0x4a148c, 0.5);
        bg.fillRect(40, 155, w - 80, 8);
        bg.fillRect(40, 40, w - 80, 6);
        // Side walls
        bg.fillStyle(0x4a148c, 0.2);
        bg.fillRect(30, 40, 14, h - 80);
        bg.fillRect(w - 44, 40, 14, h - 80);

        // Banners on walls
        [200, 400, 600, 800].forEach(bx => {
            bg.fillStyle(0x4a148c, 0.7);
            bg.fillRect(bx - 15, 50, 30, 80);
            bg.fillStyle(0xffd700, 0.5);
            bg.fillCircle(bx, 90, 8);
            // Banner bottom fringe
            bg.fillStyle(0x4a148c, 0.6);
            bg.fillTriangle(bx - 15, 130, bx, 145, bx + 15, 130);
        });

        // Torches
        [150, 350, 650, 870].forEach(tx => {
            bg.fillStyle(0x5d4037);
            bg.fillRect(tx - 2, 100, 4, 20);
            bg.fillStyle(0xff6f00);
            bg.fillTriangle(tx, 92, tx - 5, 102, tx + 5, 102);
            bg.fillStyle(0xffd54f);
            bg.fillTriangle(tx, 95, tx - 2, 100, tx + 2, 100);
        });

        // Suits of armor
        [160, 860].forEach(ax => {
            bg.fillStyle(0x9e9e9e);
            bg.fillEllipse(ax, 340, 20, 40);
            bg.fillCircle(ax, 310, 10);
            bg.fillStyle(0xbdbdbd);
            bg.fillEllipse(ax, 340, 14, 30);
            bg.fillStyle(0x757575);
            bg.fillRect(ax - 2, 360, 4, 20);
        });

        // Exit door (bottom)
        this.add.image(w / 2, h - 28, 'furn_door').setDepth(h - 28);
        // Door to throne room (top)
        bg.fillStyle(0x6a1b9a);
        bg.fillRoundedRect(w / 2 - 30, 50, 60, 90, { tl: 30, tr: 30, bl: 0, br: 0 });
        bg.fillStyle(0xffd700, 0.6);
        bg.fillCircle(w / 2 + 15, 100, 3);
    }

    drawThroneRoom(bg, w, h) {
        // Floor
        bg.fillStyle(0x1a0a2e);
        bg.fillRect(0, 0, w, h);
        for (let tx = 0; tx < w; tx += 64) {
            for (let ty = 160; ty < h; ty += 64) {
                bg.fillStyle((tx / 64 + ty / 64) % 2 === 0 ? 0x2a1a4e : 0x1a0a3e, 0.8);
                bg.fillRect(tx, ty, 64, 64);
            }
        }
        // Red carpet
        bg.fillStyle(0xb71c1c, 0.8);
        bg.fillRect(w / 2 - 60, 160, 120, h - 200);
        bg.fillStyle(0xffd700, 0.4);
        bg.fillRect(w / 2 - 60, 160, 4, h - 200);
        bg.fillRect(w / 2 + 56, 160, 4, h - 200);

        // Walls
        bg.fillStyle(0x2d1b4e);
        bg.fillRect(40, 40, w - 80, 120);
        bg.fillStyle(0x4a148c, 0.5);
        bg.fillRect(40, 155, w - 80, 8);
        bg.fillStyle(0x4a148c, 0.2);
        bg.fillRect(30, 40, 14, h - 80);
        bg.fillRect(w - 44, 40, 14, h - 80);

        // Pillars
        [150, 350, 650, 870].forEach(px => {
            bg.fillStyle(0xbdbdbd);
            bg.fillRect(px - 12, 100, 24, h / 2);
            bg.fillStyle(0xe0e0e0);
            bg.fillRect(px - 8, 100, 16, h / 2);
            bg.fillStyle(0xffd700);
            bg.fillRect(px - 16, 90, 32, 12);
        });

        // Throne
        this.throneX = w / 2;
        this.throneY = 260;
        bg.fillStyle(0x6a1b9a);
        bg.fillRoundedRect(this.throneX - 50, this.throneY - 80, 100, 120, { tl: 25, tr: 25, bl: 0, br: 0 });
        bg.fillStyle(0x9c27b0, 0.6);
        bg.fillRoundedRect(this.throneX - 40, this.throneY - 70, 80, 100, { tl: 20, tr: 20, bl: 0, br: 0 });
        // Seat
        bg.fillStyle(0x4a148c);
        bg.fillRoundedRect(this.throneX - 45, this.throneY + 20, 90, 35, 5);
        bg.fillStyle(0x7b1fa2, 0.6);
        bg.fillRoundedRect(this.throneX - 35, this.throneY + 25, 70, 25, 4);
        // Arms
        bg.fillStyle(0x6a1b9a);
        bg.fillRect(this.throneX - 45, this.throneY, 8, 55);
        bg.fillRect(this.throneX + 37, this.throneY, 8, 55);
        // Gems
        bg.fillStyle(0xffd700);
        bg.fillCircle(this.throneX, this.throneY - 55, 7);
        bg.fillStyle(0xff1744);
        bg.fillCircle(this.throneX - 20, this.throneY - 35, 4);
        bg.fillCircle(this.throneX + 20, this.throneY - 35, 4);
        bg.fillStyle(0x2196f3);
        bg.fillCircle(this.throneX - 12, this.throneY - 15, 3);
        bg.fillCircle(this.throneX + 12, this.throneY - 15, 3);

        // Torches
        [200, 820].forEach(tx => {
            bg.fillStyle(0x5d4037);
            bg.fillRect(tx - 2, 100, 4, 20);
            bg.fillStyle(0xff6f00);
            bg.fillTriangle(tx, 92, tx - 5, 102, tx + 5, 102);
            bg.fillStyle(0xffd54f);
            bg.fillTriangle(tx, 95, tx - 2, 100, tx + 2, 100);
        });

        // Door labels drawn separately via side walls
        // Left door (to Treasury)
        bg.fillStyle(0x6a1b9a);
        bg.fillRoundedRect(35, 370, 30, 60, { tl: 15, tr: 0, bl: 15, br: 0 });
        // Right door (to Tower)
        bg.fillRoundedRect(w - 65, 370, 30, 60, { tl: 0, tr: 15, bl: 0, br: 15 });

        // Exit door (bottom)
        this.add.image(w / 2, h - 28, 'furn_door').setDepth(h - 28);
    }

    drawTreasury(bg, w, h) {
        // Floor
        bg.fillStyle(0x1a0a2e);
        bg.fillRect(0, 0, w, h);
        for (let tx = 0; tx < w; tx += 64) {
            for (let ty = 160; ty < h; ty += 64) {
                bg.fillStyle((tx + ty) % 128 === 0 ? 0x2a1a3e : 0x1a0a2e, 0.8);
                bg.fillRect(tx, ty, 64, 64);
            }
        }
        // Walls
        bg.fillStyle(0x2d1b4e);
        bg.fillRect(40, 40, w - 80, 120);
        bg.fillStyle(0x4a148c, 0.5);
        bg.fillRect(40, 155, w - 80, 8);
        bg.fillStyle(0x4a148c, 0.2);
        bg.fillRect(30, 40, 14, h - 80);
        bg.fillRect(w - 44, 40, 14, h - 80);

        // Gold piles
        const goldPositions = [
            [200, 300], [400, 350], [600, 280], [300, 500],
            [500, 450], [700, 500], [250, 650], [550, 600],
        ];
        goldPositions.forEach(([gx, gy]) => {
            // Pile of coins
            bg.fillStyle(0xffd700, 0.8);
            bg.fillEllipse(gx, gy, 40 + Math.random() * 20, 20 + Math.random() * 10);
            bg.fillStyle(0xffb300, 0.6);
            bg.fillEllipse(gx, gy - 5, 30, 15);
            // Individual coins
            for (let i = 0; i < 4; i++) {
                bg.fillStyle(0xffd700);
                bg.fillCircle(gx + (Math.random() - 0.5) * 30, gy + (Math.random() - 0.5) * 10, 4);
            }
        });

        // Gem displays on pedestals
        const gemPositions = [[200, 200], [500, 200], [800, 200]];
        const gemColors = [0xff1744, 0x2196f3, 0x4caf50];
        gemPositions.forEach(([gx, gy], i) => {
            // Pedestal
            bg.fillStyle(0x9e9e9e);
            bg.fillRect(gx - 10, gy, 20, 30);
            bg.fillRect(gx - 15, gy - 5, 30, 8);
            // Gem
            bg.fillStyle(gemColors[i]);
            bg.fillTriangle(gx, gy - 20, gx - 8, gy - 5, gx + 8, gy - 5);
            bg.fillStyle(0xffffff, 0.3);
            bg.fillTriangle(gx - 2, gy - 16, gx - 5, gy - 8, gx + 1, gy - 8);
        });

        // Sparkle chests
        [150, 450, 750].forEach(cx => {
            bg.fillStyle(0x5d4037);
            bg.fillRoundedRect(cx - 18, 550, 36, 24, 4);
            bg.fillStyle(0x8d6e63);
            bg.fillRoundedRect(cx - 16, 552, 32, 10, 3);
            bg.fillStyle(0xffd700);
            bg.fillRect(cx - 3, 555, 6, 6);
        });

        // Right door (back to Throne Room)
        bg.fillStyle(0x6a1b9a);
        bg.fillRoundedRect(w - 65, 370, 30, 60, { tl: 0, tr: 15, bl: 0, br: 15 });
    }

    drawTower(bg, w, h) {
        // Dark sky background (night)
        bg.fillStyle(0x050520);
        bg.fillRect(0, 0, w, h);

        // Stars through windows
        for (let i = 0; i < 50; i++) {
            bg.fillStyle(0xffffff, Math.random() * 0.6 + 0.2);
            bg.fillCircle(Math.random() * w, Math.random() * (h * 0.4), Math.random() * 1.5 + 0.5);
        }

        // Floor - stone
        for (let tx = 0; tx < w; tx += 64) {
            for (let ty = 160; ty < h; ty += 64) {
                bg.fillStyle((tx + ty) % 128 === 0 ? 0x1a1a3e : 0x0d0d2e, 0.8);
                bg.fillRect(tx, ty, 64, 64);
            }
        }
        // Walls (partial - windows to sky)
        bg.fillStyle(0x1a1a3e, 0.8);
        bg.fillRect(40, 40, 120, 120);
        bg.fillRect(w - 160, 40, 120, 120);
        bg.fillRect(40, 40, w - 80, 40);
        // Window frames
        bg.fillStyle(0x4a148c);
        bg.fillRect(170, 40, 10, 120);
        bg.fillRect(w - 180, 40, 10, 120);
        bg.fillStyle(0x4a148c, 0.3);
        bg.fillRect(30, 40, 14, h - 80);
        bg.fillRect(w - 44, 40, 14, h - 80);
        // Baseboard
        bg.fillStyle(0x4a148c, 0.5);
        bg.fillRect(40, 155, w - 80, 8);

        // Telescope
        const teleX = 700, teleY = 300;
        bg.fillStyle(0x5d4037);
        bg.fillRect(teleX - 3, teleY, 6, 50);
        bg.fillRect(teleX - 10, teleY + 45, 20, 8);
        bg.fillStyle(0x795548);
        bg.fillEllipse(teleX + 20, teleY - 10, 40, 12);
        bg.fillStyle(0x4fc3f7, 0.3);
        bg.fillCircle(teleX + 38, teleY - 10, 5);

        // Star charts on wall
        [200, 450].forEach(cx => {
            bg.fillStyle(0x1a0a2e, 0.8);
            bg.fillRoundedRect(cx - 40, 60, 80, 60, 5);
            bg.fillStyle(0xffd700, 0.5);
            // Constellation dots
            for (let i = 0; i < 6; i++) {
                bg.fillCircle(cx - 25 + Math.random() * 50, 75 + Math.random() * 30, 2);
            }
            // Lines between
            bg.lineStyle(1, 0xffd700, 0.3);
            bg.lineBetween(cx - 15, 80, cx + 10, 90);
            bg.lineBetween(cx + 10, 90, cx + 20, 85);
        });

        // Globe
        bg.fillStyle(0x1565c0, 0.6);
        bg.fillCircle(300, 450, 25);
        bg.fillStyle(0x2e7d32, 0.4);
        bg.fillEllipse(295, 445, 20, 15);
        bg.fillStyle(0x5d4037);
        bg.fillRect(297, 475, 6, 15);
        bg.fillRect(290, 488, 20, 4);

        // Moon visible through window
        bg.fillStyle(0xfff9c4, 0.6);
        bg.fillCircle(w / 2 + 50, 80, 30);
        bg.fillStyle(0x050520, 0.7);
        bg.fillCircle(w / 2 + 65, 70, 28);

        // Left door (back to Throne Room)
        bg.fillStyle(0x6a1b9a);
        bg.fillRoundedRect(35, 370, 30, 60, { tl: 15, tr: 0, bl: 15, br: 0 });
    }

    createDoorLabels() {
        // Clear old labels
        this.doorLabels.forEach(l => l.destroy());
        this.doorLabels = [];

        const doors = this.getRoomDoors(this.currentRoom);
        doors.forEach(door => {
            const label = this.add.text(door.x, door.y - 20, door.label, {
                fontFamily: 'Arial, sans-serif', fontSize: '13px', fontStyle: 'bold',
                color: '#ffd700', stroke: '#000000', strokeThickness: 3,
            }).setOrigin(0.5).setDepth(10001);
            this.doorLabels.push(label);
        });
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
            if (this.transitioning || this.sittingOnThrone) return;
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
        if (this.transitioning) return;

        if (this.sittingOnThrone) {
            this.sittingOnThrone = false;
            return;
        }

        // Check throne interaction
        if (this.currentRoom === 'throne_room' && this.throneX) {
            const dist = Phaser.Math.Distance.Between(this.player.x, this.player.y, this.throneX, this.throneY + 40);
            if (dist < 60) {
                this.sitOnThrone();
                return;
            }
        }

        // Check door proximity
        const doors = this.getRoomDoors(this.currentRoom);
        for (const door of doors) {
            const dist = Phaser.Math.Distance.Between(this.player.x, this.player.y, door.x, door.y);
            if (dist < 50) {
                if (door.target === null) {
                    this.exitPalace();
                } else {
                    this.transitionToRoom(door.target);
                }
                return;
            }
        }
    }

    sitOnThrone() {
        this.sittingOnThrone = true;
        this.player.body.setVelocity(0, 0);

        // Move player to throne
        this.tweens.add({
            targets: this.player,
            x: this.throneX, y: this.throneY + 35,
            duration: 500, ease: 'Sine.easeInOut',
            onComplete: () => {
                // Scale up slightly
                this.tweens.add({
                    targets: this.player,
                    scale: 1.4, duration: 300, ease: 'Back.easeOut',
                });
                this.playerDir = 'down';
                this.player.setTexture(`axolotl_${this.costumeIndex}_down_0`);

                // Show dialog
                this.interactHint.setVisible(true);
                this.interactHintText.setText('You sit upon the throne! All hail the Ninja Champion!');

                // Sparkles
                for (let i = 0; i < 15; i++) {
                    const angle = (i / 15) * Math.PI * 2;
                    this.time.delayedCall(i * 50, () => {
                        const sparkle = this.add.image(
                            this.throneX + Math.cos(angle) * 60,
                            this.throneY + Math.sin(angle) * 40,
                            'sparkle'
                        ).setScale(0.8).setDepth(20000).setTint(0xffd700);
                        this.tweens.add({
                            targets: sparkle,
                            alpha: 0, scale: 0, y: sparkle.y - 30,
                            duration: 600,
                            onComplete: () => sparkle.destroy(),
                        });
                    });
                }
            },
        });
    }

    transitionToRoom(targetRoom) {
        this.transitioning = true;
        this.player.body.setVelocity(0, 0);

        this.cameras.main.fadeOut(200, 0, 0, 0);
        this.cameras.main.once('camerafadeoutcomplete', () => {
            // Clean up old room
            this.roomContainer.destroy();
            this.doorLabels.forEach(l => l.destroy());
            this.doorLabels = [];

            this.currentRoom = targetRoom;

            // Draw new room
            this.drawRoom(targetRoom);

            // Reposition player
            const spawn = this.getSpawnPoint(targetRoom);
            this.player.setPosition(spawn.x, spawn.y);
            this.player.setScale(1.2);
            this.playerDir = 'down';
            this.playerFrame = 0;

            // Update label
            this.roomLabel.setText(this.getRoomName(targetRoom));

            // Recreate door labels
            this.createDoorLabels();

            this.cameras.main.fadeIn(200);
            this.transitioning = false;
        });
    }

    exitPalace() {
        this.cameras.main.fadeOut(300);
        this.cameras.main.once('camerafadeoutcomplete', () => {
            this.scene.start(this.returnScene);
        });
    }

    update(time, delta) {
        if (this.transitioning || this.sittingOnThrone) {
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

        // Check door proximity for hints
        const doors = this.getRoomDoors(this.currentRoom);
        let nearDoor = null;
        for (const door of doors) {
            const dist = Phaser.Math.Distance.Between(this.player.x, this.player.y, door.x, door.y);
            if (dist < 50) {
                nearDoor = door;
                break;
            }
        }

        // Check throne proximity
        let nearThrone = false;
        if (this.currentRoom === 'throne_room' && this.throneX) {
            const dist = Phaser.Math.Distance.Between(this.player.x, this.player.y, this.throneX, this.throneY + 40);
            if (dist < 60) nearThrone = true;
        }

        if (nearThrone) {
            this.interactHint.setVisible(true);
            this.interactHintText.setText('Press Space to sit on throne!');
        } else if (nearDoor) {
            this.interactHint.setVisible(true);
            this.interactHintText.setText(`Press Space: ${nearDoor.label}`);
        } else {
            this.interactHint.setVisible(false);
        }
    }
}
