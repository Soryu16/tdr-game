BasicGame.MainMenu = function (game) {
};

BasicGame.MainMenu.prototype = {

  create: function () {
    this.titlescreen = this.add.tileSprite(
      0, 0, this.game.width, this.game.height, 'titlescreen'
    );
    this.titlescreen.autoScroll(-8, 0);
    this.add.sprite(0, 0, 'title');

    this.titlescreenmusic = this.add.audio('titlescreenmusic');
    this.titlescreenmusic.play();
    this.titlescreenmusic.loop = true;
    this.sound.volume = 1;

    this.loadingText = this.add.text(this.game.width / 2, this.game.height / 2 + 260, "Press Space Bar / Left Mouse Button to start", { font: "20px impact", fill: "#fff" });
    this.loadingText.anchor.setTo(0.5, 0.5);
    this.add.text(this.game.width - 83, this.game.height - 55, "Made by Soryu", { font: "15px arial", fill: "#fff", align: "right"}).anchor.setTo(0.5, 0.5);
    this.add.text(this.game.width - 125, this.game.height - 30, "Image Assets from Bevouliin", { font: "15px arial", fill: "#fff", align: "right"}).anchor.setTo(0.5, 0.5);
  },

  update: function () {
    if (this.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR) || this.input.activePointer.isDown) {
      this.startGame();
    }
  },

  startGame: function (pointer) {
    this.state.start('Game');
    this.titlescreenmusic.stop();
  },

};