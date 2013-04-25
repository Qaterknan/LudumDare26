function Particle(options){
	options = options === undefined ? {} : options;

	this.creationTime = new Date().getTime();
	this.life = options.life === undefined ? 1000 : options.life;
	this.tick = options.tick === undefined ? function (){} : options.tick;

	this.position = options.position === undefined ? new Vector2() : new Vector2().copy(options.position);
	this.origin = new Vector2().copy(this.position);
	this.parent = false;

	this.color = options.color === undefined ? new Color(0x000000) : options.color;
	this.texture = options.texture === undefined ? false : options.texture;
	this.textured = options.textured === undefined ? false : options.textured;

	// velikost
	this.width = options.width === undefined ? 1 : options.width;
	this.height = options.height === undefined ? 1 : options.height;

	this.shrink = options.shrink === undefined ? 1 : options.shrink;
	this.size = options.size === undefined ? 1 : options.size;
	this.maxSize = options.maxSize === undefined ? -1 : options.maxSize;
	// síly
	this.velocity = options.velocity === undefined ? new Vector2() : new Vector2().copy(options.velocity);
	this.gravity = options.gravity === undefined ? new Vector2() : new Vector2().copy(options.gravity);
	this.friction = options.friction === undefined ? new Vector2(1,1) : new Vector2().copy(options.friction);
	// průhlednost
	this.alpha = options.alpha === undefined ? 1 : options.alpha; 
	this.fade = options.fade === undefined ? 0 : options.fade;
	// rotace
	this.spin = options.spin === undefined ? 0 : options.spin;
	this.rotation = options.rotation === undefined ? 0 : options.rotation;
	// additionalTick
	this.tick = options.tick === undefined ? function(){} : options.tick;
}
Particle.prototype.render = function(ctx) {
	if(this.alpha <= 0 || this.size <= 0.5) return;

	ctx.save(); 
	ctx.translate(this.position.x, this.position.y);
	ctx.scale(this.size,this.size);
	ctx.rotate(this.rotation);
	ctx.translate(-this.width/2, -this.height/2);
	ctx.globalAlpha = this.alpha;
	if(this.textured){
		this.texture.draw(ctx,this.width,this.height);
	}
	else{
		ctx.fillStyle = this.color.getRGB();
		ctx.fillRect(0,0, this.width, this.height);
	}
	
	ctx.restore();
};
Particle.prototype.update = function(){

	this.velocity.x *= this.friction.x;
	this.velocity.y *= this.friction.y;

	this.velocity.add( this.gravity );
	this.position.add( this.velocity );
	
	this.size *= this.shrink;

	if(this.maxSize != -1 && this.size > this.maxSize)
		this.size = this.maxSize;
	
	this.alpha -= this.fade;
	if(this.alpha<0) this.alpha = 0;
	
	this.rotation += this.spin;

	this.tick();
}
// NA OHEŇ
// Particle.prototype.tick = function() {
// 	if(this.origin.x < this.position.x){
// 		this.gravity.x = -0.02;
// 	}
// 	else {
// 		this.gravity.x = 0.02;
// 	}
// };

function ParticleSystem(options, particle, emit){
	Object2.call(this, options);
	this.collidable = false;
	this.opaque = false;
	
	this.particleOptions = particle === undefined ? {} : particle;
	this.emitOptions = emit === undefined ? {} : emit;
	this.emiting = emit.emiting === undefined ? false : emit.emiting;

	this.particles = [];
	this.toSpawn = 0;

	this.particleCap = 500;
};
ParticleSystem.prototype = new Object2();
ParticleSystem.prototype.render = function(ctx) {
	var now = new Date().getTime();

	ctx.save();
	ctx.translate(this.position.x, this.position.y);

	var amount = this.particles.length;
	var len = amount;
	if(amount > this.particleCap){
		this.particles.splice(0, amount-this.particleCap);
		len = this.particleCap;
	}

	for (var i = len-1; i >= 0; i--){
		if( this.particles[i].life < now - this.particles[i].creationTime ){
			this.particles.splice(i, 1);

			i--;
			continue;
		}
		this.particles[i].render(ctx);
		this.particles[i].update();
	};
	ctx.restore();
};

ParticleSystem.prototype.emit = function(amount) {
	var amount = amount === undefined ? 1 : amount;
	var randomize = this.emitOptions.randomize === undefined ? {} : this.emitOptions.randomize;
	var options = this.particleOptions === undefined ? {} : this.particleOptions;
	for (var y = 0; y < amount; y++){
		for(var i in randomize){
			if( randomize[i].min !== undefined && randomize[i].max !== undefined )
				options[i] = random(randomize[i].max, randomize[i].min);
			else if( randomize[i].x !== undefined || randomize[i].y !== undefined ){
				if(randomize[i].x !== undefined)
					options[i].x = random(randomize[i].x.min, randomize[i].x.max);
				if(randomize[i].y !== undefined)
					options[i].y = random(randomize[i].y.min,randomize[i].y.max);
			}
			else if( i == "color" ){
				options[i] = randomize[i][ Math.floor(randomize[i].length * Math.random()) ];
			}
		}
		var constructor = this.particleOptions.type === undefined ? Particle : this.particleOptions.type;
		var particle = new constructor(this.particleOptions);
		particle.parent = this;
		this.particles.push( particle );
	};
};
ParticleSystem.prototype.tick = function (){
	if(this.emiting){
		this.toSpawn += this.emitOptions.amount;
	}
	if(this.toSpawn > 1 && this.emiting){
		this.emit(Math.floor(this.toSpawn));
		this.toSpawn -= Math.floor(this.toSpawn);
	}
};

function random(min, max){
	if(min === max) return min;
	return Math.random()*( max - min ) + min;
}