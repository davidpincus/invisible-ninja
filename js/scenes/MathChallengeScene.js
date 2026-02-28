class MathChallengeScene extends Phaser.Scene {
    constructor() {
        super({ key: 'MathChallengeScene' });
    }

    init(data) {
        this.mode = data.mode || 'single'; // 'single', 'spider', or 'boss'
        this.land = data.land || 'easter';
        this.npcId = data.npcId;
        this.npcName = data.npcName || '';
        this.mathType = data.mathType || 'easter';
        this.onCompleteCallback = data.onComplete;
        this.bossRound = 0;
        this.bossMaxRounds = this.mode === 'boss' ? 5 : 1;
        this.spiderId = data.spiderId || null;
    }

    create() {
        const w = this.cameras.main.width;
        const h = this.cameras.main.height;

        // Ensure this scene renders on top and captures all input
        this.scene.bringToTop();

        // Semi-transparent overlay - blocks input to scenes below
        this.overlay = this.add.rectangle(w / 2, h / 2, w, h, 0x000000, 0.7)
            .setDepth(0)
            .setInteractive();

        // Challenge container
        this.container = this.add.container(w / 2, h / 2).setDepth(1);

        // Card background - ninja purple theme
        const cardBg = this.add.graphics();
        cardBg.fillStyle(0x0d0d1e, 0.95);
        cardBg.fillRoundedRect(-380, -280, 760, 560, 20);
        cardBg.lineStyle(3, 0x7c4dff);
        cardBg.strokeRoundedRect(-380, -280, 760, 560, 20);
        this.container.add(cardBg);

        // Top decoration
        const topDeco = this.add.graphics();
        topDeco.fillStyle(0x2a1a4e, 0.7);
        topDeco.fillRoundedRect(-380, -280, 760, 60, { tl: 20, tr: 20, bl: 0, br: 0 });
        this.container.add(topDeco);

        // Title based on mode
        let titleText = 'Math Challenge!';
        if (this.mode === 'spider') titleText = 'Spider Challenge!';
        if (this.mode === 'boss') titleText = "The Weblord's Challenge!";

        this.titleObj = this.add.text(0, -256, titleText, {
            fontFamily: 'Arial, sans-serif',
            fontSize: '28px',
            fontStyle: 'bold',
            color: '#b39ddb',
        }).setOrigin(0.5);
        this.container.add(this.titleObj);

        // Star decorations
        this.container.add(this.add.image(-340, -256, 'star').setScale(0.6));
        this.container.add(this.add.image(340, -256, 'star').setScale(0.6));

        // Question text
        this.questionText = this.add.text(0, -130, '', {
            fontFamily: 'Arial, sans-serif',
            fontSize: '30px',
            fontStyle: 'bold',
            color: '#ffffff',
            align: 'center',
            wordWrap: { width: 680, useAdvancedWrap: true },
            lineSpacing: 8,
        }).setOrigin(0.5);
        this.container.add(this.questionText);

        // Choice buttons (2x2 grid)
        this.choiceButtons = [];
        this.choiceTexts = [];
        const btnColors = ['button_blue', 'button_green', 'button_orange', 'button_red'];
        const positions = [
            [-170, 40], [170, 40],
            [-170, 130], [170, 130],
        ];

        positions.forEach((pos, i) => {
            const btn = this.add.image(pos[0], pos[1], btnColors[i]).setScale(1.5, 1.3);
            btn.setInteractive({ useHandCursor: true });
            this.container.add(btn);
            this.choiceButtons.push(btn);

            const txt = this.add.text(pos[0], pos[1] - 4, '', {
                fontFamily: 'Arial, sans-serif',
                fontSize: '28px',
                fontStyle: 'bold',
                color: '#ffffff',
            }).setOrigin(0.5);
            this.container.add(txt);
            this.choiceTexts.push(txt);

            btn.on('pointerover', () => btn.setScale(1.6, 1.4));
            btn.on('pointerout', () => btn.setScale(1.5, 1.3));
            btn.on('pointerdown', () => this.selectAnswer(i));
        });

        // Feedback text
        this.feedbackText = this.add.text(0, 210, '', {
            fontFamily: 'Arial, sans-serif',
            fontSize: '32px',
            fontStyle: 'bold',
            color: '#ffffff',
            align: 'center',
        }).setOrigin(0.5).setVisible(false);
        this.container.add(this.feedbackText);

        // Close / Continue button
        this.continueBtn = this.add.image(0, 250, 'button_green').setScale(1.2, 1)
            .setInteractive({ useHandCursor: true }).setVisible(false);
        this.container.add(this.continueBtn);
        this.continueText = this.add.text(0, 248, '', {
            fontFamily: 'Arial, sans-serif',
            fontSize: '22px',
            fontStyle: 'bold',
            color: '#ffffff',
        }).setOrigin(0.5).setVisible(false);
        this.container.add(this.continueText);

        // Boss round messages
        this.bossMessages = [
            "Ha! You think you can out-math ME?",
            "Not bad, little ninja... but try THIS!",
            "Grrrr! Lucky guess! Here's a harder one!",
            "IMPOSSIBLE! No one gets this many right!",
            "This is my ULTIMATE challenge!!",
        ];

        // Animate in
        this.container.setScale(0.5).setAlpha(0);
        this.tweens.add({
            targets: this.container,
            scale: 1,
            alpha: 1,
            duration: 400,
            ease: 'Back.easeOut',
        });

        // Generate first problem
        this.showProblem();
    }

    showProblem() {
        this.currentProblem = mathGenerator.generate(null, this.land);
        this.questionText.setText(this.currentProblem.question);

        // Set choices
        this.currentProblem.choices.forEach((choice, i) => {
            this.choiceTexts[i].setText(String(choice));
            this.choiceButtons[i].setVisible(true).setAlpha(1);
            this.choiceTexts[i].setVisible(true).setAlpha(1);
            this.choiceButtons[i].setInteractive();
        });

        this.feedbackText.setVisible(false);
        this.continueBtn.setVisible(false);
        this.continueText.setVisible(false);

        if (this.mode === 'boss') {
            this.titleObj.setText(`The Weblord - Round ${this.bossRound + 1}/${this.bossMaxRounds}`);
            // Show boss taunt
            if (this.bossMessages[this.bossRound]) {
                this.feedbackText.setText(this.bossMessages[this.bossRound]);
                this.feedbackText.setColor('#ff9999');
                this.feedbackText.setVisible(true);
                this.time.delayedCall(1500, () => {
                    this.feedbackText.setVisible(false);
                });
            }
        } else if (this.mode === 'spider') {
            this.titleObj.setText('Defeat the Spider!');
        }
    }

    selectAnswer(index) {
        const selected = this.currentProblem.choices[index];
        const correct = selected === this.currentProblem.answer;

        // Disable all buttons
        this.choiceButtons.forEach(btn => btn.disableInteractive());

        if (correct) {
            this.showCorrect(index);
        } else {
            this.showWrong(index);
        }
    }

    showCorrect(index) {
        // Flash the correct button
        this.tweens.add({
            targets: this.choiceButtons[index],
            scale: 1.7,
            duration: 200,
            yoyo: true,
        });

        this.feedbackText.setText('Correct! Great job, ninja!');
        this.feedbackText.setColor('#b39ddb');
        this.feedbackText.setVisible(true);

        // Sparkle burst
        for (let i = 0; i < 12; i++) {
            const sparkle = this.add.image(
                this.cameras.main.width / 2 + (Math.random() - 0.5) * 400,
                this.cameras.main.height / 2 + (Math.random() - 0.5) * 300,
                'sparkle'
            ).setScale(Math.random() + 0.5).setDepth(10).setTint(0x7c4dff);
            this.tweens.add({
                targets: sparkle,
                alpha: 0,
                scale: 0,
                y: sparkle.y - 50 - Math.random() * 50,
                rotation: Math.random() * 3,
                duration: 800,
                delay: i * 50,
                onComplete: () => sparkle.destroy(),
            });
        }

        if (this.mode === 'boss') {
            this.bossRound++;
            if (this.bossRound >= this.bossMaxRounds) {
                this.time.delayedCall(1000, () => {
                    this.showBossDefeat();
                });
                return;
            }
            this.continueText.setText('Next Round ->');
            this.continueBtn.setVisible(true);
            this.continueText.setVisible(true);
            this.continueBtn.setInteractive();
            this.continueBtn.once('pointerdown', () => {
                this.showProblem();
            });
        } else {
            // Single or spider challenge complete
            const msg = this.mode === 'spider' ? 'Spider defeated!' : 'Yay!';
            this.continueText.setText(msg);
            this.continueBtn.setVisible(true);
            this.continueText.setVisible(true);
            this.continueBtn.setInteractive();
            this.continueBtn.once('pointerdown', () => {
                this.closeChallenge(true);
            });
        }
    }

    showWrong(index) {
        // Shake the wrong button
        this.tweens.add({
            targets: this.choiceButtons[index],
            x: this.choiceButtons[index].x + 10,
            duration: 50,
            yoyo: true,
            repeat: 3,
        });

        // Dim the wrong answer
        this.choiceButtons[index].setAlpha(0.4);
        this.choiceTexts[index].setAlpha(0.4);

        if (this.mode === 'spider') {
            this.feedbackText.setText('The spider got away! Try again later!');
            this.feedbackText.setColor('#ff9999');
            this.feedbackText.setVisible(true);
            this.time.delayedCall(1200, () => {
                this.closeChallenge(false);
            });
        } else {
            this.feedbackText.setText('Almost! Try again! You got this!');
            this.feedbackText.setColor('#ff9999');
            this.feedbackText.setVisible(true);

            // Re-enable remaining buttons after a short delay
            this.time.delayedCall(600, () => {
                this.feedbackText.setVisible(false);
                this.choiceButtons.forEach((btn, i) => {
                    if (i !== index && btn.alpha > 0.5) {
                        btn.setInteractive();
                    }
                });
            });
        }
    }

    showBossDefeat() {
        this.questionText.setText('');
        this.choiceButtons.forEach(btn => btn.setVisible(false));
        this.choiceTexts.forEach(txt => txt.setVisible(false));
        this.feedbackText.setVisible(false);

        this.titleObj.setText('You defeated The Weblord!');

        const victoryMsg = NPC_DATA.finalBoss ? NPC_DATA.finalBoss.victory :
            "NOOOOO! You solved all my puzzles!\nYou truly are the greatest ninja!\nI'll never steal eggs again!";

        const victoryText = this.add.text(0, -60, victoryMsg, {
            fontFamily: 'Arial, sans-serif',
            fontSize: '24px',
            fontStyle: 'bold',
            color: '#b39ddb',
            align: 'center',
            wordWrap: { width: 600 },
            lineSpacing: 8,
        }).setOrigin(0.5);
        this.container.add(victoryText);

        // Fireworks!
        this.time.addEvent({
            delay: 200,
            repeat: 30,
            callback: () => {
                const fx = this.cameras.main.width / 2 + (Math.random() - 0.5) * 700;
                const fy = this.cameras.main.height / 2 + (Math.random() - 0.5) * 500;
                for (let i = 0; i < 8; i++) {
                    const sparkle = this.add.image(fx, fy, 'sparkle')
                        .setScale(Math.random() + 0.5)
                        .setDepth(10)
                        .setTint([0x7c4dff, 0xb39ddb, 0xff69b4, 0x87ceeb, 0x2ecc71][Math.floor(Math.random() * 5)]);
                    const angle = (i / 8) * Math.PI * 2;
                    this.tweens.add({
                        targets: sparkle,
                        x: fx + Math.cos(angle) * 80,
                        y: fy + Math.sin(angle) * 80,
                        alpha: 0,
                        scale: 0,
                        duration: 600,
                        onComplete: () => sparkle.destroy(),
                    });
                }
            },
        });

        this.continueText.setText('Hooray!');
        this.continueBtn.setVisible(true);
        this.continueText.setVisible(true);
        this.continueBtn.setInteractive();
        this.continueBtn.once('pointerdown', () => {
            if (this.onCompleteCallback) this.onCompleteCallback();
            this.closeChallenge(true);
        });
    }

    closeChallenge(success) {
        this.tweens.add({
            targets: this.container,
            scale: 0.5,
            alpha: 0,
            duration: 300,
            ease: 'Back.easeIn',
            onComplete: () => {
                if (this.onCompleteCallback && this.mode !== 'boss') {
                    this.onCompleteCallback(success);
                }
                this.scene.stop();
            },
        });
    }
}
