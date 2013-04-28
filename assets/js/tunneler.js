function Tunneler( options ){
	var options = options === undefined ? {} : options;
	PointLight.call(this, options);
	
	this.inSound = options.inSound === undefined ? false : options.inSound;
	this.outSound = options.outSound === undefined ? false : options.outSound;
	this.targets = [];
	this.chargeCoefficient = options.chargeCoefficient === undefined ? 1 : options.chargeCoefficient;
	this.chargeMaximum = options.chargeMaximum === undefined ? 5000 : options.chargeMaximum;
	this.chargeStart = false;
	this.ghostId = options.ghostId === undefined ? this.color.getRGB() : options.ghostId;
};
Tunneler.prototype = Object.create( PointLight.prototype );

Tunneler.prototype.efect = function(player) {
	player.colors.push(this.color);
	if(this.inSound)
		this.inSound.play();
	player.ghost = true;
	player.ghostId = this.ghostId;
	player.color = this.color.getRGB();
	player.colorAnouncer.toSpawn = 0;
	player.startEmitCount(this.chargeMaximum);
	player.colorAnouncer.emiting = true;
	this.chargeStart = new Date().getTime();
	player.pulsing = true;
};
Tunneler.prototype.postefect = function (player){
	player.ghost = false;

	player.stopCharging(this.color);

	if(this.outSound)
		this.outSound.play();
};