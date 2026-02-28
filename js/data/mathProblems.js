const MATH_PROBLEMS = {
    addition: [
        { template: (a, b) => ({ q: `${a} + ${b} = ?`, a: a + b }), range: [10, 99] },
        { template: (a, b) => ({ q: `${a} + ${b} = ?`, a: a + b }), range: [100, 999] },
    ],
    subtraction: [
        { template: (a, b) => ({ q: `${Math.max(a,b)} - ${Math.min(a,b)} = ?`, a: Math.abs(a - b) }), range: [10, 99] },
        { template: (a, b) => ({ q: `${Math.max(a,b)} - ${Math.min(a,b)} = ?`, a: Math.abs(a - b) }), range: [20, 200] },
    ],
    multiplication: [
        { template: (a, b) => ({ q: `${a} × ${b} = ?`, a: a * b }), range: [2, 12] },
        { template: (a, b) => ({ q: `${a} × ${b} = ?`, a: a * b }), range: [3, 12] },
    ],
    division: [
        { template: (a, b) => {
            const product = a * b;
            return { q: `${product} ÷ ${a} = ?`, a: b };
        }, range: [2, 10] },
    ],
    patterns: [
        { type: 'add', step: [2, 3, 4, 5, 10] },
        { type: 'multiply', step: [2, 3] },
        { type: 'subtract', step: [2, 3, 5] },
    ],

    wordProblems: {
        easter: [
            {
                template: (a, b) => ({
                    q: `The Invisible Ninja found ${a} shells on the beach in the morning and ${b} more shells in a tide pool. How many shells altogether?`,
                    a: a + b
                }),
                op: 'add', range: [5, 30]
            },
            {
                template: (a, b) => ({
                    q: `There were ${a + b} coconuts on the palm tree. A big wave knocked ${b} into the ocean. How many coconuts are still in the tree?`,
                    a: a
                }),
                op: 'subtract', range: [4, 20]
            },
            {
                template: (a, b) => ({
                    q: `Each stone statue on Easter Island wears ${b} flower leis. If there are ${a} statues, how many leis are there in all?`,
                    a: a * b
                }),
                op: 'multiply', range: [2, 9]
            },
            {
                template: (a, b) => ({
                    q: `The Invisible Ninja collected ${a * b} tropical fish and put them equally into ${a} tide pools. How many fish are in each pool?`,
                    a: b
                }),
                op: 'divide', range: [2, 8]
            },
        ],
        hannukah: [
            {
                template: (a, b) => ({
                    q: `If each menorah has ${a} candles lit and there are ${b} menorahs in the window, how many candles are glowing?`,
                    a: a * b
                }),
                op: 'multiply', range: [2, 9]
            },
            {
                template: (a, b) => ({
                    q: `Miriam baked ${a} sufganiyot on Monday and ${b} more on Tuesday. How many jelly donuts did she bake in all?`,
                    a: a + b
                }),
                op: 'add', range: [5, 30]
            },
            {
                template: (a, b) => ({
                    q: `Levi had ${a + b} chocolate gelt coins. He gave ${b} to his friends. How many coins does he have left?`,
                    a: a
                }),
                op: 'subtract', range: [4, 25]
            },
            {
                template: (a, b) => ({
                    q: `${a * b} dreidels need to be shared equally among ${a} kids for the Hannukah party. How many dreidels does each kid get?`,
                    a: b
                }),
                op: 'divide', range: [2, 8]
            },
        ],
        christmas: [
            {
                template: (a, b) => ({
                    q: `Santa's elves made ${a} toy robots and ${b} teddy bears. How many toys did they make in all?`,
                    a: a + b
                }),
                op: 'add', range: [5, 40]
            },
            {
                template: (a, b) => ({
                    q: `There were ${a + b} candy canes on the Christmas tree. The reindeer ate ${b} of them! How many candy canes are left?`,
                    a: a
                }),
                op: 'subtract', range: [5, 25]
            },
            {
                template: (a, b) => ({
                    q: `Each of Santa's ${a} reindeer needs ${b} jingle bells for their harness. How many bells are needed altogether?`,
                    a: a * b
                }),
                op: 'multiply', range: [2, 10]
            },
            {
                template: (a, b) => ({
                    q: `The elves wrapped ${a * b} presents and need to load them equally onto ${a} sleighs. How many presents go on each sleigh?`,
                    a: b
                }),
                op: 'divide', range: [2, 9]
            },
        ],
        thanksgiving: [
            {
                template: (a, b) => ({
                    q: `${a} turkeys each need ${b} ears of corn for the feast. How many ears of corn are needed in total?`,
                    a: a * b
                }),
                op: 'multiply', range: [2, 9]
            },
            {
                template: (a, b) => ({
                    q: `The farmers harvested ${a} pumpkins from the north field and ${b} from the south field. How many pumpkins did they harvest altogether?`,
                    a: a + b
                }),
                op: 'add', range: [5, 35]
            },
            {
                template: (a, b) => ({
                    q: `Butternut baked ${a + b} pies, but ${b} were eaten before dinner! How many pies are left for the feast?`,
                    a: a
                }),
                op: 'subtract', range: [4, 20]
            },
            {
                template: (a, b) => ({
                    q: `${a * b} cranberries need to be divided equally into ${a} jars for cranberry sauce. How many cranberries go in each jar?`,
                    a: b
                }),
                op: 'divide', range: [2, 8]
            },
        ],
        halloween: [
            {
                template: (a, b) => ({
                    q: `The Weblord has ${a} jars of spiders with ${b} spiders in each jar. How many spiders does he have in total?`,
                    a: a * b
                }),
                op: 'multiply', range: [3, 9]
            },
            {
                template: (a, b) => ({
                    q: `There are ${a + b} ghosts haunting the palace. ${b} of them got scared and flew away! How many ghosts are left?`,
                    a: a
                }),
                op: 'subtract', range: [5, 25]
            },
            {
                template: (a, b) => ({
                    q: `The Weblord baked ${a * b} spooky cookies and wants to share them equally among ${a} trick-or-treaters. How many cookies does each one get?`,
                    a: b
                }),
                op: 'divide', range: [3, 9]
            },
            {
                template: (a, b) => ({
                    q: `${a} pumpkins each have ${b} candles inside. How many candles are glowing in total?`,
                    a: a * b
                }),
                op: 'multiply', range: [4, 8]
            },
        ],
        megamix: [
            {
                template: (a, b) => ({
                    q: `The Invisible Ninja collected ${a} stars on Easter Island and ${b} stars on Christmas Island. How many stars in total?`,
                    a: a + b
                }),
                op: 'add', range: [8, 45]
            },
            {
                template: (a, b) => ({
                    q: `DJ Combo had ${a + b} records in his mega collection but ${b} got scratched. How many good records does he have left?`,
                    a: a
                }),
                op: 'subtract', range: [5, 30]
            },
            {
                template: (a, b) => ({
                    q: `Each of the ${a} islands sent ${b} delegates to the Mega Mix festival. How many delegates are there in all?`,
                    a: a * b
                }),
                op: 'multiply', range: [3, 12]
            },
            {
                template: (a, b) => ({
                    q: `The Weblord tangled ${a * b} websites across ${a} islands equally. How many websites are tangled on each island?`,
                    a: b
                }),
                op: 'divide', range: [2, 10]
            },
        ],
    }
};
