class TileGenerator {
    constructor(scene) {
        this.scene = scene;
    }

    generateAll() {
        this.generateCommonTiles();
        this.generateEasterIslandTiles();
        this.generateHannukahTiles();
        this.generateChristmasTiles();
        this.generateThanksgivingTiles();
        this.generateMegaMixTiles();
        this.generateWorldMapTiles();
    }

    generateCommonTiles() {
        const S = 32;
        let g;

        // Grass
        g = this.scene.make.graphics({ add: false });
        g.fillStyle(0x4caf50);
        g.fillRect(0, 0, S, S);
        g.fillStyle(0x45a049);
        for (let i = 0; i < 6; i++) g.fillRect(Math.random() * S, Math.random() * S, 2, 4);
        g.generateTexture('tile_grass', S, S);
        g.destroy();

        // Path/dirt
        g = this.scene.make.graphics({ add: false });
        g.fillStyle(0xc9a96e);
        g.fillRect(0, 0, S, S);
        g.fillStyle(0xb8985a);
        g.fillCircle(8, 12, 3);
        g.fillCircle(22, 8, 2);
        g.fillCircle(16, 24, 2.5);
        g.generateTexture('tile_path', S, S);
        g.destroy();

        // Water (ocean - traversable!)
        g = this.scene.make.graphics({ add: false });
        g.fillStyle(0x1565c0);
        g.fillRect(0, 0, S, S);
        g.fillStyle(0x1976d2, 0.5);
        g.fillRect(4, 8, 12, 2);
        g.fillRect(18, 20, 10, 2);
        g.fillStyle(0x42a5f5, 0.3);
        g.fillRect(8, 4, 8, 2);
        g.fillRect(2, 26, 14, 2);
        g.generateTexture('tile_water', S, S);
        g.destroy();

        // Shallow water
        g = this.scene.make.graphics({ add: false });
        g.fillStyle(0x1e88e5);
        g.fillRect(0, 0, S, S);
        g.fillStyle(0x42a5f5, 0.4);
        g.fillRect(6, 10, 10, 2);
        g.fillRect(20, 18, 8, 2);
        g.generateTexture('tile_water_shallow', S, S);
        g.destroy();

        // Stone
        g = this.scene.make.graphics({ add: false });
        g.fillStyle(0x9e9e9e);
        g.fillRect(0, 0, S, S);
        g.lineStyle(1, 0x757575);
        g.strokeRect(2, 2, 14, 10);
        g.strokeRect(16, 2, 14, 10);
        g.strokeRect(8, 12, 14, 10);
        g.strokeRect(0, 22, 12, 10);
        g.strokeRect(22, 22, 10, 10);
        g.generateTexture('tile_stone', S, S);
        g.destroy();

        // Fence
        g = this.scene.make.graphics({ add: false });
        g.fillStyle(0x8d6e63);
        g.fillRect(0, 8, 32, 4);
        g.fillRect(0, 18, 32, 4);
        g.fillRect(4, 2, 4, 24);
        g.fillRect(24, 2, 4, 24);
        g.fillStyle(0xa1887f);
        g.fillRect(4, 0, 4, 3);
        g.fillRect(24, 0, 4, 3);
        g.generateTexture('fence', 32, 28);
        g.destroy();

        // Sign post
        g = this.scene.make.graphics({ add: false });
        g.fillStyle(0x5d4037);
        g.fillRect(14, 16, 4, 20);
        g.fillStyle(0x8d6e63);
        g.fillRoundedRect(2, 2, 28, 16, 3);
        g.lineStyle(1, 0x5d4037);
        g.strokeRoundedRect(2, 2, 28, 16, 3);
        g.generateTexture('signpost', 32, 36);
        g.destroy();

        // Flowers (decorative)
        const flowerColors = [0xff6b6b, 0xff69b4, 0xffd700, 0x87ceeb, 0xdda0dd];
        flowerColors.forEach((color, i) => {
            g = this.scene.make.graphics({ add: false });
            g.fillStyle(color);
            for (let p = 0; p < 5; p++) {
                const angle = (p * Math.PI * 2) / 5;
                g.fillCircle(8 + Math.cos(angle) * 4, 8 + Math.sin(angle) * 4, 3);
            }
            g.fillStyle(0xffd700);
            g.fillCircle(8, 8, 2.5);
            g.generateTexture(`flower_${i}`, 16, 16);
            g.destroy();
        });

        // Green tree
        g = this.scene.make.graphics({ add: false });
        g.fillStyle(0x5d4037);
        g.fillRect(12, 24, 8, 16);
        g.fillStyle(0x2e7d32);
        g.fillCircle(16, 16, 14);
        g.fillStyle(0x388e3c, 0.6);
        g.fillCircle(16, 12, 10);
        g.generateTexture('tree_green', 32, 40);
        g.destroy();
    }

