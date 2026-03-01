class BaseLandScene extends Phaser.Scene {
    constructor(key, landKey) {
        super({ key: key });
        this.landKey = landKey;
    }

    // Override in subclass
    getLandName() { return ''; }
    createMap() { }
    createParticles() { }
    getHouses() { return []; }
    getSpiders() { return []; }    // [{id, x, y, patrolX1, patrolY1, patrolX2, patrolY2, sprite}]
    getCollectibles() { return []; } // [{id, x, y, type, inWater, requiresInvisible}]
    getWaterZones() { return []; }  // [{x, y, w, h}]

    create() {
        this.cameras.main.fadeIn(500);

        this.mapWidth = 2400;
        this.mapHeight = 1800;
        this.physics.world.setBounds(0, 0, this.mapWidth, this.mapHeight);

        // Track water zones for swimming detection
        this.waterZones = this.getWaterZones();

        this.createMap();
        this.createPlayer(400, 450);
        this.createNPCs();
        this.createSpiderPatrols();
        this.createCollectibleSprites();

        this.dialogSystem = new DialogSystem(this);
        this.dialogSystem.create();

        this.cameras.main.setBounds(0, 0, this.mapWidth, this.mapHeight);
        this.cameras.main.startFollow(this.player, true, 0.08, 0.08);

        this.createJoystick();
        this.createUI();
        this.createInvisibilitySystem();

        this.cursors = this.input.keyboard.createCursorKeys();
        this.wasd = this.input.keyboard.addKeys('W,S,D');
        this.interactTarget = null;
        this.nearHouse = null;
        this.nearSpider = null;
        this.challengeActive = false;
        this.isSwimming = false;

        // House entry points
        this.houses = this.getHouses();

        // Keyboard interaction
        this.input.keyboard.on('keydown-SPACE', () => this.handleInteract());
        this.input.keyboard.on('keydown-ENTER', () => this.handleInteract());
        // A key for invisibility
        this.input.keyboard.on('keydown-A', () => this.toggleInvisibility());

        this.createParticles();

        // Post-game content (outfits + halloween eggs)
        if (progressTracker.isCrownObtained()) {
            this.createPostGameContent();
        }
    }

    // --- INVISIBILITY SYSTEM ---
    createInvisibilitySystem() {
        this.isInvisible = false;
        this.ninjaEnergy = 100;
        this.maxNinjaEnergy = 100;
        this.energyDrainRate = 10;  // per second
        this.energyRechargeRate = 5; // per second

        // Energy bar UI
        this.energyBarBg = this.add.image(this.cameras.main.width - 70, 60, 'energy_bar_frame')
            .setScrollFactor(0).setDepth(1001);
        this.energyBarFill = this.add.image(this.cameras.main.width - 70, 60, 'energy_bar_fill')
            .setScrollFactor(0).setDepth(1001);
        this.energyLabel = this.add.text(this.cameras.main.width - 70, 48, 'Ninja Energy', {
            fontFamily: 'Arial, sans-serif', fontSize: '11px', fontStyle: 'bold',
            color: '#b39ddb', stroke: '#000000', strokeThickness: 2,
        }).setOrigin(0.5).setScrollFactor(0).setDepth(1001);

        // Mobile invisibility button
        this.invisBtn = this.add.image(this.cameras.main.width - 50, this.cameras.main.height - 80, 'btn_invisibility')
            .setScrollFactor(0).setDepth(1001).setInteractive({ useHandCursor: true });
        this.invisBtn.on('pointerdown', () => this.toggleInvisibility());
    }

    toggleInvisibility() {
        if (this.challengeActive || this.dialogSystem.isActive()) return;
        if (!this.isInvisible && this.ninjaEnergy < 10) return; // need minimum energy
        this.isInvisible = !this.isInvisible;
        this.player.setAlpha(this.isInvisible ? 0.3 : 1);
        this.invisBtn.setAlpha(this.isInvisible ? 0.5 : 1);
    }

    updateInvisibility(delta) {
        const dt = delta / 1000;
        if (this.isInvisible) {
            this.ninjaEnergy -= this.energyDrainRate * dt;
            if (this.ninjaEnergy <= 0) {
                this.ninjaEnergy = 0;
                this.isInvisible = false;
                this.player.setAlpha(1);
                this.invisBtn.setAlpha(1);
            }
        } else {
            this.ninjaEnergy = Math.min(this.maxNinjaEnergy, this.ninjaEnergy + this.energyRechargeRate * dt);
        }
        // Update bar
        const pct = this.ninjaEnergy / this.maxNinjaEnergy;
        this.energyBarFill.setCrop(0, 0, 100 * pct, 12);
    }

    // --- SWIMMING ---
    checkSwimming() {
        const px = this.player.x;
        const py = this.player.y;
        let inWater = false;
        for (const zone of this.waterZones) {
            if (px >= zone.x && px <= zone.x + zone.w && py >= zone.y && py <= zone.y + zone.h) {
                inWater = true;
                break;
            }
        }
        if (inWater !== this.isSwimming) {
            this.isSwimming = inWater;
        }
    }

    // --- SPIDER SYSTEM ---
    createSpiderPatrols() {
        const spiderDefs = this.getSpiders();
        this.spiderSprites = [];

        spiderDefs.forEach(def => {
            if (progressTracker.isSpiderDefeated(def.id)) return;

            const spider = this.physics.add.sprite(def.x, def.y, def.sprite || 'spider_mini');
            spider.setImmovable(true);
            spider.setDepth(89);
            spider.spiderData = def;
            spider.body.setSize(24, 24);
            spider.patrolling = true;
            spider.detected = false;

            // Patrol tween
            this.tweens.add({
                targets: spider,
                x: def.patrolX2,
                y: def.patrolY2,
                duration: 2000 + Math.random() * 1500,
                yoyo: true,
                repeat: -1,
                ease: 'Sine.easeInOut',
            });

            // Exclamation above undefeated spiders
            const excl = this.add.image(def.x, def.y - 24, 'exclamation')
                .setDepth(91).setTint(0xff6b6b);
            this.tweens.add({
                targets: excl, y: def.y - 28, duration: 500,
                yoyo: true, repeat: -1, ease: 'Sine.easeInOut',
            });
            spider.exclamation = excl;

            this.spiderSprites.push(spider);
        });
    }

    updateSpiders() {
        this.nearSpider = null;
        this.spiderSprites.forEach(spider => {
            if (!spider.active) return;
            // Update exclamation position
            if (spider.exclamation) {
                spider.exclamation.x = spider.x;
                spider.exclamation.y = spider.y - 24;
            }
            const dist = Phaser.Math.Distance.Between(this.player.x, this.player.y, spider.x, spider.y);
            if (dist < 100 && !this.isInvisible) {
                this.nearSpider = spider;
                // Spider notices you!
                if (!spider.detected) {
                    spider.detected = true;
                    // Brief pause before challenge
                }
            } else {
                spider.detected = false;
            }
        });
    }

    defeatSpider(spider) {
        progressTracker.defeatSpider(spider.spiderData.id, this.landKey);
        // Poof animation
        const poof = this.add.image(spider.x, spider.y, 'spider_poof').setDepth(200);
        this.tweens.add({
            targets: poof, alpha: 0, scale: 2, duration: 500,
            onComplete: () => poof.destroy(),
        });
        // Remove exclamation
        if (spider.exclamation) spider.exclamation.destroy();
        // Drop collectible
        this.dropEggAt(spider.x, spider.y);
        // Remove spider
        spider.destroy();
        this.spiderSprites = this.spiderSprites.filter(s => s !== spider);
        // Update star count
        this.starCountText.setText(`${progressTracker.getLandStars(this.landKey)}`);
    }

    dropEggAt(x, y) {
        const eggIdx = Math.floor(Math.random() * 8);
        const egg = this.add.image(x, y, `egg_${eggIdx}`).setDepth(95);
        this.tweens.add({
            targets: egg, y: y - 20, alpha: 0, scale: 1.5,
            duration: 800, delay: 500,
            onComplete: () => egg.destroy(),
        });
    }

    // --- COLLECTIBLE SYSTEM ---
    createCollectibleSprites() {
        const collectDefs = this.getCollectibles();
        this.collectibleSprites = [];

        collectDefs.forEach(def => {
            if (progressTracker.hasCollectible(def.id)) return;
            if (def.requiresInvisible) return; // These appear dynamically

            const sprite = this.add.image(def.x, def.y, def.type || 'egg_0').setDepth(85);
            sprite.collectData = def;

            // Sparkle effect
            this.tweens.add({
                targets: sprite, alpha: 0.6, duration: 800,
                yoyo: true, repeat: -1, ease: 'Sine.easeInOut',
            });

            this.collectibleSprites.push(sprite);
        });
    }

    updateCollectibles() {
        this.collectibleSprites.forEach(sprite => {
            if (!sprite.active) return;
            const dist = Phaser.Math.Distance.Between(this.player.x, this.player.y, sprite.x, sprite.y);
            if (dist < 40) {
                this.collectItem(sprite);
            }
        });
    }

    collectItem(sprite) {
        const data = sprite.collectData;
        progressTracker.collectItem(data.id, this.landKey);

        // Pickup animation
        this.tweens.add({
            targets: sprite, y: sprite.y - 30, alpha: 0, scale: 1.5,
            duration: 400, onComplete: () => sprite.destroy(),
        });
        this.collectibleSprites = this.collectibleSprites.filter(s => s !== sprite);

        // Sparkle burst
        for (let i = 0; i < 6; i++) {
            const sparkle = this.add.image(
                sprite.x + (Math.random() - 0.5) * 30,
                sprite.y + (Math.random() - 0.5) * 20,
                'sparkle_small'
            ).setDepth(200);
            this.tweens.add({
                targets: sparkle, alpha: 0, scale: 0, y: sparkle.y - 20,
                duration: 400, delay: i * 50,
                onComplete: () => sparkle.destroy(),
            });
        }

        // Check bonus
        this.checkCollectibleBonus();
    }

    checkCollectibleBonus() {
        const allCollected = progressTracker.getLandCollectibleCount(this.landKey);
        const total = this.getCollectibles().length;
        if (allCollected >= total && total > 0) {
            // Bonus stars for collecting everything!
            progressTracker.earnCollectibleBonus(this.landKey);
        }
    }

    handleInteract() {
        if (this.challengeActive) return;

        if (this.dialogSystem.isActive()) {
            this.dialogSystem.advance();
        } else if (this.nearSpider) {
            this.challengeSpider(this.nearSpider);
        } else if (this.interactTarget) {
            this.talkToNPC(this.interactTarget);
        } else if (this.nearHouse) {
            this.enterHouse(this.nearHouse);
        }
    }

    challengeSpider(spider) {
        this.challengeActive = true;
        this.scene.launch('MathChallengeScene', {
            mode: 'spider',
            land: this.landKey,
            npcName: 'Spider',
            mathType: this.landKey,
            onComplete: (success) => {
                this.challengeActive = false;
                if (success) {
                    this.defeatSpider(spider);
                }
            },
        });
    }

    enterHouse(house) {
        this.cameras.main.fadeOut(300);
        this.cameras.main.once('camerafadeoutcomplete', () => {
            this.scene.start('HouseInteriorScene', {
                houseId: house.id,
                returnScene: this.scene.key,
            });
        });
    }

    pathLine(x1, y1, x2, y2, tile) {
        const dx = x2 - x1;
        const dy = y2 - y1;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const steps = Math.ceil(dist / 32);
        for (let i = 0; i <= steps; i++) {
            const t = i / steps;
            const px = x1 + dx * t;
            const py = y1 + dy * t;
            this.add.image(px, py, tile);
            if (Math.abs(dx) > Math.abs(dy)) {
                this.add.image(px, py - 32, tile);
            } else {
                this.add.image(px - 32, py, tile);
            }
        }
    }

    // Fill a rectangular area with a tile
    fillArea(x, y, w, h, tile) {
        for (let tx = x; tx < x + w; tx += 32) {
            for (let ty = y; ty < y + h; ty += 32) {
                this.add.image(tx + 16, ty + 16, tile);
            }
        }
    }

    createPlayer(x, y) {
        this.currentCostume = progressTracker.getCurrentCostume();
        this.player = this.physics.add.sprite(x, y, `axolotl_${this.currentCostume}_down_0`);
        this.player.setCollideWorldBounds(true);
        this.player.setDepth(100);
        this.player.body.setSize(24, 16);
        this.player.body.setOffset(12, 36);
        this.player.setScale(1.2);
        this.playerDir = 'down';
        this.playerFrame = 0;
        this.animTimer = 0;

        // Ninja sparkle trail
        this.time.addEvent({
            delay: 250,
            loop: true,
            callback: () => {
                if (this.player.body.velocity.length() > 10) {
                    const sparkle = this.add.image(
                        this.player.x + (Math.random() - 0.5) * 20,
                        this.player.y + 10 + Math.random() * 10,
                        'sparkle_small'
                    ).setScale(0.5 + Math.random() * 0.5).setDepth(99)
                     .setTint(this.isInvisible ? 0x7c4dff : 0xffd700);
                    this.tweens.add({
                        targets: sparkle,
                        alpha: 0, scale: 0, duration: 500,
                        onComplete: () => sparkle.destroy(),
                    });
                }
            },
        });
    }

    createNPCs() {
        const npcData = NPC_DATA[this.landKey];
        this.npcSprites = [];
        if (!npcData) return;

        npcData.forEach(data => {
            const npc = this.physics.add.sprite(data.x, data.y, data.sprite);
            npc.setImmovable(true);
            npc.setDepth(90);
            npc.npcData = data;
            npc.body.setSize(32, 32);

            if (!progressTracker.isNPCSolved(data.id)) {
                const excl = this.add.image(data.x, data.y - 36, 'exclamation').setDepth(91);
                this.tweens.add({
                    targets: excl, y: data.y - 40, duration: 500,
                    yoyo: true, repeat: -1, ease: 'Sine.easeInOut',
                });
                npc.exclamation = excl;
            }

            this.tweens.add({
                targets: npc, y: data.y - 3,
                duration: 1200 + Math.random() * 600,
                yoyo: true, repeat: -1, ease: 'Sine.easeInOut',
            });

            this.npcSprites.push(npc);
        });
    }

    createJoystick() {
        this.joystickBase = this.add.image(140, 620, 'joystick_base')
            .setScrollFactor(0).setDepth(1001).setAlpha(0.6);
        this.joystickThumb = this.add.image(140, 620, 'joystick_thumb')
            .setScrollFactor(0).setDepth(1002).setAlpha(0.8);
        this.joystickActive = false;
        this.joystickVector = { x: 0, y: 0 };
        this.joystickRadius = 50;

        this.joystickZone = this.add.rectangle(160, 580, 320, 380, 0x000000, 0)
            .setScrollFactor(0).setDepth(999).setInteractive();

        this.joystickZone.on('pointerdown', (pointer) => {
            if (this.dialogSystem.isActive() || this.challengeActive) return;
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

    createUI() {
        // Star counter
        const starContainer = this.add.container(this.cameras.main.width - 90, 30)
            .setScrollFactor(0).setDepth(1001);
        starContainer.add(this.add.image(-20, 0, 'star').setScale(0.7));
        this.starCountText = this.add.text(0, 0, `${progressTracker.getLandStars(this.landKey)}`, {
            fontFamily: 'Arial, sans-serif', fontSize: '22px', fontStyle: 'bold',
            color: '#ffd700', stroke: '#000000', strokeThickness: 3,
        }).setOrigin(0, 0.5);
        starContainer.add(this.starCountText);

        // Land name
        this.add.text(this.cameras.main.width / 2, 25, this.getLandName(), {
            fontFamily: 'Arial, sans-serif', fontSize: '22px', fontStyle: 'bold',
            color: '#ffffff', stroke: '#000000', strokeThickness: 4,
        }).setOrigin(0.5).setScrollFactor(0).setDepth(1001);

        // Back to map button
        const backBtn = this.add.container(60, 30).setScrollFactor(0).setDepth(1001);
        const backBg = this.add.graphics();
        backBg.fillStyle(0x2a1a4e, 0.9);
        backBg.fillRoundedRect(-45, -16, 90, 32, 8);
        backBg.lineStyle(2, 0x7c4dff);
        backBg.strokeRoundedRect(-45, -16, 90, 32, 8);
        backBtn.add(backBg);
        backBtn.add(this.add.text(0, 0, '< Map', {
            fontFamily: 'Arial, sans-serif', fontSize: '16px', fontStyle: 'bold', color: '#b39ddb',
        }).setOrigin(0.5));
        const backHit = this.add.rectangle(60, 30, 90, 32, 0x000000, 0)
            .setScrollFactor(0).setDepth(1002).setInteractive({ useHandCursor: true });
        backHit.on('pointerdown', () => {
            if (this.challengeActive) return;
            this.cameras.main.fadeOut(300);
            this.cameras.main.once('camerafadeoutcomplete', () => this.scene.start('WorldMapScene'));
        });

        // Talk/interact hint
        this.talkHint = this.add.container(this.cameras.main.width - 120, this.cameras.main.height - 60)
            .setScrollFactor(0).setDepth(1001).setVisible(false);
        const hintBg = this.add.graphics();
        hintBg.fillStyle(0x2a1a4e, 0.9);
        hintBg.fillRoundedRect(-55, -20, 110, 40, 10);
        hintBg.lineStyle(2, 0x7c4dff);
        hintBg.strokeRoundedRect(-55, -20, 110, 40, 10);
        this.talkHint.add(hintBg);
        this.talkHint.add(this.add.text(0, 0, 'Talk', {
            fontFamily: 'Arial, sans-serif', fontSize: '20px', fontStyle: 'bold', color: '#b39ddb',
        }).setOrigin(0.5));
        const talkHit = this.add.rectangle(this.cameras.main.width - 120, this.cameras.main.height - 60, 110, 40, 0x000000, 0)
            .setScrollFactor(0).setDepth(1002).setInteractive({ useHandCursor: true });
        talkHit.on('pointerdown', () => {
            if (!this.dialogSystem.isActive() && !this.challengeActive) {
                if (this.nearSpider) {
                    this.challengeSpider(this.nearSpider);
                } else if (this.interactTarget) {
                    this.talkToNPC(this.interactTarget);
                } else if (this.nearHouse) {
                    this.enterHouse(this.nearHouse);
                }
            }
        });

        // Swimming indicator
        this.swimIndicator = this.add.text(this.cameras.main.width / 2, this.cameras.main.height - 30, 'Swimming!', {
            fontFamily: 'Arial, sans-serif', fontSize: '16px', fontStyle: 'bold',
            color: '#42a5f5', stroke: '#000000', strokeThickness: 3,
        }).setOrigin(0.5).setScrollFactor(0).setDepth(1001).setVisible(false);
    }

    update(time, delta) {
        if (this.dialogSystem.isActive() || this.challengeActive) {
            this.player.body.setVelocity(0, 0);
            return;
        }

        this.updateInvisibility(delta);
        this.checkSwimming();
        this.updateSpiders();
        this.updateCollectibles();
        this.updatePostGameContent();

        // Auto-trigger spider if close and visible
        if (this.nearSpider && !this.isInvisible && this.nearSpider.detected) {
            const dist = Phaser.Math.Distance.Between(this.player.x, this.player.y, this.nearSpider.x, this.nearSpider.y);
            if (dist < 60) {
                this.challengeSpider(this.nearSpider);
                return;
            }
        }

        // Movement
        let vx = 0, vy = 0;
        const speed = this.isSwimming ? 120 : 160;

        if (this.joystickActive) {
            vx = this.joystickVector.x * speed;
            vy = this.joystickVector.y * speed;
        }

        if (this.cursors.left.isDown) vx = -speed;
        if (this.cursors.right.isDown || this.wasd.D.isDown) vx = speed;
        if (this.cursors.up.isDown || this.wasd.W.isDown) vy = -speed;
        if (this.cursors.down.isDown || this.wasd.S.isDown) vy = speed;

        this.player.body.setVelocity(vx, vy);
        if (vx !== 0 && vy !== 0) {
            this.player.body.velocity.normalize().scale(speed);
        }

        // Animation
        if (Math.abs(vx) > 10 || Math.abs(vy) > 10) {
            if (Math.abs(vx) > Math.abs(vy)) {
                this.playerDir = vx < 0 ? 'left' : 'right';
            } else {
                this.playerDir = vy < 0 ? 'up' : 'down';
            }
            this.animTimer += delta;
            if (this.animTimer > 150) {
                this.animTimer = 0;
                this.playerFrame = (this.playerFrame + 1) % 4;
            }
        } else {
            this.playerFrame = 0;
        }

        const prefix = this.isSwimming ? 'axolotl_swim_' : 'axolotl_';
        this.player.setTexture(`${prefix}${this.currentCostume}_${this.playerDir}_${this.playerFrame}`);

        // Swimming indicator
        this.swimIndicator.setVisible(this.isSwimming);

        // Check NPC proximity
        this.interactTarget = null;
        this.npcSprites.forEach(npc => {
            const dist = Phaser.Math.Distance.Between(this.player.x, this.player.y, npc.x, npc.y);
            if (dist < 64) {
                this.interactTarget = npc;
            }
        });

        // Check house proximity
        this.nearHouse = null;
        this.houses.forEach(house => {
            const dist = Phaser.Math.Distance.Between(this.player.x, this.player.y, house.doorX, house.doorY);
            if (dist < 48) {
                this.nearHouse = house;
            }
        });

        // Update hint
        if (this.nearSpider) {
            this.talkHint.setVisible(true);
            this.talkHint.list[1].setText('Fight!');
        } else if (this.interactTarget) {
            this.talkHint.setVisible(true);
            this.talkHint.list[1].setText('Talk');
        } else if (this.nearHouse) {
            this.talkHint.setVisible(true);
            this.talkHint.list[1].setText('Enter');
        } else {
            this.talkHint.setVisible(false);
        }
    }

    // --- POST-GAME CONTENT ---
    createPostGameContent() {
        const pgData = {
            easter: {
                chest: { x: 1000, y: 600 }, costumeIndex: 5, costumeName: 'Hula Ninja',
                costumeDesc: 'A tropical outfit with sunny colors! Perfect for island adventures!',
                eggs: [
                    { id: 'hw_easter_1', x: 200, y: 1200, type: 'halloween_pumpkin' },
                    { id: 'hw_easter_2', x: 1800, y: 600, type: 'halloween_ghost' },
                    { id: 'hw_easter_3', x: 1200, y: 1500, type: 'halloween_candy' },
                ],
            },
            hannukah: {
                chest: { x: 1100, y: 700 }, costumeIndex: 6, costumeName: 'Starlight Ninja',
                costumeDesc: 'A shimmering silver outfit that sparkles like starlight! So fancy!',
                eggs: [
                    { id: 'hw_hannukah_1', x: 300, y: 500, type: 'halloween_pumpkin' },
                    { id: 'hw_hannukah_2', x: 1700, y: 800, type: 'halloween_ghost' },
                    { id: 'hw_hannukah_3', x: 1000, y: 1300, type: 'halloween_candy' },
                ],
            },
            christmas: {
                chest: { x: 1000, y: 600 }, costumeIndex: 7, costumeName: 'Snow Ninja',
                costumeDesc: 'A frosty white outfit that glitters like fresh snow! Brrrr-illiant!',
                eggs: [
                    { id: 'hw_christmas_1', x: 400, y: 400, type: 'halloween_pumpkin' },
                    { id: 'hw_christmas_2', x: 1800, y: 900, type: 'halloween_ghost' },
                    { id: 'hw_christmas_3', x: 800, y: 1400, type: 'halloween_candy' },
                ],
            },
            thanksgiving: {
                chest: { x: 1000, y: 600 }, costumeIndex: 8, costumeName: 'Golden Ninja',
                costumeDesc: 'A gorgeous golden outfit fit for a harvest queen! Absolutely radiant!',
                eggs: [
                    { id: 'hw_thanksgiving_1', x: 600, y: 300, type: 'halloween_pumpkin' },
                    { id: 'hw_thanksgiving_2', x: 2000, y: 600, type: 'halloween_ghost' },
                    { id: 'hw_thanksgiving_3', x: 1500, y: 1300, type: 'halloween_candy' },
                ],
            },
            megamix: {
                chest: { x: 1600, y: 700 }, costumeIndex: 9, costumeName: 'Disco Ninja',
                costumeDesc: 'A dazzling disco outfit with neon colors! Time to dance!',
                eggs: [
                    { id: 'hw_megamix_1', x: 500, y: 400, type: 'halloween_pumpkin' },
                    { id: 'hw_megamix_2', x: 2800, y: 500, type: 'halloween_ghost' },
                    { id: 'hw_megamix_3', x: 1200, y: 2000, type: 'halloween_candy' },
                ],
            },
        };

        this.pgLandData = pgData[this.landKey];
        if (!this.pgLandData) return;

        // Costume chest
        this.costumeChest = null;
        if (!progressTracker.hasPostGameOutfit(this.landKey)) {
            const cx = this.pgLandData.chest.x;
            const cy = this.pgLandData.chest.y;
            const chest = this.add.image(cx, cy, 'costume_chest').setDepth(85);
            this.tweens.add({
                targets: chest, scale: 1.1, duration: 800,
                yoyo: true, repeat: -1, ease: 'Sine.easeInOut',
            });
            const label = this.add.text(cx, cy - 24, 'Outfit!', {
                fontFamily: 'Arial, sans-serif', fontSize: '12px', fontStyle: 'bold',
                color: '#ffd700', stroke: '#000000', strokeThickness: 2,
            }).setOrigin(0.5).setDepth(86);
            this.tweens.add({
                targets: label, y: cy - 28, duration: 500,
                yoyo: true, repeat: -1, ease: 'Sine.easeInOut',
            });
            this.costumeChest = { sprite: chest, label: label };
        }

        // Halloween eggs
        this.halloweenEggSprites = [];
        this.pgLandData.eggs.forEach(egg => {
            if (progressTracker.hasHalloweenEgg(egg.id)) return;
            const sprite = this.add.image(egg.x, egg.y, egg.type).setDepth(85);
            sprite.eggData = egg;
            this.tweens.add({
                targets: sprite, alpha: 0.6, duration: 800,
                yoyo: true, repeat: -1, ease: 'Sine.easeInOut',
            });
            this.halloweenEggSprites.push(sprite);
        });
    }

    updatePostGameContent() {
        if (!this.pgLandData) return;

        // Costume chest proximity
        if (this.costumeChest) {
            const cx = this.pgLandData.chest.x;
            const cy = this.pgLandData.chest.y;
            const dist = Phaser.Math.Distance.Between(this.player.x, this.player.y, cx, cy);
            if (dist < 50) {
                this.openCostumeChest();
            }
        }

        // Halloween egg proximity
        if (this.halloweenEggSprites) {
            this.halloweenEggSprites.forEach(sprite => {
                if (!sprite.active) return;
                const dist = Phaser.Math.Distance.Between(this.player.x, this.player.y, sprite.x, sprite.y);
                if (dist < 40) {
                    this.collectHalloweenEgg(sprite);
                }
            });
        }
    }

    openCostumeChest() {
        if (!this.costumeChest) return;
        const pgData = this.pgLandData;
        progressTracker.collectPostGameOutfit(this.landKey, pgData.costumeIndex);
        this.currentCostume = pgData.costumeIndex;

        // Capture references before nulling this.costumeChest
        const chestSprite = this.costumeChest.sprite;
        const chestLabel = this.costumeChest.label;

        // Animate chest
        this.tweens.add({
            targets: chestSprite,
            y: chestSprite.y - 30, alpha: 0, scale: 1.5,
            duration: 400,
            onComplete: () => {
                chestSprite.destroy();
                chestLabel.destroy();
            },
        });

        // Sparkle burst
        const cx = pgData.chest.x;
        const cy = pgData.chest.y;
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
            `You found the ${pgData.costumeName} outfit! ${pgData.costumeDesc}`, () => {
                this.checkPostGameCompletion();
            });

        this.costumeChest = null;
    }

    collectHalloweenEgg(sprite) {
        const data = sprite.eggData;
        progressTracker.collectHalloweenEgg(data.id);

        this.tweens.add({
            targets: sprite, y: sprite.y - 30, alpha: 0, scale: 1.5,
            duration: 400, onComplete: () => sprite.destroy(),
        });
        this.halloweenEggSprites = this.halloweenEggSprites.filter(s => s !== sprite);

        for (let i = 0; i < 6; i++) {
            const sparkle = this.add.image(
                sprite.x + (Math.random() - 0.5) * 30,
                sprite.y + (Math.random() - 0.5) * 20,
                'sparkle_small'
            ).setDepth(200).setTint(0xff8f00);
            this.tweens.add({
                targets: sparkle, alpha: 0, scale: 0, y: sparkle.y - 20,
                duration: 400, delay: i * 50,
                onComplete: () => sparkle.destroy(),
            });
        }

        this.checkPostGameCompletion();
    }

    checkPostGameCompletion() {
        if (progressTracker.isPostGameComplete()) {
            this.time.delayedCall(500, () => {
                this.dialogSystem.show('Amazing!',
                    'You found ALL the outfits and ALL the hidden treats! Head back to the World Map for the GRAND CELEBRATION!');
            });
        }
    }

    talkToNPC(npc) {
        const data = npc.npcData;

        // If invisible, NPCs can't see you
        if (this.isInvisible) {
            this.dialogSystem.show(data.name, "Huh? I thought I heard something... Must be the wind!");
            return;
        }

        // Special handling for the Weblord boss fight — check before isNPCSolved
        // because a prior bugged play may have marked the NPC solved without
        // actually setting weblordDefeated
        if (data.id === 'weblord') {
            if (progressTracker.isWeblordDefeated()) {
                this.dialogSystem.show(data.name, data.solved);
                return;
            }
            this.startWeblordBattle(npc);
            return;
        }

        if (progressTracker.isNPCSolved(data.id)) {
            this.dialogSystem.show(data.name, data.solved);
            return;
        }

        this.dialogSystem.show(data.name, data.greeting, () => {
            this.dialogSystem.show(data.name, data.challenge, () => {
                this.challengeActive = true;
                this.scene.launch('MathChallengeScene', {
                    mode: 'single',
                    land: this.landKey,
                    npcId: data.id,
                    npcName: data.name,
                    mathType: data.mathType,
                    onComplete: (success) => {
                        this.challengeActive = false;
                        if (success) {
                            const earned = progressTracker.earnStar(this.landKey, data.id);
                            if (earned) {
                                this.starCountText.setText(`${progressTracker.getLandStars(this.landKey)}`);
                                if (npc.exclamation) {
                                    npc.exclamation.destroy();
                                    npc.exclamation = null;
                                }
                            }
                            this.dialogSystem.show(data.name, data.solved);
                        }
                    },
                });
            });
        });
    }

    startWeblordBattle(npc) {
        const data = npc.npcData;
        const bossData = NPC_DATA.finalBoss;

        this.dialogSystem.show(data.name, bossData.intro, () => {
            this.challengeActive = true;
            this.scene.launch('MathChallengeScene', {
                mode: 'boss',
                land: this.landKey,
                npcId: data.id,
                npcName: data.name,
                mathType: 'megamix',
                onComplete: () => {
                    this.challengeActive = false;
                    progressTracker.setWeblordDefeated();
                    progressTracker.earnStar(this.landKey, data.id);
                    this.starCountText.setText(`${progressTracker.getLandStars(this.landKey)}`);
                    if (npc.exclamation) {
                        npc.exclamation.destroy();
                        npc.exclamation = null;
                    }
                    // Show defeat dialog — the dance party and crown ceremony
                    // happen later when the player completes the Halloween Palace
                    this.time.delayedCall(500, () => {
                        this.dialogSystem.show(data.name, bossData.defeat);
                    });
                },
            });
        });
    }
}
