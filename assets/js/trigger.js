function Trigger( options ){
	var options = options === undefined ? {} : options;
	Object2.call(this, options);
	
	this.radius = options.radius === undefined ? 10 : options.radius;
	this.response = options.response === undefined ? function (){} : options.response;
	this.inRange = false;

	this.collidable = false;
};
Trigger.prototype = Object.create( Object2.prototype );
Trigger.prototype.drawBoundingCircle = function (ctx){
	ctx.beginPath();
	ctx.strokeStyle = "#000000";
	ctx.arc(this.position.x,this.position.y,this.radius, 0, Math.PI*2);
	ctx.stroke();
	ctx.closePath();
};
Trigger.prototype.render = function (ctx){
	this.drawBoundingCircle(ctx);
};
