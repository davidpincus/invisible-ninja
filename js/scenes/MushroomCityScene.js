class MushroomCityScene extends BaseLandScene {
    constructor() {
        super('MushroomCityScene', 'mushroom');
    }

    getLandName() { return 'Mushroom City'; }

    getHouses() {
        return [
            { id: 'mush_house_1', doorX: 224, doorY: 220 },
            { id: 'mush_house_2', doorX: 800, doorY: 220 },
        ];
    }

    createMap() {
        // Ground layer
        for (let x = 0; x < this.mapWidth; x += 32) {
            for (let y = 0; y < this.mapHeight; y += 32) {
                this.add.image(x + 16, y + 16, 'tile_grass');
            }
        }

        // Dark grass patches
        for (let i = 0; i < 15; i++) {
            const gx = 64 + Math.random() * (this.mapWidth - 128);
            const gy = 64 + Math.random() * (this.mapHeight - 128);
            for (let dx = 0; dx < 3; dx++) {
                for (let dy = 0; dy < 3; dy++) {
                    if (Math.random() > 0.3) {
                        this.add.image(gx + dx * 32, gy + dy * 32, 'tile_grass_dark');
                    }
                }
            }
        }

        // Paths (mycelium)
        this.pathLine(128, 448, 1072, 448, 'tile_mycelium');
        this.pathLine(400, 128, 400, 800, 'tile_mycelium');
        this.pathLine(608, 192, 608, 640, 'tile_mycelium');
        this.pathLine(192, 256, 800, 256, 'tile_mycelium');

        // Mushroom houses
        this.add.image(224, 180, 'mushroom_house').setScale(1.2);
        this.add.image(800, 180, 'mushroom_house_purple').setScale(1.2);
        this.add.image(160, 620, 'mushroom_house').setScale(1);
        this.add.image(850, 500, 'mushroom_house_purple').setScale(1.1);

        // Mushroom trees
        [[80, 320], [960, 160], [1050, 400], [80, 760],
         [500, 100], [900, 700], [1100, 300], [700, 750],
         [350, 680], [1000, 600]].forEach(([x, y]) => {
            this.add.image(x, y, 'mushroom_tree').setScale(1 + Math.random() * 0.3);
        });

        // Fountain
        this.add.image(400, 350, 'fountain').setScale(1.5);

        // Flowers
        for (let i = 0; i < 20; i++) {
            this.add.image(
                64 + Math.random() * (this.mapWidth - 128),
                64 + Math.random() * (this.mapHeight - 128),
                `flower_${Math.floor(Math.random() * 5)}`
            );
        }

        // Signs
        this.add.image(200, 448, 'signpost');
        this.add.image(600, 128, 'signpost');

        // Fences along edges
        for (let x = 0; x < this.mapWidth; x += 32) {
            this.add.image(x + 16, 16, 'fence');
            this.add.image(x + 16, this.mapHeight - 16, 'fence');
        }

        // Water pond
        for (let x = 900; x < 1100; x += 32) {
            for (let y = 700; y < 820; y += 32) {
                this.add.image(x + 16, y + 16, 'tile_water');
            }
        }
    }
}
