function Polygon(options){
	Object2.call(this, options);

	this.color = "#E01BE0";

	this.points = options.points === undefined ? [] : options.points;
}
Polygon.prototype = Object.create( Object2.prototype );

Polygon.prototype.render = function(ctx) {
	ctx.save();
		ctx.translate(this.position.x, this.position.y);
		ctx.beginPath();
		ctx.fillStyle = this.color;
		for(var i = 0, l = this.points.length; i < l; i++){
			var a = this.points[i];
			ctx.lineTo(a.x, a.y);
		}
		ctx.fill();
		ctx.closePath();
	ctx.restore();
};

Polygon.prototype.testCollision = function(obj) {
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
				return true;
			}
		}
		if(new Vector2().subVectors(c,a).lengthSq() < obj.radius*obj.radius){
			return true;
		}
	}
	return false;
};