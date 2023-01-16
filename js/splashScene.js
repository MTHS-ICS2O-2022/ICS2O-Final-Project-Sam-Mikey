/* global Phaser */

// Created by Mikey Gloriani
// Created on January 12 2023
// This is the splash scene

class SplashScene extends Phaser.Scene {
  constructor() {
    super({ key: "splashScene" });
  }

  init(data) {
    this.cameras.main.setBackgroundColor("#000316");
  }

  preload() {
    console.log("Splash Scene");
    this.load.image("splashSceneBackground", "./assets/splashSceneImage.png");
  }

  create(data) {
    this.splashSceneBackgroundImage = this.add
      .sprite(1000, 500, "splashSceneBackground")
      .setScale(2.75);
    this.splashSceneBackgroundImage.x = 1920 / 2;
    this.splashSceneBackgroundImage.y = 1080 / 2;
  }

  update(time, delta) {
    if (time > 3000) {
      this.scene.switch("titleScene");
    }
  }
}

export default SplashScene;
