
BasicGame.Game = function (game) {
};

BasicGame.Game.prototype = {

  create: function () {
    this.createBackground();
    this.createPlayer();
    this.createMovement();
    this.createBullets();
    this.createEnemies();
    this.createExplosions();
    this.createIcons();
    this.createText();
    this.createAudio();
  },

  update: function () {
    this.updateInput();
    this.updateSpawn();
    this.updateCollisions();
    this.updateEnemyShoot();
    this.updateEffects();
  },

  createBackground: function () {
    this.backpyramids = this.add.tileSprite(
      0, 0, this.game.width, this.game.height, 'backpyramids'
    );
    this.midpyramids2 = this.add.tileSprite(
      0, 0, this.game.width, this.game.height, 'midpyramids2'
    );
    this.midpyramids1 = this.add.tileSprite(
      0, 0, this.game.width, this.game.height, 'midpyramids1'
    );
    this.uppyramids2 = this.add.tileSprite(
      0, 0, this.game.width, this.game.height, 'uppyramids2'
    );
    this.uppyramids1 = this.add.tileSprite(
      0, 0, this.game.width, this.game.height, 'uppyramids1'
    );
    this.backpyramids.autoScroll(-8, 0);
    this.midpyramids2.autoScroll(-16, 0);
    this.midpyramids1.autoScroll(-24, 0);
    this.uppyramids2.autoScroll(-32, 0);
    this.uppyramids1.autoScroll(-32, 0);
  },

  createPlayer: function () {
    this.playerbrownbird = this.add.sprite(
      this.game.width - 950, this.game.height / 2, 'playerbrownbird'
    );
    this.playerbrownbird.animations.add('fly', [0, 1, 2, 3], 10, true);
    this.playerbrownbird.animations.add('ghost', [4, 0, 4, 1], 10, true);
    this.playerbrownbird.play('fly');
    this.playerbrownbird.anchor.setTo(0.5,0.5);
    this.physics.enable(this.playerbrownbird, Phaser.Physics.ARCADE);
    this.playerbrownbird.speed = 300;
    this.playerbrownbird.body.collideWorldBounds = true;
    this.playerbrownbird.body.setSize(30, 25, 0, 0);
    this.shotLevel = 0;
  },

  createMovement: function () {
    this.arrows = this.input.keyboard.createCursorKeys();

    this.wasd = {
      up: this.input.keyboard.addKey(Phaser.Keyboard.W),
      down: this.input.keyboard.addKey(Phaser.Keyboard.S),
      left: this.input.keyboard.addKey(Phaser.Keyboard.A),
      right: this.input.keyboard.addKey(Phaser.Keyboard.D),
    }
  },

  createBullets: function () {
    this.enemyBullets = this.add.group();
    this.enemyBullets.enableBody = true;
    this.enemyBullets.physicsBodyType = Phaser.Physics.ARCADE;
    this.enemyBullets.createMultiple(100, 'enemybullet');
    this.enemyBullets.setAll('anchor.x', 0.5);
    this.enemyBullets.setAll('anchor.y', 0.5);
    this.enemyBullets.setAll('outOfBoundsKill', true);
    this.enemyBullets.setAll('checkWorldBounds', true);
    this.enemyBullets.setAll('reward', 0, false, false, 0, true);

    this.bullets = this.add.group();
    this.bullets.enableBody = true;
    this.bullets.physicsBodyType = Phaser.Physics.ARCADE;
    this.bullets.createMultiple(100, 'allybullet');
    this.bullets.setAll('anchor.x', 0.5);
    this.bullets.setAll('anchor.y', 0.5);
    this.bullets.setAll('outOfBoundsKill', true);
    this.bullets.setAll('checkWorldBounds', true);
    this.bulletXY = 0;
    this.bulletDelay = 250;
  },

  createEnemies: function () {
    this.enemies = this.add.group();
    this.enemies.enableBody = true;
    this.enemies.physicsBodyType = Phaser.Physics.ARCADE;
    this.enemies.createMultiple(80, 'greenenemy');
    this.enemies.setAll('anchor.x', 0.5);
    this.enemies.setAll('anchor.y', 0.5);
    this.enemies.setAll('outOfBoundsKill', true);
    this.enemies.setAll('checkWorldBounds', true);
    this.enemies.setAll('reward', 100, false, false, 0, true);
    this.enemies.setAll('dropRate', 0.1, false, false, 0, true);
    this.enemies.forEach(function (greenenemy) {
      greenenemy.animations.add('fly', [ 0, 1, 2, 3 ], 10, true);
      greenenemy.animations.add('hit', [ 4, 1, 4, 2 ], 10, false);
      greenenemy.events.onAnimationComplete.add( function (e) {
        e.play('fly');
      }, this);
    });
    this.enemyXY = 0;
    this.enemyDelay = 500;

    this.skeletons = this.add.group();
    this.skeletons.enableBody = true;
    this.skeletons.physicsBodyType = Phaser.Physics.ARCADE;
    this.skeletons.createMultiple(75, 'skeletonenemy');
    this.skeletons.setAll('anchor.x', 0.5);
    this.skeletons.setAll('anchor.y', 0.5);
    this.skeletons.setAll('outOfBoundsKill', true);
    this.skeletons.setAll('checkWorldBounds', true);
    this.skeletons.setAll('reward', 300, false, false, 0, true);
    this.skeletons.setAll('dropRate', 0.2, false, false, 0, true);
    this.skeletons.forEach(function (greenenemy) {
      greenenemy.animations.add('fly', [0, 1], 10, true);
      greenenemy.animations.add('hit', [3, 2, 3, 2], 10, false);
      greenenemy.events.onAnimationComplete.add( function (e) {
        e.play('fly');
      }, this);
    });
    this.skeletonXY = this.time.now + Phaser.Timer.SECOND * 5;
    this.skeletonDelay = Phaser.Timer.SECOND * 1.5;

    this.bosses = this.add.group();
    this.bosses.enableBody = true;
    this.bosses.physicsBodyType = Phaser.Physics.ARCADE;
    this.bosses.createMultiple(1, 'blueboss');
    this.bosses.setAll('anchor.x', 0.5);
    this.bosses.setAll('anchor.y', 0.5);
    this.bosses.setAll('outOfBoundsKill', true);
    this.bosses.setAll('checkWorldBounds', true);
    this.bosses.setAll('reward', 5000, false, false, 0, true);
    this.bosses.setAll('dropRate', 0, false, false, 0, true);
    this.bosses.forEach(function (greenenemy) {
      greenenemy.animations.add('fly', [0, 1], 7, true);
      greenenemy.animations.add('hit', [3, 2, 3, 2], 7, false);
      greenenemy.events.onAnimationComplete.add( function (e) {
        e.play('fly');
      }, this);
    });
    this.blueboss = this.bosses.getTop();
    this.bossIncoming = false;
  },

  createExplosions: function () {
    this.explosions = this.add.group();
    this.explosions.enableBody = true;
    this.explosions.physicsBodyType = Phaser.Physics.ARCADE;
    this.explosions.createMultiple(100, 'cexplosion');
    this.explosions.setAll('anchor.x', 0.5);
    this.explosions.setAll('anchor.y', 0.5);
    this.explosions.forEach(function (cexplosion) {
      cexplosion.animations.add('boom');
    });
  },

  createIcons: function () {
    this.powerUps = this.add.group();
    this.powerUps.enableBody = true;
    this.powerUps.physicsBodyType = Phaser.Physics.ARCADE;
    this.powerUps.createMultiple(5, 'powerupblue');
    this.powerUps.setAll('anchor.x', 0.5);
    this.powerUps.setAll('anchor.y', 0.5);
    this.powerUps.setAll('outOfBoundsKill', true);
    this.powerUps.setAll('checkWorldBounds', true);
    this.powerUps.setAll('reward', 50, false, false, 0, true);

    this.lives = this.add.group();
    var livesXY = this.game.width - 1050 - (3 * 30);
    for (var i = 0; i < 3; i++) {
      var life = this.lives.create(
        livesXY + (30 * i), 30, 'playerbrownbird'
      );
      life.scale.setTo(0.5, 0.5);
      life.anchor.setTo(0.5, 0.5);
    }
  },

  createText: function () {
    this.guide = this.add.text(
      this.game.width / 2,
      this.game.height - 170,
      'Use WASD / Arrow Keys to move, Use Space Bar to shoot\n' +
      'Left Mouse Button does both',
      {font: '30px impact', fill: '#000', align: 'center'}
    );
    this.guide.anchor.setTo(0.5, 0.5);
    this.guideOut = this.time.now + 10000;

    this.score = 0;
    this.scoreText = this.add.text(
      this.game.width / 2, 30, '' + this.score,
      {font: '25px impact', fill: '#000', align: 'center'}
    );
    this.scoreText.anchor.setTo(0.5, 0.5);
  },

  createAudio: function () {
    this.sound.volume = 0.8;
    this.playerbbshootSound = this.add.audio('playerbbshoot');
    this.bluebossSound = this.add.audio('bluebossshoot');
    this.explosionSound = this.add.audio('explosion');

    this.backgroundmusic = this.add.audio('backgroundmusic');
    this.backgroundmusic.loop = true;

    if (this.backpyramids.exists) {
      this.backgroundmusic.play();
    }
  },

  updateInput: function () {
    this.playerbrownbird.body.velocity.x = 0;
    this.playerbrownbird.body.velocity.y = 0;

    if (this.wasd.left.isDown || this.arrows.left.isDown) {
      this.playerbrownbird.body.velocity.x = -this.playerbrownbird.speed;
    } else if (this.wasd.right.isDown || this.arrows.right.isDown) {
      this.playerbrownbird.body.velocity.x = this.playerbrownbird.speed;
    } 

    if (this.wasd.up.isDown || this.arrows.up.isDown) {
      this.playerbrownbird.body.velocity.y = -this.playerbrownbird.speed;
    } else if (this.wasd.down.isDown || this.arrows.down.isDown) {
      this.playerbrownbird.body.velocity.y = this.playerbrownbird.speed;
    }

    if (this.input.activePointer.isDown && 
        this.physics.arcade.distanceToPointer(this.playerbrownbird) > 15) {
      this.physics.arcade.moveToPointer(
        this.playerbrownbird, this.playerbrownbird.speed
      );
    }

    if (this.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR) ||
        this.input.activePointer.isDown) {
      if (this.backText && this.backText.exists) {
        this.restartGame();
      } else {
        this.shoot();
      }
    }
  },

  updateSpawn: function () {
    if (this.enemyXY < this.time.now && this.enemies.countDead() > 0) {
      this.enemyXY = this.time.now + this.enemyDelay;
      var greenenemy = this.enemies.getFirstExists(false);
      greenenemy.reset(
        this.game.width, 
        this.rnd.integerInRange(10, this.game.height - 10), 2
      );
      greenenemy.body.velocity.x = this.rnd.integerInRange(-50, -100);
      greenenemy.play('fly');
    }

    if (this.skeletonXY < this.time.now && this.skeletons.countDead() > 0) {
      this.skeletonXY = this.time.now + this.skeletonDelay;
      var skeleton = this.skeletons.getFirstExists(false);
      skeleton.reset(
        this.game.width, 
        this.rnd.integerInRange(10, this.game.height - 10), 5
      );
      var SKdirection = this.rnd.integerInRange(10, this.game.height - 10);
      skeleton.forward = this.physics.arcade.moveToXY(
        skeleton, 0, SKdirection,
        this.rnd.integerInRange(40, 80));
      skeleton.play('fly');
      skeleton.bulletXY = 0;
    }
  },

  updateCollisions: function () {
    this.physics.arcade.overlap(
      this.bullets, this.enemies, this.greenenemyHit, null, this
    );

    this.physics.arcade.overlap(
      this.bullets, this.skeletons, this.greenenemyHit, null, this
    );

    this.physics.arcade.overlap(
      this.playerbrownbird, this.enemies, this.playerHit, null, this
    );

    this.physics.arcade.overlap(
      this.playerbrownbird, this.skeletons, this.playerHit, null, this
    );

    this.physics.arcade.overlap(
      this.playerbrownbird, this.enemyBullets, this.playerHit, null, this
    );

    this.physics.arcade.overlap(
      this.playerbrownbird, this.powerUps, this.playerPowerUp, null, this
    );

    if (this.bossIncoming === false) {
      this.physics.arcade.overlap(
        this.bullets, this.bosses, this.greenenemyHit, null, this
      );

      this.physics.arcade.overlap(
        this.playerbrownbird, this.bosses, this.playerHit, null, this
      );
    }
  },

  updateEnemyShoot: function() {
    this.skeletons.forEachAlive(function (greenenemy) {
      if (this.time.now > greenenemy.bulletXY && this.enemyBullets.countDead() > 0) {
        var allybullet = this.enemyBullets.getFirstExists(false);
        allybullet.reset(greenenemy.x, greenenemy.y);
        this.physics.arcade.moveToObject(allybullet, this.playerbrownbird, 600);
        greenenemy.bulletXY = this.time.now + Phaser.Timer.SECOND * 2;
      }
    }, this);

    if (this.bossIncoming === false && this.blueboss.alive &&
        this.blueboss.bulletXY < this.time.now &&
        this.enemyBullets.countDead() >= 10) {

      this.blueboss.bulletXY = this.time.now + Phaser.Timer.SECOND;
      this.bluebossSound.play();

      for (var i = 0; i < 5; i++) {
        var bossFirstBullets = this.enemyBullets.getFirstExists(false);
        bossFirstBullets.reset(this.blueboss.x -80, this.blueboss.y - 10 - i * 10);
        var bossSecondBullets = this.enemyBullets.getFirstExists(false);
        bossSecondBullets.reset(this.blueboss.x -80, this.blueboss.y + 10 + i * 10);

        if (this.blueboss.health > 300 / 2) {
          this.physics.arcade.moveToObject(bossFirstBullets, this.playerbrownbird, 150);
          this.physics.arcade.moveToObject(bossSecondBullets, this.playerbrownbird, 150);
        } else {
          this.physics.arcade.moveToXY(
            bossFirstBullets, this.playerbrownbird.x, this.playerbrownbird.y - i * 100, 150
          );
          this.physics.arcade.moveToXY(
            bossSecondBullets, this.playerbrownbird.x, this.playerbrownbird.y  + i * 100, 150
          );
        }
      }
    }
  },

  updateEffects: function () {
    if (this.guide.exists && this.time.now > this.guideOut) {
        this.guide.destroy();
    }

    if (this.ghostTime && this.ghostTime < this.time.now) {
      this.ghostTime = null;
      this.playerbrownbird.play('fly');
    }

    if (this.showBack && this.time.now > this.showBack) {
      this.backText = this.add.text(
        this.game.width / 2, this.game.height / 2 + 30,
        'Press Space Bar / Left Mouse Button to return to the Main Menu',
        { font: '20px impact', fill: '#000'}
      );
      this.backText.anchor.setTo(0.5, 0.5);
      this.showBack = false;
    }

    if (this.bossIncoming && this.blueboss.x < this.game.width - 120) {
      this.bossIncoming = false;
      this.blueboss.bulletXY = 0;
      this.blueboss.body.velocity.x = 0;
      this.blueboss.body.velocity.y = 200;
      this.blueboss.body.bounce.y = 1;
      this.blueboss.body.collideWorldBounds = true;
    }
  },

  explode: function (sprite) {
    if (this.explosions.countDead() === 0) {
      return;
    }
    var cexplosion = this.explosions.getFirstExists(false);
    cexplosion.reset(sprite.x, sprite.y);
    cexplosion.play('boom', 10, false, true);
    cexplosion.body.velocity.x = sprite.body.velocity.x;
    cexplosion.body.velocity.y = sprite.body.velocity.y;
  },

  playerHit: function (playerbrownbird, greenenemy) {
    if (this.ghostTime && this.ghostTime > this.time.now) {
      return;
    }
    this.damageEnemy(greenenemy, 5);
    var life = this.lives.getFirstAlive();
    if (life !== null) {
      life.kill();
      this.shotLevel = 0;
      this.ghostTime = this.time.now + Phaser.Timer.SECOND * 2;
      this.playerbrownbird.play('ghost');
    } else {
      this.explode(playerbrownbird);
      playerbrownbird.kill();
      this.endGame(false);
    }
  },

  shoot: function() {
    if (!this.playerbrownbird.alive || this.bulletXY > this.time.now) {
      return;
    }

    this.bulletXY = this.time.now + this.bulletDelay;
    this.playerbbshootSound.play();

    var allybullet;
    if (this.shotLevel === 0) {
      if (this.bullets.countDead() === 0) {
        return;
      }
      allybullet = this.bullets.getFirstExists(false);
      allybullet.reset(this.playerbrownbird.x + 25, this.playerbrownbird.y);
      allybullet.body.velocity.x = 750;
    } else {
      if (this.bullets.countDead() < this.shotLevel * 2) {
        return;
      }
      for (var i = 0; i < this.shotLevel; i++) {
        allybullet = this.bullets.getFirstExists(false);
        allybullet.reset(
          this.playerbrownbird.x + 25, this.playerbrownbird.y - (10 + i * 6)
          );
        this.physics.arcade.velocityFromAngle(0 - i * 10, 750, allybullet.body.velocity);
        allybullet = this.bullets.getFirstExists(false);
        allybullet.reset(
          this.playerbrownbird.x + 25, this.playerbrownbird.y + (10 + i * 6)
          );
        this.physics.arcade.velocityFromAngle(0 + i * 10, 750, allybullet.body.velocity);
      }
    }
  },

  greenenemyHit: function (allybullet, greenenemy) {
    allybullet.kill();
    this.damageEnemy(greenenemy, 1);
  },

  damageEnemy: function (greenenemy, damage) {
    greenenemy.damage(damage);
    if (greenenemy.alive) {
      greenenemy.play('hit');
    } else {
      this.explode(greenenemy);
      this.explosionSound.play();
      this.spawnPowerUp(greenenemy);
      this.plusScore(greenenemy.reward);
      if (greenenemy.key === 'blueboss') {
        this.enemies.destroy();
        this.skeletons.destroy();
        this.bosses.destroy();
        this.enemyBullets.destroy();
        this.endGame(true);
      }
    }
  },

  plusScore: function (score) {
    this.score += score;
    this.scoreText.text = this.score;
    if (this.score >= 20000 && this.bosses.countDead() == 1) {
      this.spawnBoss();
    }
  },

  spawnBoss: function () {
    this.bossIncoming = true;
    if (this.bossIncoming = true) {
        this.enemies.destroy();
        this.skeletons.destroy();
    }
    this.blueboss.reset(this.game.width, this.game.height / 2, 300);
    this.physics.enable(this.blueboss, Phaser.Physics.ARCADE);
    this.blueboss.body.velocity.x = -15;
    this.blueboss.play('fly');
  },

  spawnPowerUp: function (greenenemy) {
    if (this.powerUps.countDead() === 0 || this.shotLevel === 2) {
      return;
    }

    if (this.rnd.frac() < greenenemy.dropRate) {
      var powerUp = this.powerUps.getFirstExists(false);
      powerUp.reset(greenenemy.x, greenenemy.y);
      powerUp.body.velocity.x = -100;
    }
  },

  playerPowerUp: function (playerbrownbird, powerUp) {
    this.plusScore(powerUp.reward);
    powerUp.kill();
    if (this.shotLevel < 2) {
      this.shotLevel++;
    }
  },

  endGame: function (win) {
    if (this.endText && this.endText.exists) {
      return;
    }

    var winLose = win ? 'Victory!' : 'Game Over!';
    this.endText = this.add.text(
      this.game.width / 2, this.game.height / 2 - 60, winLose,
      { font: '72px impact', fill: '#000'}
    );
    this.endText.anchor.setTo(0.5, 0);
    this.showBack = this.time.now + Phaser.Timer.SECOND * 2;
  },

  restartGame: function (pointer) {
    this.state.start('MainMenu');
    this.backgroundmusic.stop();
  },

};