function PointLight( options ){
	var options = options === undefined ? {} : options;
	Object2.call(this, options);
	
	this.distance = options.distance === undefined ? 100 : options.distance;
	this.color = options.color === undefined ? new Color("#ffffff", 1) : new Color(options.color,1);
	this.radius = options.radius === undefined ? this.distance*0.8 : options.radius;
};
PointLight.prototype = Object.create( Object2.prototype );
PointLight.prototype.generateCache = function (){
	this.cache = createCanvas(this.distance*2,this.distance*2);
	var ctx = this.cache.ctx;
	
	var grad = ctx.createRadialGradient(this.distance,this.distance,0,this.distance,this.distance,this.distance);
	grad.addColorStop(0,this.color.getRGB());
	grad.addColorStop(1,this.color.getRGBA(0));
	ctx.fillStyle = grad;
	ctx.beginPath();
	ctx.arc(this.distance,this.distance,this.distance,0,2*Math.PI);
	ctx.fill();
	ctx.closePath();
};
PointLight.prototype.drawBoundingCircle = function (ctx){
	ctx.beginPath();
	ctx.arc(this.position.x,this.position.y,this.radius,0,Math.PI*2);
	ctx.strokeStyle = this.color.getRGB();
	ctx.stroke();
	ctx.closePath();
};
PointLight.prototype.render = function (ctx){
	if(this.cache === undefined){
		this.generateCache();
	}
	ctx.drawImage(this.cache.canvas,this.position.x-this.distance,this.position.y-this.distance);
	this.drawBoundingCircle(ctx);
};