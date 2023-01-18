/* global Phaser */

// Created by Mikey Gloriani
// Created on January 12 2023
// This is the title scene

class TitleScene extends Phaser.Scene {
  constructor() {
    super({ key: "titleScene" });

    this.titleSceneBackgroundImage = null;
    this.titleSceneText = null;
    this.titleSceneTextStyle = {
      font: "200px Times",
      fill: "#ffffff",
      align: "center",
    };
  }

  init(data) {
    this.cameras.main.setBackgroundColor("#000316");
  }

  preload() {
    console.log("Title Scene");
    this.load.image(
      "titleSceneBackground",
      "./assets/titleSceneBackground.png"
    );
  }

  create(data) {
    this.titleSceneBackgroundImage = this.add
      .sprite(1000, 500, "titleSceneBackground")
      .setScale(1.25);
    this.titleSceneBackgroundImage.x = 1920 / 2;
    this.titleSceneBackgroundImage.y = 1080 / 2;

    this.titleSceneText = this.add.text(
      960 / 2,
      1080 / 2 + 300,
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

export default TitleScene;
