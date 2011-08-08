function Entity(game, x, y) {
    this.game = game;
    this.x = x;
    this.y = y;
		this.speed = 100;
    this.removeFromWorld = false;
}
Entity.prototype.update = function(elapsed) {
}

Entity.prototype.move = function(elapsed) {

	// Determine how far this sprite will move this frame
	var distance = this.speed * elapsed;

	// Apply the movement distance to the sprite's current position taking into account its direction
	this.x -= distance * Math.cos(this.angle);
	this.y -= distance * Math.sin(this.angle);
}

Entity.prototype.draw = function(ctx) {
    if (this.game.showOutlines && this.radius) {
        ctx.beginPath();
        ctx.strokeStyle = "green";
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI*2, false);
        ctx.stroke();
        ctx.closePath();
    }
}

Entity.prototype.drawSpriteCentered = function(ctx) {
    if (this.sprite && this.x && this.y) {
        var x = this.x - this.sprite.width/2;
        var y = this.y - this.sprite.height/2;
        ctx.drawImage(this.sprite, x, y);
    }
}

Entity.prototype.outsideScreen = function() {
    return (this.x > this.game.surfaceWidth || this.x < 0 ||
        this.y > this.game.surfaceHeight || this.y < 0);
}

Entity.prototype.wrapAroundScreen = function() {
		if (this.x > this.game.surfaceWidth ) {
			this.x = this.x - this.game.surfaceWidth ;
		} else if (this.x < 0) {
			this.x = this.x + this.game.surfaceWidth;
		}

		//Math.floor(Math.random() * Math.PI * 2)

		if (this.y > this.game.surfaceHeight) {
			this.y = this.y - this.game.surfaceHeight;
		} else if (this.y < 0) {
			this.y = this.y + this.game.surfaceHeight;
		}

//        this.angle = Math.atan2(this.game.mouse.y, this.game.mouse.x);
//        if (this.angle < 0) {
//            this.angle += Math.PI * 2;
//        }
//        this.x = (Math.cos(this.angle) * this.distanceFromEarthCenter);
//        this.y = (Math.sin(this.angle) * this.distanceFromEarthCenter);


}

Entity.prototype.rotateAndCache = function(image, angle) {
    var offscreenCanvas = document.createElement('canvas');
    var size = Math.max(image.width, image.height);
    offscreenCanvas.width = size;
    offscreenCanvas.height = size;
    var offscreenCtx = offscreenCanvas.getContext('2d');
    offscreenCtx.save();
    offscreenCtx.translate(size/2, size/2);
    offscreenCtx.rotate(angle + Math.PI/2);
    offscreenCtx.drawImage(image, -(image.width/2), -(image.height/2));
    offscreenCtx.restore();
    //offscreenCtx.strokeStyle = "red";
    //offscreenCtx.strokeRect(0,0,size,size);
    return offscreenCanvas;
}
