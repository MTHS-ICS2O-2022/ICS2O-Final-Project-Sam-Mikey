/* global Phaser */

// Created by Mikey Gloriani
// Created on January 12 2023
// This is the splash scene

class GameScene extends Phaser.Scene {
  constructor() {
    super({ key: "gameScene" });

    this.gameSceneBackgroundImage = null;
    this.ship = null;
    this.fireMissile = false
  }

  init(data) {
    this.cameras.main.setBackgroundColor("#000316");
  }

  preload() {
    console.log("Game Scene");
    
    //images
    this.load.image("gameSceneBackground", "./assets/gameSceneBackground.png");
    this.load.image("spaceShip", './assets/spaceShip.png');
    this.load.image('bullet', './assets/bullet.png');
    this.load.image("spaceShipUp", './assets/spaceShipUp.png')
    this.load.image("spaceShipDown", './assets/spaceShipDown.png')
    this.load.image("spaceShipLeft", './assets/spaceShipLeft.png')
    this.load.image("spaceShipRight", './assets/spaceShipRight.png')
    
    //sound
    this.load.audio('laser', "assets/laser.mp3")
  }

  create(data) {
    //background sprite
    this.gameSceneBackgroundImage = this.add
      .sprite(1000, 500, "gameSceneBackground")
      .setScale(2.75);
    this.gameSceneBackgroundImage.x = 1920 / 2;
    this.gameSceneBackgroundImage.y = 1080 / 2;

    this.missleGroup = this.physics.add.group()

    //ship
    this.ship = this.physics.add.sprite( 1920 / 2, 1080 - 100, "spaceShip")
  }

  update(time, delta) {
    const keyLeftObj = this.input.keyboard.addKey("LEFT")
    const keyRightObj = this.input.keyboard.addKey("RIGHT");
    const keyUpObj = this.input.keyboard.addKey("UP");
    const keyDownObj = this.input.keyboard.addKey("DOWN");
    const keySpaceObj = this.input.keyboard.addKey("SPACE");

    if (keyLeftObj.isDown === true) {
      this.ship.x = this.ship.x - 15;
      if (this.ship.x < 0) {
        this.ship.x = 2000;
    }
  }
    
  if (keyRightObj.isDown === true) {
    this.ship.x = this.ship.x + 15;
    if (this.ship.x > 1920) {
      this.ship.x = -100;
      }
    }
    
    if (keyUpObj.isDown === true) {
    this.ship.y = this.ship.y - 15;
    if (this.ship.y < 0) {
      this.ship.y = 1080;
    }
  }
    
    if (keyDownObj.isDown === true) {
    this.ship.y = this.ship.y + 15;
    if (this.ship.y > 1080) {
      this.ship.y = 0;
      }
    }

    if (keySpaceObj.isDown === true){
       const aNewMissile = this.physics.add.sprite(this.ship.x, this.ship.y, 'bullet')
      this.missleGroup.add(aNewMissile);
      this.sound.play("laser");
    }
    
    if (keySpaceObj.isUp === true) {
      this.fireMissile = false;
    }

     this.missleGroup.children.each(function (item) {
      item.y = item.y - 15;
      if (item.y < 0) {
        item.destroy();
      }
    });
  }
}

export default GameScene;
