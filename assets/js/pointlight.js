function PointLight( options ){
	var options = options === undefined ? {} : options;
	Object2.call(this, options);
	
	this.distance = options.distance === undefined ? 200 : options.distance;
	this.shadowCastDistance = options.shadowCastDistance === undefined ? this.distance*4 : options.shadowCastDistance;
	this.intensity = options.intensity === undefined ? 1 : options.intensity;
	this.color = options.color === undefined ? new Color("#ffffff", 1) : new Color(options.color,1);
	this.radius = options.radius === undefined ? this.distance*0.85 : options.radius;

	// this.efect = options.efect === undefined ? undefined : options.efect;
	// this.postefect = options.postefect === undefined ? undefined : options.postefect;

	this.collidable = false;
	
	this.range = options.range === undefined ? 2*PI : options.range;
	this.direction = options.direction === undefined ? 0 : options.direction;
	var _this = this;
	this.ambientOptions = {
		color : _this.color,
		alpha : 0.1,
		size: 4,
		fade : 0.0002,
		life: _this.distance*100/6,
		velocity: new Vector2(0,0),
		position: new Vector2(0,0),
	};
	this.ambientParticles = new ParticleSystem({},
		this.ambientOptions,
		{
			randomize : {
				velocity: {
					x: {
						min: -1,
						max: 1,
					},
					y: {
						min: -1,
						max: 1,
					},
				},
				//~ position: {
					//~ x: {
						//~ min: -distance/2,
						//~ max: distance/2,
					//~ },
					//~ y: {
						//~ min: -distance/2,
						//~ max: distance/2,
					//~ },
				//~ },
			},
			emiting : true,
			amount: 0.05,
		}
	);
	this.add(this.ambientParticles);
	if(this.range != 2*PI)
		this.ambientParticles.emiting = false;
};
PointLight.prototype = Object.create( Object2.prototype );

PointLight.prototype.generateCaches = function (){
	if(this.range == 2*PI){
		this.gradientCache = createCanvas(this.distance*2,this.distance*2);
		var ctx = this.gradientCache.ctx;
		// gradient cache
		var gradient = ctx.createRadialGradient(this.distance, this.distance, 0, this.distance, this.distance, this.distance);
		gradient.addColorStop(0, this.color.getRGBA(this.intensity));
		gradient.addColorStop(1, this.color.getRGBA(0));

		ctx.fillStyle = gradient;
		ctx.fillRect(0, 0, this.distance*2, this.distance*2);

		this.gradientHash = this.distance + this.color.getRGBA() + this.direction;

		// visiblemask cache
		var d = this.shadowCastDistance;
		
		this.visibleMaskCache = createCanvas(d*2, d*2);
		var ctx = this.visibleMaskCache.ctx;

		var gradient = ctx.createRadialGradient(d,d, 0, d,d,d);
		gradient.addColorStop( 0, 'rgba(0,0,0,'+this.intensity+')' );
		gradient.addColorStop( 1, 'rgba(0,0,0,0)' );

		ctx.fillStyle = gradient;
		ctx.fillRect(0, 0, d*2, d*2);

		this.visibleMaskHash = this.distance + ""
	}
	else {
		this.gradientCache = createCanvas(this.distance*2,this.distance*2);
		var ctx = this.gradientCache.ctx;
		// gradient cache
		var gradient = ctx.createRadialGradient(this.distance, this.distance, 0, this.distance, this.distance, this.distance);
		gradient.addColorStop(0, this.color.getRGBA(this.intensity));
		gradient.addColorStop(1, this.color.getRGBA(0));

		ctx.beginPath();
		ctx.fillStyle = gradient;
		var alpha = this.direction-this.range/2-PI/2;
		var beta = this.direction+this.range/2-PI/2;
		var d = this.distance*1.41;
		ctx.moveTo(this.distance, this.distance);
		ctx.lineTo(this.distance + d * Math.cos(alpha), this.distance + d * Math.sin(alpha));
		ctx.lineTo(this.distance + d * Math.cos(beta), this.distance + d * Math.sin(beta));
		ctx.fill();
		ctx.closePath();

		this.gradientHash = this.distance + this.color.getRGBA() + this.direction;

		// visiblemask cache
		var d = this.shadowCastDistance;
		this.visibleMaskCache = createCanvas(d*2, d*2);
		var ctx = this.visibleMaskCache.ctx;

		var gradient = ctx.createRadialGradient(d,d, 0, d,d,d);
		gradient.addColorStop( 0, 'rgba(0,0,0,'+(this.intensity/5)+')' );
		gradient.addColorStop( 1, 'rgba(0,0,0,0)' );

		ctx.beginPath();
		ctx.fillStyle = gradient;
		var dd = this.shadowCastDistance*1.41;
		var alpha = this.direction-this.range/2-PI/2-this.range*0.2;
		var beta = this.direction+this.range/2-PI/2+this.range*0.2;
		ctx.moveTo(d,d);
		ctx.lineTo(d + dd * Math.cos(alpha), d + dd * Math.sin(alpha));
		ctx.lineTo(d + dd * Math.cos(beta), d + dd * Math.sin(beta));
		ctx.fill();
		ctx.closePath();

		this.visibleMaskHash = this.distance + ""
	}
};

PointLight.prototype.getGradientCache = function() {
	if(this.gradientCache === undefined || this.gradientHash !== this.distance + this.color.getRGBA() + this.direction )
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
	//~ this.drawBoundingCircle(ctx);
};
PointLight.prototype.glow = function (ctx){
	ctx.drawImage(this.getGradientCache().canvas,this.position.x-this.distance,this.position.y-this.distance);
};
PointLight.prototype.cast = function (ctx){
	ctx.drawImage(this.getVisibleMaskCache().canvas,this.position.x-this.shadowCastDistance,this.position.y-this.shadowCastDistance);
};

// Object2.prototype.testCollision = function(obj){
// 	var vector = new Vector2().subVectors(obj.position, this.position);
// 	var angle = vector.getAngle();
// 	// todo
// 	// console.log(angle);
// 	// if()
// 	var radiusSum = this.radius + obj.radius;
// 	if(vector.lengthSq() < radiusSum*radiusSum){
// 		return true;
// 	}
// 	return false;
// }