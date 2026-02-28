class WinterZoneScene extends BaseLandScene {
    constructor() {
        super('WinterZoneScene', 'winter');
    }

    getLandName() { return 'Winter Zone'; }

    getHouses() {
        return [
            { id: 'winter_house_1', doorX: 250, doorY: 240 },
            { id: 'winter_house_2', doorX: 800, doorY: 260 },
        ];
    }

    createMap() {
        for (let x = 0; x < this.mapWidth; x += 32) {
            for (let y = 0; y < this.mapHeight; y += 32) {
                this.add.image(x + 16, y + 16, 'tile_snow');
            }
        }

        this.pathLine(128, 448, 1072, 448, 'tile_snow_path');
        this.pathLine(400, 128, 400, 800, 'tile_snow_path');
        this.pathLine(640, 192, 640, 640, 'tile_snow_path');
        this.pathLine(192, 300, 800, 300, 'tile_snow_path');

        // Ice pond
        for (let x = 800; x < 1050; x += 32) {
            for (let y = 600; y < 780; y += 32) {
                this.add.image(x + 16, y + 16, 'tile_ice');
            }
        }

        // Igloos
        this.add.image(250, 200, 'igloo').setScale(1.3);
        this.add.image(800, 220, 'igloo').setScale(1.1);
        this.add.image(180, 650, 'igloo');

        // Snow trees
        for (let i = 0; i < 16; i++) {
            this.add.image(
                60 + Math.random() * (this.mapWidth - 120),
                60 + Math.random() * (this.mapHeight - 120),
                'tree_snow'
            ).setScale(0.9 + Math.random() * 0.3);
        }

        // Snowmen
        this.add.image(500, 300, 'snowman').setScale(1.2);
        this.add.image(900, 400, 'snowman');
        this.add.image(300, 700, 'snowman').setScale(1.1);

        for (let x = 0; x < this.mapWidth; x += 32) {
            this.add.image(x + 16, 16, 'fence');
            this.add.image(x + 16, this.mapHeight - 16, 'fence');
        }
    }

    createParticles() {
        // Snowfall
        this.time.addEvent({
            delay: 100,
            loop: true,
            callback: () => {
                const snow = this.add.graphics();
                snow.fillStyle(0xffffff, 0.7 + Math.random() * 0.3);
                snow.fillCircle(0, 0, 1 + Math.random() * 2);
                snow.setPosition(
                    this.cameras.main.scrollX + Math.random() * 1024,
                    this.cameras.main.scrollY - 10
                ).setDepth(200);
                this.tweens.add({
                    targets: snow,
                    x: snow.x + (Math.random() - 0.5) * 60,
                    y: snow.y + 800,
                    alpha: 0,
                    duration: 4000 + Math.random() * 3000,
                    onComplete: () => snow.destroy(),
                });
            },
        });
    }
}
