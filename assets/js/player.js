function Player(options){
	Object2.call(this, options);
	var _this = this;
	this.radius = 15;
	this.radiusBonus = 0;

	this.dying = false;

	this.speed = 5;
	// this.currentSpeed = 0;
	this.acceleration = 0.20;
	this.velocity = new Vector2();
	this.currentVelocity = new Vector2();

	this.directions = [];

	this.ghost = false;
	this.pulsing = false;
	this.damageDealt = 0;

	this.normalColor = "#1BE063";
	this.color = this.normalColor;
	this.colors = [];
	
	this.bloodColors = [new Color("#ff0000",0.8), new Color("#FCB96D", 0.8)];
	
	this.influencedBy = [];
	this.keyNodes = [];
	
	this.particleOptions = {
		size:3,
		life: 750,
		velocity: new Vector2(0,0),
	};
	this.bloodOptions = {
		size: 2,
		life: 600,
		velocity: new Vector2(0,0),
		gravity: new Vector2(0,-0.05),
		position: new Vector2(0,0),
		tick: function(){
			if(this.position.x < 0){
				this.velocity.x += 0.2;
			}
			else if(this.position.x > 0){
				this.velocity.x -= 0.2;
			}
		}
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
	this.blood = new ParticleSystem({},
		this.bloodOptions,
		{
			randomize: {
				velocity: {
					x:{
						min: -1.2,
						max: 1.2,
					},
					y:{
						min: -0.1,
						max: 0.1,
					},
				},
				position: {
					x:{
						min: -10,
						max: 10,
					},
					y:{
						min:-10,
						max: 10,
					},
				},
				color: _this.bloodColors,
			},
			amount: 2,
			emiting : false,
		}
	);
	this.add(this.blood);
}
Player.prototype = Object.create( Object2.prototype );

Player.prototype.keyNodeCache = function (newKey){
	if(this.keyNodes[1])
		this.keyNodes.splice(1,1);
	this.keyNodes.splice(0,0,newKey);
};

Player.prototype.addControls = function(eventhandler) {
	var _this = this;
	eventhandler.addKeyboardControl("A", function (){
		_this.keyNodeCache(_this.position.clone());
		_this.setDirection(new Vector2(-1, 0));
	}, function(){
		_this.removeDirection(new Vector2(-1, 0));
	}, function(){
		return;
	});
	eventhandler.addKeyboardControl("D", function (){
		_this.keyNodeCache(_this.position.clone());
		_this.setDirection(new Vector2(1, 0));
	}, function(){
		_this.removeDirection(new Vector2(1, 0));
	}, function(){
		return;
	});
	eventhandler.addKeyboardControl("W", function (){
		_this.keyNodeCache(_this.position.clone());
		_this.setDirection(new Vector2(0, -1));
	}, function(){
		_this.removeDirection(new Vector2(0, -1));
	}, function(){
		return;
	});
	eventhandler.addKeyboardControl("S", function (){
		_this.keyNodeCache(_this.position.clone());
		_this.setDirection(new Vector2(0, 1));
	}, function(){
		_this.removeDirection(new Vector2(0, 1));
	}, function(){
		return;
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

Player.prototype.setDirection = function(normalized) {
	this.removeDirection(normalized);
	this.directions.push(normalized);
	this.velocity.set(0,0);

	for(var i in this.directions){
		this.velocity.add(this.directions[i]);
	}

	this.velocity.setLength(this.speed);
	// console.log(this.velocity);
};

Player.prototype.removeDirection = function(normalized) {
	for(var i in this.directions){
		if(this.directions[i].equals(normalized)){
			this.directions.splice(i, 1);
			break;
		}
	}

	this.velocity.set(0,0);
	for(var i in this.directions){
		this.velocity.add(this.directions[i]);
	}

	this.velocity.setLength(this.speed);
};

Player.prototype.move = function() {
	if(this.dying) return;
	var tX = this.currentVelocity.x,
		tY = this.currentVelocity.y;
	this.position.x += tX;
	this.position.y += tY;

	var collisions = game.checkCollisions(this);
	var newInfluence = [];
	var collided = false;
	for(var i in collisions){
		var obj = collisions[i][0];
		if(obj.id == "playerLight")
			continue;
		if(obj instanceof PointLight){
			// zřídka kdy mohou nastat problémy - když jedno světlo bude odstíněné a druhé bude zasahovat do jeho radiu. Pak se zaznamenají obě světla místo jednoho. Situace je ale natolik nepravděpodobná, že bug ignoruji.
			if(game.lights.collision(this.position.x,this.position.y)){
				newInfluence.push(obj);
			}
		}
		this.onCollision(obj);
		if(obj.collidable){
			if(!collided){
				this.position.x -= tX;
				this.position.y -= tY;
			}
			collided = true;

			var len = this.currentVelocity.length();
			if(collisions[i][1].point && collisions.length > 1){
				continue;
			}

			var smer1 = collisions[i][1].normal.getPerpendicular()[0].setLength(len);
			var smer2 = collisions[i][1].normal.getPerpendicular()[1].setLength(len);

			var angle1 = smer1.dot(this.velocity)/(len*this.speed);
			var angle2 = smer2.dot(this.velocity)/(len*this.speed);
			if(angle2 == angle1)
				continue;
			// console.log(angle1,angle2);
			if(angle2 > angle1)
				var smer = smer2;
			else
				var smer = smer1;

			this.position.x += smer.x;
			this.position.y += smer.y;
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
	if(this.radius+this.radiusBonus <= 0)
		return;
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
	ctx.arc(this.position.x, this.position.y, this.radius+this.radiusBonus, 0, PI*2);
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
				if(this.pulsing){
					this.pulsing = false;
					this.radiusBonus = 0;
					this.ticks = 0;
				}
				this.increase = false;
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
	if(!this.dying){
		console.log("asdf")
		game.filterColor = new Color();
		game.filterColor.alpha = 0;
		this.damageDealt = 0;
		this.dying = true;
		this.pulsing = false;
	}
};

Player.prototype.startEmitCount = function (limit){
	this.emitStart = new Date().getTime();
	this.emitLimit = 2;
	this.emitChangeRate = this.emitLimit/(limit*6/100);
	this.increase = true;
};

Player.prototype.tick = function (){
	if(!this.velocity.equals(this.currentVelocity)){
		this.currentVelocity.x += (this.velocity.x - this.currentVelocity.x) * this.acceleration;
		this.currentVelocity.y += (this.velocity.y - this.currentVelocity.y) * this.acceleration;
	}

	this.move();

	if(this.increase){
		var newAmount = this.colorAnouncer.emitOptions.amount + this.emitChangeRate;
		if(newAmount > this.emitLimit)
			this.colorAnouncer.emitOptions.amount = this.emitLimit;
		else
			this.colorAnouncer.emitOptions.amount = newAmount;
	}
	if(this.pulsing){
		this.radiusBonus = this.colorAnouncer.emitOptions.amount*2*Math.cos(this.ticks/10);
		this.ticks++;
	}
	if(this.dying){
		if(this.radius + this.radiusBonus >= 0)
			this.radiusBonus += -0.1;
		else{
			this.radiusBonus = -this.radius;
			game.restartGame();
			return;
		}
		game.filterColor.r = 255;
		game.filterColor.g = 30;
		game.filterColor.b = 0;
		game.filterColor.alpha += 0.005;
	};
	
};


Player.prototype.stopCharging = function(color) {
	this.color = this.normalColor;
	for(var i in this.colors){
		if(this.colors[i].getRGB() == color.getRGB()){
			this.colors.splice(i,1);
		}
	};
	this.colorAnouncer.emiting = false;
	this.colorAnouncer.emitOptions.amount = 0;
};