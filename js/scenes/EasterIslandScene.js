class EasterIslandScene extends BaseLandScene {
    constructor() {
        super('EasterIslandScene', 'easter');
    }

    getLandName() { return 'Easter Island'; }

    getHouses() {
        return [
            { id: 'easter_house_1', doorX: 500, doorY: 440 },
        ];
    }

    getSpiders() {
        return [
            { id: 'easter_spider_1', x: 350, y: 600, patrolX1: 300, patrolY1: 580, patrolX2: 420, patrolY2: 640, sprite: 'spider_mini' },
            { id: 'easter_spider_2', x: 1200, y: 350, patrolX1: 1140, patrolY1: 320, patrolX2: 1280, patrolY2: 400, sprite: 'spider_mini' },
            { id: 'easter_spider_3', x: 1800, y: 900, patrolX1: 1750, patrolY1: 860, patrolX2: 1880, patrolY2: 960, sprite: 'spider_mini' },
            { id: 'easter_spider_4', x: 900, y: 1400, patrolX1: 840, patrolY1: 1360, patrolX2: 980, patrolY2: 1460, sprite: 'spider_mini' },
        ];
    }

    getCollectibles() {
        return [
            { id: 'easter_egg_0', x: 260, y: 320, type: 'egg_0' },
            { id: 'easter_egg_1', x: 700, y: 180, type: 'egg_1' },
            { id: 'easter_egg_2', x: 1500, y: 500, type: 'egg_2' },
            { id: 'easter_egg_3', x: 1900, y: 1200, type: 'egg_3' },
            { id: 'easter_egg_4', x: 400, y: 1100, type: 'egg_4', inWater: true },
            { id: 'easter_egg_5', x: 1100, y: 800, type: 'egg_5' },
            { id: 'easter_egg_6', x: 2100, y: 400, type: 'egg_6', inWater: true },
            { id: 'easter_egg_7', x: 1600, y: 1500, type: 'egg_7' },
        ];
    }

    getWaterZones() {
        return [
            // Ocean edges - top
            { x: 0, y: 0, w: 2400, h: 96 },
            // Ocean edges - bottom
            { x: 0, y: 1700, w: 2400, h: 100 },
            // Ocean edges - left
            { x: 0, y: 0, w: 96, h: 1800 },
            // Ocean edges - right
            { x: 2300, y: 0, w: 100, h: 1800 },
            // Tide pool near moai cluster
            { x: 350, y: 1050, w: 160, h: 120 },
            // Tide pool east side
            { x: 2050, y: 350, w: 140, h: 110 },
        ];
    }

    createMap() {
        // Base tropical grass
        for (let x = 0; x < this.mapWidth; x += 32) {
            for (let y = 0; y < this.mapHeight; y += 32) {
                this.add.image(x + 16, y + 16, 'tile_tropical_grass');
            }
        }

        // Ocean water around edges
        // Top ocean band
        this.fillArea(0, 0, this.mapWidth, 96, 'tile_water');
        // Bottom ocean band
        this.fillArea(0, 1700, this.mapWidth, 100, 'tile_water');
        // Left ocean band
        this.fillArea(0, 0, 96, this.mapHeight, 'tile_water');
        // Right ocean band
        this.fillArea(2300, 0, 100, this.mapHeight, 'tile_water');

        // Sandy beaches - transition between ocean and grass
        // Top beach
        this.fillArea(96, 96, this.mapWidth - 192, 64, 'tile_sand');
        // Bottom beach
        this.fillArea(96, 1636, this.mapWidth - 192, 64, 'tile_sand');
        // Left beach
        this.fillArea(96, 160, 64, this.mapHeight - 320, 'tile_sand');
        // Right beach
        this.fillArea(2236, 160, 64, this.mapHeight - 320, 'tile_sand');

        // Volcanic area in the northeast
        this.fillArea(1700, 200, 400, 350, 'tile_volcanic');

        // Tide pools
        this.fillArea(350, 1050, 160, 120, 'tile_water');
        this.fillArea(2050, 350, 140, 110, 'tile_water');

        // --- PATH NETWORK ---
        // Main east-west path across the island
        this.pathLine(200, 700, 2200, 700, 'tile_tropical_path');
        // Main north-south path
        this.pathLine(600, 200, 600, 1600, 'tile_tropical_path');
        // Diagonal path to volcanic area
        this.pathLine(600, 500, 1700, 300, 'tile_tropical_path');
        // Southern loop path
        this.pathLine(300, 1200, 1800, 1200, 'tile_tropical_path');
        // Connector - west vertical
        this.pathLine(300, 700, 300, 1200, 'tile_tropical_path');
        // Connector - east vertical
        this.pathLine(1800, 700, 1800, 1200, 'tile_tropical_path');
        // Path to temple
        this.pathLine(400, 440, 600, 440, 'tile_tropical_path');
        // Winding path through south
        this.pathLine(600, 1200, 600, 1550, 'tile_tropical_path');
        this.pathLine(600, 1550, 1200, 1550, 'tile_tropical_path');
        // Path to northeast
        this.pathLine(1200, 700, 1200, 350, 'tile_tropical_path');

        // --- STONE TEMPLE (house) ---
        this.add.image(500, 400, 'stone_temple').setScale(1.3).setDepth(80);

        // --- MOAI STATUES ---
        // Clustered in ceremonial formation and scattered
        this.add.image(350, 650, 'moai').setScale(1.2).setDepth(80);
        this.add.image(420, 630, 'moai').setScale(1.1).setDepth(80);
        this.add.image(1200, 400, 'moai').setScale(1.3).setDepth(80);
        this.add.image(1850, 900, 'moai').setScale(1.0).setDepth(80);
        this.add.image(900, 1350, 'moai').setScale(1.2).setDepth(80);
        this.add.image(1600, 1450, 'moai').setScale(1.1).setDepth(80);

        // --- TIKI TORCHES ---
        // Along the main path and near temple
        this.add.image(400, 430, 'tiki_torch').setDepth(81);
        this.add.image(600, 430, 'tiki_torch').setDepth(81);
        this.add.image(300, 700, 'tiki_torch').setDepth(81);
        this.add.image(600, 700, 'tiki_torch').setDepth(81);
        this.add.image(1000, 700, 'tiki_torch').setDepth(81);
        this.add.image(1500, 700, 'tiki_torch').setDepth(81);
        this.add.image(1800, 1200, 'tiki_torch').setDepth(81);
        this.add.image(300, 1200, 'tiki_torch').setDepth(81);

        // --- PALM TREES ---
        const palmPositions = [
            [200, 250], [800, 300], [1000, 200], [1500, 250],
            [250, 900], [700, 1000], [1100, 950], [1600, 800],
            [400, 1500], [1000, 1500], [1400, 1400], [2000, 600],
            [2100, 1000], [180, 1400], [1300, 600],
        ];
        palmPositions.forEach(([px, py]) => {
            this.add.image(px, py, 'palm_tree')
                .setScale(0.9 + Math.random() * 0.4).setDepth(80);
        });

        // --- SAND PATCHES inland ---
        // Beach bonfire area
        this.fillArea(800, 1640, 200, 60, 'tile_sand');
        // Small sand clearing
        this.fillArea(1400, 800, 128, 96, 'tile_sand');

        // --- FENCES along walkable edges ---
        for (let x = 96; x < this.mapWidth - 96; x += 32) {
            this.add.image(x + 16, 160, 'fence').setDepth(81);
            this.add.image(x + 16, 1636, 'fence').setDepth(81);
        }
        for (let y = 160; y < this.mapHeight - 160; y += 32) {
            this.add.image(160, y + 16, 'fence').setDepth(81);
            this.add.image(2236, y + 16, 'fence').setDepth(81);
        }
    }

    createParticles() {
        // Ocean spray along the shoreline
        this.time.addEvent({
            delay: 800,
            loop: true,
            callback: () => {
                // Pick a random edge point
                const side = Math.floor(Math.random() * 4);
                let sx, sy;
                if (side === 0) { sx = 96 + Math.random() * (this.mapWidth - 192); sy = 100 + Math.random() * 30; }
                else if (side === 1) { sx = 96 + Math.random() * (this.mapWidth - 192); sy = 1690 + Math.random() * 30; }
                else if (side === 2) { sx = 90 + Math.random() * 30; sy = 96 + Math.random() * (this.mapHeight - 192); }
                else { sx = 2290 + Math.random() * 30; sy = 96 + Math.random() * (this.mapHeight - 192); }

                const spray = this.add.graphics();
                spray.fillStyle(0xffffff, 0.5 + Math.random() * 0.3);
                spray.fillCircle(0, 0, 2 + Math.random() * 3);
                spray.setPosition(sx, sy).setDepth(200);
                this.tweens.add({
                    targets: spray,
                    y: spray.y - 20 - Math.random() * 30,
                    alpha: 0,
                    duration: 1000 + Math.random() * 1000,
                    onComplete: () => spray.destroy(),
                });
            },
        });

        // Floating flower petals drifting in the breeze
        this.time.addEvent({
            delay: 1200,
            loop: true,
            callback: () => {
                const colors = [0xff69b4, 0xff1493, 0xffa07a, 0xffb6c1, 0xffd700];
                const petal = this.add.graphics();
                petal.fillStyle(colors[Math.floor(Math.random() * colors.length)], 0.7);
                petal.fillEllipse(0, 0, 5, 3);
                petal.setPosition(
                    this.cameras.main.scrollX + Math.random() * 1024,
                    this.cameras.main.scrollY - 10
                ).setDepth(200);
                this.tweens.add({
                    targets: petal,
                    x: petal.x + (Math.random() - 0.3) * 150,
                    y: petal.y + 600 + Math.random() * 300,
                    rotation: Math.random() * 8,
                    alpha: 0,
                    duration: 4000 + Math.random() * 3000,
                    ease: 'Sine.easeInOut',
                    onComplete: () => petal.destroy(),
                });
            },
        });
    }
}
