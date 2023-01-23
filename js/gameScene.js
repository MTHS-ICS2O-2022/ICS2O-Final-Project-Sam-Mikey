/* global Phaser */

// Created by Mikey Gloriani
// Edited with Sam Corbett
// Created on January 12 2023
// This is the game scene

class GameScene extends Phaser.Scene {
   createAsteroid() {
    const asteroidXLocation = Math.floor(Math.random() * 1920) + 1;
    let asteroidXVelocity = Math.floor(Math.random() * 50) + 1;
    asteroidXVelocity *= Math.round(Math.random()) ? 1 : -1;
    const aLargeAsteroid = this.physics.add.sprite(asteroidXLocation, -100, "largeAsteroid");
    aLargeAsteroid.body.velocity.y = 100;
    aLargeAsteroid.body.velocity.x = asteroidXVelocity;
    this.asteroidGroup.add(aLargeAsteroid);
     if (asteroidXLocation < 0) {
       this.createAsteroid = Math.floor(Math.random() * 1920) + 1
     }
   }
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
    this.load.image("largeAsteroid", './assets/largeAsteroid.png');
    this.load.image('bullet', './assets/bullet.png');
    
    //sound
    this.load.audio('laser', "assets/laser.mp3")
    this.load.audio('asteroidExplosion', "assets/asteroidExplosion.wav")
    this.load.audio('extraLife', "assets/extraLife.mp3")
    this.load.audio('spaceShipExplosion', "assets/spaceShipExplosion.wav")
  }

  create(data) {
    //background sprite
    this.gameSceneBackgroundImage = this.add
      .sprite(1000, 500, "gameSceneBackground")
      .setScale(2.75);
    this.gameSceneBackgroundImage.x = 1920 / 2;
    this.gameSceneBackgroundImage.y = 1080 / 2;

    this.missleGroup = this.physics.add.group()

    this.asteroidGroup = this.add.group();
    this.createAsteroid();
    
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
      if (this.fireMissile === false){
        const aNewMissile = this.physics.add.sprite(this.ship.x, this.ship.y, 'bullet')
      this.missleGroup.add(aNewMissile);
      this.sound.play("laser");
      }
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
