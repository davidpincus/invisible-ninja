# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

The Invisible Ninja is a Phaser 3 educational math game where players control an axolotl ninja exploring themed islands, solving math problems, and collecting items. Built with vanilla JavaScript — no build system, bundler, or package manager.

## Running the Game

Open `index.html` in a browser. No build step required. Phaser 3.60.0 is loaded from CDN. There are no tests, linting, or CI/CD.

## Architecture

### Scene Flow
```
BootScene → TitleScene → WorldMapScene → Land Scenes → MathChallengeScene
                                                     → HouseInteriorScene
                                         After 42 stars: MegaMixIsland → Weblord Boss
                                         → HalloweenPalace → DanceParty → ThroneRoom → Victory
                                         Post-game: collect 5 outfits + 15 eggs
```

### Key Files

- **`js/main.js`** — Phaser game config (1024x768, arcade physics, FIT scaling)
- **`js/scenes/BaseLandScene.js`** — Abstract base class all island scenes extend. Contains player movement, spider patrols, collectibles, invisibility, water zones, NPC interaction, and house entry. Island scenes override template methods: `getHouses()`, `getSpiders()`, `getCollectibles()`, `createMap()`
- **`js/sprites/SpriteGenerator.js`** — Procedurally generates all player sprites (10 costumes, walking/swimming animations) using Phaser graphics API at boot time
- **`js/sprites/TileGenerator.js`** — Procedurally generates terrain tiles per island theme
- **`js/systems/ProgressTracker.js`** — Global singleton (`progressTracker`) managing stars, island unlocks, collectibles, costumes, NPC/spider state. Persists to localStorage key `invisible_ninja_save`
- **`js/systems/MathGenerator.js`** — Global singleton (`mathGenerator`) generating math problems (add/subtract/multiply/divide/patterns) at difficulty levels 1-3
- **`js/systems/DialogSystem.js`** — Typewriter text dialog with tween animations
- **`js/data/npcs.js`** — NPC definitions keyed by island (id, position, greeting, mathType)
- **`js/data/mathProblems.js`** — Word problem templates and number ranges per island

### Design Patterns

- **No external assets** — all sprites and tiles generated procedurally at runtime
- **Inheritance** — island scenes extend `BaseLandScene` and override template methods
- **Global singletons** — `progressTracker` and `mathGenerator` are global instances
- **Callback-driven** — scenes pass `onComplete` callbacks (e.g., MathChallengeScene returns results)
- **Tween-heavy** — animations use Phaser tweens extensively; be careful with null references in tween callbacks after scene transitions
- **Mobile support** — virtual joystick and touch buttons alongside keyboard controls (arrow keys for movement, Space/Enter for interaction, 'A' for invisibility)
