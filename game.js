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







function Game() {
    GameEngine.call(this);
    //this.showOutlines = true;
    this.lives = 10;
    this.score = 0;
}
Game.prototype = new GameEngine();
Game.prototype.constructor = Game;

Game.prototype.start = function() {
    this.sentry = new Sentry(this);
    //this.earth = new Earth(this);
    //this.addEntity(this.earth);
    this.addEntity(this.sentry);
    GameEngine.prototype.start.call(this);

		this.addEntity(new Alien(this, this.ctx.canvas.width, Math.floor(Math.random() * Math.PI * 2), 50 + Math.floor(Math.random() * 150)));
		this.addEntity(new Alien(this, this.ctx.canvas.width, Math.floor(Math.random() * Math.PI * 2), 50 + Math.floor(Math.random() * 150)));
		this.addEntity(new Alien(this, this.ctx.canvas.width, Math.floor(Math.random() * Math.PI * 2), 50 + Math.floor(Math.random() * 150)));
		this.addEntity(new Alien(this, this.ctx.canvas.width, Math.floor(Math.random() * Math.PI * 2), 50 + Math.floor(Math.random() * 150)));
}

Game.prototype.update = function(elapsed) {
//    if (this.lastAlienAddedAt == null || (this.timer.gameTime - this.lastAlienAddedAt) > 1) {
//        this.addEntity(new Alien(this, this.ctx.canvas.width, Math.floor(Math.random() * Math.PI * 2)));
//        this.lastAlienAddedAt = this.timer.gameTime;
//    }
    
    if (this.score <= 0) {
        // show game over screen
    }
    
    GameEngine.prototype.update.call(this, elapsed);
}

Game.prototype.draw = function() {
    GameEngine.prototype.draw.call(this, function(game) {
        game.drawScore();
        game.drawLives();
    });
}

Game.prototype.drawLives = function() {
    this.ctx.fillStyle = "red";
    this.ctx.font = "bold 2em Arial";
    this.ctx.fillText("Lives: " + this.lives, -this.ctx.canvas.width/2 + 50, this.ctx.canvas.height/2 - 80);
}

Game.prototype.drawScore = function() {
    this.ctx.fillStyle = "red";
    this.ctx.font = "bold 2em Arial";
    this.ctx.fillText("Score: " + this.score, -this.ctx.canvas.width/2 + 50, this.ctx.canvas.height/2 - 50);
}







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