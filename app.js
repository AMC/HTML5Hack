soundManager.url = 'swf/';
soundManager.flashVersion = 9;
soundManager.debugFlash = false;
soundManager.debugMode = false;

window.requestAnimFrame = (function(){
      return  window.requestAnimationFrame       ||
              window.webkitRequestAnimationFrame ||
              window.mozRequestAnimationFrame    ||
              window.oRequestAnimationFrame      ||
              window.msRequestAnimationFrame     ||
              function(/* function */ callback, /* DOMElement */ element){
                window.setTimeout(callback, 1000 / 60);
              };
})();





var canvas = document.getElementById('surface');
var ctx = canvas.getContext('2d');
var game = new Game();
var ASSET_MANAGER = new AssetManager();

ASSET_MANAGER.queueDownload('img/alien-explosion.png');
ASSET_MANAGER.queueDownload('img/alien.png');
ASSET_MANAGER.queueDownload('img/bullet.png');
ASSET_MANAGER.queueDownload('img/earth.png');
ASSET_MANAGER.queueDownload('img/sentry.png');
ASSET_MANAGER.queueDownload('img/explosion.png');
//ASSET_MANAGER.queueSound('alien-boom', 'audio/alien_boom.mp3');
//ASSET_MANAGER.queueSound('bullet-boom', 'audio/bullet_boom.mp3');
//ASSET_MANAGER.queueSound('bullet', 'audio/bullet.mp3');

ASSET_MANAGER.downloadAll(function() {
    game.init(ctx);
    game.start();
});