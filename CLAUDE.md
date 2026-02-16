# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

A 2D platformer game called "Boricua" built with **Phaser 3** (minified, bundled locally). The game features a player character navigating platforms using arrow keys.

## Running the Project

Open `index.html` in a browser via a local HTTP server (required for asset loading):

```
python3 -m http.server 8000
```

No build tools, package manager, or tests are configured.

## Architecture

- **index.html** — Entry point. Loads Phaser and the game script. Canvas is centered on a black background.
- **JS/javascript.js** — All game logic in a single file. Contains one Phaser Scene (`MainScene`) and the Phaser config.
- **JS/phaser.min.js** — Phaser 3 framework (vendored/minified).
- **Recursos/** — Game assets: `fondo.png` (background), `plataforma1.png` (platform), `rorrosprite.png` (player spritesheet, 92x96 per frame).

## Game Config

- Canvas: 800x530, arcade physics, gravity Y=300
- Scale mode: `Phaser.Scale.FIT`
- Player controls: arrow keys (left/right movement, up to jump when grounded)

## Known Issues

- Asset paths in `javascript.js` use `../recursos/` (lowercase) but the folder is named `Recursos/` (capitalized). This causes loading failures on case-sensitive file systems.
- All platform images (`plataforma2`–`plataforma6`) load the same file `plataforma1.png` under different keys.
- `player1` is a global `var` instead of a scene property.

## Language

Code comments are in Spanish.
