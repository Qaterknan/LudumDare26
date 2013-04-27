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
			var b = this.points[(i+1)%l];
			if(Math.random() < 0.01) console.log(a)
			ctx.lineTo(b.x, b.y);
		}
		ctx.fill();
		ctx.closePath();
	ctx.restore();
};