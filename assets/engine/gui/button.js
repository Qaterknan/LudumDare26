function Button(options){
	GUIObject.call(this, options);
	
	this.color = options.color === undefined ? new Color() : options.color;

	if(options.texture){
		this.add(options.texture);
	}

	this.onMouseDown = options.onMouseDown;
	this.onMouseUp = options.onMouseUp;
	this.onMouseIn = options.onMouseIn;
	this.onMouseOut = options.onMouseOut;
	this.mouseIn = false;

	return this;
};
Button.prototype = Object.create( GUIObject.prototype );
Button.prototype.render = function(ctx) {
	if(this.renderable){
		ctx.fillStyle = this.color.getRGB();
		ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
	}
};
Button.prototype.mouseCollision = function (x,y,type){
	var inX = x < this.position.x+this.width && x > this.position.x;
	var inY = y < this.position.y+this.height && y > this.position.y;
	if(inX && inY){
		if(type == "mousemove" && !this.mouseIn && this.onMouseIn){
			this.onMouseIn();
			this.mouseIn = true;
		}
		if(type == "mousedown" && this.onMouseDown){
			this.onMouseDown();
		}
		if(type == "mouseup" && this.onMouseUp)
			this.onMouseUp();
	}
	else{
		if(type == "mousemove" && this.mouseIn && this.onMouseOut){
			this.onMouseOut();
			this.mouseIn = false;
		}
	}
};