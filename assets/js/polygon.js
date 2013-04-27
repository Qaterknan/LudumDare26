function Polygon(options){
	Object2.call(this, options);

	this.points = options.points === undefined ? [] : options.points;
}
Polygon.prototype = Object.create( Object2.prototype );