function RangeredWeapon( options ){
	Weapon.call(this, options);
	var bulletOptions = options.bulletOptions === undefined ? {} : options.bulletOptions;
	
	bulletOptions.velocity = bulletOptions.speed === undefined ? new Vector2(20,0) : new Vector2(bulletOptions.speed,0);
	bulletOptions.textured = bulletOptions.texture === undefined ? false : true;
	bulletOptions.texture = bulletOptions.texture;
	bulletOptions.life = this.range*1000/(bulletOptions.velocity.x*60);
	bulletOptions.width = bulletOptions.width === undefined ? 1 : bulletOptions.width;
	bulletOptions.height = bulletOptions.height === undefined ? 1 : bulletOptions.height;
	bulletOptions.through = bulletOptions.through === undefined ? false : bulletOptions.through;
	//~ Poté, co se zkontrolovala platnost všech atruíbutů jsou přiřazeny oficiálně zbrani
	this.bullet = bulletOptions;
	var _this = this;
	this.bullet.tick = function (){
		for(var i  in game.children){
			var vec = game.children[i];
			if(!vec.damagable) continue;
			var posun = this.parent.getGlobalTranslate().add(this.parent.position);
			var y = this.position.y+posun.y-vec.position.y;
			if((Math.abs(this.position.x + posun.x - vec.position.x) * 2 < vec.width) && 
			(Math.abs(y) * 2 < vec.height)){
				if(!_this.bullet.through)
					this.life = -1;
				vec.damageDeal(_this.damage,y);
			}
		};
	};
	
	this.inaccuracy = options.inaccuracy === undefined ? {y: {min: 0, max: 0}} : {y: {min: -options.inaccuracy, max: options.inaccuracy}};
	this.bulletSource = options.bulletSource === undefined ? new Vector2(0,0) : options.bulletSource;
	
	this.emiter = new ParticleSystem({
		position : this.bulletSource,
	},
	this.bullet,
	{
		randomize : {
			velocity : this.inaccuracy,
		},
		amount : this.frequency,
		emiting : false,
	});
	this.add(this.emiter, "emiter");
};
RangeredWeapon.prototype = Object.create( Weapon.prototype );
RangeredWeapon.prototype.flip = function (code){
	if(this.texture.flip != code){
		this.bullet.velocity.x *= -1;
		if(this.bullet.textured)
			this.bullet.texture.flip = code;
		if(code == "x"){
			this.bulletSource.x *= -1;
			this.bulletSource.x -= (this.parent.width+this.width/2)/2;
		}
		else{
			this.bulletSource.x += (this.parent.width+this.width/2)/2;
			this.bulletSource.x *= -1;
		}
		this.texture.flip = code;
	}
};