    generateEasterIslandTiles() {
        const S = 32;
        let g;

        // Sand tile
        g = this.scene.make.graphics({ add: false });
        g.fillStyle(0xf5deb3);
        g.fillRect(0, 0, S, S);
        g.fillStyle(0xe8d5a0, 0.5);
        g.fillCircle(8, 14, 3);
        g.fillCircle(24, 8, 2);
        g.fillCircle(16, 26, 2.5);
        g.generateTexture('tile_sand', S, S);
        g.destroy();

        // Tropical grass
        g = this.scene.make.graphics({ add: false });
        g.fillStyle(0x43a047);
        g.fillRect(0, 0, S, S);
        g.fillStyle(0x66bb6a, 0.5);
        for (let i = 0; i < 5; i++) g.fillRect(Math.random() * S, Math.random() * S, 2, 5);
        g.generateTexture('tile_tropical_grass', S, S);
        g.destroy();

        // Tropical path
        g = this.scene.make.graphics({ add: false });
        g.fillStyle(0xd4a060);
        g.fillRect(0, 0, S, S);
        g.fillStyle(0xc49050, 0.4);
        g.fillCircle(10, 10, 4);
        g.fillCircle(24, 22, 3);
        g.generateTexture('tile_tropical_path', S, S);
        g.destroy();

        // Volcanic rock
        g = this.scene.make.graphics({ add: false });
        g.fillStyle(0x424242);
        g.fillRect(0, 0, S, S);
        g.fillStyle(0x616161, 0.5);
        g.fillCircle(8, 8, 4);
        g.fillCircle(22, 20, 3);
        g.fillStyle(0xff6f00, 0.15);
        g.fillRect(0, 28, S, 4);
        g.generateTexture('tile_volcanic', S, S);
        g.destroy();

        // Palm tree
        g = this.scene.make.graphics({ add: false });
        g.fillStyle(0x795548);
        g.fillRect(14, 20, 6, 24);
        g.fillStyle(0x6d4c41);
        for (let i = 0; i < 4; i++) g.fillRect(14, 22 + i * 6, 6, 2);
        // Fronds
        g.fillStyle(0x2e7d32);
        g.fillTriangle(17, 6, -4, 18, 12, 20);
        g.fillTriangle(17, 6, 38, 18, 22, 20);
        g.fillTriangle(17, 4, 2, 14, 10, 16);
        g.fillTriangle(17, 4, 32, 14, 24, 16);
        g.fillStyle(0x4caf50, 0.6);
        g.fillTriangle(17, 8, 0, 16, 14, 18);
        g.fillTriangle(17, 8, 34, 16, 20, 18);
        // Coconuts
        g.fillStyle(0x795548);
        g.fillCircle(15, 16, 3);
        g.fillCircle(20, 18, 3);
        g.generateTexture('palm_tree', 34, 44);
        g.destroy();

        // Moai statue
        g = this.scene.make.graphics({ add: false });
        g.fillStyle(0x9e9e9e);
        g.fillRoundedRect(8, 2, 24, 40, 4);
        g.fillStyle(0x757575);
        g.fillRoundedRect(6, 0, 28, 14, { tl: 6, tr: 6, bl: 0, br: 0 });
        // Eyes (deep set)
        g.fillStyle(0x616161);
        g.fillEllipse(15, 10, 6, 8);
        g.fillEllipse(25, 10, 6, 8);
        g.fillStyle(0xffffff, 0.4);
        g.fillEllipse(15, 10, 4, 5);
        g.fillEllipse(25, 10, 4, 5);
        // Nose
        g.fillStyle(0x757575);
        g.fillRoundedRect(17, 14, 6, 10, 2);
        // Mouth
        g.fillStyle(0x616161);
        g.fillRect(14, 28, 12, 3);
        g.generateTexture('moai', 40, 44);
        g.destroy();

        // Tiki torch
        g = this.scene.make.graphics({ add: false });
        g.fillStyle(0x795548);
        g.fillRect(6, 12, 4, 28);
        g.fillStyle(0x8d6e63);
        g.fillRoundedRect(3, 10, 10, 6, 2);
        g.fillStyle(0xff6f00);
        g.fillTriangle(8, 0, 2, 12, 14, 12);
        g.fillStyle(0xffab00);
        g.fillTriangle(8, 2, 4, 10, 12, 10);
        g.fillStyle(0xffd54f, 0.6);
        g.fillTriangle(8, 4, 6, 8, 10, 8);
        g.generateTexture('tiki_torch', 16, 40);
        g.destroy();

        // Stone temple (house exterior)
        g = this.scene.make.graphics({ add: false });
        g.fillStyle(0x9e9e9e);
        g.fillRoundedRect(4, 20, 56, 40, 3);
        g.fillStyle(0x757575);
        g.fillTriangle(32, 2, 0, 22, 64, 22);
        g.fillStyle(0x616161);
        g.fillRoundedRect(22, 36, 20, 24, { tl: 10, tr: 10, bl: 0, br: 0 });
        // Columns
        g.fillStyle(0xbdbdbd);
        g.fillRect(8, 20, 6, 40);
        g.fillRect(50, 20, 6, 40);
        g.generateTexture('stone_temple', 64, 64);
        g.destroy();
    }

