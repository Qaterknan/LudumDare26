function Switch( options ){
	var options = options === undefined ? {} : options;
	Trigger.call(this, options);
	
	this.radius = options.radius === undefined ? 10 : options.radius;
	this.response = options.response === undefined ? function (){this.toogleLight();} : options.response;
	this.inRange = false;

	this.collidable = false;
	
	this.light = options.light === undefined ? false : options.light;
	this.on = false;
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
	game.add(this.light);
};
Switch.prototype.turnOff = function (){
	game.remove(this.light);
};