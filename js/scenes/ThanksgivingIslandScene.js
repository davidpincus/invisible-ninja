class ThanksgivingIslandScene extends BaseLandScene {
    constructor() {
        super('ThanksgivingIslandScene', 'thanksgiving');
    }

    getLandName() { return 'Thanksgiving Island'; }

    getHouses() {
        return [
            { id: 'thanksgiving_house_1', doorX: 500, doorY: 390 },
        ];
    }

    getSpiders() {
        return [
            { id: 'thanksgiving_spider_1', x: 350, y: 700, patrolX1: 280, patrolY1: 660, patrolX2: 440, patrolY2: 760, sprite: 'spider_orange' },
            { id: 'thanksgiving_spider_2', x: 1400, y: 450, patrolX1: 1340, patrolY1: 400, patrolX2: 1480, patrolY2: 520, sprite: 'spider_orange' },
            { id: 'thanksgiving_spider_3', x: 800, y: 1300, patrolX1: 740, patrolY1: 1260, patrolX2: 880, patrolY2: 1360, sprite: 'spider_orange' },
            { id: 'thanksgiving_spider_4', x: 2000, y: 900, patrolX1: 1940, patrolY1: 860, patrolX2: 2080, patrolY2: 960, sprite: 'spider_orange' },
        ];
    }

    getCollectibles() {
        return [
            { id: 'thanksgiving_acorn_0', x: 250, y: 400, type: 'acorn' },
            { id: 'thanksgiving_acorn_1', x: 700, y: 200, type: 'acorn' },
            { id: 'thanksgiving_acorn_2', x: 1200, y: 600, type: 'acorn' },
            { id: 'thanksgiving_acorn_3', x: 1800, y: 350, type: 'acorn' },
            { id: 'thanksgiving_acorn_4', x: 400, y: 1100, type: 'acorn' },
            { id: 'thanksgiving_acorn_5', x: 1000, y: 1000, type: 'acorn', inWater: true },
            { id: 'thanksgiving_acorn_6', x: 1600, y: 1300, type: 'acorn' },
            { id: 'thanksgiving_acorn_7', x: 2100, y: 700, type: 'acorn' },
        ];
    }

    getWaterZones() {
        return [
            // Cider stream - winding from northwest to southeast
            // Segment 1: upper left
            { x: 200, y: 500, w: 300, h: 60 },
            // Segment 2: curves south
            { x: 460, y: 500, w: 60, h: 250 },
            // Segment 3: continues east
            { x: 460, y: 710, w: 400, h: 60 },
            // Segment 4: curves south again
            { x: 820, y: 710, w: 60, h: 300 },
            // Segment 5: widens into cider pond
            { x: 820, y: 970, w: 250, h: 180 },
            // Small pond near cornucopia
            { x: 1700, y: 1200, w: 160, h: 120 },
        ];
    }

    createMap() {
        // Base fall grass
        for (let x = 0; x < this.mapWidth; x += 32) {
            for (let y = 0; y < this.mapHeight; y += 32) {
                this.add.image(x + 16, y + 16, 'tile_fall_grass');
            }
        }

        // --- CIDER STREAM ---
        // Winding stream from northwest to southeast
        this.fillArea(200, 500, 300, 60, 'tile_water_cider');
        this.fillArea(460, 500, 60, 250, 'tile_water_cider');
        this.fillArea(460, 710, 400, 60, 'tile_water_cider');
        this.fillArea(820, 710, 60, 300, 'tile_water_cider');
        // Cider pond at end of stream
        this.fillArea(820, 970, 250, 180, 'tile_water_cider');
        // Small pond near cornucopia
        this.fillArea(1700, 1200, 160, 120, 'tile_water_cider');

        // --- PATH NETWORK ---
        // Main east-west road
        this.pathLine(150, 600, 2250, 600, 'tile_fall_path');
        // North-south main road
        this.pathLine(500, 200, 500, 1600, 'tile_fall_path');
        // Path to log cabin
        this.pathLine(350, 390, 650, 390, 'tile_fall_path');
        // Eastern vertical path
        this.pathLine(1400, 250, 1400, 1500, 'tile_fall_path');
        // Southern horizontal connector
        this.pathLine(500, 1200, 1400, 1200, 'tile_fall_path');
        // Far east path
        this.pathLine(1900, 400, 1900, 1200, 'tile_fall_path');
        this.pathLine(1400, 800, 1900, 800, 'tile_fall_path');
        // Winding forest trail
        this.pathLine(800, 300, 1200, 300, 'tile_fall_path');
        this.pathLine(1200, 300, 1200, 600, 'tile_fall_path');
        // Trail around cider pond
        this.pathLine(750, 1000, 1100, 1000, 'tile_fall_path');
        // Northwest trail
        this.pathLine(200, 300, 500, 300, 'tile_fall_path');
        // Southern trail to far east
        this.pathLine(1400, 1200, 1900, 1200, 'tile_fall_path');

        // --- LOG CABIN (house) ---
        this.add.image(500, 350, 'log_cabin').setScale(1.3).setDepth(80);

        // --- ORANGE TREES ---
        const orangeTreePos = [
            [200, 250], [800, 200], [1100, 350], [1600, 300],
            [2100, 450], [300, 850], [1100, 800], [1700, 700],
            [2000, 1100], [350, 1400],
        ];
        orangeTreePos.forEach(([tx, ty]) => {
            this.add.image(tx, ty, 'tree_orange')
                .setScale(0.9 + Math.random() * 0.3).setDepth(80);
        });

        // --- RED TREES ---
        const redTreePos = [
            [400, 250], [700, 400], [1300, 250], [1800, 500],
            [600, 900], [1500, 1000], [2100, 800], [900, 1500],
        ];
        redTreePos.forEach(([tx, ty]) => {
            this.add.image(tx, ty, 'tree_red')
                .setScale(0.9 + Math.random() * 0.3).setDepth(80);
        });

        // --- PUMPKINS ---
        const pumpkinPositions = [
            [250, 500], [400, 700], [600, 500], [750, 350],
            [950, 450], [1100, 700], [1300, 550], [1500, 400],
            [1700, 600], [1900, 750], [350, 1100], [700, 1200],
            [1000, 1300], [1600, 1100], [2000, 1300],
        ];
        pumpkinPositions.forEach(([px, py]) => {
            this.add.image(px, py, 'pumpkin')
                .setScale(0.8 + Math.random() * 0.3).setDepth(80);
        });

        // --- HAY BALES ---
        this.add.image(300, 600, 'hay_bale').setDepth(80);
        this.add.image(800, 600, 'hay_bale').setDepth(80);
        this.add.image(1200, 600, 'hay_bale').setDepth(80);
        this.add.image(1700, 800, 'hay_bale').setDepth(80);
        this.add.image(500, 1200, 'hay_bale').setDepth(80);
        this.add.image(1400, 1200, 'hay_bale').setDepth(80);

        // --- CORN STALKS ---
        const cornPositions = [
            [180, 400], [220, 420], [260, 400],
            [850, 250], [890, 270], [930, 250],
            [1500, 550], [1540, 570], [1580, 550],
            [2050, 500], [2090, 520], [2130, 500],
        ];
        cornPositions.forEach(([cx, cy]) => {
            this.add.image(cx, cy, 'corn_stalk').setDepth(80);
        });

        // --- LEAF PILES ---
        const leafPilePositions = [
            [350, 300], [650, 650], [1000, 500], [1300, 700],
            [1600, 450], [1850, 600], [450, 1000], [900, 1100],
            [1500, 1300], [2100, 1000],
        ];
        leafPilePositions.forEach(([lx, ly]) => {
            this.add.image(lx, ly, 'leaf_pile').setDepth(79);
        });

        // --- CORNUCOPIAS ---
        this.add.image(800, 350, 'cornucopia').setScale(1.1).setDepth(80);
        this.add.image(1600, 1150, 'cornucopia').setScale(1.0).setDepth(80);
        this.add.image(2000, 500, 'cornucopia').setScale(0.9).setDepth(80);

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
        // Falling leaves - varied colors
        this.time.addEvent({
            delay: 350,
            loop: true,
            callback: () => {
                const colors = [0xff8f00, 0xd32f2f, 0xffd54f, 0xff6f00, 0xc62828, 0xffab00];
                const leaf = this.add.graphics();
                leaf.fillStyle(colors[Math.floor(Math.random() * colors.length)], 0.7);
                leaf.fillEllipse(0, 0, 5 + Math.random() * 3, 3 + Math.random() * 2);
                leaf.setPosition(
                    this.cameras.main.scrollX + Math.random() * 1024,
                    this.cameras.main.scrollY - 10
                ).setDepth(200);
                this.tweens.add({
                    targets: leaf,
                    x: leaf.x + (Math.random() - 0.5) * 120,
                    y: leaf.y + 600 + Math.random() * 400,
                    rotation: Math.random() * 8,
                    alpha: 0,
                    duration: 3000 + Math.random() * 3000,
                    ease: 'Sine.easeInOut',
                    onComplete: () => leaf.destroy(),
                });
            },
        });

        // Occasional rain - light drizzle
        this.time.addEvent({
            delay: 2000,
            loop: true,
            callback: () => {
                // Brief rain burst
                for (let i = 0; i < 8; i++) {
                    const drop = this.add.graphics();
                    drop.fillStyle(0x90caf9, 0.4);
                    drop.fillRect(0, 0, 1, 6);
                    drop.setPosition(
                        this.cameras.main.scrollX + Math.random() * 1024,
                        this.cameras.main.scrollY - 10
                    ).setDepth(201);
                    this.tweens.add({
                        targets: drop,
                        x: drop.x - 20,
                        y: drop.y + 800,
                        alpha: 0,
                        duration: 800 + Math.random() * 400,
                        delay: i * 50,
                        onComplete: () => drop.destroy(),
                    });
                }
            },
        });
    }
}
