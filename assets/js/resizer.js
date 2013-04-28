function Resizer( options ){
	var options = options === undefined ? {} : options;
	PointLight.call(this, options);

	this.scale = options.scale === undefined ? 1 : options.scale;
};
Resizer.prototype = Object.create( PointLight.prototype );

Resizer.prototype.efect = function(player) {
	player.radius *= this.scale;
	var collisions = game.checkCollisions(player);
	var collided = false;
	for(var i in collisions){
		if(collisions[i] instanceof Polygon && !collided){
			var attributes = collisions[i].testCollision(player, true);
			var smer = attributes.normal.normalize();
			player.position.x += smer.x*attributes.distance
			player.position.y += smer.y*attributes.distance;
			collided = true;
		}
		else if(collisions[i] instanceof Polygon){
			player.die();
		}
	};
};
Resizer.prototype.postefect = function (player){
	player.radius *= 1/this.scale;
};