function Alien(game, radial_distance, angle, speed) {
    Entity.call(this, game);
    this.radial_distance = radial_distance;
    this.angle = angle;
    this.speed = speed;
    this.sprite = this.rotateAndCache(ASSET_MANAGER.getAsset('img/alien.png'), this.angle);
    this.radius = this.sprite.height/2;

    this.setCoords();
}
Alien.prototype = new Entity();
Alien.prototype.constructor = Alien;

Alien.prototype.setCoords = function() {
    this.x = this.radial_distance * Math.cos(this.angle);
    this.y = this.radial_distance * Math.sin(this.angle);
}

Alien.prototype.update = function(elapsed) {
    //this.setCoords();
    //this.radial_distance -= this.speed * elapsed ;//this.game.clockTick;

		this.wrapAroundScreen()
    
    Entity.prototype.move.call(this, elapsed);
    Entity.prototype.update.call(this, elapsed);
}

Alien.prototype.hitPlanet = function() {
    var distance_squared = ((this.x * this.x) + (this.y * this.y));
    var radii_squared = (this.radius + Earth.RADIUS) * (this.radius + Earth.RADIUS);
    return false;// distance_squared < radii_squared;
}

Alien.prototype.draw = function(ctx) {
    this.drawSpriteCentered(ctx);
    
    Entity.prototype.draw.call(this, ctx);
}

Alien.prototype.explode = function() {
    this.removeFromWorld = true;
    this.game.addEntity(new AlienExplosion(this.game, this.x, this.y));
//    ASSET_MANAGER.getSound('audio/alien_boom.mp3').play();
}

function AlienExplosion(game, x, y) {
    Entity.call(this, game, x, y);
    this.animation = new Animation(ASSET_MANAGER.getAsset('img/alien-explosion.png'), 69, 0.05);
    this.radius = this.animation.frameWidth / 2;
}
AlienExplosion.prototype = new Entity();
AlienExplosion.prototype.constructor = AlienExplosion;

AlienExplosion.prototype.update = function(elapsed) {
    Entity.prototype.update.call(this, elapsed);
    if (this.animation.isDone()) {
        this.removeFromWorld = true;
    }
}

AlienExplosion.prototype.draw = function(ctx) {
    Entity.prototype.draw.call(this, ctx);
    this.animation.drawFrame(this.game.clockTick, ctx, this.x, this.y);
}

