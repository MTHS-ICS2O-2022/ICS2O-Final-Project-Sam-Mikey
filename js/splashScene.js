/* global Phaser */

// Created by Mikey Gloriani
// Created on January 12 2023
// This is the splash scene

class SplashScene extends Phaser.Scene {
  constructor() {
    super({ key: "splashScene" });
  }

  init(data) {
    this.cameras.main.setBackgroundColor("#ffffff");
  }

  preload() {
    console.log("Splash Scene");
    this.load.image("splashSceneBackground", "./assets/splashSceneImage.jpg");
  }

  create(data) {
    this.splasSceneBackgroundImage = this.add.sprite(
      0,
      0,
      "splashSceneBackground"
    );
    this.splasSceneBackgroundImage.x = 1920 / 2;
    this.splasSceneBackgroundImage.y = 1080 / 2;
  }

  update(time, delta) {
    if (time > 3000) {
      this.scene.switch("titleScene");
    }
  }
}

export default SplashScene;