    generateHannukahTiles() {
        const S = 32;
        let g;

        // Blue-silver grass
        g = this.scene.make.graphics({ add: false });
        g.fillStyle(0x90caf9);
        g.fillRect(0, 0, S, S);
        g.fillStyle(0xbbdefb, 0.4);
        for (let i = 0; i < 4; i++) g.fillRect(Math.random() * S, Math.random() * S, 2, 4);
        g.generateTexture('tile_hannukah_grass', S, S);
        g.destroy();

        // Hannukah path
        g = this.scene.make.graphics({ add: false });
        g.fillStyle(0xb0bec5);
        g.fillRect(0, 0, S, S);
        g.fillStyle(0xcfd8dc, 0.4);
        g.fillCircle(10, 14, 3);
        g.fillCircle(24, 8, 2.5);
        g.generateTexture('tile_hannukah_path', S, S);
        g.destroy();

        // Ice blue water
        g = this.scene.make.graphics({ add: false });
        g.fillStyle(0x0d47a1);
        g.fillRect(0, 0, S, S);
        g.fillStyle(0x1565c0, 0.5);
        g.fillRect(4, 8, 12, 2);
        g.fillRect(18, 20, 10, 2);
        g.generateTexture('tile_water_ice', S, S);
        g.destroy();

        // Dreidel (decoration)
        g = this.scene.make.graphics({ add: false });
        g.fillStyle(0xb0bec5);
        g.fillRect(8, 0, 4, 6);
        g.fillStyle(0x42a5f5);
        g.fillRoundedRect(2, 6, 16, 14, 3);
        g.fillTriangle(10, 28, 2, 20, 18, 20);
        g.fillStyle(0x1565c0);
        // Hebrew letter
        g.fillRect(6, 10, 3, 6);
        g.fillRect(11, 10, 3, 6);
        g.fillRect(6, 10, 8, 2);
        g.generateTexture('dreidel', 20, 30);
        g.destroy();

        // Star of David
        g = this.scene.make.graphics({ add: false });
        g.fillStyle(0xffd700);
        g.fillTriangle(12, 2, 2, 18, 22, 18);
        g.fillTriangle(12, 22, 2, 6, 22, 6);
        g.generateTexture('star_david', 24, 24);
        g.destroy();

        // Synagogue building
        g = this.scene.make.graphics({ add: false });
        g.fillStyle(0xe3f2fd);
        g.fillRoundedRect(6, 18, 52, 42, 4);
        g.fillStyle(0x1565c0);
        g.fillTriangle(32, 0, 6, 20, 58, 20);
        g.fillStyle(0x42a5f5);
        g.fillRoundedRect(22, 36, 20, 24, { tl: 10, tr: 10, bl: 0, br: 0 });
        g.fillStyle(0xffd700);
        g.fillCircle(32, 8, 4);
        g.generateTexture('synagogue', 64, 64);
        g.destroy();

        // Silver tree
        g = this.scene.make.graphics({ add: false });
        g.fillStyle(0x5d4037);
        g.fillRect(12, 24, 8, 16);
        g.fillStyle(0x90caf9);
        g.fillCircle(16, 16, 14);
        g.fillStyle(0xbbdefb, 0.6);
        g.fillCircle(16, 12, 10);
        g.generateTexture('tree_silver', 32, 40);
        g.destroy();
    }

