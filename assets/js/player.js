function Player(options){
	Object2.call(this, options);

	this.radius = 10;
	this.speed = 1;
	this.color = "#1BE063";
}
Player.prototype = Object.create( Object2.prototype );

Player.prototype.addControls = function(eventhandler) {
	var _this = this;
	eventhandler.addKeyboardControl("A", undefined, undefined, function(){
		_this.move(0);
	});
	eventhandler.addKeyboardControl("D", undefined, undefined, function(){
		_this.move(PI);
	});
	eventhandler.addKeyboardControl("W", undefined, undefined, function(){
		_this.move(PI/2);
	});
	eventhandler.addKeyboardControl("S", undefined, undefined, function(){
		_this.move(-PI/2);
	})
};

Player.prototype.move = function(angle) {
	var tX = - this.speed * Math.cos(angle),
		tY = - this.speed * Math.sin(angle)
	this.position.x += tX;
	this.position.y += tY;

	var collisions = game.checkCollisions(this);
	for(var i in collisions){
		if(collisions[i].collidable){
			this.position.x -= tX;
			this.position.y -= tY;
			break;
		}
	}
};

Player.prototype.render = function(ctx) {
	ctx.beginPath();
	ctx.fillStyle = this.color;
	ctx.arc(this.position.x, this.position.y, this.radius, 0, PI*2);
	ctx.fill();
	ctx.closePath();
};