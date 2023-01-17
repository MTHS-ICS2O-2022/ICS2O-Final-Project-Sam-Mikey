/* global Phaser */

// Created by Sam Corbett
// Created on January 13 2023
// This is the menu scene

class MenuScene extends Phaser.Scene {
  constructor() {
    super({ key: "menuScene" });

    this.menuSceneBackgroundImage = null;
    this.playButton = null;
    this.creditButton = null;
  }

  init(data) {
    this.cameras.main.setBackgroundColor("#ffffff");
  }

  preload() {
    console.log("Menu Scene");

    //images
    this.load.image(
      "menuSceneBackground",
      "./assets/menuSceneBackground.jpg"
    );
    
    this.load.image(
      "playGUIButton",
      "./assets/playGUIButton.png"
    );
    
    this.load.image(
      "creditsGUIButton",
      "./assets/creditsGUIButton.png"
    );

    //sounds
    this.load.audio(
      "guiSelect",
      "./assets/guiSelect.mp3"
    );
  }

  create(data) {
    this.menuSceneBackgroundImage = this.add
      .sprite(1000, 500, "menuSceneBackground")
      .setScale(1.25);
    this.menuSceneBackgroundImage.x = 1920 / 2;
    this.menuSceneBackgroundImage.y = 1080 / 2;

    this.playGUIButton = this.add.sprite(1920 / 2, 1080 / 2 + 250, "playGUIButton");
    this.playGUIButton.setInteractive({ useHandCursor: true });
    this.playGUIButton.on("pointerdown", () => this.clickPlay());


    this.creditsGUIButton = this.add.sprite(1920 / 2, 1080 / 2 - 250, "creditsGUIButton");
    this.creditsGUIButton.setInteractive({ useHandCursor: true });
    this.creditsGUIButton.on("pointerdown", () => this.clickCredits());
  }

  update(time, delta) {
    if (time > 6000) {
      this.scene.switch("gameScene");
    }
  }

  clickPlay() {
    this.sound.play("guiSelect");
  }

  clickCredits() {
    this.sound.play("guiSelect");
  }
      
}

export default MenuScene;