    generateChristmasTiles() {
        const S = 32;
        let g;

        // Snow tile
        g = this.scene.make.graphics({ add: false });
        g.fillStyle(0xe8eaf6);
        g.fillRect(0, 0, S, S);
        g.fillStyle(0xf5f5ff, 0.5);
        g.fillCircle(8, 12, 3);
        g.fillCircle(22, 8, 2);
        g.fillCircle(14, 26, 2.5);
        g.generateTexture('tile_snow', S, S);
        g.destroy();

        // Snow path
        g = this.scene.make.graphics({ add: false });
        g.fillStyle(0xcfd8dc);
        g.fillRect(0, 0, S, S);
        g.fillStyle(0xb0bec5, 0.4);
        g.fillCircle(10, 10, 4);
        g.fillCircle(24, 20, 3);
        g.generateTexture('tile_snow_path', S, S);
        g.destroy();

        // Ice
        g = this.scene.make.graphics({ add: false });
        g.fillStyle(0xb3e5fc);
        g.fillRect(0, 0, S, S);
        g.fillStyle(0xe1f5fe, 0.4);
        g.fillRect(4, 4, 12, 8);
        g.fillRect(18, 16, 10, 12);
        g.lineStyle(1, 0x81d4fa, 0.3);
        g.lineBetween(0, 12, 32, 12);
        g.lineBetween(16, 0, 16, 32);
        g.generateTexture('tile_ice', S, S);
        g.destroy();

        // Hot chocolate river
        g = this.scene.make.graphics({ add: false });
        g.fillStyle(0x5d4037);
        g.fillRect(0, 0, S, S);
        g.fillStyle(0x6d4c41, 0.5);
        g.fillRect(4, 8, 12, 2);
        g.fillRect(18, 20, 10, 2);
        g.fillStyle(0xffffff, 0.2);
        g.fillCircle(12, 14, 3);
        g.fillCircle(24, 6, 2);
        g.generateTexture('tile_hot_chocolate', S, S);
        g.destroy();

        // Candy cane pole
        g = this.scene.make.graphics({ add: false });
        for (let i = 0; i < 8; i++) {
            g.fillStyle(i % 2 === 0 ? 0xc62828 : 0xffffff);
            g.fillRect(4, i * 5, 8, 5);
        }
        g.fillStyle(0xc62828);
        g.beginPath();
        g.arc(12, 2, 6, Math.PI, 0);
        g.fillPath();
        g.generateTexture('candy_cane', 16, 40);
        g.destroy();

        // Snow tree (pine)
        g = this.scene.make.graphics({ add: false });
        g.fillStyle(0x5d4037);
        g.fillRect(12, 32, 8, 12);
        g.fillStyle(0x2e7d32);
        g.fillTriangle(16, 6, 0, 24, 32, 24);
        g.fillTriangle(16, 14, 2, 30, 30, 30);
        g.fillTriangle(16, 22, 4, 36, 28, 36);
        g.fillStyle(0xffffff, 0.8);
        g.fillTriangle(16, 5, 8, 14, 24, 14);
        g.fillStyle(0xffffff, 0.6);
        g.fillTriangle(16, 13, 10, 20, 22, 20);
        g.generateTexture('tree_snow', 32, 44);
        g.destroy();

        // Snowman
        g = this.scene.make.graphics({ add: false });
        g.fillStyle(0xfafafa);
        g.fillCircle(16, 32, 10);
        g.fillCircle(16, 20, 8);
        g.fillCircle(16, 10, 6);
        g.fillStyle(0x333333);
        g.fillCircle(14, 8, 1.5);
        g.fillCircle(18, 8, 1.5);
        g.fillStyle(0xff8f00);
        g.fillTriangle(16, 10, 16, 12, 22, 11);
        g.fillStyle(0x333333);
        g.fillCircle(16, 18, 1.5);
        g.fillCircle(16, 22, 1.5);
        g.fillStyle(0x1a1a1a);
        g.fillRect(10, 2, 12, 5);
        g.fillRect(8, 5, 16, 2);
        g.fillStyle(0xe74c3c);
        g.fillRoundedRect(8, 14, 16, 3, 1);
        g.generateTexture('snowman', 32, 44);
        g.destroy();

        // Gingerbread house
        g = this.scene.make.graphics({ add: false });
        g.fillStyle(0xd4a060);
        g.fillRoundedRect(6, 20, 52, 40, 4);
        g.fillStyle(0xc49050);
        g.fillTriangle(32, 2, 2, 22, 62, 22);
        g.fillStyle(0xffffff);
        g.fillRect(2, 20, 60, 3);
        g.fillRect(28, 1, 8, 2);
        // Door
        g.fillStyle(0x8d6e63);
        g.fillRoundedRect(22, 36, 20, 24, { tl: 8, tr: 8, bl: 0, br: 0 });
        // Candy decorations
        g.fillStyle(0xc62828);
        g.fillCircle(14, 30, 3);
        g.fillCircle(50, 30, 3);
        g.fillStyle(0x2e7d32);
        g.fillCircle(14, 40, 3);
        g.fillCircle(50, 40, 3);
        g.generateTexture('gingerbread_house', 64, 64);
        g.destroy();

        // Present box
        g = this.scene.make.graphics({ add: false });
        g.fillStyle(0xc62828);
        g.fillRoundedRect(0, 0, 20, 18, 3);
        g.fillStyle(0xffd700);
        g.fillRect(8, 0, 4, 18);
        g.fillRect(0, 7, 20, 4);
        g.generateTexture('present', 20, 18);
        g.destroy();
    }

