function Portal(options){
	Polygon.call(this, options);

	this.color = options.color === undefined ? "rgb(255,0,0)" : options.color;
	this.opaque = false;
}
Portal.prototype = Object.create( Polygon.prototype );
Portal.prototype.tick = function (){
	var player = game.getChild("player");
	if(player.ghost){
		this.collidable = false;
	}
	else	this.collidable = true;
};