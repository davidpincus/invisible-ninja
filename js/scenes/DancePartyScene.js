class DancePartyScene extends Phaser.Scene {
    constructor() {
        super({ key: 'DancePartyScene' });
    }

    init(data) {
        this.nextScene = data.nextScene || 'WorldMapScene';
    }

    create() {
        const w = this.cameras.main.width;
        const h = this.cameras.main.height;
        this.cameras.main.fadeIn(500);

        // Disco background
        this.bg = this.add.graphics();
        this.drawDiscoFloor(this.bg, w, h);

        // Disco ball
        const discoBall = this.add.graphics();
        discoBall.lineStyle(2, 0x888888);
        discoBall.lineBetween(w / 2, 0, w / 2, 50);
        discoBall.fillStyle(0xc0c0c0);
        discoBall.fillCircle(w / 2, 80, 30);
        for (let i = 0; i < 12; i++) {
            const angle = (i / 12) * Math.PI * 2;
            discoBall.fillStyle(i % 2 === 0 ? 0xffffff : 0xe0e0e0, 0.8);
            discoBall.fillRect(
                w / 2 + Math.cos(angle) * 15 - 4,
                80 + Math.sin(angle) * 15 - 4, 8, 8
            );
        }
        this.tweens.add({
            targets: discoBall, rotation: 0.1,
            duration: 2000, yoyo: true, repeat: -1, ease: 'Sine.easeInOut',
        });

        // Title
        this.titleText = this.add.text(w / 2, 30, 'DANCE PARTY!', {
            fontFamily: 'Arial, sans-serif', fontSize: '48px', fontStyle: 'bold',
            color: '#ffd700', stroke: '#1a0a2e', strokeThickness: 6,
        }).setOrigin(0.5).setDepth(20);

        // Animated rainbow title
        this.time.addEvent({
            delay: 300, loop: true,
            callback: () => {
                const colors = ['#ff6b6b', '#ffd700', '#66bb6a', '#42a5f5', '#ce93d8', '#ff8a65'];
                this.titleText.setColor(colors[Math.floor(Math.random() * colors.length)]);
            },
        });

        // Dancing characters
        const dancerConfigs = [
            { x: w / 2, y: h / 2 + 50, texture: 'axolotl_stand', scale: 2.5 },
            { x: w / 2 - 200, y: h / 2 + 80, texture: 'weblord', scale: 1.5 },
            { x: w / 2 + 200, y: h / 2 + 80, texture: 'npc_turtle', scale: 2 },
            { x: w / 2 - 350, y: h / 2 + 100, texture: 'npc_frog', scale: 2 },
            { x: w / 2 + 350, y: h / 2 + 100, texture: 'npc_penguin', scale: 2 },
            { x: w / 2 - 120, y: h / 2 + 120, texture: 'npc_elf', scale: 2 },
            { x: w / 2 + 120, y: h / 2 + 120, texture: 'npc_turkey', scale: 2 },
        ];

        dancerConfigs.forEach((config, i) => {
            const dancer = this.add.image(config.x, config.y, config.texture)
                .setScale(config.scale).setDepth(10);
            this.tweens.add({
                targets: dancer, y: config.y - 20,
                duration: 300 + (i % 3) * 100,
                yoyo: true, repeat: -1, ease: 'Sine.easeInOut', delay: i * 100,
            });
            this.tweens.add({
                targets: dancer, x: config.x + 15,
                duration: 600 + (i % 2) * 200,
                yoyo: true, repeat: -1, ease: 'Sine.easeInOut', delay: i * 150,
            });
            this.tweens.add({
                targets: dancer, angle: 5,
                duration: 400 + (i % 3) * 100,
                yoyo: true, repeat: -1, ease: 'Sine.easeInOut', delay: i * 50,
            });
        });

        // Disco lights
        this.time.addEvent({
            delay: 150, loop: true,
            callback: () => {
                const colors = [0xff6b6b, 0xffd700, 0x66bb6a, 0x42a5f5, 0xce93d8, 0xff8a65, 0xff69b4, 0x00bcd4];
                for (let i = 0; i < 3; i++) {
                    const light = this.add.graphics();
                    light.fillStyle(colors[Math.floor(Math.random() * colors.length)], 0.3);
                    light.fillCircle(Math.random() * w, Math.random() * h, 40 + Math.random() * 60);
                    light.setDepth(1);
                    this.tweens.add({
                        targets: light, alpha: 0, duration: 500,
                        onComplete: () => light.destroy(),
                    });
                }
            },
        });

        // Confetti
        this.time.addEvent({
            delay: 100, loop: true,
            callback: () => {
                const sparkle = this.add.image(Math.random() * w, -10, 'sparkle')
                    .setScale(0.5 + Math.random()).setDepth(20)
                    .setTint([0xff6b6b, 0xffd700, 0x66bb6a, 0x42a5f5, 0xce93d8][Math.floor(Math.random() * 5)]);
                this.tweens.add({
                    targets: sparkle,
                    y: h + 20, x: sparkle.x + (Math.random() - 0.5) * 200,
                    rotation: Math.random() * 6, alpha: 0,
                    duration: 2000 + Math.random() * 1000,
                    onComplete: () => sparkle.destroy(),
                });
            },
        });

        // Floor color change
        this.time.addEvent({
            delay: 500, loop: true,
            callback: () => {
                this.bg.clear();
                this.drawDiscoFloor(this.bg, w, h);
            },
        });

        // Start music
        this.startMusic();

        // Continue button after 8 seconds
        this.time.delayedCall(8000, () => {
            const continueBtn = this.add.container(w / 2, h - 50).setDepth(100);
            const btnBg = this.add.image(0, 0, 'button_green').setScale(1.3, 1);
            const btnText = this.add.text(0, -2, 'Continue!', {
                fontFamily: 'Arial, sans-serif', fontSize: '24px', fontStyle: 'bold', color: '#ffffff',
            }).setOrigin(0.5);
            continueBtn.add([btnBg, btnText]);
            btnBg.setInteractive({ useHandCursor: true });
            continueBtn.setScale(0);
            this.tweens.add({ targets: continueBtn, scale: 1, duration: 300, ease: 'Back.easeOut' });
            btnBg.on('pointerdown', () => {
                this.stopMusic();
                this.cameras.main.fadeOut(500);
                this.cameras.main.once('camerafadeoutcomplete', () => {
                    this.scene.start(this.nextScene);
                });
            });
        });
    }

    drawDiscoFloor(g, w, h) {
        g.fillStyle(0x0d0d1e);
        g.fillRect(0, 0, w, h);
        const tileSize = 64;
        const brightColors = [0xc62828, 0x1565c0, 0x2e7d32, 0xf9a825, 0x6a1b9a, 0x00838f];
        for (let x = 0; x < w; x += tileSize) {
            for (let y = h / 3; y < h; y += tileSize) {
                const isLit = Math.random() < 0.15;
                if (isLit) {
                    g.fillStyle(brightColors[Math.floor(Math.random() * brightColors.length)], 0.4);
                } else {
                    g.fillStyle(((x / tileSize + y / tileSize) % 2 === 0) ? 0x1a0a3e : 0x2a1a5e, 0.5);
                }
                g.fillRect(x, y, tileSize - 1, tileSize - 1);
            }
        }
    }

    startMusic() {
        try {
            this.audioCtx = new (window.AudioContext || window.webkitAudioContext)();
            this.musicPlaying = true;
            this.playBeat();
        } catch (e) { /* Audio not available */ }
    }

    playBeat() {
        if (!this.musicPlaying || !this.audioCtx) return;
        const tempo = 140;
        const beatDuration = 60 / tempo;
        const now = this.audioCtx.currentTime;

        for (let i = 0; i < 8; i++) {
            const time = now + i * beatDuration;
            if (i % 2 === 0) this.playDrum(time, 80, 0.1);
            this.playHiHat(time, 0.03);
            if (i === 2 || i === 6) this.playDrum(time, 200, 0.06);
            const melodyNotes = [523, 659, 784, 1047, 784, 659, 523, 440];
            this.playNote(time, melodyNotes[i], beatDuration * 0.8, 0.08, 'triangle');
            const bassNotes = [131, 131, 165, 165, 131, 131, 196, 165];
            this.playNote(time, bassNotes[i], beatDuration * 0.9, 0.1, 'square');
        }

        this.musicTimeout = setTimeout(() => this.playBeat(), 8 * beatDuration * 1000 - 50);
    }

    playNote(time, freq, duration, volume, type) {
        if (!this.audioCtx) return;
        const osc = this.audioCtx.createOscillator();
        const gain = this.audioCtx.createGain();
        osc.type = type || 'triangle';
        osc.frequency.value = freq;
        gain.gain.setValueAtTime(volume, time);
        gain.gain.exponentialRampToValueAtTime(0.001, time + duration);
        osc.connect(gain);
        gain.connect(this.audioCtx.destination);
        osc.start(time);
        osc.stop(time + duration);
    }

    playDrum(time, freq, volume) {
        if (!this.audioCtx) return;
        const osc = this.audioCtx.createOscillator();
        const gain = this.audioCtx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, time);
        osc.frequency.exponentialRampToValueAtTime(30, time + 0.1);
        gain.gain.setValueAtTime(volume, time);
        gain.gain.exponentialRampToValueAtTime(0.001, time + 0.15);
        osc.connect(gain);
        gain.connect(this.audioCtx.destination);
        osc.start(time);
        osc.stop(time + 0.15);
    }

    playHiHat(time, volume) {
        if (!this.audioCtx) return;
        const osc = this.audioCtx.createOscillator();
        const gain = this.audioCtx.createGain();
        osc.type = 'square';
        osc.frequency.value = 8000 + Math.random() * 2000;
        gain.gain.setValueAtTime(volume, time);
        gain.gain.exponentialRampToValueAtTime(0.001, time + 0.05);
        osc.connect(gain);
        gain.connect(this.audioCtx.destination);
        osc.start(time);
        osc.stop(time + 0.05);
    }

    stopMusic() {
        this.musicPlaying = false;
        if (this.musicTimeout) clearTimeout(this.musicTimeout);
        if (this.audioCtx) {
            this.audioCtx.close().catch(() => {});
            this.audioCtx = null;
        }
    }

    shutdown() {
        this.stopMusic();
    }
}