    generateThanksgivingTiles() {
        const S = 32;
        let g;

        // Fall grass
        g = this.scene.make.graphics({ add: false });
        g.fillStyle(0x8d6e3c);
        g.fillRect(0, 0, S, S);
        g.fillStyle(0x7d5e2c);
        for (let i = 0; i < 5; i++) g.fillRect(Math.random() * S, Math.random() * S, 3, 3);
        g.generateTexture('tile_fall_grass', S, S);
        g.destroy();

        // Fall path
        g = this.scene.make.graphics({ add: false });
        g.fillStyle(0xa0845c);
        g.fillRect(0, 0, S, S);
        g.fillStyle(0x8d7040);
        g.fillCircle(8, 14, 3);
        g.fillCircle(24, 22, 2.5);
        g.generateTexture('tile_fall_path', S, S);
        g.destroy();

        // Cider water
        g = this.scene.make.graphics({ add: false });
        g.fillStyle(0xbf8040);
        g.fillRect(0, 0, S, S);
        g.fillStyle(0xcc9050, 0.4);
        g.fillRect(4, 10, 12, 2);
        g.fillRect(18, 22, 10, 2);
        g.generateTexture('tile_water_cider', S, S);
        g.destroy();

        // Orange tree
        g = this.scene.make.graphics({ add: false });
        g.fillStyle(0x5d4037);
        g.fillRect(12, 24, 8, 16);
        g.fillStyle(0xff8f00);
        g.fillCircle(16, 16, 14);
        g.fillStyle(0xf57f17, 0.7);
        g.fillCircle(12, 12, 8);
        g.fillStyle(0xff6f00, 0.5);
        g.fillCircle(20, 10, 7);
        g.generateTexture('tree_orange', 32, 40);
        g.destroy();

        // Red tree
        g = this.scene.make.graphics({ add: false });
        g.fillStyle(0x5d4037);
        g.fillRect(12, 24, 8, 16);
        g.fillStyle(0xd32f2f);
        g.fillCircle(16, 16, 14);
        g.fillStyle(0xc62828, 0.7);
        g.fillCircle(12, 12, 8);
        g.generateTexture('tree_red', 32, 40);
        g.destroy();

        // Pumpkin
        g = this.scene.make.graphics({ add: false });
        g.fillStyle(0xff8f00);
        g.fillEllipse(12, 14, 20, 16);
        g.lineStyle(1, 0xe65100, 0.5);
        g.lineBetween(12, 6, 12, 22);
        g.lineBetween(6, 8, 6, 20);
        g.lineBetween(18, 8, 18, 20);
        g.fillStyle(0x33691e);
        g.fillRect(10, 2, 4, 6);
        g.generateTexture('pumpkin', 24, 24);
        g.destroy();

        // Hay bale
        g = this.scene.make.graphics({ add: false });
        g.fillStyle(0xdaa520);
        g.fillRoundedRect(2, 4, 28, 20, 4);
        g.lineStyle(1, 0xb8860b, 0.6);
        g.lineBetween(10, 4, 10, 24);
        g.lineBetween(22, 4, 22, 24);
        g.generateTexture('hay_bale', 32, 28);
        g.destroy();

        // Corn stalk
        g = this.scene.make.graphics({ add: false });
        g.fillStyle(0x33691e);
        g.fillRect(6, 4, 3, 36);
        g.fillStyle(0x558b2f);
        g.fillTriangle(7, 10, -2, 18, 7, 18);
        g.fillTriangle(7, 10, 16, 18, 7, 18);
        g.fillTriangle(7, 20, -2, 28, 7, 28);
        g.fillTriangle(7, 20, 16, 28, 7, 28);
        g.fillStyle(0xffd54f);
        g.fillRoundedRect(9, 16, 5, 10, 2);
        g.generateTexture('corn_stalk', 16, 40);
        g.destroy();

        // Leaf pile
        g = this.scene.make.graphics({ add: false });
        g.fillStyle(0xff8f00, 0.8);
        g.fillEllipse(12, 10, 20, 12);
        g.fillStyle(0xd32f2f, 0.7);
        g.fillEllipse(8, 8, 10, 8);
        g.fillStyle(0xffd54f, 0.7);
        g.fillEllipse(16, 8, 10, 8);
        g.generateTexture('leaf_pile', 24, 16);
        g.destroy();

        // Log cabin
        g = this.scene.make.graphics({ add: false });
        g.fillStyle(0x6d4c41);
        g.fillRoundedRect(4, 18, 56, 42, 3);
        // Log texture
        g.fillStyle(0x795548);
        for (let i = 0; i < 6; i++) {
            g.fillRect(4, 18 + i * 7, 56, 3);
        }
        g.fillStyle(0x5d4037);
        g.fillTriangle(32, 2, 0, 20, 64, 20);
        // Chimney
        g.fillStyle(0x795548);
        g.fillRect(48, 0, 10, 20);
        // Door
        g.fillStyle(0x4e342e);
        g.fillRoundedRect(22, 36, 20, 24, { tl: 6, tr: 6, bl: 0, br: 0 });
        g.fillStyle(0xffd700);
        g.fillCircle(38, 48, 2);
        g.generateTexture('log_cabin', 64, 64);
        g.destroy();

        // Cornucopia
        g = this.scene.make.graphics({ add: false });
        g.fillStyle(0xd4a060);
        g.beginPath();
        g.moveTo(36, 12);
        g.lineTo(4, 18);
        g.lineTo(2, 22);
        g.lineTo(36, 20);
        g.closePath();
        g.fillPath();
        g.fillStyle(0xff8f00);
        g.fillCircle(36, 10, 5);
        g.fillStyle(0xc62828);
        g.fillCircle(34, 6, 4);
        g.fillStyle(0x4caf50);
        g.fillCircle(38, 8, 3);
        g.fillStyle(0x9c27b0);
        g.fillCircle(32, 12, 3);
        g.generateTexture('cornucopia', 44, 28);
        g.destroy();
    }

