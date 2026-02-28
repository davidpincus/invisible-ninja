class MathGenerator {
    constructor() {
        this.difficulty = 1; // 1-3
    }

    randInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    generate(type, land) {
        // Try word problem 40% of the time
        if (land && Math.random() < 0.4) {
            return this.generateWordProblem(land);
        }

        // Try pattern 20% of the time
        if (Math.random() < 0.2) {
            return this.generatePattern();
        }

        const types = ['addition', 'subtraction', 'multiplication', 'division'];
        const chosenType = type || types[this.randInt(0, types.length - 1)];
        return this.generateByType(chosenType);
    }

    generateByType(type) {
        switch (type) {
            case 'addition': return this.generateAddition();
            case 'subtraction': return this.generateSubtraction();
            case 'multiplication': return this.generateMultiplication();
            case 'division': return this.generateDivision();
            default: return this.generateAddition();
        }
    }

    generateAddition() {
        let a, b;
        if (this.difficulty <= 1) {
            a = this.randInt(1, 20);
            b = this.randInt(1, 20);
        } else if (this.difficulty === 2) {
            a = this.randInt(10, 50);
            b = this.randInt(10, 50);
        } else {
            a = this.randInt(50, 200);
            b = this.randInt(50, 200);
        }
        const answer = a + b;
        return this.formatProblem(`${a} + ${b} = ?`, answer);
    }

    generateSubtraction() {
        let a, b;
        if (this.difficulty <= 1) {
            a = this.randInt(5, 20);
            b = this.randInt(1, a);
        } else if (this.difficulty === 2) {
            a = this.randInt(20, 80);
            b = this.randInt(5, a);
        } else {
            a = this.randInt(50, 300);
            b = this.randInt(10, a);
        }
        const answer = a - b;
        return this.formatProblem(`${a} - ${b} = ?`, answer);
    }

    generateMultiplication() {
        let a, b;
        if (this.difficulty <= 1) {
            a = this.randInt(2, 5);
            b = this.randInt(2, 5);
        } else if (this.difficulty === 2) {
            a = this.randInt(2, 9);
            b = this.randInt(2, 9);
        } else {
            a = this.randInt(3, 12);
            b = this.randInt(3, 12);
        }
        const answer = a * b;
        return this.formatProblem(`${a} × ${b} = ?`, answer);
    }

    generateDivision() {
        let a, b;
        if (this.difficulty <= 1) {
            b = this.randInt(2, 5);
            a = b * this.randInt(2, 5);
        } else if (this.difficulty === 2) {
            b = this.randInt(2, 8);
            a = b * this.randInt(2, 8);
        } else {
            b = this.randInt(2, 12);
            a = b * this.randInt(2, 12);
        }
        const answer = a / b;
        return this.formatProblem(`${a} ÷ ${b} = ?`, answer);
    }

    generatePattern() {
        const patternType = this.randInt(0, 2);
        let sequence, answer, step;

        if (patternType === 0) {
            // Counting by N
            step = [2, 3, 4, 5, 10][this.randInt(0, 4)];
            const start = this.randInt(1, 10) * step;
            sequence = [];
            for (let i = 0; i < 4; i++) {
                sequence.push(start + step * i);
            }
            answer = start + step * 4;
        } else if (patternType === 1) {
            // Doubling
            const start = this.randInt(2, 8);
            sequence = [start, start * 2, start * 4, start * 8];
            answer = start * 16;
        } else {
            // Counting down by N
            step = [2, 3, 5][this.randInt(0, 2)];
            const start = this.randInt(6, 15) * step;
            sequence = [];
            for (let i = 0; i < 4; i++) {
                sequence.push(start - step * i);
            }
            answer = start - step * 4;
        }

        const q = `What comes next?\n${sequence.join(', ')}, ?`;
        return this.formatProblem(q, answer);
    }

    generateWordProblem(land) {
        const problems = MATH_PROBLEMS.wordProblems[land];
        if (!problems || problems.length === 0) {
            return this.generateAddition();
        }
        const template = problems[this.randInt(0, problems.length - 1)];
        const [min, max] = template.range;
        const a = this.randInt(min, max);
        const b = this.randInt(min, max);
        const result = template.template(a, b);
        return this.formatProblem(result.q, result.a);
    }

    formatProblem(question, answer) {
        const choices = this.generateChoices(answer);
        return {
            question: question,
            answer: answer,
            choices: choices,
        };
    }

    generateChoices(correct) {
        const choices = new Set([correct]);
        const maxAttempts = 50;
        let attempts = 0;

        while (choices.size < 4 && attempts < maxAttempts) {
            attempts++;
            let wrong;
            const r = Math.random();

            if (r < 0.3) {
                // Close to correct
                wrong = correct + this.randInt(-3, 3);
            } else if (r < 0.6) {
                // Off by a factor
                wrong = correct + this.randInt(1, 5) * (Math.random() < 0.5 ? 1 : -1);
            } else {
                // Random nearby
                const range = Math.max(10, Math.abs(correct));
                wrong = correct + this.randInt(-range, range);
            }

            if (wrong !== correct && wrong >= 0) {
                choices.add(wrong);
            }
        }

        // Ensure we have 4 choices
        while (choices.size < 4) {
            choices.add(correct + choices.size * 2 + 1);
        }

        // Shuffle
        const arr = Array.from(choices);
        for (let i = arr.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }
        return arr;
    }

    increaseDifficulty() {
        this.difficulty = Math.min(3, this.difficulty + 1);
    }
}

const mathGenerator = new MathGenerator();
