class HalloweenPalaceScene extends Phaser.Scene {
    constructor() {
        super({ key: 'HalloweenPalaceScene' });
    }

    create() {
        const w = this.cameras.main.width;
        const h = this.cameras.main.height;
        this.cameras.main.fadeIn(500);

        this.challengeCount = 0;
        this.maxChallenges = 3;

        // Spooky background
        const bg = this.add.graphics();
        bg.fillStyle(0x1a0a2e);
        bg.fillRect(0, 0, w, h);
        bg.fillStyle(0x2d1b4e, 0.6);
        bg.fillRect(0, 0, w, h / 2);

        // Moon
        bg.fillStyle(0xfff9c4, 0.8);
        bg.fillCircle(w - 150, 120, 60);
        bg.fillStyle(0x1a0a2e, 0.8);
        bg.fillCircle(w - 130, 110, 55);

        // Stars
        for (let i = 0; i < 30; i++) {
            bg.fillStyle(0xffffff, Math.random() * 0.5 + 0.2);
            bg.fillCircle(Math.random() * w, Math.random() * h * 0.4, Math.random() * 2 + 0.5);
        }

        // Palace silhouette
        bg.fillStyle(0x0d0518);
        bg.fillRect(w / 2 - 200, 200, 400, 400);
        bg.fillRect(w / 2 - 240, 150, 80, 450);
        bg.fillRect(w / 2 + 160, 150, 80, 450);
        bg.fillTriangle(w / 2 - 240, 150, w / 2 - 200, 80, w / 2 - 160, 150);
        bg.fillTriangle(w / 2 + 160, 150, w / 2 + 200, 80, w / 2 + 240, 150);
        bg.fillRect(w / 2 - 50, 100, 100, 500);
        bg.fillTriangle(w / 2 - 50, 100, w / 2, 40, w / 2 + 50, 100);

        // Windows (glowing)
        bg.fillStyle(0xffa000, 0.6);
        bg.fillRect(w / 2 - 30, 140, 20, 30);
        bg.fillRect(w / 2 + 10, 140, 20, 30);
        bg.fillRect(w / 2 - 220, 200, 15, 20);
        bg.fillRect(w / 2 + 205, 200, 15, 20);
        for (let row = 0; row < 3; row++) {
            for (let col = 0; col < 4; col++) {
                bg.fillStyle(0xffa000, 0.4 + Math.random() * 0.3);
                bg.fillRect(w / 2 - 160 + col * 90, 250 + row * 80, 20, 30);
            }
        }

        // Door
        bg.fillStyle(0x4a148c);
        bg.fillRoundedRect(w / 2 - 40, 480, 80, 120, { tl: 40, tr: 40, bl: 0, br: 0 });
        bg.fillStyle(0xffd700);
        bg.fillCircle(w / 2 + 20, 540, 4);

        // Pumpkins
        const pumpkinPositions = [
            [w / 2 - 280, 560], [w / 2 - 180, 580], [w / 2 + 180, 570], [w / 2 + 260, 560],
            [w / 2 - 100, 590], [w / 2 + 80, 585],
        ];
        pumpkinPositions.forEach(([px, py]) => {
            bg.fillStyle(0xff8f00);
            bg.fillEllipse(px, py, 24, 20);
            bg.fillStyle(0xf57f17);
            bg.fillEllipse(px, py, 16, 18);
            bg.fillStyle(0x33691e);
            bg.fillRect(px - 2, py - 12, 4, 6);
            bg.fillStyle(0xffd700, 0.8);
            bg.fillTriangle(px - 5, py - 4, px - 2, py - 8, px + 1, py - 4);
            bg.fillTriangle(px + 5, py - 4, px + 2, py - 8, px - 1, py - 4);
            bg.beginPath();
            bg.arc(px, py + 2, 5, 0, Math.PI);
            bg.fillPath();
        });

        // Bats
        for (let i = 0; i < 6; i++) {
            const bat = this.add.graphics();
            const bx = 100 + Math.random() * (w - 200);
            const by = 50 + Math.random() * 200;
            bat.fillStyle(0x1a1a1a);
            bat.fillTriangle(bx - 8, by, bx, by - 4, bx - 2, by + 2);
            bat.fillTriangle(bx + 8, by, bx, by - 4, bx + 2, by + 2);
            bat.fillCircle(bx, by, 3);
            this.tweens.add({
                targets: bat,
                x: (Math.random() - 0.5) * 100,
                y: (Math.random() - 0.5) * 40,
                duration: 2000 + Math.random() * 2000,
                yoyo: true, repeat: -1, ease: 'Sine.easeInOut',
            });
        }

        // Weblord
        const weblord = this.add.image(w / 2, 440, 'weblord').setScale(2.5);
        this.tweens.add({
            targets: weblord, y: 435, duration: 1500,
            yoyo: true, repeat: -1, ease: 'Sine.easeInOut',
        });

        // Title
        this.add.text(w / 2, 30, "The Weblord's Halloween Palace", {
            fontFamily: 'Arial, sans-serif', fontSize: '32px', fontStyle: 'bold',
            color: '#ff8f00', stroke: '#1a0a2e', strokeThickness: 6,
        }).setOrigin(0.5);

        // Challenge counter
        this.challengeText = this.add.text(w / 2, 65, 'Challenges: 0 / 3', {
            fontFamily: 'Arial, sans-serif', fontSize: '20px', color: '#b39ddb',
        }).setOrigin(0.5);

        // Dialog system
        this.dialogSystem = new DialogSystem(this);
        this.dialogSystem.create();

        // Back button
        const backBtn = this.add.container(70, 30);
        const backBg = this.add.graphics();
        backBg.fillStyle(0x0d0d1e, 0.9);
        backBg.fillRoundedRect(-45, -16, 90, 32, 8);
        backBg.lineStyle(2, 0x7c4dff);
        backBg.strokeRoundedRect(-45, -16, 90, 32, 8);
        backBtn.add(backBg);
        backBtn.add(this.add.text(0, 0, '< Map', {
            fontFamily: 'Arial, sans-serif', fontSize: '16px', fontStyle: 'bold', color: '#b39ddb',
        }).setOrigin(0.5));
        const backHit = this.add.rectangle(70, 30, 90, 32, 0x000000, 0).setInteractive({ useHandCursor: true });
        backHit.on('pointerdown', () => {
            this.cameras.main.fadeOut(300);
            this.cameras.main.once('camerafadeoutcomplete', () => this.scene.start('WorldMapScene'));
        });

        // Keyboard
        this.input.keyboard.on('keydown-SPACE', () => {
            if (this.dialogSystem.isActive()) this.dialogSystem.advance();
        });
        this.input.keyboard.on('keydown-ENTER', () => {
            if (this.dialogSystem.isActive()) this.dialogSystem.advance();
        });

        // Start encounter
        if (progressTracker.isHalloweenPalaceCompleted()) {
            this.dialogSystem.show('The Weblord',
                "You already beat my Halloween challenges! Go enjoy your crown, you... you MATH CHAMPION! *grumbles adorably*");
        } else {
            this.startEncounter();
        }
    }

