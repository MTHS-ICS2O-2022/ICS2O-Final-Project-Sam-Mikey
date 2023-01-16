// Created by Mikey Gloriani
// Created on November 8 2022
// This is the Phaser3 game configuration file

/**
 * Start Phaser game
 */

import splashScene from "./splashScene.js";

const config = {
  type: Phaser.AUTO,
  width: 1920,
  height: 1080,
  physics: {
    default: "arcade",
    arcade: {
      debug: false,
    },
  },
  //set background color
  backgroundColor: 0xffffff,
  scale: {
    mode: Phaser.Scale.FIT,
    // Center placement
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
};

const game = new Phaser.Game(config);

// load scene
// Note: Any "key" is global and can't be reused
game.scene.add("splashScene", splashScene);

// Game Start
game.scene.start("splashScene");
