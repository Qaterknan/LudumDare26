function PointLight( options ){
	var options = options === undefined ? {} : options;
	Object2.call(this, options);
	
	this.distance = options.distance === undefined ? 200 : options.distance;
	this.shadowCastDistance = options.shadowCastDistance === undefined ? 300 : options.shadowCastDistance;
	this.color = options.color === undefined ? new Color("#ffffff", 1) : new Color(options.color,1);
	this.radius = options.radius === undefined ? this.distance*0.8 : options.radius;

	this.collidable = false;

};
PointLight.prototype = Object.create( Object2.prototype );
PointLight.prototype.generateCaches = function (){
	this.gradientCache = createCanvas(this.distance*2,this.distance*2);
	var ctx = this.gradientCache.ctx;
	// gradient cache
	var gradient = ctx.createRadialGradient(this.distance, this.distance, 0, this.distance, this.distance, this.distance);
	gradient.addColorStop(0, this.color.getRGB());
	gradient.addColorStop(1, this.color.getRGBA(0));

	ctx.fillStyle = gradient;
	ctx.fillRect(0, 0, this.distance*2, this.distance*2);

	this.gradientHash = this.distance + this.color.getRGBA();

	// visiblemask cache
	var d = this.shadowCastDistance;
	this.visibleMaskCache = createCanvas(d*2, d*2);
	var ctx = this.visibleMaskCache.ctx;

	var gradient = ctx.createRadialGradient(d,d, 0, d,d,d);
	gradient.addColorStop( 0, 'rgba(0,0,0,1)' );
	gradient.addColorStop( 1, 'rgba(0,0,0,0)' );

	ctx.fillStyle = gradient;
	ctx.fillRect(0, 0, d*2, d*2);

	this.visibleMaskHash = this.distance + ""
};

PointLight.prototype.getGradientCache = function() {
	if(this.gradientCache === undefined || this.gradientHash !== this.distance + this.color.getRGBA() )
		this.generateCaches();
	return this.gradientCache;
};
PointLight.prototype.getVisibleMaskCache = function() {
	if(this.visibleMaskCache === undefined || this.visibleMaskHash !== this.distance + "" )
		this.generateCaches();
	return this.visibleMaskCache;
};
PointLight.prototype.drawBoundingCircle = function (ctx){
	ctx.beginPath();
	ctx.arc(this.position.x,this.position.y,this.radius,0,Math.PI*2);
	ctx.strokeStyle = this.color.getRGB();
	ctx.stroke();
	ctx.closePath();
};
PointLight.prototype.render = function (ctx){
	this.drawBoundingCircle(ctx);
};
PointLight.prototype.glow = function (ctx){
	ctx.drawImage(this.getGradientCache().canvas,this.position.x-this.distance,this.position.y-this.distance);
};
PointLight.prototype.cast = function (ctx){
	ctx.drawImage(this.getVisibleMaskCache().canvas,this.position.x-this.shadowCastDistance,this.position.y-this.shadowCastDistance);
};