function Texture(image, options){
	var _this = this;
	var options = options === undefined ? {} : options;

	this.image = image;

	this.creationTime = new Date().getTime();

	this.width = this.image.width;
	this.frameWidth = this.width;
	this.height = this.image.height;

	this.flip = options.flip === undefined ? false : options.flip;

	this.clip = options.clip === undefined ? {x: 0, y: 0, width: _this.width, height: _this.height} : options.clip;
	
	this.scale = options.scale === undefined ? new Vector2(1,1) : options.scale;

	this.alpha = options.alpha === undefined ? 1 : options.alpha;

	this.repeat = options.repeat === undefined ? false : options.repeat;
	
	this.animated = !!options.animations;
	if(this.animated){
		this.animations = options.animations;
		this.frameWidth = this.width/options.totalFrames;
		this.switchAnimation(options.currentAnimation);
	}
}

Texture.prototype.switchAnimation = function(name) {
	if(this.animations[name] && (this.currentAnimation != this.animations[name] || this.ended)){
		this.currentAnimation = this.animations[name];

		this.frames = this.currentAnimation.end - this.currentAnimation.start + 1;

		this.animationStart = new Date().getTime();

		this.currentAnimation.cycle = this.currentAnimation.cycle === undefined ? true : this.currentAnimation.cycle;
	}
};

Texture.prototype.getCurrentFrame = function() {
	var delta = new Date().getTime() - this.animationStart;
	if(delta > this.frames * this.currentAnimation.speed && !this.currentAnimation.cycle){
		return this.currentAnimation.end;
	}

	return this.currentAnimation.start + Math.floor(delta/this.currentAnimation.speed) % this.frames;
};

Texture.prototype.draw = function(ctx, width, height) {
	width = width === undefined ? this.frameWidth : width;
	height = height === undefined ? this.height : height;
	ctx.save();
	ctx.scale(this.scale.x, this.scale.y);
	var addX = addY = 0;
	if(this.flip){
		if(this.flip == "x"){
			ctx.scale(-1,1);
			var addX = -this.frameWidth/2;
			ctx.translate(addX, 0);
		}
		else if(this.flip == "y"){
			ctx.scale(1,-1);
			var addY = -this.height/2;
			ctx.translate(0, addY);
		}
	}
	ctx.globalAlpha = this.alpha;
	if(this.animated){
		ctx.fillStyle = "#000";
		ctx.fillText(this.getCurrentFrame(), addX, addY);
		ctx.drawImage(this.image,
			this.getCurrentFrame()*this.frameWidth, 0,
			this.frameWidth, this.height,
			addX, addY,
			width, height
			);
	}
	else {
		if(this.repeat){
			ctx.fillStyle = ctx.createPattern(this.image, "repeat");
			ctx.fillRect(0, 0, width/this.scale.x, height/this.scale.y);
		}
		else {
			ctx.drawImage(this.image, this.clip.x, this.clip.y, this.clip.width, this.clip.height, 0, 0, width, height);
		}
	}
	ctx.restore();
};