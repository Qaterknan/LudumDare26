function Weapon( options ){
	Object2.call(this, options);
	
	this.damage = options.damage === undefined ? 1 : options.damage;
	this.frequency = options.frequency === undefined ? 1/60 : options.frequency;
	this.range = options.range === undefined ? 10 : options.range;
	this.fireSound = options.fireSound === undefined ? false : options.fireSound;
	this.fireShake = options.fireShake === undefined ? {x:1,y:1, decrease: 0.1} : options.fireShake;
	//~ Zda je nutné se pro použití zbraně zastavit
	this.stabilize = options.stabilize === undefined ? false : options.stabilize;
	//~ Problematické - jak se zbraň posouvá vzhledem k terminátorovi, 
	//~ pokud kráčí - bude horší programovat
	this.frames = options.frames === undefined ? {} : options.frames;
	
};
Weapon.prototype = Object.create(Object2.prototype);