function Resizer( options ){
	var options = options === undefined ? {} : options;
	PointLight.call(this, options);

	this.scale = options.scale === undefined ? 1 : options.scale;
};
Resizer.prototype = Object.create( PointLight.prototype );

Resizer.prototype.efect = function(player) {
	player.radius *= this.scale;
};
Resizer.prototype.postefect = function (player){
	player.radius *= 1/this.scale;
};