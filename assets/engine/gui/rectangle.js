function Rectangle(options){
	
	var options = options === undefined ? {} : options;
	
	GUIObject.call(this, options);

	this.texture = options.texture === undefined ? false : options.texture;
	this.color = options.color === undefined ? "#AAAAAA" : options.color;
}
Rectangle.prototype = new GUIObject();
Rectangle.prototype.render = function(ctx){
	ctx.save();
	ctx.translate(this.position.x,this.position.y);
	ctx.rotate(this.rotation);

	if(this.texture){
		this.texture.draw(ctx, this.width, this.height);
	}
	else {
		ctx.fillStyle = this.color;
		ctx.fillRect(0, 0, this.width, this.height);
	}

	ctx.restore();
}