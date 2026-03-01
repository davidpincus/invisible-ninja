class SpriteGenerator {
    constructor(scene) {
        this.scene = scene;
    }

    generateAll() {
        this.generateAxolotl();
        this.generateAxolotlTitle();
        this.generateAxolotlSwim();
        this.generateNPCs();
        this.generateSpiders();
        this.generateWeblord();
        this.generateUIElements();
        this.generateJoystick();
        this.generateFurniture();
        this.generateCollectibles();
        this.generatePostGameSprites();
    }

    // --- AXOLOTL (5 costume color palettes) ---
    // Costumes: 0=black ninja, 1=blue/silver hannukah, 2=red/green christmas, 3=orange/brown thanksgiving, 4=rainbow mega
    getCostumePalette(costume) {
        const palettes = [
            { suit: 0x2a2a3e, accent: 0x555577, belt: 0xffd700, mask: 0x1a1a2e },       // classic black ninja
            { suit: 0x1565c0, accent: 0xb0bec5, belt: 0xc0c0c0, mask: 0x0d47a1 },       // blue/silver hannukah
            { suit: 0xc62828, accent: 0x2e7d32, belt: 0xffd700, mask: 0x8e0000 },        // red/green christmas
            { suit: 0xe65100, accent: 0x5d4037, belt: 0xdaa520, mask: 0xbf360c },        // orange/brown thanksgiving
            { suit: 0x9c27b0, accent: 0x00bcd4, belt: 0xffd700, mask: 0x6a1b9a },        // rainbow mega mix
            // Post-game outfits (5-9)
            { suit: 0xffd600, accent: 0x00897b, belt: 0xff6d00, mask: 0xe6b800 },        // hula/tropical
            { suit: 0xb0bec5, accent: 0xffd700, belt: 0xe0e0e0, mask: 0x78909c },        // starlight
            { suit: 0xeceff1, accent: 0x4fc3f7, belt: 0xb3e5fc, mask: 0xcfd8dc },        // snowflake
            { suit: 0xffb300, accent: 0x6d4c41, belt: 0xff8f00, mask: 0xf57f17 },        // harvest gold
            { suit: 0xe91e63, accent: 0x76ff03, belt: 0xff4081, mask: 0xc2185b },        // disco star
        ];
        return palettes[costume] || palettes[0];
    }

    generateAxolotl() {
        for (let costume = 0; costume < 10; costume++) {
            const directions = ['down', 'left', 'right', 'up'];
            directions.forEach(dir => {
                for (let frame = 0; frame < 4; frame++) {
                    const key = `axolotl_${costume}_${dir}_${frame}`;
                    const g = this.scene.make.graphics({ add: false });
                    this._drawAxolotl(g, dir, frame, costume, false);
                    g.generateTexture(key, 48, 56);
                    g.destroy();
                }
            });
        }
        // Default standing frame
        const g = this.scene.make.graphics({ add: false });
        this._drawAxolotl(g, 'down', 0, 0, false);
        g.generateTexture('axolotl_stand', 48, 56);
        g.destroy();
    }

    generateAxolotlTitle() {
        const scale = 4;
        const g = this.scene.make.graphics({ add: false });
        this._drawAxolotl(g, 'down', 0, 0, false, scale);
        g.generateTexture('axolotl_title', 48 * scale, 56 * scale);
        g.destroy();
    }

    generateAxolotlSwim() {
        for (let costume = 0; costume < 10; costume++) {
            const directions = ['down', 'left', 'right', 'up'];
            directions.forEach(dir => {
                for (let frame = 0; frame < 4; frame++) {
                    const key = `axolotl_swim_${costume}_${dir}_${frame}`;
                    const g = this.scene.make.graphics({ add: false });
                    this._drawAxolotl(g, dir, frame, costume, true);
                    g.generateTexture(key, 48, 56);
                    g.destroy();
                }
            });
        }
    }

    _drawAxolotl(g, direction, frame, costume, swimming, s = 1) {
        const cx = 24 * s, cy = 32 * s;
        const bounce = Math.sin(frame * Math.PI / 2) * 2 * s;
        const swimBob = swimming ? Math.sin(frame * Math.PI / 2) * 3 * s : 0;
        const pal = this.getCostumePalette(costume);

        // Shadow
        if (!swimming) {
            g.fillStyle(0x000000, 0.2);
            g.fillEllipse(cx, 52 * s, 28 * s, 7 * s);
        }

        // --- Axolotl body (pink/coral) ---
        const bodyColor = 0xf8a4b8;
        const bellyColor = 0xfce4ec;
        const gillColor = 0xff6b9d;

        // Tail
        if (direction === 'down' || direction === 'up') {
            g.fillStyle(bodyColor);
            const tailWag = Math.sin(frame * Math.PI) * 3 * s;
            g.fillTriangle(cx + tailWag, cy + 18 * s + bounce + swimBob, cx - 6 * s, cy + 10 * s + bounce + swimBob, cx + 6 * s, cy + 10 * s + bounce + swimBob);
        } else if (direction === 'left') {
            g.fillStyle(bodyColor);
            g.fillTriangle(cx + 10 * s, cy + 6 * s + bounce + swimBob, cx + 18 * s, cy + 2 * s + bounce + swimBob, cx + 14 * s, cy + 10 * s + bounce + swimBob);
        } else {
            g.fillStyle(bodyColor);
            g.fillTriangle(cx - 10 * s, cy + 6 * s + bounce + swimBob, cx - 18 * s, cy + 2 * s + bounce + swimBob, cx - 14 * s, cy + 10 * s + bounce + swimBob);
        }

        // Body (round, chubby)
        g.fillStyle(bodyColor);
        g.fillEllipse(cx, cy + bounce + swimBob, 26 * s, 22 * s);

        // Belly
        g.fillStyle(bellyColor);
        g.fillEllipse(cx, cy + 2 * s + bounce + swimBob, 18 * s, 14 * s);

        // --- Ninja costume ---
        // Suit vest (covers torso)
        g.fillStyle(pal.suit, 0.5);
        g.fillEllipse(cx, cy - 1 * s + bounce + swimBob, 22 * s, 16 * s);
        // Suit wrapping (sides)
        g.fillStyle(pal.suit, 0.7);
        g.fillRect(cx - 13 * s, cy - 8 * s + bounce + swimBob, 5 * s, 16 * s);
        g.fillRect(cx + 8 * s, cy - 8 * s + bounce + swimBob, 5 * s, 16 * s);
        // Accent trim on vest
        g.fillStyle(pal.accent, 0.5);
        g.fillEllipse(cx, cy - 1 * s + bounce + swimBob, 16 * s, 10 * s);

        // Belt (thicker)
        g.fillStyle(pal.belt);
        g.fillRect(cx - 12 * s, cy - 3 * s + bounce + swimBob, 24 * s, 5 * s);
        // Belt buckle
        g.fillStyle(pal.accent);
        g.fillRect(cx - 2 * s, cy - 2 * s + bounce + swimBob, 4 * s, 3 * s);

        // Head
        g.fillStyle(bodyColor);
        g.fillEllipse(cx, cy - 12 * s + bounce + swimBob, 24 * s, 20 * s);

        // Ninja mask / headband (taller)
        g.fillStyle(pal.mask, 0.85);
        g.fillRect(cx - 12 * s, cy - 19 * s + bounce + swimBob, 24 * s, 7 * s);
        // Mask accent stripe
        g.fillStyle(pal.accent, 0.5);
        g.fillRect(cx - 12 * s, cy - 16 * s + bounce + swimBob, 24 * s, 2 * s);
        // Trailing bands (longer)
        if (direction === 'down' || direction === 'up') {
            g.fillStyle(pal.mask, 0.7);
            g.fillTriangle(cx + 12 * s, cy - 16 * s + bounce + swimBob, cx + 22 * s, cy - 22 * s + bounce + swimBob, cx + 14 * s, cy - 13 * s + bounce + swimBob);
            g.fillTriangle(cx + 16 * s, cy - 18 * s + bounce + swimBob, cx + 24 * s, cy - 20 * s + bounce + swimBob, cx + 18 * s, cy - 14 * s + bounce + swimBob);
        }

        // External gills (3 on each side - axolotl signature feature!)
        const gillOffsets = [-3, -7, -11];
        if (direction !== 'up') {
            g.fillStyle(gillColor);
            gillOffsets.forEach((oy, i) => {
                const gSize = (4 - i * 0.5) * s;
                const wobble = Math.sin(frame * Math.PI / 2 + i) * 2 * s;
                // Left gills
                g.fillEllipse(cx - 12 * s - wobble, cy + oy * s + bounce + swimBob, gSize * 2, gSize);
                // Right gills
                g.fillEllipse(cx + 12 * s + wobble, cy + oy * s + bounce + swimBob, gSize * 2, gSize);
            });
            // Gill tips
            g.fillStyle(0xff4081);
            gillOffsets.forEach((oy, i) => {
                const wobble = Math.sin(frame * Math.PI / 2 + i) * 2 * s;
                g.fillCircle(cx - 14 * s - wobble, cy + oy * s + bounce + swimBob, 1.5 * s);
                g.fillCircle(cx + 14 * s + wobble, cy + oy * s + bounce + swimBob, 1.5 * s);
            });
        }

        // Face
        if (direction === 'down' || direction === 'left' || direction === 'right') {
            const faceOX = (direction === 'left' ? -3 : direction === 'right' ? 3 : 0) * s;

            // Big sparkly eyes
            g.fillStyle(0xffffff);
            g.fillEllipse(cx - 5 * s + faceOX, cy - 14 * s + bounce + swimBob, 9 * s, 10 * s);
            g.fillEllipse(cx + 5 * s + faceOX, cy - 14 * s + bounce + swimBob, 9 * s, 10 * s);
            // Pupils
            g.fillStyle(0x1a1a2e);
            g.fillEllipse(cx - 4 * s + faceOX, cy - 13 * s + bounce + swimBob, 5 * s, 6 * s);
            g.fillEllipse(cx + 6 * s + faceOX, cy - 13 * s + bounce + swimBob, 5 * s, 6 * s);
            // Eye sparkles (big sparkly!)
            g.fillStyle(0xffffff);
            g.fillCircle(cx - 3 * s + faceOX, cy - 16 * s + bounce + swimBob, 2 * s);
            g.fillCircle(cx + 7 * s + faceOX, cy - 16 * s + bounce + swimBob, 2 * s);
            g.fillCircle(cx - 5 * s + faceOX, cy - 12 * s + bounce + swimBob, 1 * s);
            g.fillCircle(cx + 5 * s + faceOX, cy - 12 * s + bounce + swimBob, 1 * s);

            // Cute wide smile
            g.lineStyle(1.5 * s, 0xe91e63, 0.8);
            g.beginPath();
            g.arc(cx + faceOX, cy - 7 * s + bounce + swimBob, 5 * s, 0.1, Math.PI - 0.1);
            g.strokePath();

            // Tiny nostrils
            g.fillStyle(0xe91e63, 0.5);
            g.fillCircle(cx - 2 * s + faceOX, cy - 9 * s + bounce + swimBob, 1 * s);
            g.fillCircle(cx + 2 * s + faceOX, cy - 9 * s + bounce + swimBob, 1 * s);

            // Blush
            g.fillStyle(0xff80ab, 0.3);
            g.fillCircle(cx - 9 * s + faceOX, cy - 9 * s + bounce + swimBob, 3 * s);
            g.fillCircle(cx + 9 * s + faceOX, cy - 9 * s + bounce + swimBob, 3 * s);
        } else {
            // Back of head
            g.fillStyle(0xf48fb1);
            g.fillEllipse(cx, cy - 12 * s + bounce + swimBob, 18 * s, 14 * s);
        }

        // Little feet/legs
        if (!swimming) {
            g.fillStyle(bodyColor);
            if (direction === 'left') {
                g.fillEllipse(cx + 6 * s, cy + 12 * s + bounce, 6 * s, 4 * s);
            } else if (direction === 'right') {
                g.fillEllipse(cx - 6 * s, cy + 12 * s + bounce, 6 * s, 4 * s);
            } else {
                g.fillEllipse(cx - 8 * s, cy + 12 * s + bounce, 6 * s, 4 * s);
                g.fillEllipse(cx + 8 * s, cy + 12 * s + bounce, 6 * s, 4 * s);
            }
        }

        // Swimming ripple effect
        if (swimming) {
            g.fillStyle(0xffffff, 0.3);
            g.fillEllipse(cx, cy + 14 * s + swimBob, (20 + Math.sin(frame * Math.PI) * 4) * s, 4 * s);
        }
    }

    // --- NPCs (holiday themed) ---
    generateNPCs() {
        const npcTypes = [
            // Easter Island NPCs
            { key: 'npc_turtle', bodyColor: 0x4caf50, shellColor: 0x2e7d32, type: 'turtle' },
            { key: 'npc_dolphin', bodyColor: 0x42a5f5, bellyColor: 0xbbdefb, type: 'dolphin' },
            { key: 'npc_parrot', bodyColor: 0xff5722, wingColor: 0x4caf50, type: 'parrot' },
            { key: 'npc_pelican', bodyColor: 0xffffff, beakColor: 0xff8f00, type: 'pelican' },
            { key: 'npc_gecko', bodyColor: 0x8bc34a, spotColor: 0x33691e, type: 'gecko' },
            { key: 'npc_crab', bodyColor: 0xef5350, clawColor: 0xc62828, type: 'crab' },
            { key: 'npc_seaturtle', bodyColor: 0x26a69a, shellColor: 0x00695c, type: 'turtle' },
            // Hannukah NPCs
            { key: 'npc_cat', bodyColor: 0x9e9e9e, accentColor: 0xffffff, type: 'cat' },
            { key: 'npc_mouse', bodyColor: 0xbcaaa4, accentColor: 0xd7ccc8, type: 'mouse' },
            { key: 'npc_lion', bodyColor: 0xffc107, maneColor: 0xe65100, type: 'lion' },
            { key: 'npc_owl', bodyColor: 0x795548, eyeColor: 0xffd54f, type: 'owl' },
            { key: 'npc_frog', bodyColor: 0x4caf50, bellyColor: 0xc8e6c9, type: 'frog' },
            { key: 'npc_rabbit', bodyColor: 0xfafafa, earColor: 0xf8bbd0, type: 'rabbit' },
            { key: 'npc_hamster', bodyColor: 0xffcc80, bellyColor: 0xfff3e0, type: 'hamster' },
            // Christmas NPCs
            { key: 'npc_elf', bodyColor: 0x4caf50, hatColor: 0xc62828, type: 'elf' },
            { key: 'npc_reindeer', bodyColor: 0x795548, noseColor: 0xef5350, type: 'reindeer' },
            { key: 'npc_gingerbread', bodyColor: 0xd4a060, accentColor: 0xffffff, type: 'gingerbread' },
            { key: 'npc_cardinal', bodyColor: 0xc62828, beakColor: 0xffc107, type: 'cardinal' },
            { key: 'npc_toysoldier', bodyColor: 0xc62828, accentColor: 0xffd700, type: 'toysoldier' },
            { key: 'npc_penguin', bodyColor: 0x2a2a3e, bellyColor: 0xffffff, type: 'penguin' },
            { key: 'npc_polarbear', bodyColor: 0xf0f0f0, scarfColor: 0xc62828, type: 'polarbear' },
            // Thanksgiving NPCs
            { key: 'npc_turkey', bodyColor: 0x8b4513, wattleColor: 0xef5350, type: 'turkey' },
            { key: 'npc_horse', bodyColor: 0x795548, maneColor: 0x3e2723, type: 'horse' },
            { key: 'npc_squirrel', bodyColor: 0xbf8040, tailColor: 0xa0522d, type: 'squirrel' },
            { key: 'npc_deer', bodyColor: 0xbcaaa4, antlerColor: 0x5d4037, type: 'deer' },
            { key: 'npc_scarecrow', bodyColor: 0xdaa520, hatColor: 0x5d4037, type: 'scarecrow' },
            { key: 'npc_beaver', bodyColor: 0x795548, tailColor: 0x5d4037, type: 'beaver' },
            { key: 'npc_fox', bodyColor: 0xff8f00, bellyColor: 0xfff3e0, type: 'fox' },
        ];

        npcTypes.forEach(npc => {
            const g = this.scene.make.graphics({ add: false });
            this._drawGenericNPC(g, npc);
            g.generateTexture(npc.key, 40, 48);
            g.destroy();
        });
    }

    _drawGenericNPC(g, npc) {
        const cx = 20, cy = 28;
        // Shadow
        g.fillStyle(0x000000, 0.2);
        g.fillEllipse(cx, 44, 24, 6);

        switch (npc.type) {
            case 'turtle':
                g.fillStyle(npc.shellColor || 0x2e7d32);
                g.fillEllipse(cx, cy + 2, 26, 20);
                g.fillStyle(npc.bodyColor);
                g.fillCircle(cx, cy - 6, 8);
                g.fillEllipse(cx - 10, cy + 8, 8, 5);
                g.fillEllipse(cx + 10, cy + 8, 8, 5);
                g.fillStyle(0x1a1a1a);
                g.fillCircle(cx - 3, cy - 8, 2);
                g.fillCircle(cx + 3, cy - 8, 2);
                g.lineStyle(1, 0x1a1a1a);
                g.beginPath(); g.arc(cx, cy - 4, 3, 0.2, Math.PI - 0.2); g.strokePath();
                break;

            case 'dolphin':
                g.fillStyle(npc.bodyColor);
                g.fillEllipse(cx, cy, 14, 24);
                g.fillStyle(npc.bellyColor || 0xbbdefb);
                g.fillEllipse(cx, cy + 2, 8, 18);
                g.fillStyle(npc.bodyColor);
                g.fillTriangle(cx, cy - 14, cx - 6, cy - 8, cx + 6, cy - 8);
                g.fillTriangle(cx - 10, cy - 2, cx - 4, cy, cx - 6, cy + 4);
                g.fillTriangle(cx + 10, cy - 2, cx + 4, cy, cx + 6, cy + 4);
                g.fillStyle(0x1a1a1a);
                g.fillCircle(cx - 4, cy - 4, 2);
                g.fillCircle(cx + 4, cy - 4, 2);
                g.lineStyle(1, 0x1a1a1a);
                g.beginPath(); g.arc(cx, cy, 3, 0.2, Math.PI - 0.2); g.strokePath();
                break;

            case 'parrot':
                g.fillStyle(npc.bodyColor);
                g.fillEllipse(cx, cy + 4, 18, 22);
                g.fillStyle(npc.wingColor || 0x4caf50);
                g.fillEllipse(cx - 8, cy, 10, 16);
                g.fillEllipse(cx + 8, cy, 10, 16);
                g.fillStyle(npc.bodyColor);
                g.fillCircle(cx, cy - 8, 8);
                g.fillStyle(0xffc107);
                g.fillTriangle(cx, cy - 6, cx - 4, cy - 2, cx + 4, cy - 2);
                g.fillStyle(0x1a1a1a);
                g.fillCircle(cx - 3, cy - 10, 2);
                g.fillCircle(cx + 3, cy - 10, 2);
                break;

            case 'crab':
                g.fillStyle(npc.bodyColor);
                g.fillEllipse(cx, cy + 4, 22, 14);
                g.fillStyle(npc.clawColor || 0xc62828);
                g.fillCircle(cx - 14, cy - 2, 5);
                g.fillCircle(cx + 14, cy - 2, 5);
                g.fillStyle(0x1a1a1a);
                g.fillCircle(cx - 4, cy, 2);
                g.fillCircle(cx + 4, cy, 2);
                g.lineStyle(2, npc.bodyColor);
                g.lineBetween(cx - 8, cy + 10, cx - 12, cy + 16);
                g.lineBetween(cx + 8, cy + 10, cx + 12, cy + 16);
                g.lineBetween(cx - 4, cy + 10, cx - 6, cy + 16);
                g.lineBetween(cx + 4, cy + 10, cx + 6, cy + 16);
                break;

            case 'cat':
                g.fillStyle(npc.bodyColor);
                g.fillEllipse(cx, cy + 4, 18, 22);
                g.fillCircle(cx, cy - 8, 10);
                g.fillTriangle(cx - 10, cy - 14, cx - 6, cy - 22, cx - 2, cy - 12);
                g.fillTriangle(cx + 10, cy - 14, cx + 6, cy - 22, cx + 2, cy - 12);
                g.fillStyle(npc.accentColor || 0xffffff);
                g.fillEllipse(cx, cy + 8, 12, 14);
                g.fillStyle(0x4caf50);
                g.fillEllipse(cx - 4, cy - 10, 4, 5);
                g.fillEllipse(cx + 4, cy - 10, 4, 5);
                g.fillStyle(0x1a1a1a);
                g.fillEllipse(cx - 4, cy - 10, 2, 4);
                g.fillEllipse(cx + 4, cy - 10, 2, 4);
                g.fillStyle(0xff69b4);
                g.fillTriangle(cx, cy - 7, cx - 2, cy - 5, cx + 2, cy - 5);
                g.lineStyle(0.8, npc.bodyColor, 0.5);
                g.lineBetween(cx - 10, cy - 6, cx - 4, cy - 6);
                g.lineBetween(cx + 10, cy - 6, cx + 4, cy - 6);
                break;

            case 'mouse':
                g.fillStyle(npc.bodyColor);
                g.fillEllipse(cx, cy + 4, 14, 18);
                g.fillCircle(cx, cy - 6, 8);
                g.fillStyle(npc.accentColor || 0xd7ccc8);
                g.fillCircle(cx - 7, cy - 12, 5);
                g.fillCircle(cx + 7, cy - 12, 5);
                g.fillStyle(0xffcccc);
                g.fillCircle(cx - 7, cy - 12, 3);
                g.fillCircle(cx + 7, cy - 12, 3);
                g.fillStyle(0x1a1a1a);
                g.fillCircle(cx - 3, cy - 8, 2);
                g.fillCircle(cx + 3, cy - 8, 2);
                g.fillStyle(0xff69b4);
                g.fillCircle(cx, cy - 5, 2);
                break;

            case 'lion':
                g.fillStyle(npc.maneColor || 0xe65100);
                g.fillCircle(cx, cy - 4, 16);
                g.fillStyle(npc.bodyColor);
                g.fillEllipse(cx, cy + 6, 18, 18);
                g.fillCircle(cx, cy - 4, 10);
                g.fillStyle(0xfff3e0);
                g.fillEllipse(cx, cy - 2, 8, 6);
                g.fillStyle(0x1a1a1a);
                g.fillCircle(cx - 3, cy - 8, 2);
                g.fillCircle(cx + 3, cy - 8, 2);
                g.fillStyle(0x5d4037);
                g.fillTriangle(cx, cy - 3, cx - 2, cy - 1, cx + 2, cy - 1);
                g.lineStyle(1, 0x5d4037);
                g.beginPath(); g.arc(cx, cy, 3, 0.2, Math.PI - 0.2); g.strokePath();
                break;

            case 'owl':
                g.fillStyle(npc.bodyColor);
                g.fillEllipse(cx, cy + 2, 20, 26);
                g.fillStyle(0xd7ccc8);
                g.fillEllipse(cx, cy + 6, 14, 18);
                g.fillStyle(npc.eyeColor || 0xffd54f);
                g.fillCircle(cx - 5, cy - 6, 5);
                g.fillCircle(cx + 5, cy - 6, 5);
                g.fillStyle(0x1a1a1a);
                g.fillCircle(cx - 5, cy - 6, 2.5);
                g.fillCircle(cx + 5, cy - 6, 2.5);
                g.fillStyle(0xff8f00);
                g.fillTriangle(cx, cy - 2, cx - 3, cy + 1, cx + 3, cy + 1);
                g.fillStyle(npc.bodyColor);
                g.fillTriangle(cx - 8, cy - 14, cx - 4, cy - 8, cx - 12, cy - 8);
                g.fillTriangle(cx + 8, cy - 14, cx + 4, cy - 8, cx + 12, cy - 8);
                break;

            case 'frog':
                g.fillStyle(npc.bodyColor);
                g.fillEllipse(cx, cy + 4, 20, 20);
                g.fillStyle(npc.bellyColor || 0xc8e6c9);
                g.fillEllipse(cx, cy + 6, 14, 14);
                g.fillStyle(0xffffff);
                g.fillCircle(cx - 6, cy - 8, 5);
                g.fillCircle(cx + 6, cy - 8, 5);
                g.fillStyle(0x1a1a1a);
                g.fillCircle(cx - 6, cy - 8, 2.5);
                g.fillCircle(cx + 6, cy - 8, 2.5);
                g.lineStyle(1, 0x2e7d32);
                g.beginPath(); g.arc(cx, cy, 4, 0.1, Math.PI - 0.1); g.strokePath();
                break;

            case 'rabbit':
                g.fillStyle(npc.bodyColor);
                g.fillEllipse(cx, cy + 4, 18, 22);
                g.fillCircle(cx, cy - 6, 9);
                g.fillStyle(npc.earColor || 0xf8bbd0);
                g.fillEllipse(cx - 5, cy - 22, 5, 14);
                g.fillEllipse(cx + 5, cy - 22, 5, 14);
                g.fillStyle(0xfce4ec);
                g.fillEllipse(cx - 5, cy - 22, 3, 10);
                g.fillEllipse(cx + 5, cy - 22, 3, 10);
                g.fillStyle(0x1a1a1a);
                g.fillCircle(cx - 3, cy - 8, 2);
                g.fillCircle(cx + 3, cy - 8, 2);
                g.fillStyle(0xff69b4);
                g.fillCircle(cx, cy - 5, 2);
                break;

            case 'hamster':
                g.fillStyle(npc.bodyColor);
                g.fillEllipse(cx, cy + 2, 22, 22);
                g.fillCircle(cx, cy - 6, 10);
                g.fillStyle(npc.bellyColor || 0xfff3e0);
                g.fillEllipse(cx, cy + 4, 14, 14);
                g.fillCircle(cx - 8, cy - 4, 5);
                g.fillCircle(cx + 8, cy - 4, 5);
                g.fillStyle(0x1a1a1a);
                g.fillCircle(cx - 3, cy - 8, 2);
                g.fillCircle(cx + 3, cy - 8, 2);
                g.fillStyle(0xff69b4);
                g.fillTriangle(cx, cy - 5, cx - 1.5, cy - 3.5, cx + 1.5, cy - 3.5);
                break;

            case 'elf':
                g.fillStyle(npc.bodyColor);
                g.fillRoundedRect(cx - 8, cy, 16, 18, 4);
                g.fillStyle(0xffe0b2);
                g.fillCircle(cx, cy - 4, 8);
                g.fillStyle(npc.hatColor || 0xc62828);
                g.fillTriangle(cx, cy - 22, cx - 8, cy - 6, cx + 8, cy - 6);
                g.fillStyle(0xffd700);
                g.fillCircle(cx, cy - 22, 2);
                g.fillStyle(0x1a1a1a);
                g.fillCircle(cx - 3, cy - 6, 2);
                g.fillCircle(cx + 3, cy - 6, 2);
                g.fillStyle(0xffe0b2);
                g.fillCircle(cx - 6, cy - 2, 3);
                g.fillCircle(cx + 6, cy - 2, 3);
                g.lineStyle(1, 0x1a1a1a);
                g.beginPath(); g.arc(cx, cy - 2, 2, 0.2, Math.PI - 0.2); g.strokePath();
                g.fillStyle(0x5d4037);
                g.fillRoundedRect(cx - 6, cy + 16, 5, 4, 1);
                g.fillRoundedRect(cx + 1, cy + 16, 5, 4, 1);
                break;

            case 'reindeer':
                g.fillStyle(npc.bodyColor);
                g.fillEllipse(cx, cy + 4, 20, 22);
                g.fillCircle(cx, cy - 8, 9);
                g.fillStyle(npc.bodyColor);
                g.lineStyle(2, 0x5d4037);
                g.lineBetween(cx - 5, cy - 16, cx - 8, cy - 24);
                g.lineBetween(cx - 8, cy - 24, cx - 12, cy - 22);
                g.lineBetween(cx - 8, cy - 24, cx - 4, cy - 26);
                g.lineBetween(cx + 5, cy - 16, cx + 8, cy - 24);
                g.lineBetween(cx + 8, cy - 24, cx + 12, cy - 22);
                g.lineBetween(cx + 8, cy - 24, cx + 4, cy - 26);
                g.fillStyle(npc.noseColor || 0xef5350);
                g.fillCircle(cx, cy - 5, 3);
                g.fillStyle(0x1a1a1a);
                g.fillCircle(cx - 4, cy - 10, 2);
                g.fillCircle(cx + 4, cy - 10, 2);
                break;

            case 'gingerbread':
                g.fillStyle(npc.bodyColor);
                g.fillRoundedRect(cx - 9, cy - 4, 18, 20, 4);
                g.fillCircle(cx, cy - 10, 8);
                g.fillStyle(npc.accentColor || 0xffffff);
                g.fillCircle(cx - 3, cy - 12, 2);
                g.fillCircle(cx + 3, cy - 12, 2);
                g.lineStyle(1.5, 0xffffff);
                g.beginPath(); g.arc(cx, cy - 8, 3, 0.2, Math.PI - 0.2); g.strokePath();
                g.fillStyle(0xffffff);
                g.fillCircle(cx, cy, 1.5);
                g.fillCircle(cx, cy + 6, 1.5);
                g.fillStyle(npc.bodyColor);
                g.fillRoundedRect(cx - 16, cy - 2, 8, 4, 2);
                g.fillRoundedRect(cx + 8, cy - 2, 8, 4, 2);
                g.fillRoundedRect(cx - 6, cy + 14, 5, 8, 2);
                g.fillRoundedRect(cx + 1, cy + 14, 5, 8, 2);
                break;

            case 'cardinal':
                g.fillStyle(npc.bodyColor);
                g.fillEllipse(cx, cy + 2, 16, 22);
                g.fillCircle(cx, cy - 8, 8);
                g.fillTriangle(cx, cy - 20, cx - 3, cy - 12, cx + 3, cy - 12);
                g.fillStyle(0x1a1a1a);
                g.fillEllipse(cx, cy - 6, 6, 4);
                g.fillStyle(0xffffff);
                g.fillCircle(cx - 3, cy - 10, 2);
                g.fillCircle(cx + 3, cy - 10, 2);
                g.fillStyle(0x1a1a1a);
                g.fillCircle(cx - 3, cy - 10, 1);
                g.fillCircle(cx + 3, cy - 10, 1);
                g.fillStyle(npc.beakColor || 0xffc107);
                g.fillTriangle(cx, cy - 6, cx - 4, cy - 4, cx + 4, cy - 4);
                break;

            case 'toysoldier':
                g.fillStyle(npc.bodyColor);
                g.fillRoundedRect(cx - 8, cy - 2, 16, 20, 3);
                g.fillStyle(0xffe0b2);
                g.fillCircle(cx, cy - 8, 7);
                g.fillStyle(0x1a1a2e);
                g.fillRoundedRect(cx - 8, cy - 18, 16, 10, 3);
                g.fillStyle(npc.accentColor || 0xffd700);
                g.fillRect(cx - 8, cy - 10, 16, 2);
                g.fillRect(cx - 2, cy, 4, 14);
                g.fillStyle(0x1a1a1a);
                g.fillCircle(cx - 3, cy - 8, 1.5);
                g.fillCircle(cx + 3, cy - 8, 1.5);
                g.fillStyle(0x1a1a2e);
                g.fillRoundedRect(cx - 6, cy + 16, 5, 6, 1);
                g.fillRoundedRect(cx + 1, cy + 16, 5, 6, 1);
                break;

            case 'penguin':
                g.fillStyle(npc.bodyColor);
                g.fillEllipse(cx, cy + 2, 22, 28);
                g.fillStyle(npc.bellyColor || 0xffffff);
                g.fillEllipse(cx, cy + 6, 14, 20);
                g.fillStyle(0xffffff);
                g.fillCircle(cx - 4, cy - 6, 4);
                g.fillCircle(cx + 4, cy - 6, 4);
                g.fillStyle(0x1a1a1a);
                g.fillCircle(cx - 4, cy - 6, 2);
                g.fillCircle(cx + 4, cy - 6, 2);
                g.fillStyle(0xffa500);
                g.fillTriangle(cx, cy - 2, cx - 4, cy + 1, cx + 4, cy + 1);
                g.fillEllipse(cx - 5, cy + 16, 8, 4);
                g.fillEllipse(cx + 5, cy + 16, 8, 4);
                break;

            case 'polarbear':
                g.fillStyle(npc.bodyColor);
                g.fillEllipse(cx, cy + 4, 28, 24);
                g.fillCircle(cx, cy - 8, 12);
                g.fillCircle(cx - 9, cy - 16, 5);
                g.fillCircle(cx + 9, cy - 16, 5);
                g.fillStyle(0xffcccc);
                g.fillCircle(cx - 9, cy - 16, 3);
                g.fillCircle(cx + 9, cy - 16, 3);
                g.fillStyle(0x333333);
                g.fillEllipse(cx, cy - 6, 4, 3);
                g.fillCircle(cx - 5, cy - 10, 2);
                g.fillCircle(cx + 5, cy - 10, 2);
                g.fillStyle(npc.scarfColor || 0xc62828);
                g.fillRoundedRect(cx - 12, cy - 1, 24, 4, 2);
                g.fillRoundedRect(cx + 6, cy - 1, 4, 10, 2);
                break;

            case 'turkey':
                g.fillStyle(npc.bodyColor);
                g.fillEllipse(cx, cy + 4, 22, 20);
                g.fillStyle(0xff4500);
                g.fillTriangle(cx - 8, cy - 6, cx, cy - 16, cx - 2, cy);
                g.fillStyle(0xffd700);
                g.fillTriangle(cx - 4, cy - 6, cx + 4, cy - 16, cx + 2, cy);
                g.fillStyle(0xff6347);
                g.fillTriangle(cx, cy - 6, cx + 8, cy - 16, cx + 6, cy);
                g.fillStyle(npc.bodyColor);
                g.fillCircle(cx, cy - 2, 7);
                g.fillStyle(0x1a1a1a);
                g.fillCircle(cx - 3, cy - 3, 1.5);
                g.fillCircle(cx + 3, cy - 3, 1.5);
                g.fillStyle(0xffa500);
                g.fillTriangle(cx, cy - 1, cx - 3, cy + 2, cx + 3, cy + 2);
                g.fillStyle(npc.wattleColor || 0xef5350);
                g.fillEllipse(cx, cy + 3, 4, 5);
                break;

            case 'horse':
                g.fillStyle(npc.bodyColor);
                g.fillEllipse(cx, cy + 4, 20, 24);
                g.fillEllipse(cx, cy - 10, 14, 16);
                g.fillStyle(npc.maneColor || 0x3e2723);
                g.fillRect(cx - 2, cy - 18, 6, 12);
                g.fillStyle(0x1a1a1a);
                g.fillCircle(cx - 3, cy - 12, 2);
                g.fillCircle(cx + 3, cy - 12, 2);
                g.fillStyle(0x1a1a1a);
                g.fillEllipse(cx, cy - 4, 4, 3);
                g.fillStyle(npc.bodyColor);
                g.fillRect(cx - 8, cy + 14, 4, 8);
                g.fillRect(cx + 4, cy + 14, 4, 8);
                break;

            case 'squirrel':
                g.fillStyle(npc.bodyColor);
                g.fillEllipse(cx, cy + 2, 16, 20);
                g.fillCircle(cx, cy - 8, 8);
                g.fillStyle(npc.tailColor || 0xa0522d);
                g.fillEllipse(cx + 8, cy - 4, 8, 16);
                g.fillStyle(0xfff3e0);
                g.fillEllipse(cx, cy + 4, 10, 12);
                g.fillStyle(0x1a1a1a);
                g.fillCircle(cx - 3, cy - 10, 2);
                g.fillCircle(cx + 3, cy - 10, 2);
                g.fillStyle(0x5d4037);
                g.fillTriangle(cx, cy - 6, cx - 1.5, cy - 4, cx + 1.5, cy - 4);
                break;

            case 'deer':
                g.fillStyle(npc.bodyColor);
                g.fillEllipse(cx, cy + 4, 20, 22);
                g.fillCircle(cx, cy - 8, 9);
                g.fillStyle(npc.antlerColor || 0x5d4037);
                g.lineStyle(2, npc.antlerColor || 0x5d4037);
                g.lineBetween(cx - 5, cy - 16, cx - 8, cy - 24);
                g.lineBetween(cx - 8, cy - 24, cx - 12, cy - 22);
                g.lineBetween(cx + 5, cy - 16, cx + 8, cy - 24);
                g.lineBetween(cx + 8, cy - 24, cx + 12, cy - 22);
                g.fillStyle(0x1a1a1a);
                g.fillCircle(cx - 3, cy - 10, 2);
                g.fillCircle(cx + 3, cy - 10, 2);
                g.fillStyle(0x5d4037);
                g.fillCircle(cx, cy - 5, 2);
                break;

            case 'scarecrow':
                g.fillStyle(npc.bodyColor);
                g.fillRoundedRect(cx - 10, cy - 2, 20, 22, 3);
                g.fillStyle(0xffe0b2);
                g.fillCircle(cx, cy - 8, 8);
                g.fillStyle(npc.hatColor || 0x5d4037);
                g.fillRect(cx - 10, cy - 18, 20, 8);
                g.fillRect(cx - 14, cy - 12, 28, 4);
                g.fillStyle(0x1a1a1a);
                g.fillCircle(cx - 3, cy - 8, 2);
                g.fillCircle(cx + 3, cy - 8, 2);
                g.lineStyle(1.5, 0x1a1a1a);
                g.beginPath(); g.arc(cx, cy - 4, 3, 0.2, Math.PI - 0.2); g.strokePath();
                g.fillStyle(npc.bodyColor);
                g.fillRect(cx - 18, cy + 2, 36, 4);
                break;

            case 'beaver':
                g.fillStyle(npc.bodyColor);
                g.fillEllipse(cx, cy + 2, 20, 22);
                g.fillCircle(cx, cy - 8, 9);
                g.fillStyle(npc.tailColor || 0x5d4037);
                g.fillEllipse(cx, cy + 16, 10, 5);
                g.fillStyle(0xfff3e0);
                g.fillEllipse(cx, cy + 4, 12, 12);
                g.fillStyle(0x1a1a1a);
                g.fillCircle(cx - 3, cy - 10, 2);
                g.fillCircle(cx + 3, cy - 10, 2);
                g.fillStyle(0xffffff);
                g.fillRect(cx - 3, cy - 5, 3, 4);
                g.fillRect(cx, cy - 5, 3, 4);
                break;

            case 'fox':
                g.fillStyle(npc.bodyColor);
                g.fillEllipse(cx, cy + 4, 18, 22);
                g.fillCircle(cx, cy - 6, 9);
                g.fillTriangle(cx - 10, cy - 10, cx - 6, cy - 20, cx - 2, cy - 8);
                g.fillTriangle(cx + 10, cy - 10, cx + 6, cy - 20, cx + 2, cy - 8);
                g.fillStyle(npc.bellyColor || 0xfff3e0);
                g.fillEllipse(cx, cy + 8, 12, 14);
                g.fillTriangle(cx, cy - 2, cx - 4, cy + 2, cx + 4, cy + 2);
                g.fillStyle(0x1a1a1a);
                g.fillCircle(cx - 3, cy - 8, 2);
                g.fillCircle(cx + 3, cy - 8, 2);
                g.fillStyle(0x1a1a1a);
                g.fillCircle(cx, cy - 4, 2);
                break;

            default:
                // Fallback generic NPC
                g.fillStyle(npc.bodyColor);
                g.fillEllipse(cx, cy + 4, 20, 24);
                g.fillCircle(cx, cy - 6, 9);
                g.fillStyle(0x1a1a1a);
                g.fillCircle(cx - 3, cy - 8, 2);
                g.fillCircle(cx + 3, cy - 8, 2);
                break;
        }
    }

    // --- SPIDERS ---
    generateSpiders() {
        // Mini spider (cute, not creepy)
        let g = this.scene.make.graphics({ add: false });
        this._drawMiniSpider(g, 0x555555, 0x7c4dff); // default purple web
        g.generateTexture('spider_mini', 32, 32);
        g.destroy();

        // Blue/silver spider (hannukah)
        g = this.scene.make.graphics({ add: false });
        this._drawMiniSpider(g, 0x1565c0, 0xb0bec5);
        g.generateTexture('spider_blue', 32, 32);
        g.destroy();

        // Red/green spider (christmas)
        g = this.scene.make.graphics({ add: false });
        this._drawMiniSpider(g, 0xc62828, 0x2e7d32);
        g.generateTexture('spider_red', 32, 32);
        g.destroy();

        // Orange spider (thanksgiving)
        g = this.scene.make.graphics({ add: false });
        this._drawMiniSpider(g, 0xe65100, 0x5d4037);
        g.generateTexture('spider_orange', 32, 32);
        g.destroy();

        // Rainbow spider (mega mix)
        g = this.scene.make.graphics({ add: false });
        this._drawMiniSpider(g, 0x9c27b0, 0xffd700);
        g.generateTexture('spider_rainbow', 32, 32);
        g.destroy();
    }

    _drawMiniSpider(g, bodyColor, accentColor) {
        const cx = 16, cy = 16;
        // Legs (4 on each side, cute and wiggly)
        g.lineStyle(2, bodyColor);
        for (let i = 0; i < 4; i++) {
            const yOff = -6 + i * 4;
            g.lineBetween(cx - 6, cy + yOff, cx - 12, cy + yOff - 3);
            g.lineBetween(cx + 6, cy + yOff, cx + 12, cy + yOff - 3);
        }
        // Body
        g.fillStyle(bodyColor);
        g.fillEllipse(cx, cy + 2, 14, 10);
        g.fillCircle(cx, cy - 4, 7);
        // Eyes (big and cute)
        g.fillStyle(0xffffff);
        g.fillCircle(cx - 3, cy - 5, 4);
        g.fillCircle(cx + 3, cy - 5, 4);
        g.fillStyle(0x1a1a1a);
        g.fillCircle(cx - 2, cy - 5, 2);
        g.fillCircle(cx + 4, cy - 5, 2);
        // Cute fangs (tiny, not scary)
        g.fillStyle(accentColor);
        g.fillCircle(cx - 2, cy - 1, 1.5);
        g.fillCircle(cx + 2, cy - 1, 1.5);
        // Little bow or accent
        g.fillStyle(accentColor, 0.6);
        g.fillEllipse(cx, cy + 5, 4, 3);
    }

    // --- THE WEBLORD ---
    generateWeblord() {
        const g = this.scene.make.graphics({ add: false });
        const cx = 32, cy = 36;

        // Shadow
        g.fillStyle(0x000000, 0.2);
        g.fillEllipse(cx, 60, 40, 10);

        // Big web behind
        g.lineStyle(1, 0xcccccc, 0.3);
        for (let i = 0; i < 6; i++) {
            const a = (i * Math.PI) / 3;
            g.lineBetween(cx, cy, cx + Math.cos(a) * 28, cy + Math.sin(a) * 28);
        }

        // Legs (8 total, goofy and wiggly)
        g.lineStyle(3, 0x4a1a6e);
        for (let i = 0; i < 4; i++) {
            const yOff = -10 + i * 7;
            g.lineBetween(cx - 10, cy + yOff, cx - 24, cy + yOff - 5);
            g.lineBetween(cx + 10, cy + yOff, cx + 24, cy + yOff - 5);
        }

        // Big round body
        g.fillStyle(0x6a1b9a);
        g.fillEllipse(cx, cy + 6, 28, 20);

        // Head
        g.fillStyle(0x6a1b9a);
        g.fillCircle(cx, cy - 8, 14);

        // Silly top hat
        g.fillStyle(0x1a1a2e);
        g.fillRect(cx - 10, cy - 24, 20, 12);
        g.fillRect(cx - 14, cy - 14, 28, 4);
        g.fillStyle(0x9c27b0);
        g.fillRect(cx - 10, cy - 18, 20, 3);

        // Goofy eyes (different sizes for silliness)
        g.fillStyle(0xffffff);
        g.fillCircle(cx - 6, cy - 10, 6);
        g.fillCircle(cx + 7, cy - 8, 5);
        g.fillStyle(0xce93d8);
        g.fillCircle(cx - 5, cy - 9, 3);
        g.fillCircle(cx + 8, cy - 7, 2.5);
        g.fillStyle(0x1a1a1a);
        g.fillCircle(cx - 5, cy - 9, 1.5);
        g.fillCircle(cx + 8, cy - 7, 1.5);

        // Bushy eyebrows
        g.fillStyle(0x4a0e78);
        g.fillRoundedRect(cx - 13, cy - 18, 14, 3, 1);
        g.fillRoundedRect(cx + 1, cy - 16, 12, 3, 1);

        // Goofy grin with fangs
        g.fillStyle(0x4a0e78);
        g.fillRoundedRect(cx - 8, cy - 2, 16, 8, 3);
        g.fillStyle(0xffffff);
        g.fillRect(cx - 5, cy - 2, 3, 4);
        g.fillRect(cx + 2, cy - 2, 3, 4);

        // Cape
        g.fillStyle(0x2c003e, 0.6);
        g.fillTriangle(cx - 12, cy - 2, cx + 12, cy - 2, cx, cy + 28);

        // Web pattern on belly
        g.lineStyle(1, 0x9c27b0, 0.3);
        g.strokeCircle(cx, cy + 8, 6);
        g.strokeCircle(cx, cy + 8, 3);

        g.generateTexture('weblord', 64, 68);
        g.destroy();
    }

    // --- UI ELEMENTS ---
    generateUIElements() {
        // Star
        let g = this.scene.make.graphics({ add: false });
        this._drawStar(g, 16, 16, 14, 0xffd700);
        g.generateTexture('star', 32, 32);
        g.destroy();

        // Star outline
        g = this.scene.make.graphics({ add: false });
        g.lineStyle(2, 0xffd700);
        this._drawStarOutline(g, 16, 16, 14);
        g.generateTexture('star_empty', 32, 32);
        g.destroy();

        // Heart
        g = this.scene.make.graphics({ add: false });
        g.fillStyle(0xff4757);
        g.fillCircle(10, 10, 7);
        g.fillCircle(20, 10, 7);
        g.fillTriangle(3, 12, 27, 12, 15, 26);
        g.generateTexture('heart', 30, 28);
        g.destroy();

        // Buttons
        const buttonConfigs = [
            { key: 'button_blue', c1: 0x4a90d9, c2: 0x5aa0e9 },
            { key: 'button_green', c1: 0x2ecc71, c2: 0x3edd81 },
            { key: 'button_red', c1: 0xe74c3c, c2: 0xf75c4c },
            { key: 'button_orange', c1: 0xf39c12, c2: 0xf5ac22 },
        ];
        buttonConfigs.forEach(btn => {
            g = this.scene.make.graphics({ add: false });
            g.fillStyle(btn.c1);
            g.fillRoundedRect(0, 0, 200, 60, 12);
            g.fillStyle(btn.c2);
            g.fillRoundedRect(2, 2, 196, 30, 10);
            g.generateTexture(btn.key, 200, 60);
            g.destroy();
        });

        // Dialog box background
        g = this.scene.make.graphics({ add: false });
        g.fillStyle(0x1a1a3e, 0.92);
        g.fillRoundedRect(0, 0, 900, 180, 16);
        g.lineStyle(3, 0x7c4dff);
        g.strokeRoundedRect(0, 0, 900, 180, 16);
        g.generateTexture('dialog_bg', 900, 180);
        g.destroy();

        // Sparkle
        g = this.scene.make.graphics({ add: false });
        g.fillStyle(0xffffff);
        g.beginPath();
        g.moveTo(8, 0); g.lineTo(10, 6); g.lineTo(16, 8);
        g.lineTo(10, 10); g.lineTo(8, 16); g.lineTo(6, 10);
        g.lineTo(0, 8); g.lineTo(6, 6); g.closePath(); g.fillPath();
        g.generateTexture('sparkle', 16, 16);
        g.destroy();

        // Small sparkle
        g = this.scene.make.graphics({ add: false });
        g.fillStyle(0x7c4dff);
        g.fillCircle(4, 4, 4);
        g.fillStyle(0xffffff, 0.8);
        g.fillCircle(4, 4, 2);
        g.generateTexture('sparkle_small', 8, 8);
        g.destroy();

        // Arrow
        g = this.scene.make.graphics({ add: false });
        g.fillStyle(0xffd700);
        g.fillTriangle(8, 0, 0, 12, 16, 12);
        g.generateTexture('arrow_down', 16, 12);
        g.destroy();

        // Exclamation
        g = this.scene.make.graphics({ add: false });
        g.fillStyle(0xffd700);
        g.fillRoundedRect(4, 0, 8, 12, 2);
        g.fillCircle(8, 16, 3);
        g.generateTexture('exclamation', 16, 20);
        g.destroy();

        // Ninja energy bar frame
        g = this.scene.make.graphics({ add: false });
        g.lineStyle(2, 0x7c4dff);
        g.strokeRoundedRect(0, 0, 104, 16, 4);
        g.generateTexture('energy_bar_frame', 104, 16);
        g.destroy();

        // Ninja energy bar fill
        g = this.scene.make.graphics({ add: false });
        g.fillStyle(0x7c4dff);
        g.fillRoundedRect(0, 0, 100, 12, 3);
        g.generateTexture('energy_bar_fill', 100, 12);
        g.destroy();

        // Invisibility button (mobile)
        g = this.scene.make.graphics({ add: false });
        g.fillStyle(0x2a1a4e, 0.8);
        g.fillCircle(28, 28, 28);
        g.lineStyle(2, 0x7c4dff);
        g.strokeCircle(28, 28, 28);
        // Ninja star icon
        g.fillStyle(0x7c4dff);
        for (let i = 0; i < 4; i++) {
            const a = (i * Math.PI) / 2;
            g.fillTriangle(
                28 + Math.cos(a) * 4, 28 + Math.sin(a) * 4,
                28 + Math.cos(a + 0.4) * 14, 28 + Math.sin(a + 0.4) * 14,
                28 + Math.cos(a - 0.4) * 14, 28 + Math.sin(a - 0.4) * 14
            );
        }
        g.fillStyle(0x2a1a4e);
        g.fillCircle(28, 28, 5);
        g.generateTexture('btn_invisibility', 56, 56);
        g.destroy();
    }

    generateJoystick() {
        let g = this.scene.make.graphics({ add: false });
        g.fillStyle(0xffffff, 0.15);
        g.fillCircle(60, 60, 60);
        g.lineStyle(2, 0xffffff, 0.3);
        g.strokeCircle(60, 60, 60);
        g.generateTexture('joystick_base', 120, 120);
        g.destroy();

        g = this.scene.make.graphics({ add: false });
        g.fillStyle(0xffffff, 0.4);
        g.fillCircle(25, 25, 25);
        g.fillStyle(0xffffff, 0.2);
        g.fillCircle(25, 25, 20);
        g.generateTexture('joystick_thumb', 50, 50);
        g.destroy();
    }

    // --- COLLECTIBLES ---
    generateCollectibles() {
        let g;

        // Easter egg (painted)
        const eggColors = [0xff6b6b, 0x42a5f5, 0xffd54f, 0x66bb6a, 0xce93d8, 0xff8a65, 0x4dd0e1, 0xfff176];
        eggColors.forEach((color, i) => {
            g = this.scene.make.graphics({ add: false });
            g.fillStyle(color);
            g.fillEllipse(10, 12, 16, 20);
            g.fillStyle(0xffffff, 0.4);
            g.fillEllipse(10, 8, 10, 8);
            // Stripe pattern
            g.fillStyle(0xffffff, 0.3);
            g.fillRect(2, 10, 16, 2);
            g.fillRect(2, 14, 16, 2);
            g.generateTexture(`egg_${i}`, 20, 24);
            g.destroy();
        });

        // Gelt (chocolate coin)
        g = this.scene.make.graphics({ add: false });
        g.fillStyle(0xffd700);
        g.fillCircle(10, 10, 10);
        g.fillStyle(0xffeb3b, 0.6);
        g.fillCircle(10, 8, 7);
        g.lineStyle(1, 0xb8860b);
        g.strokeCircle(10, 10, 10);
        g.generateTexture('gelt', 20, 20);
        g.destroy();

        // Christmas ornament
        g = this.scene.make.graphics({ add: false });
        g.fillStyle(0xc62828);
        g.fillCircle(10, 12, 10);
        g.fillStyle(0xffffff, 0.3);
        g.fillEllipse(8, 8, 6, 4);
        g.fillStyle(0x9e9e9e);
        g.fillRect(8, 0, 4, 4);
        g.generateTexture('ornament', 20, 24);
        g.destroy();

        // Harvest item (acorn)
        g = this.scene.make.graphics({ add: false });
        g.fillStyle(0x8d6e63);
        g.fillRoundedRect(3, 0, 14, 8, 3);
        g.fillStyle(0xd4a060);
        g.fillEllipse(10, 12, 14, 12);
        g.fillStyle(0xc49060, 0.5);
        g.fillEllipse(10, 10, 8, 6);
        g.generateTexture('acorn', 20, 20);
        g.destroy();

        // Golden egg (ultra rare)
        g = this.scene.make.graphics({ add: false });
        g.fillStyle(0xffd700);
        g.fillEllipse(12, 14, 20, 24);
        g.fillStyle(0xffeb3b, 0.6);
        g.fillEllipse(12, 10, 12, 10);
        g.fillStyle(0xffffff, 0.4);
        g.fillEllipse(10, 8, 6, 5);
        g.lineStyle(1, 0xb8860b);
        g.strokeEllipse(12, 14, 20, 24);
        g.generateTexture('golden_egg', 24, 28);
        g.destroy();

        // House treasure generic
        g = this.scene.make.graphics({ add: false });
        g.fillStyle(0x6d4c41);
        g.fillRoundedRect(0, 8, 40, 24, 4);
        g.fillStyle(0x8d6e63);
        g.fillRoundedRect(0, 0, 40, 18, { tl: 6, tr: 6, bl: 0, br: 0 });
        g.fillStyle(0xffd700);
        g.fillRect(0, 16, 40, 4);
        g.fillRoundedRect(14, 12, 12, 10, 3);
        g.fillStyle(0xffeb3b);
        g.fillCircle(20, 17, 3);
        g.generateTexture('treasure_chest', 40, 32);
        g.destroy();

        // Spider poof (defeat animation)
        g = this.scene.make.graphics({ add: false });
        g.fillStyle(0x7c4dff, 0.6);
        for (let i = 0; i < 8; i++) {
            const a = (i / 8) * Math.PI * 2;
            g.fillCircle(16 + Math.cos(a) * 10, 16 + Math.sin(a) * 10, 4);
        }
        g.fillStyle(0xffffff, 0.4);
        g.fillCircle(16, 16, 6);
        g.generateTexture('spider_poof', 32, 32);
        g.destroy();
    }

    // --- FURNITURE ---
    generateFurniture() {
        let g;

        // Bed
        g = this.scene.make.graphics({ add: false });
        g.fillStyle(0x6d4c41);
        g.fillRoundedRect(0, 0, 64, 48, 4);
        g.fillStyle(0xe8d0b0);
        g.fillRoundedRect(3, 3, 58, 42, 3);
        g.fillStyle(0xffffff);
        g.fillRoundedRect(6, 4, 52, 12, 4);
        g.fillStyle(0x7986cb);
        g.fillRoundedRect(4, 20, 56, 24, 3);
        g.generateTexture('furn_bed', 64, 48);
        g.destroy();

        // Table
        g = this.scene.make.graphics({ add: false });
        g.fillStyle(0x8d6e63);
        g.fillRoundedRect(0, 0, 48, 36, 4);
        g.fillStyle(0xa1887f);
        g.fillRoundedRect(2, 2, 44, 32, 3);
        g.fillStyle(0x6d4c41);
        g.fillRect(4, 32, 5, 8);
        g.fillRect(39, 32, 5, 8);
        g.generateTexture('furn_table', 48, 40);
        g.destroy();

        // Chair
        g = this.scene.make.graphics({ add: false });
        g.fillStyle(0x8d6e63);
        g.fillRoundedRect(2, 0, 20, 8, 3);
        g.fillRect(4, 8, 4, 16);
        g.fillRect(16, 8, 4, 16);
        g.fillStyle(0xa1887f);
        g.fillRoundedRect(2, 12, 20, 12, 3);
        g.generateTexture('furn_chair', 24, 28);
        g.destroy();

        // Bookshelf
        g = this.scene.make.graphics({ add: false });
        g.fillStyle(0x5d4037);
        g.fillRoundedRect(0, 0, 56, 48, 3);
        g.fillStyle(0x6d4c41);
        g.fillRect(3, 3, 50, 13);
        g.fillRect(3, 18, 50, 13);
        g.fillRect(3, 33, 50, 13);
        const bookColors = [0xe74c3c, 0x3498db, 0x2ecc71, 0xf39c12, 0x9b59b6, 0x1abc9c, 0xe67e22, 0x7986cb];
        for (let row = 0; row < 3; row++) {
            let bx = 5;
            for (let b = 0; b < 5 + row; b++) {
                const bw = 3 + Math.floor(Math.random() * 4);
                g.fillStyle(bookColors[(row * 5 + b) % bookColors.length]);
                g.fillRect(bx, 4 + row * 15, bw, 11);
                bx += bw + 1;
                if (bx > 48) break;
            }
        }
        g.generateTexture('furn_bookshelf', 56, 48);
        g.destroy();

        // Rug
        g = this.scene.make.graphics({ add: false });
        g.fillStyle(0xc62828);
        g.fillEllipse(32, 20, 60, 36);
        g.fillStyle(0xef5350, 0.6);
        g.fillEllipse(32, 20, 44, 24);
        g.fillStyle(0xffcdd2, 0.4);
        g.fillEllipse(32, 20, 24, 12);
        g.generateTexture('furn_rug', 64, 40);
        g.destroy();

        // Fireplace
        g = this.scene.make.graphics({ add: false });
        g.fillStyle(0x795548);
        g.fillRoundedRect(0, 0, 56, 52, 4);
        g.fillStyle(0x8d6e63);
        g.fillRoundedRect(2, 2, 52, 18, 3);
        g.fillStyle(0x424242);
        g.fillRoundedRect(8, 16, 40, 32, { tl: 8, tr: 8, bl: 2, br: 2 });
        g.fillStyle(0x212121);
        g.fillRoundedRect(10, 20, 36, 26, { tl: 6, tr: 6, bl: 2, br: 2 });
        g.fillStyle(0xff6f00);
        g.fillTriangle(28, 24, 18, 42, 38, 42);
        g.fillStyle(0xffab00);
        g.fillTriangle(28, 28, 22, 40, 34, 40);
        g.fillStyle(0xffd54f);
        g.fillTriangle(28, 32, 25, 38, 31, 38);
        g.generateTexture('furn_fireplace', 56, 52);
        g.destroy();

        // Lamp
        g = this.scene.make.graphics({ add: false });
        g.fillStyle(0x9e9e9e);
        g.fillRect(8, 16, 4, 22);
        g.fillEllipse(10, 38, 16, 6);
        g.fillStyle(0xffd54f, 0.8);
        g.fillTriangle(10, 6, 0, 18, 20, 18);
        g.fillStyle(0xffffff, 0.3);
        g.fillCircle(10, 4, 6);
        g.generateTexture('furn_lamp', 20, 40);
        g.destroy();

        // Chest
        g = this.scene.make.graphics({ add: false });
        g.fillStyle(0x6d4c41);
        g.fillRoundedRect(0, 8, 40, 24, 4);
        g.fillStyle(0x8d6e63);
        g.fillRoundedRect(0, 0, 40, 18, { tl: 6, tr: 6, bl: 0, br: 0 });
        g.fillStyle(0xffd700);
        g.fillRect(0, 16, 40, 4);
        g.fillRoundedRect(14, 12, 12, 10, 3);
        g.fillStyle(0xffeb3b);
        g.fillCircle(20, 17, 3);
        g.generateTexture('furn_chest', 40, 32);
        g.destroy();

        // Plant
        g = this.scene.make.graphics({ add: false });
        g.fillStyle(0xd84315);
        g.fillTriangle(2, 14, 10, 28, 18, 14);
        g.fillRect(2, 12, 16, 4);
        g.fillStyle(0x4caf50);
        g.fillCircle(10, 8, 8);
        g.fillCircle(6, 4, 5);
        g.fillCircle(14, 4, 5);
        g.generateTexture('furn_plant', 20, 28);
        g.destroy();

        // Window
        g = this.scene.make.graphics({ add: false });
        g.fillStyle(0x5d4037);
        g.fillRoundedRect(0, 0, 48, 40, 3);
        g.fillStyle(0x87ceeb);
        g.fillRect(4, 4, 18, 14);
        g.fillRect(26, 4, 18, 14);
        g.fillRect(4, 22, 18, 14);
        g.fillRect(26, 22, 18, 14);
        g.lineStyle(2, 0x5d4037);
        g.lineBetween(24, 2, 24, 38);
        g.lineBetween(2, 20, 46, 20);
        g.generateTexture('furn_window', 48, 40);
        g.destroy();

        // Door
        g = this.scene.make.graphics({ add: false });
        g.fillStyle(0x6d4c41);
        g.fillRoundedRect(0, 0, 32, 48, { tl: 6, tr: 6, bl: 0, br: 0 });
        g.fillStyle(0x8d6e63);
        g.fillRoundedRect(2, 2, 28, 44, { tl: 5, tr: 5, bl: 0, br: 0 });
        g.fillStyle(0xa1887f);
        g.fillRoundedRect(4, 4, 24, 18, 3);
        g.fillRoundedRect(4, 26, 24, 18, 3);
        g.fillStyle(0xffd700);
        g.fillCircle(24, 28, 3);
        g.generateTexture('furn_door', 32, 48);
        g.destroy();

        // Doormat
        g = this.scene.make.graphics({ add: false });
        g.fillStyle(0x8d6e63);
        g.fillRoundedRect(0, 0, 40, 16, 4);
        g.fillStyle(0xa1887f);
        g.fillRoundedRect(2, 2, 36, 12, 3);
        g.generateTexture('furn_doormat', 40, 16);
        g.destroy();

        // Painting
        g = this.scene.make.graphics({ add: false });
        g.fillStyle(0x5d4037);
        g.fillRect(0, 0, 32, 24);
        g.fillStyle(0x87ceeb);
        g.fillRect(2, 2, 28, 20);
        g.fillStyle(0x4caf50);
        g.fillRect(2, 14, 28, 8);
        g.fillStyle(0xffd54f);
        g.fillCircle(22, 8, 4);
        g.generateTexture('furn_painting', 32, 24);
        g.destroy();

        // Menorah (hannukah house)
        g = this.scene.make.graphics({ add: false });
        g.fillStyle(0xffd700);
        g.fillRect(22, 16, 4, 24);
        g.fillRect(8, 38, 32, 4);
        for (let i = 0; i < 9; i++) {
            const bx = 4 + i * 5;
            const bh = i === 4 ? 20 : 14;
            g.fillRect(bx, 40 - bh, 3, bh);
            // Flames
            g.fillStyle(0xffab00);
            g.fillEllipse(bx + 1.5, 40 - bh - 3, 4, 6);
            g.fillStyle(0xffd700);
        }
        g.generateTexture('furn_menorah', 48, 44);
        g.destroy();

        // Christmas tree (indoor)
        g = this.scene.make.graphics({ add: false });
        g.fillStyle(0x5d4037);
        g.fillRect(20, 44, 8, 12);
        g.fillStyle(0x2e7d32);
        g.fillTriangle(24, 4, 4, 24, 44, 24);
        g.fillTriangle(24, 14, 6, 34, 42, 34);
        g.fillTriangle(24, 24, 8, 46, 40, 46);
        // Ornaments
        g.fillStyle(0xc62828);
        g.fillCircle(16, 22, 3);
        g.fillCircle(32, 32, 3);
        g.fillStyle(0xffd700);
        g.fillCircle(28, 20, 2.5);
        g.fillCircle(18, 36, 2.5);
        // Star on top
        g.fillStyle(0xffd700);
        g.beginPath();
        g.moveTo(24, 0); g.lineTo(26, 5); g.lineTo(30, 6);
        g.lineTo(26, 8); g.lineTo(24, 12); g.lineTo(22, 8);
        g.lineTo(18, 6); g.lineTo(22, 5); g.closePath(); g.fillPath();
        g.generateTexture('furn_xmas_tree', 48, 56);
        g.destroy();

        // Feast table (thanksgiving)
        g = this.scene.make.graphics({ add: false });
        g.fillStyle(0x6d4c41);
        g.fillRoundedRect(0, 8, 80, 40, 6);
        g.fillStyle(0x8d6e63);
        g.fillRoundedRect(4, 10, 72, 36, 4);
        // Plates
        g.fillStyle(0xfafafa);
        g.fillCircle(20, 24, 6);
        g.fillCircle(40, 24, 6);
        g.fillCircle(60, 24, 6);
        // Turkey
        g.fillStyle(0x8b4513);
        g.fillEllipse(40, 22, 8, 6);
        g.generateTexture('furn_feast_table', 80, 52);
        g.destroy();

        // Stocking (christmas)
        g = this.scene.make.graphics({ add: false });
        g.fillStyle(0xc62828);
        g.fillRoundedRect(2, 0, 12, 28, 3);
        g.fillRoundedRect(2, 24, 20, 8, 3);
        g.fillStyle(0xffffff);
        g.fillRoundedRect(2, 0, 12, 6, 2);
        g.generateTexture('furn_stocking', 24, 32);
        g.destroy();
    }

    _drawStar(g, cx, cy, r, color) {
        g.fillStyle(color);
        const points = [];
        for (let i = 0; i < 10; i++) {
            const angle = (i * Math.PI) / 5 - Math.PI / 2;
            const radius = i % 2 === 0 ? r : r * 0.45;
            points.push({ x: cx + Math.cos(angle) * radius, y: cy + Math.sin(angle) * radius });
        }
        g.beginPath();
        g.moveTo(points[0].x, points[0].y);
        for (let i = 1; i < points.length; i++) g.lineTo(points[i].x, points[i].y);
        g.closePath();
        g.fillPath();
        // Shine
        g.fillStyle(0xffec80, 0.5);
        const sr = r * 0.5;
        const sp = [];
        for (let i = 0; i < 10; i++) {
            const angle = (i * Math.PI) / 5 - Math.PI / 2;
            const radius = i % 2 === 0 ? sr : sr * 0.45;
            sp.push({ x: cx + Math.cos(angle) * radius, y: cy + Math.sin(angle) * radius - 1 });
        }
        g.beginPath();
        g.moveTo(sp[0].x, sp[0].y);
        for (let i = 1; i < sp.length; i++) g.lineTo(sp[i].x, sp[i].y);
        g.closePath();
        g.fillPath();
    }

    _drawStarOutline(g, cx, cy, r) {
        const points = [];
        for (let i = 0; i < 10; i++) {
            const angle = (i * Math.PI) / 5 - Math.PI / 2;
            const radius = i % 2 === 0 ? r : r * 0.45;
            points.push({ x: cx + Math.cos(angle) * radius, y: cy + Math.sin(angle) * radius });
        }
        g.beginPath();
        g.moveTo(points[0].x, points[0].y);
        for (let i = 1; i < points.length; i++) g.lineTo(points[i].x, points[i].y);
        g.closePath();
        g.strokePath();
    }

    // --- POST-GAME SPRITES ---
    generatePostGameSprites() {
        let g;

        // Crown
        g = this.scene.make.graphics({ add: false });
        g.fillStyle(0xffd700);
        g.fillRect(4, 16, 24, 12);
        g.fillTriangle(4, 16, 8, 4, 12, 16);
        g.fillTriangle(12, 16, 16, 0, 20, 16);
        g.fillTriangle(20, 16, 24, 4, 28, 16);
        g.fillStyle(0xff1744);
        g.fillCircle(8, 10, 2);
        g.fillStyle(0x2196f3);
        g.fillCircle(16, 6, 2);
        g.fillStyle(0x4caf50);
        g.fillCircle(24, 10, 2);
        g.generateTexture('crown', 32, 28);
        g.destroy();

        // Costume chest
        g = this.scene.make.graphics({ add: false });
        g.fillStyle(0x9c27b0);
        g.fillRoundedRect(0, 8, 40, 24, 4);
        g.fillStyle(0xba68c8);
        g.fillRoundedRect(0, 0, 40, 18, { tl: 6, tr: 6, bl: 0, br: 0 });
        g.fillStyle(0xffd700);
        g.fillRect(0, 16, 40, 4);
        g.fillRoundedRect(14, 12, 12, 10, 3);
        g.fillStyle(0xffeb3b);
        g.fillCircle(20, 17, 4);
        g.generateTexture('costume_chest', 40, 32);
        g.destroy();

        // Halloween pumpkin collectible
        g = this.scene.make.graphics({ add: false });
        g.fillStyle(0xff8f00);
        g.fillEllipse(10, 12, 16, 16);
        g.fillStyle(0xf57f17);
        g.fillEllipse(10, 12, 10, 14);
        g.fillStyle(0x33691e);
        g.fillRect(8, 2, 4, 5);
        g.fillStyle(0xffd700, 0.8);
        g.fillTriangle(5, 9, 7, 6, 9, 9);
        g.fillTriangle(11, 9, 13, 6, 15, 9);
        g.beginPath();
        g.arc(10, 14, 4, 0, Math.PI);
        g.fillPath();
        g.generateTexture('halloween_pumpkin', 20, 22);
        g.destroy();

        // Halloween ghost collectible
        g = this.scene.make.graphics({ add: false });
        g.fillStyle(0xffffff, 0.9);
        g.fillCircle(10, 8, 8);
        g.fillRect(2, 8, 16, 12);
        g.fillCircle(5, 20, 3);
        g.fillCircle(10, 18, 3);
        g.fillCircle(15, 20, 3);
        g.fillStyle(0x1a1a1a);
        g.fillCircle(7, 7, 2);
        g.fillCircle(13, 7, 2);
        g.fillEllipse(10, 12, 4, 3);
        g.generateTexture('halloween_ghost', 20, 24);
        g.destroy();

        // Halloween candy collectible
        g = this.scene.make.graphics({ add: false });
        g.fillStyle(0xff6b6b);
        g.fillCircle(10, 10, 6);
        g.fillStyle(0xffffff);
        g.fillRect(7, 8, 2, 4);
        g.fillRect(11, 8, 2, 4);
        g.fillStyle(0xff6b6b);
        g.fillTriangle(3, 10, 0, 6, 0, 14);
        g.fillTriangle(17, 10, 20, 6, 20, 14);
        g.generateTexture('halloween_candy', 20, 20);
        g.destroy();
    }
}