    generateMegaMixTiles() {
        const S = 32;
        let g;

        // Central plaza tile
        g = this.scene.make.graphics({ add: false });
        g.fillStyle(0xe0e0e0);
        g.fillRect(0, 0, S, S);
        g.lineStyle(1, 0xbdbdbd);
        g.strokeRect(2, 2, 14, 14);
        g.strokeRect(16, 2, 14, 14);
        g.strokeRect(2, 16, 14, 14);
        g.strokeRect(16, 16, 14, 14);
        g.generateTexture('tile_plaza', S, S);
        g.destroy();

        // Rainbow path
        g = this.scene.make.graphics({ add: false });
        const rainbow = [0xff0000, 0xff8000, 0xffff00, 0x00ff00, 0x0000ff, 0x8000ff];
        rainbow.forEach((color, i) => {
            g.fillStyle(color, 0.5);
            g.fillRect(0, i * 5 + 1, S, 5);
        });
        g.generateTexture('tile_rainbow_path', S, S);
        g.destroy();

        // Grand palace
        g = this.scene.make.graphics({ add: false });
        g.fillStyle(0xffd700);
        g.fillRoundedRect(2, 20, 60, 40, 4);
        g.fillStyle(0xffeb3b);
        g.fillTriangle(32, 0, 0, 22, 64, 22);
        // Columns
        g.fillStyle(0xfafafa);
        g.fillRect(8, 20, 6, 40);
        g.fillRect(50, 20, 6, 40);
        g.fillRect(28, 20, 8, 40);
        // Door
        g.fillStyle(0x9c27b0);
        g.fillRoundedRect(22, 36, 20, 24, { tl: 10, tr: 10, bl: 0, br: 0 });
        g.fillStyle(0xffd700);
        g.fillCircle(32, 8, 5);
        g.generateTexture('grand_palace', 64, 64);
        g.destroy();

        // Zone border tile
        g = this.scene.make.graphics({ add: false });
        g.fillStyle(0x9e9e9e, 0.6);
        g.fillRect(0, 0, S, S);
        g.lineStyle(2, 0xffd700, 0.4);
        g.strokeRect(0, 0, S, S);
        g.generateTexture('tile_zone_border', S, S);
        g.destroy();
    }

