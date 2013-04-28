function Switch( options ){
	var options = options === undefined ? {} : options;
	Trigger.call(this, options);
	
	this.radius = options.radius === undefined ? 10 : options.radius;
	this.response = options.response === undefined ? function (){this.toogleLight();} : options.response;
	this.inRange = false;

	this.collidable = false;
	
	this.lights = options.lights === undefined ? false : options.lights;
	this.on = false;
	if(this.lights.off)
		game.add(this.lights.off);
};
Switch.prototype = Object.create( Trigger.prototype );
Switch.prototype.toogleLight = function (){
	if(!this.on){
		this.turnOn();
		this.on = true;
	}
	else{
		this.turnOff();
		this.on = false;
	}
};
Switch.prototype.turnOn = function (){
	if(this.lights.on)
		game.add(this.lights.on);
	if(this.lights.off)
		game.remove(this.lights.off);
};
Switch.prototype.turnOff = function (){
	if(this.lights.on)
		game.remove(this.lights.on);
	if(this.lights.off)
		game.add(this.lights.off);
};