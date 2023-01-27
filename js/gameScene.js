/* global Phaser */

// Created by Mikey Gloriani
// Edited with Sam Corbett
// Created on January 12 2023
// This is the game scene

class GameScene extends Phaser.Scene {

  //this creates a large asteroid
  createLargeAsteroid() {
    const largeAsteroidXLocation = Math.floor(Math.random() * 1920) + 1;
    let largeAsteroidXVelocity = Math.floor(Math.random() * 50) + 1;
    largeAsteroidXVelocity *= Math.round(Math.random()) ? 1 : -1;
    const aLargeAsteroid = this.physics.add.sprite(largeAsteroidXLocation, -100, "largeAsteroid");
    aLargeAsteroid.body.velocity.y = 100;
    aLargeAsteroid.body.velocity.x = largeAsteroidXVelocity;
    this.largeAsteroidGroup.add(aLargeAsteroid);
  }
  //this creates a medium asteroid
  createMediumAsteroid() {
    const mediumAsteroidXLocation = Math.floor(Math.random() * 1920) + 1;
    let mediumAsteroidXVelocity = Math.floor(Math.random() * 50) + 10;
    mediumAsteroidXVelocity *= Math.round(Math.random()) ? 1 : -1;
    const aMediumAsteroid = this.physics.add.sprite(mediumAsteroidXLocation, -100, "mediumAsteroid");
    aMediumAsteroid.body.velocity.y = 100;
    aMediumAsteroid.body.velocity.x = mediumAsteroidXVelocity;
    this.mediumAsteroidGroup.add(aMediumAsteroid);
  }

  //this creates a small asteroid
  createSmallAsteroid() {
    const smallAsteroidXLocation = Math.floor(Math.random() * 1920) + 1;
    let smallAsteroidXVelocity = Math.floor(Math.random() * 50) + 10;
    smallAsteroidXVelocity *= Math.round(Math.random()) ? 1 : -1;
    const aSmallAsteroid = this.physics.add.sprite(smallAsteroidXLocation, -100, "smallAsteroid");
    aSmallAsteroid.body.velocity.y = 100;
    aSmallAsteroid.body.velocity.x = smallAsteroidXVelocity;
    this.smallAsteroidGroup.add(aSmallAsteroid);
  }
  constructor() {
    super({ key: "gameScene" });

    this.gameSceneBackgroundImage = null;
    this.ship = null;
    this.fireMissile = false
    this.score = 0;
    this.scoreText = null;
    this.scoreTextStyle = {
      font: "65px Arial",
      fill: "#ffffff",
      align: "center",
    };
    this.gameOverTextStyle = {
      font: "65px Arial",
      fill: "#ff0000",
      align: "center",
    };
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
    this.load.image("mediumAsteroid", './assets/mediumAsteroid.png');
    this.load.image("smallAsteroid", './assets/smallAsteroid.png');
    this.load.image('bullet', './assets/bullet.png');
    this.load.image("backGUIButton", "./assets/backGUIButton.png");

    //sound
    this.load.audio('laser', "assets/laser.mp3")
    this.load.audio('asteroidExplosion', "assets/asteroidExplosion.wav")
    this.load.audio('spaceShipExplosion', "assets/spaceShipExplosion.wav")
  }

