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
		life : 3000,
		size : 5,
		gravity : new Vector2(0,0.1),
		tick : function(){
			if(Math.random()<0.001) console.log(this.position.y)
			if(this.position.y > 50 && this.velocity.y > 0){
				this.velocity.y *= -1;
				this.friction.y = 0.9;
			}
		}
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
			// gravity : {
			// 	x : {
			// 		min : 0,
			// 		max : 0.1
			// 	},
			// 	y : {
			// 		min : 0.01,
			// 		max : 0.02
			// 	}
			// },
			velocity: this.bloodVelocity,
			spin : {
				min : -0.2,
				max : 0.2
			},
			fade : {
				min : 0.005,
				max : 0.01
			},
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