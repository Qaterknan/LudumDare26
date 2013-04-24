function Camera(){
	this.position = new Vector2();
	this.velocity = new Vector2();
	this.origin = new Vector2();

	this.shaking = false;
};

Camera.prototype.moveTo = function(x,y) {
	this.origin.set(x,y)
};

Camera.prototype.shake = function (amplitude, decrease){
	console.log("asdf")
	var amplitude = amplitude === undefined ? new Vector2() : amplitude;
	this.decrease = decrease === undefined ? 1 : decrease;
	this.velocity.set(random(-amplitude.x,amplitude.x),random(-amplitude.y,amplitude.y));
	if(!this.shaking){
		this.origin.set(this.position.x,this.position.y);
	}
	this.shaking = true;
};

Camera.prototype.stabilize = function (){
	if(this.shaking){
		this.velocity.x += (this.origin.x-this.position.x)*this.decrease;
		this.velocity.y += (this.origin.y-this.position.y)*this.decrease;
	}
};

Camera.prototype.update = function (){
	this.stabilize();
	this.position.add(this.velocity);
};

Camera.prototype.stopShaking = function (){
	this.velocity.set(0,0);
	this.position.copy(this.origin);
	this.shaking = false;
};