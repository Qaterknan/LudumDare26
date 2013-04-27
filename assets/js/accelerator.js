function Accelerator( options ){
	var options = options === undefined ? {} : options;
	PointLight.call(this, options);

	this.inSound = options.inSound === undefined ? false : options.inSound;
	this.outSound = options.outSound === undefined ? false : options.outSound;
	this.chargeCoefficient = options.chargeCoefficient === undefined ? 2 : options.chargeCoefficient;
	this.chargeMaximum = options.chargeMaximum === undefined ? 4000 : options.chargeMaximum;
	this.chargeStart = false;
	this.bonus = options.bonus === undefined ? 5 : options.bonus;
};
Accelerator.prototype = Object.create( PointLight.prototype );

Accelerator.prototype.efect = function(player) {
	player.speed += this.bonus;
	if(this.inSound)
		this.inSound.play();
	this.chargeStart = new Date().getTime();
};
Accelerator.prototype.postefect = function (player){
	player.speed -= this.bonus;
	if(this.outSound)
		this.outSound.play();
};