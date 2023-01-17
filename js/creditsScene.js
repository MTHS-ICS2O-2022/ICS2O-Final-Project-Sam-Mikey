/* global Phaser */

// Created by Sam Corbett
// Created on January 13 2023
// This is the credits scene

class CreditsScene extends Phaser.Scene {
  constructor() {
    super({ key: "creditsScene" });

    this.creditsSceneText = null;
    this.creditsSceneTextStyle = {
      font: "150px Times",
      fill: "#ffffff",
      align: "center",
    };
    this.creditsSceneBackgroundImage = null;
    this.backButton = null;
  }

  init(data) {
    this.cameras.main.setBackgroundColor("#000316");
  }

  preload() {
    console.log("Credits Scene");

    //images
    this.load.image(
      "creditSceneBackground",
      "./assets/creditSceneBackground.png"
    );

    this.load.image("backGUIButton", "./assets/backGUIButton.png");

    //sounds
    this.load.audio("guiBack", "./assets/guiBack.mp3");
  }

  create(data) {
    this.creditsSceneBackgroundImage = this.add
      .sprite(1000, 500, "creditSceneBackground")
      .setScale(1.575);
    this.creditsSceneBackgroundImage.x = 1920 / 2;
    this.creditsSceneBackgroundImage.y = 1080 / 2;

    this.creditsSceneText = this.add.text(
      950 / 2,
      1080 / 2 - 250,
      "Insert Text Here",
      this.creditsSceneTextStyle
    );

    this.backGUIButton = this.add.sprite(
      600 / 2,
      1080 / 2 + 400,
      "backGUIButton"
    );
    this.backGUIButton.setInteractive({ useHandCursor: true });
    this.backGUIButton.on("pointerdown", () => this.clickBack());
  }

  update(time, delta) {}

  clickBack() {
    this.sound.play("guiBack");
    this.scene.start("menuScene");
  }
}

export default CreditsScene;
