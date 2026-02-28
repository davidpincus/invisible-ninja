class ChristmasIslandScene extends BaseLandScene {
    constructor() {
        super('ChristmasIslandScene', 'christmas');
    }

    getLandName() { return 'Christmas Island'; }

    getHouses() {
        return [
            { id: 'christmas_house_1', doorX: 700, doorY: 440 },
        ];
    }

    getSpiders() {
        return [
            { id: 'christmas_spider_1', x: 400, y: 500, patrolX1: 340, patrolY1: 460, patrolX2: 480, patrolY2: 560, sprite: 'spider_red' },
            { id: 'christmas_spider_2', x: 1500, y: 400, patrolX1: 1440, patrolY1: 360, patrolX2: 1580, patrolY2: 460, sprite: 'spider_red' },
            { id: 'christmas_spider_3', x: 1000, y: 1200, patrolX1: 940, patrolY1: 1160, patrolX2: 1080, patrolY2: 1260, sprite: 'spider_red' },
            { id: 'christmas_spider_4', x: 2000, y: 1000, patrolX1: 1940, patrolY1: 960, patrolX2: 2080, patrolY2: 1060, sprite: 'spider_red' },
        ];
    }

    getCollectibles() {
        return [
            { id: 'christmas_ornament_0', x: 300, y: 300, type: 'ornament' },
            { id: 'christmas_ornament_1', x: 900, y: 200, type: 'ornament' },
            { id: 'christmas_ornament_2', x: 1600, y: 600, type: 'ornament' },
            { id: 'christmas_ornament_3', x: 2100, y: 300, type: 'ornament' },
            { id: 'christmas_ornament_4', x: 500, y: 1100, type: 'ornament' },
            { id: 'christmas_ornament_5', x: 1200, y: 900, type: 'ornament' },
            { id: 'christmas_ornament_6', x: 1800, y: 1400, type: 'ornament' },
            { id: 'christmas_ornament_7', x: 400, y: 1500, type: 'ornament', inWater: true },
        ];
    }

    getWaterZones() {
        return [
            // Frozen pond - west
            { x: 150, y: 700, w: 300, h: 200 },
            // Frozen pond - east
            { x: 1800, y: 600, w: 250, h: 180 },
            // Hot chocolate river - runs north to south through center-east
            { x: 1300, y: 200, w: 80, h: 600 },
            // Hot chocolate river continues south
            { x: 1260, y: 800, w: 80, h: 500 },
            // Hot chocolate lake at river end
            { x: 1180, y: 1300, w: 240, h: 180 },
            // Small ice pond northwest
            { x: 300, y: 1400, w: 200, h: 150 },
        ];
    }

    createMap() {
        // Base snow ground
        for (let x = 0; x < this.mapWidth; x += 32) {
            for (let y = 0; y < this.mapHeight; y += 32) {
                this.add.image(x + 16, y + 16, 'tile_snow');
            }
        }

        // --- FROZEN PONDS (ice) ---
        this.fillArea(150, 700, 300, 200, 'tile_ice');
        this.fillArea(1800, 600, 250, 180, 'tile_ice');
        this.fillArea(300, 1400, 200, 150, 'tile_ice');

        // --- HOT CHOCOLATE RIVER ---
        // North segment flowing south
        this.fillArea(1300, 200, 80, 600, 'tile_hot_chocolate');
        // Slight bend
        this.fillArea(1260, 800, 80, 500, 'tile_hot_chocolate');
        // Lake at the bottom
        this.fillArea(1180, 1300, 240, 180, 'tile_hot_chocolate');

        // --- PATH NETWORK ---
        // Main boulevard west to east
        this.pathLine(150, 500, 2250, 500, 'tile_snow_path');
        // North-south main path
        this.pathLine(700, 200, 700, 1600, 'tile_snow_path');
        // Path to gingerbread house
        this.pathLine(550, 440, 850, 440, 'tile_snow_path');
        // Winding south path
        this.pathLine(400, 500, 400, 1000, 'tile_snow_path');
        this.pathLine(400, 1000, 700, 1000, 'tile_snow_path');
        // Eastern path grid
        this.pathLine(1500, 300, 1500, 1200, 'tile_snow_path');
        this.pathLine(1500, 800, 2200, 800, 'tile_snow_path');
        this.pathLine(2000, 500, 2000, 1200, 'tile_snow_path');
        // North connector
        this.pathLine(700, 300, 1250, 300, 'tile_snow_path');
        // Southern loop
        this.pathLine(700, 1300, 1150, 1300, 'tile_snow_path');
        this.pathLine(700, 1300, 700, 1600, 'tile_snow_path');
        // Circle path around west pond
        this.pathLine(150, 650, 500, 650, 'tile_snow_path');
        this.pathLine(150, 950, 500, 950, 'tile_snow_path');

        // --- GINGERBREAD HOUSE ---
        this.add.image(700, 400, 'gingerbread_house').setScale(1.3).setDepth(80);

        // --- SNOW TREES ---
        const treePositions = [
            [200, 250], [400, 200], [900, 300], [1100, 200],
            [1700, 300], [2100, 400], [200, 500], [550, 800],
            [900, 700], [1100, 600], [1700, 1000], [2100, 900],
            [300, 1200], [600, 1500], [1500, 1500], [2000, 1400],
        ];
        treePositions.forEach(([tx, ty]) => {
            this.add.image(tx, ty, 'tree_snow')
                .setScale(0.9 + Math.random() * 0.3).setDepth(80);
        });

        // --- SNOWMEN ---
        this.add.image(350, 650, 'snowman').setScale(1.2).setDepth(80);
        this.add.image(1000, 500, 'snowman').setScale(1.0).setDepth(80);
        this.add.image(1900, 450, 'snowman').setScale(1.1).setDepth(80);
        this.add.image(800, 1400, 'snowman').setScale(1.0).setDepth(80);

        // --- CANDY CANES ---
        const candyCanePositions = [
            [600, 440], [800, 440], [350, 500], [1050, 500],
            [1500, 500], [700, 1000], [1500, 800], [2000, 800],
            [400, 1300], [1200, 1200],
        ];
        candyCanePositions.forEach(([cx, cy]) => {
            this.add.image(cx, cy, 'candy_cane').setDepth(81);
        });

        // --- PRESENTS ---
        const presentPositions = [
            [250, 400], [500, 300], [850, 250], [1100, 350],
            [1400, 500], [1700, 700], [2100, 600], [350, 900],
            [650, 1100], [950, 1400], [1500, 1300], [2000, 1200],
        ];
        presentPositions.forEach(([px, py]) => {
            this.add.image(px, py, 'present')
                .setScale(0.8 + Math.random() * 0.3).setDepth(80);
        });

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
        // Snowfall - frequent
        this.time.addEvent({
            delay: 80,
            loop: true,
            callback: () => {
                const snow = this.add.graphics();
                snow.fillStyle(0xffffff, 0.6 + Math.random() * 0.4);
                snow.fillCircle(0, 0, 1 + Math.random() * 2.5);
                snow.setPosition(
                    this.cameras.main.scrollX + Math.random() * 1024,
                    this.cameras.main.scrollY - 10
                ).setDepth(200);
                this.tweens.add({
                    targets: snow,
                    x: snow.x + (Math.random() - 0.5) * 80,
                    y: snow.y + 700 + Math.random() * 300,
                    alpha: 0,
                    duration: 3500 + Math.random() * 3000,
                    onComplete: () => snow.destroy(),
                });
            },
        });

        // Twinkling lights - colored sparkles
        this.time.addEvent({
            delay: 500,
            loop: true,
            callback: () => {
                const lightColors = [0xff0000, 0x00ff00, 0xffd700, 0x0000ff, 0xff69b4, 0x00ffff];
                const light = this.add.graphics();
                light.fillStyle(lightColors[Math.floor(Math.random() * lightColors.length)], 0.8);
                light.fillCircle(0, 0, 2 + Math.random() * 2);
                light.setPosition(
                    this.cameras.main.scrollX + Math.random() * 1024,
                    this.cameras.main.scrollY + Math.random() * 768
                ).setDepth(198);
                this.tweens.add({
                    targets: light,
                    alpha: 0,
                    scale: 2,
                    duration: 800 + Math.random() * 600,
                    yoyo: true,
                    repeat: 1,
                    onComplete: () => light.destroy(),
                });
            },
        });
    }
}
