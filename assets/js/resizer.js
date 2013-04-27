function Resizer( options ){
	var options = options === undefined ? {} : options;
	PointLight.call(this, options);

	this.newSize = options.newSize === undefined ? 10 : options.newSize;
};
Resizer.prototype = Object.create( PointLight.prototype );

Resizer.prototype.onCollision = function(object) {
	object.radius = this.newSize;
};