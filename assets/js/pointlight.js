function PointLight( options ){
	var options = options === undefined ? {} : options;
	Object2.call(this, options);
	
	this.distance = options.distance === undefined ? 100 : options.distance;
	this.color = options.color === undefined ? "#ffffff" : options.color;
};
PointLight.prototype = Object.create( Object2.prototype );
PointLight.prototype.generateCache = function (){
	this.cache = createCanvas(this.distance*2,this.distance*2);
	var ctx = this.cache.ctx;
	
	var grad = ctx.createRadialGradient(this.distance,this.distance,0,this.distance,this.distance,this.distance);
	grad.addColorStop(0,this.color);
	grad.addColorStop(1,"#ffffff");
	ctx.fillStyle = grad;
	ctx.beginPath();
	ctx.arc(this.distance,this.distance,this.distance,0,2*Math.PI);
	ctx.fill();
	ctx.closePath();
};
PointLight.prototype.render = function (ctx){
	if(this.cache === undefined){
		this.generateCache();
	}
	ctx.drawImage(this.cache.canvas,this.position.x,this.position.y);
	
};