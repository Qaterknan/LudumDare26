function Player(options){
	Object2.call(this, options);
	var _this = this;
	this.radius = 10;

	this.speed = 5;
	this.ghost = false;
	this.damageDealt = 0;

	this.color = "#1BE063";
	this.colors = [];
	
	this.influencedBy = [];
	this.keyNodes = [];
	
	this.particleOptions = {
		size:3,
		life: 750,
		velocity: new Vector2(0,0),
	};
	this.colorAnouncer = new ParticleSystem({},
		this.particleOptions,
		{
			randomize: {
				velocity: {
					x:{
						min: -0.4,
						max: 0.4,
					},
					y:{
						min: -0.4,
						max: 0.4,
					},
				},
				color: _this.colors,
			},
			emiting : false,
			amount : 0,
		});
	this.add(this.colorAnouncer);
}
Player.prototype = Object.create( Object2.prototype );

Player.prototype.keyNodeCache = function (newKey){
	if(this.keyNodes[1])
		this.keyNodes.splice(1,1);
	this.keyNodes.splice(0,0,newKey);
	//~ console.log(this.keyNodes);
};

Player.prototype.addControls = function(eventhandler) {
	var _this = this;
	eventhandler.addKeyboardControl("A", function (){
		_this.keyNodeCache(_this.position.clone());
	}, undefined, function(){
		_this.move(0);
	});
	eventhandler.addKeyboardControl("D", function (){
		_this.keyNodeCache(_this.position.clone());
	}, undefined, function(){
		_this.move(PI);
	});
	eventhandler.addKeyboardControl("W", function (){
		_this.keyNodeCache(_this.position.clone());
	}, undefined, function(){
		_this.move(PI/2);
	});
	eventhandler.addKeyboardControl("S", function (){
		_this.keyNodeCache(_this.position.clone());
	}, undefined, function(){
		_this.move(-PI/2);
	});
	eventhandler.addKeyboardControl("E", function (){
		for(var i in game.children){
			if(game.children[i] instanceof Trigger){
				if(game.children[i].testCollision(_this)) game.children[i].response();
			}
			if(game.children[i] instanceof Teleporter){
				if(game.children[i].testCollision(_this)) game.children[i].teleport(_this);
			}
		}
	});
	eventhandler.addKeyboardControl("R", function (){
		game.restartGame();
	});
	eventhandler.addMouseControl(1, function(x,y){
		console.log(
			Math.round(game.camera.tx(x))+","+
			Math.round(game.camera.ty(y))
			);
	})
};

Player.prototype.move = function(angle) {
	var tX = - this.speed * Math.cos(angle),
		tY = - this.speed * Math.sin(angle)
	this.position.x += tX;
	this.position.y += tY;

	var collisions = game.checkCollisions(this);
	var newInfluence = [];
	var collided = false;
	for(var i in collisions){
		if(collisions[i].id == "playerLight")
			continue;
		if(collisions[i] instanceof PointLight){
			// zřídka kdy mohou nastat problémy - když jedno světlo bude odstíněné a druhé bude zasahovat do jeho radiu. Pak se zaznamenají obě světla místo jednoho. Situace je ale natolik nepravděpodobná, že bug ignoruji.
			if(game.lights.collision(this.position.x,this.position.y)){
				newInfluence.push(collisions[i]);
			}
		}
		this.onCollision(collisions[i]);
		if(collisions[i].collidable && !collided){
			this.position.x -= tX;
			this.position.y -= tY;
			collided = true;
		}
	};
	this.compare( newInfluence );
};

Player.prototype.render = function(ctx) {
	if(this.tailRender){
		ctx.beginPath();
		ctx.strokeStyle = "#ffffff";
		ctx.moveTo(this.position.x,this.position.y);
		for(var i in this.keyNodes){
			ctx.lineTo(this.keyNodes[i].x,this.keyNodes[i].y);
		}
		ctx.stroke();
		ctx.closePath();
	}
	ctx.beginPath();
	ctx.fillStyle = this.color;
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
	
};
Player.prototype.onCollision = function (obj){
	return;
};
Player.prototype.compare = function ( newInfluence ){
	for(var i in newInfluence){
		var oldIndex = this.influencedBy.indexOf(newInfluence[i]);
		if(oldIndex != -1){
			this.influencedBy.splice(oldIndex, 1);
			continue;
		}
		else{
			if(newInfluence[i].efect)
				newInfluence[i].efect(this);
		}
	};
	for(var i in this.influencedBy){
		var objekt = this.influencedBy[i];
		if(objekt.postefect){
			if(objekt.chargeStart){
				var _this = this;
				var ted = new Date().getTime();
				var charge = ted-objekt.chargeStart > objekt.chargeMaximum ? objekt.chargeMaximum/objekt.chargeCoefficient : (ted-objekt.chargeStart)/objekt.chargeCoefficient;
				if(objekt instanceof Tunneler){
					this.emitChangeRate = -this.colorAnouncer.emitOptions.amount*(100/6)/charge;
				}
				this.addTimeEvent(charge, function (){objekt.postefect(_this);});
			}
			else{
				objekt.postefect(this);
			}
		}
	};
	this.influencedBy = newInfluence;
};
Player.prototype.die = function (){
	game.restartGame();
	this.damageDealt = 0;
};

Player.prototype.startEmitCount = function (limit){
	this.emitStart = new Date().getTime();
	this.emitLimit = 2;
	this.emitChangeRate = this.emitLimit/(limit*6/100);
	this.increase = true;
};

Player.prototype.tick = function (){
	if(this.colorAnouncer.emiting){
		var newAmount = this.colorAnouncer.emitOptions.amount + this.emitChangeRate;
		if(newAmount > this.emitLimit)
			this.colorAnouncer.emitOptions.amount = this.emitLimit;
		else
			this.colorAnouncer.emitOptions.amount = newAmount;
	}
	console.log(this.colorAnouncer.emitOptions.amount);
};