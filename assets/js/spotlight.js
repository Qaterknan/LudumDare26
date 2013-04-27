function SpotLight( options ){
	var options = options === undefined ? {} : options;
	Object2.call(this, options);
	
	this.distance = options.distance === undefined ? 100 : options.distance;
	this.range = options.range === undefined ? Math.PI/4 : options.range;
	this.direction = options.direction === undefined ? new Vector2(1,1) : options.direction;
	this.color = options.color === undefined ? new Color("#ffffff",1) : new Color(options.color, 1);
};
SpotLight.prototype = Object.create( Object2.prototype );
SpotLight.prototype.render = function (ctx){
	var grad = ctx.createRadialGradient(0, 0, 0, 0, 0, this.distance);
	grad.addColorStop(0,this.color.getRGB());
	grad.addColorStop(1,this.color.getRGBA(0));
	this.direction.setLength(this.distance);
	var angle = this.direction.getAngle();
	if(!angle) var angle = 0;
	ctx.save();
	ctx.fillStyle = grad;
	ctx.translate(this.position.x,this.position.y);
	ctx.beginPath();
	ctx.moveTo(0,0);
	ctx.lineTo(this.direction.x*Math.cos(this.range/2),this.direction.y*Math.sin(this.range/2));
	ctx.arc(0,0,this.distance,angle-this.range/2,angle+this.range/2);
	ctx.stroke();
	ctx.closePath();
	ctx.restore();
};