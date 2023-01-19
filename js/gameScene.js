/* global Phaser */

// Created by Mikey Gloriani
// Created on January 12 2023
// This is the splash scene

class GameScene extends Phaser.Scene {
  constructor() {
    super({ key: "gameScene" });
  }

  init(data) {
    this.cameras.main.setBackgroundColor("#000316");
  }

  preload() {
    console.log("Game Scene");
    this.load.image("gameSceneBackground", "./assets/gameSceneBackground.png");
  }

  create(data) {
    this.gameSceneBackgroundImage = this.add
      .sprite(1000, 500, "gameSceneBackground")
      .setScale(2.75);
    this.gameSceneBackgroundImage.x = 1920 / 2;
    this.gameSceneBackgroundImage.y = 1080 / 2;
  }

  update(time, delta) {
  }
}

export default GameScene;