    startEncounter() {
        this.dialogSystem.show('The Weblord',
            "MWAHAHAHA! Welcome to my HALLOWEEN PALACE! I've been practicing my SPOOKIEST math problems! Are you scared yet? ...No? Fine. Let's do this!",
            () => {
                this.dialogSystem.show('The Weblord',
                    "I have THREE tricky challenges for you! They're harder than before! I tested them on my pet spider and even HE couldn't solve them! ...He's a spider though, so that's not saying much.",
                    () => {
                        this.launchChallenge();
                    }
                );
            }
        );
    }

    launchChallenge() {
        const taunts = [
            "Challenge ONE! I call this one 'The Brain Bender'! It took me ALL DAY to make! Ready? HERE IT COMES!",
            "WHAT?! You got it?! Okay... Challenge TWO! This one's called 'The Mind Melter'! My mom helped me make it! She's SCARY good at math!",
            "IMPOSSIBLE!! Fine! Challenge THREE! My ULTIMATE creation! I call it 'The Final Fright'! I'm sweating! Are YOU sweating?!",
        ];

        this.dialogSystem.show('The Weblord', taunts[this.challengeCount], () => {
            mathGenerator.difficulty = 2;

            this.scene.launch('MathChallengeScene', {
                mode: 'single',
                land: 'halloween',
                npcId: `halloween_challenge_${this.challengeCount}`,
                npcName: 'The Weblord',
                mathType: 'halloween',
                onComplete: (success) => {
                    if (success) {
                        this.challengeCount++;
                        this.challengeText.setText(`Challenges: ${this.challengeCount} / ${this.maxChallenges}`);

                        if (this.challengeCount >= this.maxChallenges) {
                            this.onAllChallengesComplete();
                        } else {
                            const reactions = [
                                "NOOOO! How did you solve that?! It was SO hard! *stamps feet* Okay fine, next one!",
                                "AGAIN?! You're like a MATH MACHINE! But this next one will DEFINITELY get you!",
                            ];
                            this.dialogSystem.show('The Weblord', reactions[this.challengeCount - 1], () => {
                                this.launchChallenge();
                            });
                        }
                    }
                },
            });
        });
    }

    onAllChallengesComplete() {
        mathGenerator.difficulty = 1;
        progressTracker.setHalloweenPalaceCompleted();

        this.dialogSystem.show('The Weblord',
            "I... I can't believe it! You solved ALL THREE! You're officially the SMARTEST ninja in ALL the islands!",
            () => {
                this.dialogSystem.show('The Weblord',
                    "You know what? This calls for a DANCE PARTY! I've got the music ready! Everyone's invited! Even the spiders! LET'S GOOOOO!",
                    () => {
                        this.cameras.main.fadeOut(500);
                        this.cameras.main.once('camerafadeoutcomplete', () => {
                            this.scene.start('DancePartyScene', { nextScene: 'ThroneRoomScene' });
                        });
                    }
                );
            }
        );
    }
}
