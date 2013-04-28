function Teleporter( options ){
	var options = options === undefined ? {} : options;
	Trigger.call(this, options);

	this.inSound = options.inSound === undefined ? false : options.inSound;
	this.outSound = options.outSound === undefined ? false : options.outSound;
	this.chargeCoefficient = options.chargeCoefficient === undefined ? 1 : options.chargeCoefficient;
	this.chargeMaximum = options.chargeMaximum === undefined ? false : options.chargeMaximum;
	this.chargeStart = false;
	this.destination = options.destination === undefined ? this.position : options.destination;
};
Teleporter.prototype = Object.create( Trigger.prototype );

Teleporter.prototype.teleport = function(player) {
	player.position.set(this.destination.x,this.destination.y);
};