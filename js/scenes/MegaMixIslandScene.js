class MegaMixIslandScene extends BaseLandScene {
    constructor() {
        super('MegaMixIslandScene', 'megamix');
    }

    getLandName() { return 'Mega Mix Island'; }

    create() {
        super.create();
        // Expand map for mega island
        this.mapWidth = 3200;
        this.mapHeight = 2400;
        this.physics.world.setBounds(0, 0, 3200, 2400);
        this.cameras.main.setBounds(0, 0, 3200, 2400);
    }

    getHouses() {
        return [
            { id: 'megamix_house_1', doorX: 1600, doorY: 1240 },
        ];
    }

    getSpiders() {
        return [
            // One in each zone corner + two guarding the center
            { id: 'megamix_spider_1', x: 600, y: 500, patrolX1: 520, patrolY1: 440, patrolX2: 700, patrolY2: 580, sprite: 'spider_rainbow' },
            { id: 'megamix_spider_2', x: 2600, y: 500, patrolX1: 2520, patrolY1: 440, patrolX2: 2700, patrolY2: 580, sprite: 'spider_rainbow' },
            { id: 'megamix_spider_3', x: 600, y: 1900, patrolX1: 520, patrolY1: 1840, patrolX2: 700, patrolY2: 1980, sprite: 'spider_rainbow' },
            { id: 'megamix_spider_4', x: 2600, y: 1900, patrolX1: 2520, patrolY1: 1840, patrolX2: 2700, patrolY2: 1980, sprite: 'spider_rainbow' },
            // Elite center guards
            { id: 'megamix_spider_5', x: 1400, y: 1100, patrolX1: 1300, patrolY1: 1050, patrolX2: 1500, patrolY2: 1180, sprite: 'spider_rainbow' },
            { id: 'megamix_spider_6', x: 1800, y: 1300, patrolX1: 1700, patrolY1: 1250, patrolX2: 1900, patrolY2: 1380, sprite: 'spider_rainbow' },
        ];
    }

    getCollectibles() {
        return [
            // Golden eggs - one per zone
            { id: 'megamix_golden_ne', x: 2400, y: 400, type: 'golden_egg' },
            { id: 'megamix_golden_nw', x: 400, y: 400, type: 'golden_egg' },
            { id: 'megamix_golden_se', x: 2400, y: 2000, type: 'golden_egg' },
            { id: 'megamix_golden_sw', x: 400, y: 2000, type: 'golden_egg' },
            // Regular eggs spread around
            { id: 'megamix_egg_0', x: 800, y: 300, type: 'egg_0' },
            { id: 'megamix_egg_1', x: 2200, y: 700, type: 'egg_1' },
            { id: 'megamix_egg_2', x: 2200, y: 1800, type: 'egg_2', inWater: true },
            { id: 'megamix_egg_3', x: 800, y: 1800, type: 'egg_3' },
        ];
    }

    getWaterZones() {
        return [
            // NE zone - tropical tide pool
            { x: 2500, y: 300, w: 200, h: 150 },
            // NW zone - icy lake
            { x: 300, y: 600, w: 250, h: 200 },
            // SE zone - frozen pond
            { x: 2100, y: 1700, w: 280, h: 200 },
            // SW zone - cider stream
            { x: 400, y: 1700, w: 300, h: 60 },
            { x: 660, y: 1700, w: 60, h: 200 },
            // Center - grand fountain pool
            { x: 1500, y: 1100, w: 200, h: 200 },
        ];
    }

    createMap() {
        // The map is divided into 4 themed zones + center plaza
        // NW (0-1600, 0-1200): Blue/Silver (Hannukah)
        // NE (1600-3200, 0-1200): Tropical (Easter)
        // SW (0-1600, 1200-2400): Fall (Thanksgiving)
        // SE (1600-3200, 1200-2400): Snow (Christmas)
        // Center: Grand Plaza

        // --- NW ZONE: Blue/Silver (Hannukah theme) ---
        for (let x = 0; x < 1600; x += 32) {
            for (let y = 0; y < 1200; y += 32) {
                this.add.image(x + 16, y + 16, 'tile_hannukah_grass');
            }
        }

        // --- NE ZONE: Tropical (Easter theme) ---
        for (let x = 1600; x < 3200; x += 32) {
            for (let y = 0; y < 1200; y += 32) {
                this.add.image(x + 16, y + 16, 'tile_tropical_grass');
            }
        }

        // --- SW ZONE: Fall (Thanksgiving theme) ---
        for (let x = 0; x < 1600; x += 32) {
            for (let y = 1200; y < 2400; y += 32) {
                this.add.image(x + 16, y + 16, 'tile_fall_grass');
            }
        }

        // --- SE ZONE: Snow (Christmas theme) ---
        for (let x = 1600; x < 3200; x += 32) {
            for (let y = 1200; y < 2400; y += 32) {
                this.add.image(x + 16, y + 16, 'tile_snow');
            }
        }

        // --- CENTER GRAND PLAZA ---
        this.fillArea(1200, 900, 800, 600, 'tile_plaza');
        // Zone borders
        this.fillArea(1180, 900, 20, 600, 'tile_zone_border');
        this.fillArea(2000, 900, 20, 600, 'tile_zone_border');
        this.fillArea(1200, 880, 800, 20, 'tile_zone_border');
        this.fillArea(1200, 1500, 800, 20, 'tile_zone_border');
        // Vertical zone border line (N-S)
        this.fillArea(1590, 0, 20, 880, 'tile_zone_border');
        this.fillArea(1590, 1520, 20, 880, 'tile_zone_border');
        // Horizontal zone border line (E-W)
        this.fillArea(0, 1190, 1180, 20, 'tile_zone_border');
        this.fillArea(2020, 1190, 1180, 20, 'tile_zone_border');

        // --- WATER FEATURES ---
        // NE - tropical tide pool
        this.fillArea(2500, 300, 200, 150, 'tile_water');
        // NW - icy lake
        this.fillArea(300, 600, 250, 200, 'tile_water_ice');
        // SE - frozen pond
        this.fillArea(2100, 1700, 280, 200, 'tile_ice');
        // SW - cider stream
        this.fillArea(400, 1700, 300, 60, 'tile_water_cider');
        this.fillArea(660, 1700, 60, 200, 'tile_water_cider');
        // Center - fountain pool
        this.fillArea(1500, 1100, 200, 200, 'tile_water');

        // --- PATH NETWORK ---
        // Grand avenues leading to center
        // North avenue
        this.pathLine(1600, 200, 1600, 880, 'tile_plaza');
        // South avenue
        this.pathLine(1600, 1520, 1600, 2200, 'tile_plaza');
        // West avenue
        this.pathLine(200, 1200, 1180, 1200, 'tile_plaza');
        // East avenue
        this.pathLine(2020, 1200, 3000, 1200, 'tile_plaza');

        // NW zone paths (Hannukah)
        this.pathLine(200, 400, 1200, 400, 'tile_hannukah_path');
        this.pathLine(600, 200, 600, 1000, 'tile_hannukah_path');
        this.pathLine(200, 800, 1200, 800, 'tile_hannukah_path');
        this.pathLine(1000, 200, 1000, 1000, 'tile_hannukah_path');

        // NE zone paths (Easter/Tropical)
        this.pathLine(1800, 400, 3000, 400, 'tile_tropical_path');
        this.pathLine(2200, 200, 2200, 1000, 'tile_tropical_path');
        this.pathLine(1800, 800, 3000, 800, 'tile_tropical_path');
        this.pathLine(2600, 200, 2600, 1000, 'tile_tropical_path');

        // SW zone paths (Fall)
        this.pathLine(200, 1600, 1200, 1600, 'tile_fall_path');
        this.pathLine(600, 1400, 600, 2200, 'tile_fall_path');
        this.pathLine(200, 2000, 1200, 2000, 'tile_fall_path');
        this.pathLine(1000, 1400, 1000, 2200, 'tile_fall_path');

        // SE zone paths (Christmas/Snow)
        this.pathLine(1800, 1600, 3000, 1600, 'tile_snow_path');
        this.pathLine(2200, 1400, 2200, 2200, 'tile_snow_path');
        this.pathLine(1800, 2000, 3000, 2000, 'tile_snow_path');
        this.pathLine(2600, 1400, 2600, 2200, 'tile_snow_path');

        // --- GRAND PALACE (house) at center ---
        this.add.image(1600, 1200, 'grand_palace').setScale(1.5).setDepth(80);

        // --- NW ZONE DECORATIONS (Hannukah) ---
        // Silver trees
        [   [200, 250], [500, 300], [800, 200], [1100, 350],
            [300, 900], [700, 700], [1000, 850],
        ].forEach(([tx, ty]) => {
            this.add.image(tx, ty, 'tree_silver').setScale(0.9 + Math.random() * 0.3).setDepth(80);
        });
        // Dreidels
        [[400, 500], [800, 400], [600, 900], [1000, 600]].forEach(([dx, dy]) => {
            this.add.image(dx, dy, 'dreidel').setDepth(80);
        });
        // Star of David
        this.add.image(600, 400, 'star_david').setScale(1.1).setDepth(82);
        this.add.image(1000, 800, 'star_david').setDepth(82);

        // --- NE ZONE DECORATIONS (Tropical/Easter) ---
        // Palm trees
        [   [1800, 250], [2100, 300], [2400, 200], [2700, 350],
            [1900, 700], [2300, 600], [2800, 800], [3000, 400],
        ].forEach(([px, py]) => {
            this.add.image(px, py, 'palm_tree').setScale(0.9 + Math.random() * 0.4).setDepth(80);
        });
        // Moai
        this.add.image(2200, 450, 'moai').setScale(1.2).setDepth(80);
        this.add.image(2600, 700, 'moai').setScale(1.1).setDepth(80);
        this.add.image(2900, 300, 'moai').setDepth(80);
        // Tiki torches
        [[2000, 400], [2400, 800], [2800, 500]].forEach(([tx, ty]) => {
            this.add.image(tx, ty, 'tiki_torch').setDepth(81);
        });
        // Sand areas
        this.fillArea(2700, 200, 200, 100, 'tile_sand');
        this.fillArea(2900, 800, 200, 100, 'tile_sand');

        // --- SW ZONE DECORATIONS (Fall/Thanksgiving) ---
        // Orange and red trees
        [   [200, 1400], [500, 1500], [800, 1350], [1100, 1550],
            [300, 2100], [700, 1900], [1000, 2100],
        ].forEach(([tx, ty]) => {
            this.add.image(tx, ty, Math.random() > 0.5 ? 'tree_orange' : 'tree_red')
                .setScale(0.9 + Math.random() * 0.3).setDepth(80);
        });
        // Pumpkins
        [[300, 1600], [600, 1800], [900, 1500], [1100, 2000],
         [400, 2200], [800, 2100]].forEach(([px, py]) => {
            this.add.image(px, py, 'pumpkin').setScale(0.8 + Math.random() * 0.3).setDepth(80);
        });
        // Hay bales
        this.add.image(500, 1600, 'hay_bale').setDepth(80);
        this.add.image(900, 2000, 'hay_bale').setDepth(80);
        // Corn stalks
        [[200, 1800], [240, 1820], [280, 1800]].forEach(([cx, cy]) => {
            this.add.image(cx, cy, 'corn_stalk').setDepth(80);
        });
        // Leaf piles
        [[400, 1500], [700, 1700], [1000, 1900]].forEach(([lx, ly]) => {
            this.add.image(lx, ly, 'leaf_pile').setDepth(79);
        });

        // --- SE ZONE DECORATIONS (Christmas/Snow) ---
        // Snow trees
        [   [1800, 1400], [2100, 1500], [2400, 1350], [2700, 1550],
            [1900, 2100], [2300, 1900], [2600, 2100], [3000, 1800],
        ].forEach(([tx, ty]) => {
            this.add.image(tx, ty, 'tree_snow').setScale(0.9 + Math.random() * 0.3).setDepth(80);
        });
        // Snowmen
        this.add.image(2000, 1600, 'snowman').setScale(1.1).setDepth(80);
        this.add.image(2600, 2000, 'snowman').setDepth(80);
        // Candy canes
        [[2200, 1600], [2400, 2000], [2800, 1700], [3000, 2100]].forEach(([cx, cy]) => {
            this.add.image(cx, cy, 'candy_cane').setDepth(81);
        });
        // Presents
        [[1900, 1500], [2300, 1700], [2700, 1900], [2500, 2200]].forEach(([px, py]) => {
            this.add.image(px, py, 'present').setScale(0.8 + Math.random() * 0.3).setDepth(80);
        });
        // Ice areas
        this.fillArea(2400, 1500, 150, 100, 'tile_ice');

        // --- CENTER PLAZA DECORATIONS ---
        // Fountain in the center pool area
        this.add.image(1600, 1200, 'fountain').setScale(1.5).setDepth(82);
        // Stars/sparkle decorations around plaza
        this.add.image(1300, 1000, 'star_david').setDepth(82);
        this.add.image(1900, 1000, 'tiki_torch').setDepth(81);
        this.add.image(1300, 1400, 'cornucopia').setDepth(80);
        this.add.image(1900, 1400, 'candy_cane').setDepth(81);

        // --- FENCES around entire map ---
        for (let x = 0; x < 3200; x += 32) {
            this.add.image(x + 16, 16, 'fence').setDepth(81);
            this.add.image(x + 16, 2400 - 16, 'fence').setDepth(81);
        }
        for (let y = 0; y < 2400; y += 32) {
            this.add.image(16, y + 16, 'fence').setDepth(81);
            this.add.image(3200 - 16, y + 16, 'fence').setDepth(81);
        }
    }

    createParticles() {
        // Zone-based particles - check player position each frame
        // We create all particle emitters but they check position before spawning

        // Hannukah zone (NW) - sparkles
        this.time.addEvent({
            delay: 500,
            loop: true,
            callback: () => {
                if (this.cameras.main.scrollX < 1200 && this.cameras.main.scrollY < 1000) {
                    const colors = [0xffd700, 0xffeb3b, 0xffffff, 0x42a5f5];
                    const sparkle = this.add.graphics();
                    sparkle.fillStyle(colors[Math.floor(Math.random() * colors.length)], 0.6);
                    sparkle.fillCircle(0, 0, 1 + Math.random() * 2);
                    sparkle.setPosition(
                        this.cameras.main.scrollX + Math.random() * 1024,
                        this.cameras.main.scrollY + Math.random() * 768
                    ).setDepth(200);
                    this.tweens.add({
                        targets: sparkle,
                        y: sparkle.y - 40,
                        alpha: 0,
                        duration: 1500,
                        onComplete: () => sparkle.destroy(),
                    });
                }
            },
        });

        // Easter zone (NE) - flower petals
        this.time.addEvent({
            delay: 800,
            loop: true,
            callback: () => {
                if (this.cameras.main.scrollX > 1200 && this.cameras.main.scrollY < 1000) {
                    const colors = [0xff69b4, 0xff1493, 0xffa07a, 0xffd700];
                    const petal = this.add.graphics();
                    petal.fillStyle(colors[Math.floor(Math.random() * colors.length)], 0.7);
                    petal.fillEllipse(0, 0, 5, 3);
                    petal.setPosition(
                        this.cameras.main.scrollX + Math.random() * 1024,
                        this.cameras.main.scrollY - 10
                    ).setDepth(200);
                    this.tweens.add({
                        targets: petal,
                        x: petal.x + (Math.random() - 0.3) * 100,
                        y: petal.y + 500,
                        rotation: Math.random() * 6,
                        alpha: 0,
                        duration: 3500,
                        onComplete: () => petal.destroy(),
                    });
                }
            },
        });

        // Thanksgiving zone (SW) - falling leaves
        this.time.addEvent({
            delay: 400,
            loop: true,
            callback: () => {
                if (this.cameras.main.scrollX < 1200 && this.cameras.main.scrollY > 1000) {
                    const colors = [0xff8f00, 0xd32f2f, 0xffd54f, 0xc62828];
                    const leaf = this.add.graphics();
                    leaf.fillStyle(colors[Math.floor(Math.random() * colors.length)], 0.7);
                    leaf.fillEllipse(0, 0, 5, 3);
                    leaf.setPosition(
                        this.cameras.main.scrollX + Math.random() * 1024,
                        this.cameras.main.scrollY - 10
                    ).setDepth(200);
                    this.tweens.add({
                        targets: leaf,
                        x: leaf.x + (Math.random() - 0.5) * 100,
                        y: leaf.y + 600,
                        rotation: Math.random() * 8,
                        alpha: 0,
                        duration: 3000,
                        onComplete: () => leaf.destroy(),
                    });
                }
            },
        });

        // Christmas zone (SE) - snowfall
        this.time.addEvent({
            delay: 120,
            loop: true,
            callback: () => {
                if (this.cameras.main.scrollX > 1200 && this.cameras.main.scrollY > 1000) {
                    const snow = this.add.graphics();
                    snow.fillStyle(0xffffff, 0.6 + Math.random() * 0.4);
                    snow.fillCircle(0, 0, 1 + Math.random() * 2);
                    snow.setPosition(
                        this.cameras.main.scrollX + Math.random() * 1024,
                        this.cameras.main.scrollY - 10
                    ).setDepth(200);
                    this.tweens.add({
                        targets: snow,
                        x: snow.x + (Math.random() - 0.5) * 60,
                        y: snow.y + 700,
                        alpha: 0,
                        duration: 3500,
                        onComplete: () => snow.destroy(),
                    });
                }
            },
        });

        // Center plaza - gentle multi-colored sparkles (always visible when in center)
        this.time.addEvent({
            delay: 600,
            loop: true,
            callback: () => {
                const cx = this.cameras.main.scrollX + 512;
                const cy = this.cameras.main.scrollY + 384;
                if (cx > 1100 && cx < 2100 && cy > 800 && cy < 1600) {
                    const colors = [0xffd700, 0xff69b4, 0x42a5f5, 0x66bb6a, 0xff7043];
                    const sparkle = this.add.graphics();
                    sparkle.fillStyle(colors[Math.floor(Math.random() * colors.length)], 0.7);
                    sparkle.fillCircle(0, 0, 2);
                    sparkle.setPosition(
                        this.cameras.main.scrollX + Math.random() * 1024,
                        this.cameras.main.scrollY + Math.random() * 768
                    ).setDepth(200);
                    this.tweens.add({
                        targets: sparkle,
                        y: sparkle.y - 50,
                        alpha: 0,
                        scale: 2,
                        duration: 1200,
                        onComplete: () => sparkle.destroy(),
                    });
                }
            },
        });
    }
}
