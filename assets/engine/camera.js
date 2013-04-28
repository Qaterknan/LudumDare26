function Camera(){
	this.position = new Vector2();
	this.velocity = new Vector2();
	this.origin = new Vector2();

	this.shaking = false;
	this.acceleration = 0.1;
};

Camera.prototype.tx = function(x) {
	return this.position.x + x;
};

Camera.prototype.ty = function(y) {
	return this.position.y + y;
};

Camera.prototype.moveTo = function(vector) {
	this.origin.copy(vector);
};

Camera.prototype.shake = function (amplitude, decrease){
	var amplitude = amplitude === undefined ? new Vector2() : amplitude;
	this.decrease = decrease === undefined ? 1 : decrease;
	this.velocity.set(random(-amplitude.x,amplitude.x),random(-amplitude.y,amplitude.y));
	this.shaking = true;
};

Camera.prototype.stabilize = function (){
	// if(this.shaking){
		this.velocity.x += (this.origin.x-this.position.x)*this.decrease;
		this.velocity.y += (this.origin.y-this.position.y)*this.decrease;
	// }
};

Camera.prototype.update = function (){
	// this.stabilize();
	// this.position.add(this.velocity);
	this.position.x += (this.origin.x - this.position.x)*this.acceleration;
	this.position.y += (this.origin.y - this.position.y)*this.acceleration;
	this.tick();
};

Camera.prototype.tick = function() {
	return;
};

Camera.prototype.stopShaking = function (){
	this.velocity.set(0,0);
	this.position.copy(this.origin);
	this.shaking = false;
};