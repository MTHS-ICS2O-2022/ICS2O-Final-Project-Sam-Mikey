/* global Phaser */

// Created by Mikey Gloriani
// Created on January 12 2023
// This is the splash scene

class SplashScene extends Phaser.Scene {
  constructor() {
    super({ key: "splashScene" });

    this.titleSceneBackgroundImage = null;
    this.titleSceneText = null;
    this.titleSceneTextStyle = {
      font: "200px Times",
      fill: "#fde4b9",
      align: "center",
    };
  }

  init(data) {
    this.cameras.main.setBackgroundColor("#000316");
  }

  preload() {
    console.log("Title Scene");
    this.load.image("titleSceneBackground", "./assets/titleSceneBackground.png");
  }

  create(data) {
    this.titleSceneBackgroundImage = this.add
      .sprite(0, 0, "titleSceneBackground")
      .setScale(2.75);
    this.titleSceneBackgroundImage.x = 1920 / 2;
    this.titleSceneBackgroundImage.y = 1080 / 2;

    this.titleSceneText = this.add.text(
      1920 / 2,
      1080 / 2 + 350,
      "Andromedaroids",
      this.titleSceneTextStyle
    );
  }

  update(time, delta) {
    if (time > 6000) {
      this.scene.switch("menuScene");
    }
  }
}

export default SplashScene;
