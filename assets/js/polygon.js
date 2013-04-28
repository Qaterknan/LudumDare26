function Polygon(options){
	Object2.call(this, options);

	this.color = options.color === undefined ? "#000000" : options.color;

	this.points = options.points === undefined ? [] : options.points;
}
Polygon.prototype = Object.create( Object2.prototype );

Polygon.prototype.tick = function() {
	this.oscilate();
	
	if(this.oscilatePoints){
		var player = game.getChild("player");
		if(this.testCollision(player)){
			player.position.add(this.velocity);
		};
	}
};

Polygon.prototype.render = function(ctx) {
	ctx.save();
		ctx.translate(this.position.x, this.position.y);
		this.fill(ctx, this.color);
		for(var i = 0, l = this.points.length; i < l; i++){
			var a = this.points[i];
			ctx.fillStyle="#000000";
			ctx.font="20px Georgia";
			ctx.fillText(i+1,this.points[i].x,this.points[i].y);
		}
	ctx.restore();
};

Polygon.prototype.fill = function(ctx, color, type) {
	ctx.beginPath();
	for(var i = 0, l = this.points.length; i < l; i++){
		var a = this.points[i];
		ctx.lineTo(a.x, a.y);
	}
	if(type == "clip"){
		ctx.clip();
	}
	else if(type == "stroke"){
		ctx.strokeStyle = color;
		ctx.lineWidth = 2;
		ctx.stroke();
	}
	else {
		ctx.fillStyle = color;
		ctx.fill();
	}

	ctx.closePath();
};

Polygon.prototype.cast = function(ctx, origin, distance, color) {
	var points = [];

	ctx.fillStyle = color;

	for(var i=0, len=this.points.length; i<len; i++){
		var pointA = new Vector2().addVectors(this.points[i], this.position);
		var pointB = new Vector2().addVectors(this.points[(i+1) % this.points.length], this.position);

		var originToA = new Vector2().subVectors(pointA, origin);
		var originToB = new Vector2().subVectors(pointB, origin);

		// magic: (zkopírovaní z illuminated.js)
		var aToB = new Vector2().subVectors(pointB, pointA);

		var normal = new Vector2(aToB.y, -aToB.x);
		if (normal.dot(originToA) > 0) {
			var vzdalenyA = originToA.setLength(distance).add(origin);
			var vzdalenyB = originToB.setLength(distance).add(origin);

			ctx.beginPath();
			ctx.lineWidth = 1.2;
			ctx.moveTo(pointA.x, pointA.y);
			ctx.lineTo(pointB.x, pointB.y);
			ctx.lineTo(vzdalenyB.x, vzdalenyB.y);
			ctx.lineTo(vzdalenyA.x, vzdalenyA.y);
			ctx.fill();
			ctx.stroke();
			ctx.closePath();
		}
	}
};

Polygon.prototype.testCollision = function(obj, returnAtts) {
	for(var i = 0, l = this.points.length; i < l; i++){
		var a = new Vector2().addVectors(this.position, this.points[i]);
		var b = new Vector2().addVectors(this.position, this.points[(i+1)%l]);
		var c = obj.position;

		var smer = new Vector2().subVectors(b,a);
		var normal = new Vector2(smer.y, -smer.x);

		var distance = (normal.x * c.x + normal.y * c.y - a.x*normal.x - a.y*normal.y)/normal.length();
		if(obj.radius > Math.abs(distance)){
			var ramenoA = new Vector2().subVectors(c,a);
			var ramenoB = new Vector2().subVectors(c,b);
			if( ramenoA.lengthSq() + ramenoB.lengthSq() < smer.lengthSq() ){
				return returnAtts ? {normal: normal, distance: distance} : true;
			}
		}
		if(new Vector2().subVectors(c,a).lengthSq() < obj.radius*obj.radius){
			return returnAtts ? {normal: normal, distance: distance} : true;
		}
	}
	return false;
};

Polygon.prototype.getCenter = function() {
	var center = new Vector2();
	for(var i in this.points){
		center.add(this.points[i]);
	}
	center = center.divideScalar(this.points.length).add(this.position);
	return center;
};