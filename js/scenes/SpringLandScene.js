class SpringLandScene extends BaseLandScene {
    constructor() {
        super('SpringLandScene', 'spring');
    }

    getLandName() { return 'Spring Land'; }

    getHouses() {
        return [
            { id: 'spring_house_1', doorX: 250, doorY: 240 },
            { id: 'spring_house_2', doorX: 800, doorY: 260 },
        ];
    }

    createMap() {
        for (let x = 0; x < this.mapWidth; x += 32) {
            for (let y = 0; y < this.mapHeight; y += 32) {
                this.add.image(x + 16, y + 16, 'tile_spring_grass');
            }
        }

        this.pathLine(128, 448, 1072, 448, 'tile_spring_path');
        this.pathLine(400, 128, 400, 800, 'tile_spring_path');
        this.pathLine(640, 192, 640, 640, 'tile_spring_path');
        this.pathLine(192, 300, 800, 300, 'tile_spring_path');

        // Flower houses
        this.add.image(250, 200, 'flower_house').setScale(1.2);
        this.add.image(800, 220, 'flower_house').setScale(1.1);
        this.add.image(180, 650, 'flower_house');
        this.add.image(900, 550, 'flower_house').setScale(1.1);

        // Cherry blossom trees
        for (let i = 0; i < 14; i++) {
            this.add.image(
                60 + Math.random() * (this.mapWidth - 120),
                60 + Math.random() * (this.mapHeight - 120),
                'tree_cherry'
            ).setScale(0.9 + Math.random() * 0.4);
        }

        // Green trees
        for (let i = 0; i < 6; i++) {
            this.add.image(
                60 + Math.random() * (this.mapWidth - 120),
                60 + Math.random() * (this.mapHeight - 120),
                'tree_green'
            ).setScale(1 + Math.random() * 0.3);
        }

        // Flowers everywhere
        for (let i = 0; i < 40; i++) {
            this.add.image(
                40 + Math.random() * (this.mapWidth - 80),
                40 + Math.random() * (this.mapHeight - 80),
                `flower_${Math.floor(Math.random() * 5)}`
            );
        }

        // Rainbow bridge
        for (let i = 0; i < 6; i++) {
            this.add.image(560 + i * 32, 600, 'rainbow_bridge').setAlpha(0.8);
        }

        // Brook
        for (let y = 500; y < 700; y += 32) {
            this.add.image(576, y + 16, 'tile_water');
            this.add.image(608, y + 16, 'tile_water');
        }

        for (let x = 0; x < this.mapWidth; x += 32) {
            this.add.image(x + 16, 16, 'fence');
            this.add.image(x + 16, this.mapHeight - 16, 'fence');
        }
    }

    createParticles() {
        // Floating butterflies
        this.time.addEvent({
            delay: 600,
            loop: true,
            callback: () => {
                const bfly = this.add.image(
                    this.cameras.main.scrollX + Math.random() * 1024,
                    this.cameras.main.scrollY + Math.random() * 768,
                    'butterfly_deco'
                ).setDepth(200).setAlpha(0.8).setScale(0.8 + Math.random() * 0.4);
                this.tweens.add({
                    targets: bfly,
                    x: bfly.x + (Math.random() - 0.5) * 200,
                    y: bfly.y - 100 - Math.random() * 200,
                    alpha: 0,
                    duration: 3000 + Math.random() * 2000,
                    ease: 'Sine.easeInOut',
                    onComplete: () => bfly.destroy(),
                });
            },
        });

        // Sparkle effects
        this.time.addEvent({
            delay: 300,
            loop: true,
            callback: () => {
                const sparkle = this.add.image(
                    this.cameras.main.scrollX + Math.random() * 1024,
                    this.cameras.main.scrollY + Math.random() * 768,
                    'sparkle_small'
                ).setDepth(199).setAlpha(0.6).setScale(0.5);
                this.tweens.add({
                    targets: sparkle,
                    alpha: 0, scale: 0, y: sparkle.y - 30, duration: 600,
                    onComplete: () => sparkle.destroy(),
                });
            },
        });
    }
}
