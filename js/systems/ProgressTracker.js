class ProgressTracker {
    constructor() {
        this.SAVE_KEY = 'invisible_ninja_save';
        this.data = this.load();
    }

    getDefault() {
        return {
            stars: {
                easter: 0,
                hannukah: 0,
                christmas: 0,
                thanksgiving: 0,
                megamix: 0,
            },
            totalStars: 0,
            unlockedLands: ['easter'],
            solvedNPCs: [],
            defeatedSpiders: [],
            collectedItems: [],
            costumesUnlocked: [0], // costume indices; 0 = default black ninja
            currentCostume: 0,
            collectibleBonuses: [],
            weblordDefeated: false,
            playerName: 'Madeline',
        };
    }

    load() {
        try {
            const saved = localStorage.getItem(this.SAVE_KEY);
            if (saved) {
                const parsed = JSON.parse(saved);
                const defaults = this.getDefault();
                return {
                    ...defaults,
                    ...parsed,
                    stars: { ...defaults.stars, ...(parsed.stars || {}) },
                };
            }
        } catch (e) {
            console.warn('Failed to load save:', e);
        }
        return this.getDefault();
    }

    save() {
        try {
            localStorage.setItem(this.SAVE_KEY, JSON.stringify(this.data));
        } catch (e) {
            console.warn('Failed to save:', e);
        }
    }

    // --- STARS ---
    earnStar(land, npcId) {
        if (this.data.solvedNPCs.includes(npcId)) return false;
        this.data.solvedNPCs.push(npcId);
        this.data.stars[land] = (this.data.stars[land] || 0) + 1;
        this.data.totalStars = Object.values(this.data.stars).reduce((a, b) => a + b, 0);
        this.checkUnlocks();
        this.save();
        return true;
    }

    checkUnlocks() {
        const total = this.data.totalStars;
        if (total >= 8 && !this.data.unlockedLands.includes('hannukah')) {
            this.data.unlockedLands.push('hannukah');
        }
        if (total >= 18 && !this.data.unlockedLands.includes('christmas')) {
            this.data.unlockedLands.push('christmas');
        }
        if (total >= 30 && !this.data.unlockedLands.includes('thanksgiving')) {
            this.data.unlockedLands.push('thanksgiving');
        }
        if (total >= 42 && !this.data.unlockedLands.includes('megamix')) {
            this.data.unlockedLands.push('megamix');
        }
    }

    isLandUnlocked(land) {
        return this.data.unlockedLands.includes(land);
    }

    isNPCSolved(npcId) {
        return this.data.solvedNPCs.includes(npcId);
    }

    getTotalStars() {
        return this.data.totalStars;
    }

    getLandStars(land) {
        return this.data.stars[land] || 0;
    }

    // --- SPIDERS ---
    defeatSpider(spiderId, land) {
        if (this.data.defeatedSpiders.includes(spiderId)) return false;
        this.data.defeatedSpiders.push(spiderId);
        this.data.stars[land] = (this.data.stars[land] || 0) + 1;
        this.data.totalStars = Object.values(this.data.stars).reduce((a, b) => a + b, 0);
        this.checkUnlocks();
        this.save();
        return true;
    }

    isSpiderDefeated(spiderId) {
        return this.data.defeatedSpiders.includes(spiderId);
    }

    // --- COLLECTIBLES ---
    collectItem(itemId, land) {
        if (this.data.collectedItems.includes(itemId)) return false;
        this.data.collectedItems.push(itemId);
        this.save();
        return true;
    }

    hasCollectible(itemId) {
        return this.data.collectedItems.includes(itemId);
    }

    getLandCollectibleCount(land) {
        return this.data.collectedItems.filter(id => id.startsWith(land + '_')).length;
    }

    earnCollectibleBonus(land) {
        if (this.data.collectibleBonuses.includes(land)) return false;
        this.data.collectibleBonuses.push(land);
        this.data.stars[land] = (this.data.stars[land] || 0) + 3;
        this.data.totalStars = Object.values(this.data.stars).reduce((a, b) => a + b, 0);
        this.checkUnlocks();
        this.save();
        return true;
    }

    // --- COSTUMES ---
    unlockCostume(costumeIndex) {
        if (this.data.costumesUnlocked.includes(costumeIndex)) return false;
        this.data.costumesUnlocked.push(costumeIndex);
        this.data.currentCostume = costumeIndex;
        this.save();
        return true;
    }

    getCurrentCostume() {
        return this.data.currentCostume || 0;
    }

    setCostume(index) {
        if (this.data.costumesUnlocked.includes(index)) {
            this.data.currentCostume = index;
            this.save();
        }
    }

    getCostumesUnlocked() {
        return this.data.costumesUnlocked;
    }

    // --- WEBLORD ---
    canFightWeblord() {
        return this.data.totalStars >= 42;
    }

    setWeblordDefeated() {
        this.data.weblordDefeated = true;
        this.save();
    }

    isWeblordDefeated() {
        return this.data.weblordDefeated;
    }

    // --- GENERAL ---
    resetProgress() {
        this.data = this.getDefault();
        this.save();
    }

    hasSave() {
        return localStorage.getItem(this.SAVE_KEY) !== null;
    }

    // Legacy badge compat (used by HouseInteriorScene)
    collectBadge(badgeId) {
        return this.collectItem(badgeId, 'badge');
    }
    hasBadge(badgeId) {
        return this.hasCollectible(badgeId);
    }
    getBadgeCount() {
        return this.data.collectedItems.filter(id => id.startsWith('badge_') || id.startsWith('treasure_')).length;
    }
}

// Global instance
const progressTracker = new ProgressTracker();
