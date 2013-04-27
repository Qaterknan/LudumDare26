function Resizer( options ){
	var options = options === undefined ? {} : options;
	PointLight.call(this, options);

	this.newSize = options.newSize === undefined ? 10 : options.newSize;
	this.targets = [];
};
Resizer.prototype = Object.create( PointLight.prototype );

Resizer.prototype.onCollision = function(object) {
	if(object.oldRadius === undefined){
		object.oldRadius = object.radius;
		object.radius = this.newSize;
		this.targets.push(object);
	}
};
Resizer.prototype.tick = function (){
	for(var i in this.targets){
		if(!(this.testCollision(this.targets[i]) && game.lights.collision(this.targets[i].position.x, this.targets[i].position.y))){
			this.targets[i].radius = this.targets[i].oldRadius;
			delete this.targets[i].oldRadius;
			this.targets.splice(i,1);
		}
	};
};