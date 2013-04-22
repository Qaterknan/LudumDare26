function Creature( options ){
	Object2.call(this, options);
	
	this.damagable = true;
	this.health = options.health === undefined ? 100 : options.health;
	this.speed = options.speed === undefined ? 1 : options.speed;
	// Jaké dává po zabití věci
	this.dropping = options.dropping === undefined ? 1 : options.dropping;
	var bloodColor = options.bloodColor === undefined ? new Color(0xff0000, 0.5) : options.bloodColor;
	this.bloodDrop = {
		velocity : new Vector2(10,0),
		textured : false,
		color : bloodColor,
		life : 300,
		size : 5,
	};
	this.bloodVelocity = {
		x : {
			min : 0.5,
			max : 1.5,
		},
		y : {
			min : -1,
			max : 1,
		},
	};
	this.blood = new ParticleSystem({
		position : new Vector2(),
	},
	this.bloodDrop,{
		randomize : {
			velocity: this.bloodVelocity,
		},
		amount : 1,
		emiting : false,
	});
	this.add(this.blood);
};
Creature.prototype = Object.create( Object2.prototype );
Creature.prototype.damageDeal = function (damage, y){
	this.health -= damage;
	this.blood.position.y = y;
	this.blood.emit(damage);
	if(this.health < 0)
		this.die();
};
Creature.prototype.die = function (){console.log("die");
	this.parent.remove(this);
};