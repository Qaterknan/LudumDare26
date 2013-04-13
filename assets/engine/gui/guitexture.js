function GUITexture(image, options){
	
	var options = options === undefined ? {} : options;
	
	GUIObject.call(this, options);

	this.image = image;
	this.repeat = options.repeat === undefined ? false : options.repeat;

	this.scale = options.scale === undefined ? 1 : options.scale;
}
GUITexture.prototype = new GUIObject();
GUITexture.prototype.render = function(ctx){
	if(this.repeat){
		if(this.scale !== 1){
			ctx.save();
			ctx.scale(this.scale, this.scale);
		}
		ctx.fillStyle = ctx.createPattern(this.image.image, "repeat");
		ctx.fillRect(this.x, this.y, this.width, this.height);
		if(this.scale !== 1){
			ctx.restore();
		}
	}
	else {
		this.image.draw(ctx, this.x, this.y, this.width, this.height);
	}
}