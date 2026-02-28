class DialogSystem {
    constructor(scene) {
        this.scene = scene;
        this.container = null;
        this.textObj = null;
        this.nameObj = null;
        this.isShowing = false;
        this.fullText = '';
        this.displayedText = '';
        this.charIndex = 0;
        this.typeTimer = null;
        this.onComplete = null;
        this.tapToContinueText = null;
        this.isTyping = false;
    }

    create() {
        // Full-screen click zone — clicking ANYWHERE advances dialog (kid-friendly)
        this.clickZone = this.scene.add.rectangle(512, 384, 1024, 768, 0x000000, 0.001)
            .setScrollFactor(0)
            .setDepth(998)
            .setInteractive()
            .setVisible(false);

        this.clickZone.on('pointerdown', () => {
            this.advance();
        });

        this.container = this.scene.add.container(512, 680)
            .setDepth(1000)
            .setScrollFactor(0)
            .setVisible(false);

        // Background
        const bg = this.scene.add.image(0, 0, 'dialog_bg');
        this.container.add(bg);

        // Character name background
        const nameBg = this.scene.add.graphics();
        nameBg.fillStyle(0x2a1a4e, 0.9);
        nameBg.fillRoundedRect(-420, -100, 180, 32, 8);
        nameBg.lineStyle(2, 0xffd700);
        nameBg.strokeRoundedRect(-420, -100, 180, 32, 8);
        this.container.add(nameBg);

        // Character name
        this.nameObj = this.scene.add.text(-330, -84, '', {
            fontFamily: 'Arial, sans-serif',
            fontSize: '20px',
            fontStyle: 'bold',
            color: '#ffd700',
            align: 'center',
        }).setOrigin(0.5);
        this.container.add(this.nameObj);

        // Dialog text
        this.textObj = this.scene.add.text(-400, -55, '', {
            fontFamily: 'Arial, sans-serif',
            fontSize: '22px',
            color: '#ffffff',
            wordWrap: { width: 800, useAdvancedWrap: true },
            lineSpacing: 6,
        });
        this.container.add(this.textObj);

        // Tap to continue
        this.tapToContinueText = this.scene.add.text(380, 60, '▼ Click or Space', {
            fontFamily: 'Arial, sans-serif',
            fontSize: '16px',
            color: '#ffd700',
            fontStyle: 'italic',
        }).setOrigin(1, 0.5).setAlpha(0);
        this.container.add(this.tapToContinueText);

        // Pulsing animation for tap to continue
        this.scene.tweens.add({
            targets: this.tapToContinueText,
            y: 64,
            duration: 600,
            yoyo: true,
            repeat: -1,
            ease: 'Sine.easeInOut',
        });
    }

    advance() {
        if (this.isTyping) {
            this.finishTyping();
        } else if (this.isShowing) {
            const callback = this.onComplete;
            this.onComplete = null;
            this.isShowing = false;
            this.clickZone.setVisible(false);

            this.scene.tweens.killTweensOf(this.container);
            this.scene.tweens.add({
                targets: this.container,
                y: 850,
                duration: 150,
                ease: 'Cubic.easeIn',
                onComplete: () => {
                    this.container.setVisible(false);
                    if (callback) callback();
                },
            });
        }
    }

    show(name, text, onComplete) {
        this.scene.tweens.killTweensOf(this.container);

        this.isShowing = true;
        this.container.setVisible(true);
        this.clickZone.setVisible(true);
        this.nameObj.setText(name);
        this.fullText = text;
        this.displayedText = '';
        this.charIndex = 0;
        this.onComplete = onComplete || null;
        this.textObj.setText('');
        this.tapToContinueText.setAlpha(0);
        this.isTyping = true;

        if (this.typeTimer) {
            this.typeTimer.remove();
        }

        this.typeTimer = this.scene.time.addEvent({
            delay: 30,
            callback: this.typeChar,
            callbackScope: this,
            repeat: this.fullText.length - 1,
        });

        this.container.setY(780);
        this.scene.tweens.add({
            targets: this.container,
            y: 680,
            duration: 250,
            ease: 'Back.easeOut',
        });
    }

    typeChar() {
        if (this.charIndex < this.fullText.length) {
            this.displayedText += this.fullText[this.charIndex];
            this.textObj.setText(this.displayedText);
            this.charIndex++;
            if (this.charIndex >= this.fullText.length) {
                this.isTyping = false;
                this.tapToContinueText.setAlpha(1);
            }
        }
    }

    finishTyping() {
        if (this.typeTimer) this.typeTimer.remove();
        this.displayedText = this.fullText;
        this.textObj.setText(this.displayedText);
        this.isTyping = false;
        this.tapToContinueText.setAlpha(1);
    }

    hide() {
        this.isShowing = false;
        this.clickZone.setVisible(false);
        this.scene.tweens.killTweensOf(this.container);
        this.container.setVisible(false);
        this.container.setY(850);
    }

    isActive() {
        return this.isShowing;
    }
}
