var BasicGame = {
};

BasicGame.Boot = function (game) {
};

BasicGame.Boot.prototype = {

  init: function () {
    this.scale.pageAlignHorizontally = true;
    this.scale.pageAlignVertically = true;
  },

  preload: function () {
    this.load.image('loadingbar', 'assets/images/loadingbar.png');
  },

  create: function () {
    this.state.start('Preloader');
  }

};