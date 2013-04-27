function Player(options){
	Object2.call(this, options);
	var _this = this;
	this.radius = 10;

	this.speed = 5;
	this.ghost = false;

	this.color = "#1BE063";
	this.colors = [
		new Color("#ffffff",1),
	];
	
	this.particleOptions = {
		size:3,
		life: 700,
		velocity: new Vector2(0,0),
	};
	this.colorAnouncer = new ParticleSystem({},
		this.particleOptions,
		{
			randomize: {
				velocity: {
					x:{
						min: -0.3,
						max: 0.3,
					},
					y:{
						min: -0.3,
						max: 0.3,
					},
				},
				color: _this.colors,
			},
			emiting : true,
			amount : 2,
		});
	this.add(this.colorAnouncer);
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
	eventhandler.addKeyboardControl("E", function (){
		for(var i in game.children){
			if(game.children[i] instanceof Trigger){
				if(game.children[i].testCollision(_this)) game.children[i].response();
			}
		}
	});
};

Player.prototype.move = function(angle) {
	var tX = - this.speed * Math.cos(angle),
		tY = - this.speed * Math.sin(angle)
	this.position.x += tX;
	this.position.y += tY;

	var collisions = game.checkCollisions(this);
	//~ this.colors = [];
	for(var i in collisions){
		//~ if(collisions[i] instanceof PointLight && collisions[i].id != "playerLight"){
			//~ this.colors.push(Object.create(collisions[i].color));
		//~ }
		if(collisions[i].id == "playerLight") continue;
		this.onCollision(collisions[i]);
		if(collisions[i].collidable){
			this.position.x -= tX;
			this.position.y -= tY;
			break;
		}
	};
	
};

Player.prototype.render = function(ctx) {
	ctx.beginPath();
	//~ if(this.colors.length < 1){
		//~ ctx.fillStyle = this.color;
		//~ game.getChild("playerLight").color = new Color("#ffffff");
	//~ }
	//~ else{var barva = new Color(this.color);
		//~ for(var i = 0; i < this.colors.length;i++){
			//~ this.particleOptions.color = this.colors[i];
			//~ this.colorAnouncer.emit(2);
			//~ if(this.colors[i] !== barva) barva.add(this.colors[i]);
		//~ };
		
		//~ ctx.fillStyle = barva.getRGB();
		//~ game.getChild("playerLight").color = barva;
	//~ }
	ctx.arc(this.position.x, this.position.y, this.radius, 0, PI*2);
	ctx.fill();
	ctx.closePath();
	if(this.ghost){
		this.colors[0] = new Color("#0000ff",1);
	}
	else{
		this.colors[0] =new Color("#ffffff",1);
	}
};
Player.prototype.onCollision = function (obj){
	return;
};