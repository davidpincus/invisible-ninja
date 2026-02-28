class VictoryScene extends Phaser.Scene {
    constructor() {
        super({ key: 'VictoryScene' });
    }

    create() {
        const w = this.cameras.main.width;
        const h = this.cameras.main.height;
        this.cameras.main.fadeIn(500);

        // Background
        const bg = this.add.graphics();
        bg.fillStyle(0x0d0d1e);
        bg.fillRect(0, 0, w, h);

        // Dancing characters - ALL of them!
        const dancerTextures = [
            'axolotl_stand', 'weblord', 'npc_turtle', 'npc_lion',
            'npc_elf', 'npc_turkey', 'npc_frog', 'npc_penguin',
            'npc_cat', 'npc_fox', 'npc_dolphin', 'npc_rabbit',
        ];

        dancerTextures.forEach((tex, i) => {
            const dx = 80 + (i % 6) * 150;
            const dy = h / 2 - 50 + Math.floor(i / 6) * 100;
            const dancer = this.add.image(dx, dy, tex).setScale(1.8).setDepth(5);
            this.tweens.add({
                targets: dancer, y: dy - 15,
                duration: 200 + (i % 4) * 100,
                yoyo: true, repeat: -1, ease: 'Sine.easeInOut', delay: i * 80,
            });
            this.tweens.add({
                targets: dancer, angle: 8,
                duration: 300 + (i % 3) * 100,
                yoyo: true, repeat: -1, ease: 'Sine.easeInOut', delay: i * 60,
            });
        });

        // Confetti
        this.time.addEvent({
            delay: 50, loop: true,
            callback: () => {
                const sparkle = this.add.image(Math.random() * w, -10, 'sparkle')
                    .setScale(0.3 + Math.random() * 0.7).setDepth(15)
                    .setTint([0xff6b6b, 0xffd700, 0x66bb6a, 0x42a5f5, 0xce93d8, 0xff8a65][Math.floor(Math.random() * 6)]);
                this.tweens.add({
                    targets: sparkle,
                    y: h + 20, x: sparkle.x + (Math.random() - 0.5) * 150,
                    rotation: Math.random() * 8, alpha: 0,
                    duration: 2000 + Math.random() * 1500,
                    onComplete: () => sparkle.destroy(),
                });
            },
        });

        // Disco lights
        this.time.addEvent({
            delay: 200, loop: true,
            callback: () => {
                const light = this.add.graphics();
                light.fillStyle([0xff6b6b, 0xffd700, 0x66bb6a, 0x42a5f5, 0xce93d8][Math.floor(Math.random() * 5)], 0.2);
                light.fillCircle(Math.random() * w, Math.random() * h, 50 + Math.random() * 80);
                light.setDepth(1);
                this.tweens.add({
                    targets: light, alpha: 0, duration: 400,
                    onComplete: () => light.destroy(),
                });
            },
        });

        // Title
        this.add.text(w / 2, 40, 'GRAND FINALE!', {
            fontFamily: 'Arial, sans-serif', fontSize: '44px', fontStyle: 'bold',
            color: '#ffd700', stroke: '#1a0a2e', strokeThickness: 6,
        }).setOrigin(0.5).setDepth(20);

        // Music
        this.startMusic();

        // After 10 seconds, close the curtain
        this.time.delayedCall(10000, () => this.closeCurtain());
    }

    startMusic() {
        try {
            this.audioCtx = new (window.AudioContext || window.webkitAudioContext)();
            this.musicPlaying = true;
            this.playFinalBeat();
        } catch (e) { /* Audio not available */ }
    }

    playFinalBeat() {
        if (!this.musicPlaying || !this.audioCtx) return;
        const tempo = 150;
        const beatDuration = 60 / tempo;
        const now = this.audioCtx.currentTime;

        for (let i = 0; i < 8; i++) {
            const time = now + i * beatDuration;

            // Bass drum
            if (i % 2 === 0) {
                const osc = this.audioCtx.createOscillator();
                const gain = this.audioCtx.createGain();
                osc.type = 'sine';
                osc.frequency.setValueAtTime(80, time);
                osc.frequency.exponentialRampToValueAtTime(30, time + 0.1);
                gain.gain.setValueAtTime(0.12, time);
                gain.gain.exponentialRampToValueAtTime(0.001, time + 0.15);
                osc.connect(gain);
                gain.connect(this.audioCtx.destination);
                osc.start(time);
                osc.stop(time + 0.15);
            }

            // Hi-hat
            const hat = this.audioCtx.createOscillator();
            const hatGain = this.audioCtx.createGain();
            hat.type = 'square';
            hat.frequency.value = 9000;
            hatGain.gain.setValueAtTime(0.03, time);
            hatGain.gain.exponentialRampToValueAtTime(0.001, time + 0.04);
            hat.connect(hatGain);
            hatGain.connect(this.audioCtx.destination);
            hat.start(time);
            hat.stop(time + 0.04);

            // Celebratory melody
            const melodyNotes = [659, 784, 880, 1047, 880, 784, 659, 784];
            const mel = this.audioCtx.createOscillator();
            const melGain = this.audioCtx.createGain();
            mel.type = 'triangle';
            mel.frequency.value = melodyNotes[i];
            melGain.gain.setValueAtTime(0.07, time);
            melGain.gain.exponentialRampToValueAtTime(0.001, time + beatDuration * 0.8);
            mel.connect(melGain);
            melGain.connect(this.audioCtx.destination);
            mel.start(time);
            mel.stop(time + beatDuration * 0.8);
        }

        this.musicTimeout = setTimeout(() => this.playFinalBeat(), 8 * beatDuration * 1000 - 50);
    }

    closeCurtain() {
        this.stopMusic();
        const w = this.cameras.main.width;
        const h = this.cameras.main.height;

        // Left curtain
        const leftCurtain = this.add.graphics();
        leftCurtain.fillStyle(0x8b0000);
        leftCurtain.fillRect(0, 0, w / 2 + 10, h);
        leftCurtain.fillStyle(0xb71c1c, 0.3);
        for (let i = 0; i < 8; i++) {
            leftCurtain.fillRect(i * (w / 16), 0, w / 32, h);
        }
        leftCurtain.setDepth(50);
        leftCurtain.x = -w / 2 - 10;

        // Right curtain
        const rightCurtain = this.add.graphics();
        rightCurtain.fillStyle(0x8b0000);
        rightCurtain.fillRect(0, 0, w / 2 + 10, h);
        rightCurtain.fillStyle(0xb71c1c, 0.3);
        for (let i = 0; i < 8; i++) {
            rightCurtain.fillRect(i * (w / 16), 0, w / 32, h);
        }
        rightCurtain.setDepth(50);
        rightCurtain.x = w;

        // Gold trim at top
        const topTrim = this.add.graphics();
        topTrim.fillStyle(0xffd700);
        topTrim.fillRect(0, 0, w, 30);
        topTrim.fillStyle(0xffb300);
        for (let x = 0; x < w; x += 40) {
            topTrim.fillTriangle(x, 30, x + 20, 50, x + 40, 30);
        }
        topTrim.setDepth(55).setAlpha(0);

        // Animate curtains closing
        this.tweens.add({ targets: leftCurtain, x: 0, duration: 2000, ease: 'Sine.easeInOut' });
        this.tweens.add({ targets: rightCurtain, x: w / 2, duration: 2000, ease: 'Sine.easeInOut' });
        this.tweens.add({ targets: topTrim, alpha: 1, duration: 500, delay: 1800 });

        // "The End" text
        this.time.delayedCall(2500, () => {
            const endText = this.add.text(w / 2, h / 2 - 50, 'The End', {
                fontFamily: 'Georgia, serif', fontSize: '72px', fontStyle: 'italic bold',
                color: '#ffd700', stroke: '#1a0a2e', strokeThickness: 8,
            }).setOrigin(0.5).setDepth(60).setAlpha(0);
            this.tweens.add({ targets: endText, alpha: 1, duration: 1000 });

            const subText = this.add.text(w / 2, h / 2 + 30, 'An Axolotl Adventure for Madeline', {
                fontFamily: 'Arial, sans-serif', fontSize: '22px',
                color: '#b39ddb', fontStyle: 'italic',
            }).setOrigin(0.5).setDepth(60).setAlpha(0);
            this.tweens.add({ targets: subText, alpha: 1, duration: 1000, delay: 500 });

            const starText = this.add.text(w / 2, h / 2 + 70, 'You are the Ultimate Invisible Ninja!', {
                fontFamily: 'Arial, sans-serif', fontSize: '18px', color: '#ffd700',
            }).setOrigin(0.5).setDepth(60).setAlpha(0);
            this.tweens.add({ targets: starText, alpha: 1, duration: 1000, delay: 1000 });

            progressTracker.setFinalVictory();

            // Play again button
            this.time.delayedCall(3000, () => {
                const playBtn = this.add.container(w / 2, h / 2 + 140).setDepth(60);
                const btnBg = this.add.image(0, 0, 'button_blue').setScale(1.3, 1);
                const btnText = this.add.text(0, -2, 'Play Again!', {
                    fontFamily: 'Arial, sans-serif', fontSize: '24px', fontStyle: 'bold', color: '#ffffff',
                }).setOrigin(0.5);
                playBtn.add([btnBg, btnText]);
                btnBg.setInteractive({ useHandCursor: true });
                playBtn.setScale(0);
                this.tweens.add({ targets: playBtn, scale: 1, duration: 300, ease: 'Back.easeOut' });
                btnBg.on('pointerdown', () => {
                    this.cameras.main.fadeOut(500);
                    this.cameras.main.once('camerafadeoutcomplete', () => {
                        this.scene.start('TitleScene');
                    });
                });
            });
        });
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
