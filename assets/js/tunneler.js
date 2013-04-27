function Tunneler( options ){
	var options = options === undefined ? {} : options;
	PointLight.call(this, options);

	this.inSound = options.inSound === undefined ? false : options.inSound;
	this.outSound = options.outSound === undefined ? false : options.outSound;
	this.targets = [];
	this.chargeCoefficient = options.chargeCoefficient === undefined ? 1 : options.chargeCoefficient;
	this.chargeMaximum = options.chargeMaximum === undefined ? 5000 : options.chargeMaximum;
	this.chargeStart = false;
};
Tunneler.prototype = Object.create( PointLight.prototype );

Tunneler.prototype.efect = function(player) {
	player.colors.push(this.color);
	if(this.inSound)
		this.inSound.play();
	player.ghost = true;
	player.color = this.color.getRGB();
	player.colorAnouncer.toSpawn = 0;
	player.colorAnouncer.emiting = true;
	this.chargeStart =new Date().getTime();
};
Tunneler.prototype.postefect = function (player){
	player.ghost = false;
	player.color = "#1BE063";
	for(var i in player.colors){
		if(player.colors[i].getRGB() == this.color.getRGB()){
			player.colors.splice(i,1);
		}
	};
	if(this.outSound)
		this.outSound.play();
	player.colorAnouncer.emiting = false;
};