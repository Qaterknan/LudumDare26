function Killer( options ){
	var options = options === undefined ? {} : options;
	PointLight.call(this, options);

	this.inSound = options.inSound === undefined ? false : options.inSound;
	this.outSound = options.outSound === undefined ? false : options.outSound;
	this.hitSound = options.hitSound === undefined ? false : options.hitSound;
	this.targets = [];
	this.chargeCoefficient = options.chargeCoefficient === undefined ? 1 : options.chargeCoefficient;
	this.chargeMaximum = options.chargeMaximum === undefined ? false : options.chargeMaximum;
	this.chargeStart = false;
	this.limit = options.limit === undefined ? 600 : options.limit;
	this.bloodColor = new Color("#ff0000",0.8);
};
Killer.prototype = Object.create( PointLight.prototype );

Killer.prototype.efect = function(player) {
	this.targets.push(player);
	player.blood.emitOptions.amount += 4;
	player.blood.emiting = true;
	if(this.inSound)
		this.inSound.play();
};
Killer.prototype.postefect = function (player){
	player.blood.emitOptions.amount -= 4;
	player.blood.emiting = false;
	this.targets.splice(this.targets.indexOf(player),1);
};
Killer.prototype.tick =function (){
	for(var i = this.targets.length-1; i > -1;i--){
		this.targets[i].damageDealt++;
		if(this.hitSound && this.targets[i].damageDealt%60 == 0)
			this.hitSound.play();
		if(this.targets[i].damageDealt > this.limit)
			this.targets[i].die();
	};
};