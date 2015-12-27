BasicGame.Preloader = function (game) {
  this.background = null;
  this.preloadBar = null;
};

BasicGame.Preloader.prototype = {

  preload: function () {
    this.stage.backgroundColor ='#282A11';

    this.preloadBar = this.add.sprite(this.game.width / 2 - 175, this.game.height / 2, 'loadingbar');
    this.add.text(this.game.width / 2, this.game.height / 2 - 25, "Loading", {font: "25px impact", fill: "#000"}).anchor.setTo(0.5, 0.5);
    
    this.load.setPreloadSprite(this.preloadBar);

    this.load.image('titlescreen', 'assets/images/titlescreen.png');
    this.load.image('title', 'assets/images/title.png');
    this.load.image('backpyramids', 'assets/images/backpyramids.png');
    this.load.image('midpyramids2', 'assets/images/midpyramids2.png');
    this.load.image('midpyramids1', 'assets/images/midpyramids1.png');
    this.load.image('uppyramids2', 'assets/images/uppyramids2.png');
    this.load.image('uppyramids1', 'assets/images/uppyramids1.png');
    this.load.spritesheet(
      'playerbrownbird', 'assets/images/playerbrownbird.png', 60, 50
    );
    this.load.image('allybullet', 'assets/images/allybullet.png');
    this.load.spritesheet('greenenemy', 'assets/images/greenenemy.png', 69, 50);
    this.load.image('enemybullet', 'assets/images/enemybullet.png');
    this.load.image('powerupblue', 'assets/images/powerupblue.png');
    this.load.spritesheet('skeletonenemy', 'assets/images/skeletonenemy.png', 60, 65)
    this.load.spritesheet('cexplosion', 'assets/images/cexplosion.png', 60, 60);
    this.load.spritesheet('blueboss', 'assets/images/blueboss.png', 168, 200);
    this.load.audio('playerbbshoot', 'assets/audios/playerbbshoot.ogg');
    this.load.audio('bluebossshoot', 'assets/audios/bluebossshoot.ogg');
    this.load.audio('explosion', 'assets/audios/explosion.ogg');
    this.load.audio('titlescreenmusic', 'assets/audios/titlescreenmusic.ogg');
    this.load.audio('backgroundmusic', 'assets/audios/backgroundmusic.ogg');
  },

  create: function () {
    this.preloadBar.cropEnabled = false;
  },

  update: function () {
      this.state.start('MainMenu');
  }

};