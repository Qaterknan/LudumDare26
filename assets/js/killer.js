function Killer( options ){
	var options = options === undefined ? {} : options;
	PointLight.call(this, options);

	this.inSound = options.inSound === undefined ? false : options.inSound;
	this.outSound = options.outSound === undefined ? false : options.outSound;
	this.targets = [];
	this.chargeCoefficient = options.chargeCoefficient === undefined ? 1 : options.chargeCoefficient;
	this.chargeMaximum = options.chargeMaximum === undefined ? false : options.chargeMaximum;
	this.chargeStart = false;
};
Killer.prototype = Object.create( PointLight.prototype );

Killer.prototype.efect = function(player) {
	this.targets.push(player);
	if(this.inSound)
		this.inSound.play();
};
Killer.prototype.postefect = function (player){
	this.targets.splice(this.targets.indexOf(player),1);
};
Killer.prototype.tick =function (){
	for(var i = this.targets.length-1; i > -1;i--){
		this.targets[i].damageDealt++;
		if(this.targets[i].damageDealt > 1000)
			this.targets[i].die();
	};
};