  create(data) {
    //background sprite
    this.gameSceneBackgroundImage = this.add
      .sprite(1000, 500, "gameSceneBackground")
      .setScale(2.75);
    this.gameSceneBackgroundImage.x = 1920 / 2;
    this.gameSceneBackgroundImage.y = 1080 / 2;

    //score text
    this.scoreText = this.add.text(
      10,
      10,
      "Score: " + this.score.toString(),
      this.scoreTextStyle
    );

    //ship
    this.ship = this.physics.add.sprite(1920 / 2, 1080 - 100, "spaceShip")

    //missile
    this.missleGroup = this.physics.add.group()

    //asteroids
    this.largeAsteroidGroup = this.add.group();
    this.createLargeAsteroid();

    this.mediumAsteroidGroup = this.add.group();
    this.createMediumAsteroid();

    this.smallAsteroidGroup = this.add.group();
    this.createSmallAsteroid();

    // large Asteroid & Missile Collider
    this.physics.add.collider(
      this.missleGroup,
      this.largeAsteroidGroup,
      function(missileCollide, asteroidCollide) {
        asteroidCollide.destroy();
        missileCollide.destroy();
        this.sound.play("asteroidExplosion");
        this.score = this.score + 1;
        this.scoreText.setText("Score: " + this.score.toString());
        this.createLargeAsteroid();
        this.createLargeAsteroid();
        this.createMediumAsteroid();
      }.bind(this)
    );
    
    // medium Asteroid & Missile Collider
    this.physics.add.collider(
      this.missleGroup,
      this.mediumAsteroidGroup,
      function(missileCollide, asteroidCollide) {
        asteroidCollide.destroy();
        missileCollide.destroy();
        this.sound.play("asteroidExplosion");
        this.score = this.score + 2;
        this.scoreText.setText("Score: " + this.score.toString());
        this.createMediumAsteroid();
        this.createMediumAsteroid();
        this.createSmallAsteroid();
        this.createSmallAsteroid();
      }.bind(this)
    );

     // small Asteroid & Missile Collider
    this.physics.add.collider(
      this.missleGroup,
      this.smallAsteroidGroup,
      function(missileCollide, asteroidCollide) {
        asteroidCollide.destroy();
        missileCollide.destroy();
        this.sound.play("asteroidExplosion");
         this.score = this.score + 3;
        this.scoreText.setText("Score: " + this.score.toString());
      }.bind(this)
    );

    // large Asteroid & SpaceShip Collider
    this.physics.add.collider(
      this.ship,
      this.largeAsteroidGroup,
      function (shipCollide, asteroidCollide) {
        this.sound.play("spaceShipExplosion");
        this.physics.pause();
        asteroidCollide.destroy();
        shipCollide.destroy();
        this.gameOverText = this.add
          .text(
            1920 / 2,
            1080 / 2,
            "Game Over! \nClick To Play Again.",
            this.gameOverTextStyle
          )
          .setOrigin(0.5);
        this.gameOverText.setInteractive({ useHandCursor: true });
        this.gameOverText.on("pointerdown", () =>
          this.scene.start("gameScene")
        );
      }.bind(this)
    );

    // medium Asteroid & SpaceShip Collider
    this.physics.add.collider(
      this.ship,
      this.mediumAsteroidGroup,
      function (shipCollide, asteroidCollide) {
        this.sound.play("spaceShipExplosion");
        this.physics.pause();
        asteroidCollide.destroy();
        shipCollide.destroy();
        this.gameOverText = this.add
          .text(
            1920 / 2,
            1080 / 2,
            "Game Over! \nClick To Play Again.",
            this.gameOverTextStyle
          )
          .setOrigin(0.5);
        this.gameOverText.setInteractive({ useHandCursor: true });
        this.gameOverText.on("pointerdown", () =>
          this.scene.start("gameScene")
        );
      }.bind(this)
    );

    // small Asteroid & SpaceShip Collider
    this.physics.add.collider(
      this.ship,
      this.smallAsteroidGroup,
      function (shipCollide, asteroidCollide) {
        this.sound.play("spaceShipExplosion");
        this.physics.pause();
        asteroidCollide.destroy();
        shipCollide.destroy();
        this.gameOverText = this.add
          .text(
            1920 / 2,
            1080 / 2,
            "Game Over! \nClick To Play Again.",
            this.gameOverTextStyle
          )
          .setOrigin(0.5);
        this.gameOverText.setInteractive({ useHandCursor: true });
        this.gameOverText.on("pointerdown", () =>
          this.scene.start("gameScene")
        );
      }.bind(this)
    );
  }

  update(time, delta) {
    const keyLeftObj = this.input.keyboard.addKey("LEFT")
    const keyRightObj = this.input.keyboard.addKey("RIGHT");
    const keyUpObj = this.input.keyboard.addKey("UP");
    const keyDownObj = this.input.keyboard.addKey("DOWN");
    const keySpaceObj = this.input.keyboard.addKey("SPACE");

    //left movement & warp
    if (keyLeftObj.isDown === true) {
      this.ship.x = this.ship.x - 5;
      if (this.ship.x < 0) {
        this.ship.x = 2000;
      }
    }

    //right movement & warp
    if (keyRightObj.isDown === true) {
      this.ship.x = this.ship.x + 5;
      if (this.ship.x > 1920) {
        this.ship.x = -100;
      }
    }

    //up movement & warp
    if (keyUpObj.isDown === true) {
      this.ship.y = this.ship.y - 5;
      if (this.ship.y < 0) {
        this.ship.y = 1080;
      }
    }

    //down movement & warp
    if (keyDownObj.isDown === true) {
      this.ship.y = this.ship.y + 5;
      if (this.ship.y > 1080) {
        this.ship.y = 0;
      }
    }

    //spacebar for missiles
    if (keySpaceObj.isDown === true) {
      if (this.fireMissile === false) {

        // fire missile
        const aNewMissile = this.physics.add.sprite(this.ship.x, this.ship.y, 'bullet')
        this.missleGroup.add(aNewMissile);
        this.sound.play("laser");
        this.fireMissile = true;
      }
    }

    if (keySpaceObj.isUp === true) {
      this.fireMissile = false;
    }

    this.missleGroup.children.each(function(item) {
      item.y = item.y - 15;
      if (item.y < 0) {
        item.destroy();
      }
    });

    //Large Asteroid Warp
    this.largeAsteroidGroup.children.each(function(respawn) {
      if (respawn.y > 1200) {
        respawn.y = -100;
      }

      if (respawn.x > 1920) {
        respawn.x = -100;
      }
    });

    this.largeAsteroidGroup.children.each(function(respawn) {
      if (respawn.x < 0) {
        respawn.x = 1920;
      }
    });

    //Medium Asteroid Warp
    this.mediumAsteroidGroup.children.each(function(respawn) {
      if (respawn.y > 1200) {
        respawn.y = -100;
      }

      if (respawn.x > 1920) {
        respawn.x = -100;
      }
    });

    this.mediumAsteroidGroup.children.each(function(respawn) {
      if (respawn.x < 0) {
        respawn.x = 1920;
      }
    });

    //Small Asteroid Warp
    this.smallAsteroidGroup.children.each(function(respawn) {
      if (respawn.y > 1200) {
        respawn.y = -100;
      }

      if (respawn.x > 1920) {
        respawn.x = -100;
      }
    });

    this.smallAsteroidGroup.children.each(function(respawn) {
      if (respawn.x < 0) {
        respawn.x = 1920;
      }
    }); 
}
}

export default GameScene;
