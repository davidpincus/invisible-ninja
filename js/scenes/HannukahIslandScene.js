class HannukahIslandScene extends BaseLandScene {
    constructor() {
        super('HannukahIslandScene', 'hannukah');
    }

    getLandName() { return 'Hannukah Island'; }

    getHouses() {
        return [
            { id: 'hannukah_house_1', doorX: 600, doorY: 390 },
        ];
    }

    getSpiders() {
        return [
            { id: 'hannukah_spider_1', x: 400, y: 800, patrolX1: 340, patrolY1: 760, patrolX2: 480, patrolY2: 860, sprite: 'spider_blue' },
            { id: 'hannukah_spider_2', x: 1600, y: 500, patrolX1: 1540, patrolY1: 460, patrolX2: 1680, patrolY2: 560, sprite: 'spider_blue' },
            { id: 'hannukah_spider_3', x: 1100, y: 1300, patrolX1: 1040, patrolY1: 1260, patrolX2: 1180, patrolY2: 1360, sprite: 'spider_blue' },
            { id: 'hannukah_spider_4', x: 2000, y: 1100, patrolX1: 1940, patrolY1: 1060, patrolX2: 2080, patrolY2: 1160, sprite: 'spider_blue' },
        ];
    }

    getCollectibles() {
        return [
            { id: 'hannukah_gelt_0', x: 300, y: 500, type: 'gelt' },
            { id: 'hannukah_gelt_1', x: 800, y: 250, type: 'gelt' },
            { id: 'hannukah_gelt_2', x: 1400, y: 700, type: 'gelt' },
            { id: 'hannukah_gelt_3', x: 1900, y: 350, type: 'gelt' },
            { id: 'hannukah_gelt_4', x: 500, y: 1200, type: 'gelt' },
            { id: 'hannukah_gelt_5', x: 1200, y: 1000, type: 'gelt' },
            { id: 'hannukah_gelt_6', x: 1700, y: 1400, type: 'gelt' },
            { id: 'hannukah_gelt_7', x: 2100, y: 800, type: 'gelt', inWater: true },
        ];
    }

    getWaterZones() {
        return [
            // Large icy lake - central-west
            { x: 200, y: 900, w: 350, h: 250 },
            // Smaller frozen pond - northeast
            { x: 1700, y: 200, w: 200, h: 180 },
            // Frozen stream running through south
            { x: 800, y: 1500, w: 600, h: 80 },
            // Small ice pond near synagogue
            { x: 2000, y: 750, w: 180, h: 140 },
        ];
    }

    createMap() {
        // Base blue-tinted grass
        for (let x = 0; x < this.mapWidth; x += 32) {
            for (let y = 0; y < this.mapHeight; y += 32) {
                this.add.image(x + 16, y + 16, 'tile_hannukah_grass');
            }
        }

        // --- ICY LAKES ---
        // Large icy lake - central-west
        this.fillArea(200, 900, 350, 250, 'tile_water_ice');
        // Smaller frozen pond - northeast
        this.fillArea(1700, 200, 200, 180, 'tile_water_ice');
        // Frozen stream through south
        this.fillArea(800, 1500, 600, 80, 'tile_water_ice');
        // Small ice pond east
        this.fillArea(2000, 750, 180, 140, 'tile_water_ice');

        // --- PATH NETWORK ---
        // Main horizontal boulevard
        this.pathLine(150, 600, 2250, 600, 'tile_hannukah_path');
        // Northern cross path
        this.pathLine(600, 200, 600, 600, 'tile_hannukah_path');
        // Path to synagogue
        this.pathLine(400, 390, 700, 390, 'tile_hannukah_path');
        this.pathLine(600, 390, 600, 600, 'tile_hannukah_path');
        // Southern fork paths
        this.pathLine(600, 600, 600, 1450, 'tile_hannukah_path');
        this.pathLine(1200, 600, 1200, 1450, 'tile_hannukah_path');
        // Connecting southern paths
        this.pathLine(600, 1100, 1200, 1100, 'tile_hannukah_path');
        // Eastern path loop
        this.pathLine(1800, 400, 1800, 1200, 'tile_hannukah_path');
        this.pathLine(1200, 600, 1800, 600, 'tile_hannukah_path');
        this.pathLine(1200, 1100, 1800, 1100, 'tile_hannukah_path');
        // Path around icy lake
        this.pathLine(150, 850, 600, 850, 'tile_hannukah_path');
        // Winding path northeast
        this.pathLine(1200, 350, 1650, 350, 'tile_hannukah_path');
        this.pathLine(1200, 350, 1200, 600, 'tile_hannukah_path');

        // --- SYNAGOGUE (house) ---
        this.add.image(600, 350, 'synagogue').setScale(1.3).setDepth(80);

        // --- SILVER TREES ---
        const treePositions = [
            [200, 300], [350, 700], [800, 450], [1000, 250],
            [1400, 350], [1600, 700], [1900, 550], [2100, 300],
            [300, 1300], [700, 1350], [1500, 1200], [1900, 1400],
            [1050, 700], [150, 550],
        ];
        treePositions.forEach(([tx, ty]) => {
            this.add.image(tx, ty, 'tree_silver')
                .setScale(0.9 + Math.random() * 0.3).setDepth(80);
        });

        // --- DREIDELS ---
        const dreidelPositions = [
            [250, 450], [500, 700], [750, 550], [1000, 400],
            [1300, 800], [1550, 600], [1800, 900], [900, 1200],
            [1600, 1300], [400, 1100],
        ];
        dreidelPositions.forEach(([dx, dy]) => {
            this.add.image(dx, dy, 'dreidel').setDepth(80);
        });

        // --- STAR OF DAVID decorations ---
        // Placed at path intersections and important locations
        this.add.image(600, 600, 'star_david').setScale(1.2).setDepth(82);
        this.add.image(1200, 600, 'star_david').setDepth(82);
        this.add.image(1200, 1100, 'star_david').setDepth(82);
        this.add.image(1800, 600, 'star_david').setDepth(82);
        this.add.image(600, 1100, 'star_david').setDepth(82);
        this.add.image(1800, 1100, 'star_david').setDepth(82);

        // --- MENORAH decorations near synagogue ---
        this.add.image(500, 300, 'menorah').setDepth(81);
        this.add.image(700, 300, 'menorah').setDepth(81);

        // --- FENCES ---
        for (let x = 0; x < this.mapWidth; x += 32) {
            this.add.image(x + 16, 16, 'fence').setDepth(81);
            this.add.image(x + 16, this.mapHeight - 16, 'fence').setDepth(81);
        }
        for (let y = 0; y < this.mapHeight; y += 32) {
            this.add.image(16, y + 16, 'fence').setDepth(81);
            this.add.image(this.mapWidth - 16, y + 16, 'fence').setDepth(81);
        }
    }

    createParticles() {
        // Floating sparkles - candle light effect
        this.time.addEvent({
            delay: 400,
            loop: true,
            callback: () => {
                const colors = [0xffd700, 0xffeb3b, 0xffffff, 0x42a5f5];
                const sparkle = this.add.graphics();
                sparkle.fillStyle(colors[Math.floor(Math.random() * colors.length)], 0.6 + Math.random() * 0.4);
                sparkle.fillCircle(0, 0, 1 + Math.random() * 2);
                sparkle.setPosition(
                    this.cameras.main.scrollX + Math.random() * 1024,
                    this.cameras.main.scrollY + Math.random() * 768
                ).setDepth(200);
                this.tweens.add({
                    targets: sparkle,
                    y: sparkle.y - 40 - Math.random() * 60,
                    x: sparkle.x + (Math.random() - 0.5) * 30,
                    alpha: 0,
                    scale: 0.3,
                    duration: 1500 + Math.random() * 1500,
                    ease: 'Sine.easeOut',
                    onComplete: () => sparkle.destroy(),
                });
            },
        });

        // Gentle snow
        this.time.addEvent({
            delay: 300,
            loop: true,
            callback: () => {
                const snow = this.add.graphics();
                snow.fillStyle(0xffffff, 0.4 + Math.random() * 0.3);
                snow.fillCircle(0, 0, 1 + Math.random() * 1.5);
                snow.setPosition(
                    this.cameras.main.scrollX + Math.random() * 1024,
                    this.cameras.main.scrollY - 10
                ).setDepth(199);
                this.tweens.add({
                    targets: snow,
                    x: snow.x + (Math.random() - 0.5) * 80,
                    y: snow.y + 700 + Math.random() * 300,
                    alpha: 0,
                    duration: 5000 + Math.random() * 4000,
                    onComplete: () => snow.destroy(),
                });
            },
        });
    }
}
