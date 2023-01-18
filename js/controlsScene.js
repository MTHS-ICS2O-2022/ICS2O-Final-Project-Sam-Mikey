/* global Phaser */

// Created by Sam Corbett
// Created on January 13 2023
// This is the scene where you select either mouse or keyboard to play.

class ControlsScene extends Phaser.Scene {
  constructor() {
    super({ key: "controlsScene" });

    this.controlsSceneBackgroundImage = null;
    this.startButton = null;
    this.backButton = null;


    this.keyboardSelectText = null;
    this.keyboardSelectTextStyle = {
      font: "150px Times",
      fill: "#ffffff",
      align: "center",
    };
  }
  init(data) {
    this.cameras.main.setBackgroundColor("#000316");
  }

  preload() {
    console.log("Controls Scene");

    //images
    this.load.image(
      "controlsSceneBackground",
      "./assets/controlsimage.png"
    );

    this.load.image("startGUIButton", "./assets/startGUIButton.png");

    this.load.image("backGUIButton", "./assets/backGUIButton.png");

    //sounds
    this.load.audio("guiSelect", "./assets/guiSelect.mp3");
    this.load.audio("guiBack", "./assets/guiBack.mp3");
  }

  create(data) {
    this.controlsModeSceneBackgroundImage = this.add
      .sprite(1000, 500, "controlsSceneBackground")
      .setScale(1);
    this.controlsModeSceneBackgroundImage.x = 1920 / 2;
    this.controlsModeSceneBackgroundImage.y = 1080 / 2;

    this.startGUIButton = this.add.sprite(
      1920 / 2,
      1080 / 2 + 50,
      "startGUIButton"
    );
    this.startGUIButton.setInteractive({ useHandCursor: true });
    this.startGUIButton.on("pointerdown", () => this.clickStart());

    this.backGUIButton = this.add.sprite(
      650 / 2,
      1080 / 2 + 400,
      "backGUIButton"
    );
    this.backGUIButton.setInteractive({ useHandCursor: true });
    this.backGUIButton.on("pointerdown", () => this.clickBack());
  }
  update(time, delta) {}

  clickStart() {
    this.sound.play("guiSelect");
    this.scene.start("gameScene");
  }

  clickBack() {
    this.sound.play("guiBack");
    this.scene.start("menuScene");
  }

  keyboardControls() {
    this.setTint(0xff0000);
  }
}

export default ControlsScene;
