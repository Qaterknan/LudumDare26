function InversedPolygon(options){
	Object2.call(this, options);

	this.color = options.color === undefined ? "#000000" : options.color;
	this.opaque = false;

	this.cache = createCanvas(game.width, game.height);

	this.points = options.points === undefined ? [] : options.points;
}
InversedPolygon.prototype = Object.create( Object2.prototype );

InversedPolygon.prototype.render = function(ctx) {
	this.cache.ctx.fillStyle = this.color;
	this.cache.ctx.fillRect(0,0,this.cache.width, this.cache.height);
	this.cache.ctx.save();
	this.cache.ctx.globalCompositeOperation = "destination-out";
	this.cache.ctx.translate(this.position.x, this.position.y);
	this.fill(this.cache.ctx, this.color);
	this.cache.ctx.restore();

	ctx.drawImage(this.cache.canvas, 0, 0);
};

InversedPolygon.prototype.fill = function(ctx, color) {
	ctx.beginPath();
	ctx.fillStyle = color;
	for(var i = 0, l = this.points.length; i < l; i++){
		var a = this.points[i];
		ctx.lineTo(this.position.x + a.x, this.position.y + a.y);
	}
	ctx.fill();
	ctx.closePath();
};

InversedPolygon.prototype.testCollision = function(obj) {
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