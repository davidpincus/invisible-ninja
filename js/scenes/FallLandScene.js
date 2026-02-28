class FallLandScene extends BaseLandScene {
    constructor() {
        super('FallLandScene', 'fall');
    }

    getLandName() { return 'Fall Land'; }

    getHouses() {
        return [
            { id: 'fall_house_1', doorX: 300, doorY: 240 },
            { id: 'fall_house_2', doorX: 700, doorY: 640 },
        ];
    }

    createMap() {
        for (let x = 0; x < this.mapWidth; x += 32) {
            for (let y = 0; y < this.mapHeight; y += 32) {
                this.add.image(x + 16, y + 16, 'tile_fall_grass');
            }
        }

        this.pathLine(128, 448, 1072, 448, 'tile_fall_path');
        this.pathLine(400, 128, 400, 800, 'tile_fall_path');
        this.pathLine(640, 192, 640, 640, 'tile_fall_path');
        this.pathLine(192, 256, 800, 256, 'tile_fall_path');

        // Autumn trees
        for (let i = 0; i < 18; i++) {
            this.add.image(
                60 + Math.random() * (this.mapWidth - 120),
                60 + Math.random() * (this.mapHeight - 120),
                Math.random() > 0.5 ? 'tree_orange' : 'tree_red'
            );
        }

        // Pumpkins
        for (let i = 0; i < 12; i++) {
            this.add.image(
                100 + Math.random() * (this.mapWidth - 200),
                100 + Math.random() * (this.mapHeight - 200),
                'pumpkin'
            );
        }

        // Cabins (using mushroom house textures tinted)
        this.add.image(300, 200, 'mushroom_house').setScale(1.1).setTint(0xddaa66);
        this.add.image(700, 600, 'mushroom_house_purple').setScale(1).setTint(0xcc8844);

        // Jack-o-lanterns
        this.add.image(450, 200, 'jackolantern').setScale(1.2);
        this.add.image(850, 600, 'jackolantern').setScale(1.2);
        this.add.image(900, 300, 'jackolantern');

        // Leaf piles
        for (let i = 0; i < 8; i++) {
            this.add.image(
                100 + Math.random() * (this.mapWidth - 200),
                100 + Math.random() * (this.mapHeight - 200),
                'leaf_pile'
            );
        }

        // Hay bales
        this.add.image(200, 350, 'hay_bale');
        this.add.image(800, 450, 'hay_bale');
        this.add.image(500, 700, 'hay_bale');

        for (let x = 0; x < this.mapWidth; x += 32) {
            this.add.image(x + 16, 16, 'fence');
            this.add.image(x + 16, this.mapHeight - 16, 'fence');
        }
    }

    createParticles() {
        // Falling leaves
        this.time.addEvent({
            delay: 400,
            loop: true,
            callback: () => {
                const leaf = this.add.graphics();
                const colors = [0xff8f00, 0xd32f2f, 0xffd54f];
                leaf.fillStyle(colors[Math.floor(Math.random() * 3)], 0.7);
                leaf.fillEllipse(0, 0, 6, 4);
                leaf.setPosition(
                    this.cameras.main.scrollX + Math.random() * 1024,
                    this.cameras.main.scrollY - 10
                ).setDepth(200);
                this.tweens.add({
                    targets: leaf,
                    x: leaf.x + (Math.random() - 0.5) * 100,
                    y: leaf.y + 800,
                    rotation: Math.random() * 6,
                    alpha: 0,
                    duration: 3000 + Math.random() * 2000,
                    onComplete: () => leaf.destroy(),
                });
            },
        });
    }
}