    generateWorldMapTiles() {
        let g;

        // Ocean background
        g = this.scene.make.graphics({ add: false });
        g.fillStyle(0x0d47a1);
        g.fillRect(0, 0, 1024, 768);
        // Wave patterns
        g.fillStyle(0x1565c0, 0.3);
        for (let i = 0; i < 15; i++) {
            const y = 50 + i * 50;
            g.fillEllipse(Math.random() * 1024, y, 200 + Math.random() * 200, 20);
        }
        g.fillStyle(0x1976d2, 0.2);
        for (let i = 0; i < 10; i++) {
            g.fillEllipse(Math.random() * 1024, Math.random() * 768, 100, 10);
        }
        g.generateTexture('world_map_bg', 1024, 768);
        g.destroy();

        // Island icons
        const islands = [
            { key: 'icon_easter', c1: 0xf5deb3, c2: 0x43a047, detail: 'moai' },
            { key: 'icon_hannukah', c1: 0x1565c0, c2: 0xb0bec5, detail: 'menorah' },
            { key: 'icon_christmas', c1: 0xc62828, c2: 0xe8eaf6, detail: 'tree' },
            { key: 'icon_thanksgiving', c1: 0xff8f00, c2: 0x8d6e3c, detail: 'leaf' },
            { key: 'icon_megamix', c1: 0xffd700, c2: 0x9c27b0, detail: 'star' },
        ];

        islands.forEach(island => {
            g = this.scene.make.graphics({ add: false });
            // Island base
            g.fillStyle(island.c2);
            g.fillCircle(48, 48, 44);
            g.fillStyle(island.c1);
            g.fillCircle(48, 48, 38);

            if (island.detail === 'moai') {
                // Moai head silhouette
                g.fillStyle(0x9e9e9e);
                g.fillRoundedRect(34, 22, 14, 30, 3);
                g.fillRoundedRect(32, 18, 18, 10, 3);
                // Palm tree
                g.fillStyle(0x5d4037);
                g.fillRect(54, 30, 3, 18);
                g.fillStyle(0x2e7d32);
                g.fillTriangle(56, 22, 48, 32, 64, 32);
            } else if (island.detail === 'menorah') {
                g.fillStyle(0xffd700);
                g.fillRect(46, 34, 4, 16);
                for (let i = 0; i < 7; i++) {
                    const mx = 28 + i * 6;
                    g.fillRect(mx, 34, 2, 10);
                    g.fillStyle(0xffab00);
                    g.fillCircle(mx + 1, 32, 2);
                    g.fillStyle(0xffd700);
                }
                g.fillRect(28, 48, 40, 3);
            } else if (island.detail === 'tree') {
                g.fillStyle(0x2e7d32);
                g.fillTriangle(48, 18, 32, 38, 64, 38);
                g.fillTriangle(48, 26, 34, 44, 62, 44);
                g.fillStyle(0xffd700);
                g.fillCircle(48, 18, 3);
                g.fillStyle(0xc62828);
                g.fillCircle(40, 34, 2.5);
                g.fillCircle(56, 38, 2.5);
            } else if (island.detail === 'leaf') {
                g.fillStyle(0xd32f2f);
                g.fillEllipse(40, 40, 18, 12);
                g.fillStyle(0xff8f00);
                g.fillEllipse(56, 36, 18, 12);
                g.fillStyle(0xffd54f);
                g.fillEllipse(48, 50, 18, 12);
                // Turkey
                g.fillStyle(0x5d4037);
                g.fillCircle(48, 42, 5);
            } else if (island.detail === 'star') {
                // Rainbow star
                g.fillStyle(0xff0000);
                g.fillTriangle(48, 20, 44, 36, 52, 36);
                g.fillStyle(0x00ff00);
                g.fillTriangle(48, 56, 44, 40, 52, 40);
                g.fillStyle(0x0000ff);
                g.fillTriangle(32, 38, 40, 34, 40, 42);
                g.fillStyle(0xffd700);
                g.fillTriangle(64, 38, 56, 34, 56, 42);
                g.fillStyle(0xffffff);
                g.fillCircle(48, 38, 6);
            }

            // Gold border
            g.lineStyle(3, 0xffd700);
            g.strokeCircle(48, 48, 44);

            g.generateTexture(island.key, 96, 96);
            g.destroy();
        });

        // Lock icon
        g = this.scene.make.graphics({ add: false });
        g.fillStyle(0x666666);
        g.fillRoundedRect(6, 16, 20, 16, 3);
        g.lineStyle(3, 0x666666);
        g.beginPath();
        g.arc(16, 16, 8, Math.PI, 0);
        g.strokePath();
        g.fillStyle(0xffd700);
        g.fillCircle(16, 23, 3);
        g.generateTexture('lock_icon', 32, 36);
        g.destroy();

        // Weblord lair icon
        g = this.scene.make.graphics({ add: false });
        g.fillStyle(0x2c003e);
        g.fillCircle(48, 48, 44);
        g.fillStyle(0x4a1a6e);
        g.fillCircle(48, 48, 38);
        // Web
        g.lineStyle(1, 0xffffff, 0.3);
        for (let i = 0; i < 8; i++) {
            const a = (i * Math.PI) / 4;
            g.lineBetween(48, 48, 48 + Math.cos(a) * 32, 48 + Math.sin(a) * 32);
        }
        g.strokeCircle(48, 48, 12);
        g.strokeCircle(48, 48, 22);
        // Spider silhouette
        g.fillStyle(0x9c27b0);
        g.fillCircle(48, 48, 8);
        g.fillCircle(48, 38, 6);
        g.lineStyle(3, 0xffd700);
        g.strokeCircle(48, 48, 44);
        g.generateTexture('icon_weblord_lair', 96, 96);
        g.destroy();
    }
}
