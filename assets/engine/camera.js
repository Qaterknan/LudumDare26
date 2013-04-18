function Camera(x,y){
	Vector2.call(this, x,y);
	
	this.velocity = new Vector2();
	this.origin = new Vector2(x,y);
};
Camera.prototype = Object.create( Vector2.prototype );
Camera.prototype.shake = function (amp,decrease){
	var amp = amp === undefined ? {x:10,y:10} : amp;
	this.decrease = decrease === undefined ? 1 : decrease;
	this.velocity = new Vector2(random(-amp.x,amp.x),random(-amp.y,amp.y));
	if(!this.shaking)
		this.origin.set(this.x,this.y);
	this.shaking = true;
};
Camera.prototype.stabilize = function (){
	if(this.velocity.x != 0){
		this.velocity.x += (this.origin.x-this.x)*this.decrease;
	}
	if(this.velocity.y != 0){
		this.velocity.y += (this.origin.y-this.y)*this.decrease;
	}
	if(this.velocity.length() < 0.1){ // Těžko říct jak jinak
		this.stopShaking();
	}
};
Camera.prototype.update = function (){
	this.stabilize();
	this.add(this.velocity);
};
Camera.prototype.stopShaking = function (){
	this.velocity.set(0,0);
	this.set(this.origin.x,this.origin.y);
	this.shaking = false;
};