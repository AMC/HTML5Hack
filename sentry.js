
/*



Unit


PlayerId
GameId


Server
Spawn at y 



Client
Time Model
know when time to spawn

*/



function Sentry(game) {
    this.distanceFromEarthCenter = 85;
    Entity.call(this, game, 0, this.distanceFromEarthCenter);
    this.sprite = ASSET_MANAGER.getAsset('img/sentry.png');
    this.radius = this.sprite.width / 2;
    this.angle = 0;
		this.direction = 0;
    this.speed = 0;
    this.x = game.ctx.canvas.width /2;
    this.y = game.ctx.canvas.height /2;
}
Sentry.prototype = new Entity();
Sentry.prototype.constructor = Sentry;

Sentry.prototype.update = function(elapsed) {
//    if (this.game.mouse) {
//        this.angle = Math.atan2(this.game.mouse.y, this.game.mouse.x);
//        if (this.angle < 0) {
//            this.angle += Math.PI * 2;
//        }
//        this.x = (Math.cos(this.angle) * this.distanceFromEarthCenter);
//        this.y = (Math.sin(this.angle) * this.distanceFromEarthCenter);
//    }

		function updateMomentum(amount) {
			/*
				angle / speed
				1.6 / 10.5
				-2.5  / 5
				
				ctx.rotate(90 * Math.PI / 180);
			*/
			this.angle += //1.25;
			this.direction  //2.8;
			//adjust the angle 
			//adjust the speed
		}
    if (this.game.click) {
        this.shoot();
    }
		if (this.game.key) {
			switch (this.game.key) {
				case 38:  /* Up arrow was pressed */
					//this.speed += 10;
					updateMomentum(10)
					break;
				case 40:  /* Down arrow was pressed */
					//this.speed -= 10;
					updateMomentum(-10)
					break;
				case 37:  /* Left arrow was pressed */
					this.direction -= (Math.PI * 2)/33 ;
					break;
				case 39:  /* Right arrow was pressed */
					this.direction += (Math.PI * 2) /33;
					break;
			}
		}
    Entity.prototype.move.call(this, elapsed);
    Entity.prototype.update.call(this, elapsed);
}


Sentry.prototype.draw = function(ctx) {
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.direction + Math.PI/2);
    ctx.drawImage(this.sprite, -this.sprite.width/2, -this.sprite.height/2);
    //ctx.drawImage(this.sprite, 0, 0);
    ctx.restore();
    
    Entity.prototype.draw.call(this, ctx);
}

Sentry.prototype.shoot = function() {
    var bullet = new Bullet(this.game, this.x, this.y, this.angle, this.game.click);
    this.game.addEntity(bullet);
//    ASSET_MANAGER.getSound('audio/bullet.mp3').play();
}

function Bullet(game, x, y, angle, explodesAt) {
    Entity.call(this, game, x, y);
    this.angle = angle;
    this.explodesAt = explodesAt;
    this.speed = 250;
    this.radial_distance = 95;
    this.sprite = ASSET_MANAGER.getAsset('img/bullet.png');
    this.animation = new Animation(this.sprite, 7, 0.05, true);
}
Bullet.prototype = new Entity();
Bullet.prototype.constructor = Bullet;

Bullet.prototype.update = function() {
    if (this.outsideScreen()) {
        this.removeFromWorld = true;
    } else if (Math.abs(this.x) >= Math.abs(this.explodesAt.x) || Math.abs(this.y) >= Math.abs(this.explodesAt.y)) {
//        ASSET_MANAGER.getSound('audio/bullet_boom.mp3').play();
        this.game.addEntity(new BulletExplosion(this.game, this.explodesAt.x, this.explodesAt.y));
        this.removeFromWorld = true;
    } else {
        this.x = this.radial_distance * Math.cos(this.angle);
        this.y = this.radial_distance * Math.sin(this.angle);
        this.radial_distance += this.speed * this.game.clockTick;
    }
}

Bullet.prototype.draw = function(ctx) {
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.angle + Math.PI/2);
    ctx.translate(-this.x, -this.y);
    this.animation.drawFrame(this.game.clockTick, ctx, this.x, this.y);
    ctx.restore();
    
    Entity.prototype.draw.call(this, ctx);
}

function BulletExplosion(game, x, y) {
    Entity.call(this, game, x, y);
    this.sprite = ASSET_MANAGER.getAsset('img/explosion.png');
    this.animation = new Animation(this.sprite, 34, 0.05);
    this.radius = this.animation.frameWidth / 2;
}
BulletExplosion.prototype = new Entity();
BulletExplosion.prototype.constructor = BulletExplosion;

BulletExplosion.prototype.update = function() {
    Entity.prototype.update.call(this);
    
    if (this.animation.isDone()) {
        this.removeFromWorld = true;
        return;
    }
    
    this.radius = (this.animation.frameWidth/2) * this.scaleFactor();
    
    for (var i = 0; i < this.game.entities.length; i++) {
        var alien = this.game.entities[i];
        if (alien instanceof Alien && this.isCaughtInExplosion(alien)) {
            console.log("hit!");
            this.game.score += 10;
            alien.explode();
        }
    }
}

BulletExplosion.prototype.isCaughtInExplosion = function(alien) {
    var distance_squared = (((this.x - alien.x) * (this.x - alien.x)) + ((this.y - alien.y) * (this.y - alien.y)));
    var radii_squared = (this.radius + alien.radius) * (this.radius + alien.radius);
    return distance_squared < radii_squared;
}

BulletExplosion.prototype.scaleFactor = function() {
    return 1 + (this.animation.currentFrame() / 3);
}

BulletExplosion.prototype.draw = function(ctx) {
    this.animation.drawFrame(this.game.clockTick, ctx, this.x, this.y, this.scaleFactor());
    
    Entity.prototype.draw.call(this, ctx);
}

/*
function Earth(game) {
    Entity.call(this, game, 0, 0);
    this.sprite = ASSET_MANAGER.getAsset('img/earth.png');
}
Earth.prototype = new Entity();
Earth.prototype.constructor = Earth;

Earth.RADIUS = 67;

Earth.prototype.draw = function(ctx) {
    ctx.drawImage(this.sprite, this.x - this.sprite.width/2, this.y - this.sprite.height/2);
}
*/


