function Anihilator( options ){
	var options = options === undefined ? {} : options;
	PointLight.call(this, options);

	this.inSound = options.inSound === undefined ? false : options.inSound;
	this.outSound = options.outSound === undefined ? false : options.outSound;
	this.targets = [];
};
Anihilator.prototype = Object.create( PointLight.prototype );

Anihilator.prototype.onCollision = function(object) {
	var obsahujeBarvu = false;
	for(var i in object.colors){
		if(object.colors[i].getRGB() == this.color.getRGB()) obsahujeBarvu = true;
	};
	if(!obsahujeBarvu){
		object.colors.push(this.color);
		if(this.inSound)
			this.inSound.play();
		object.ghost = true;
		object.color = this.color.getRGB();
		object.colorAnouncer.toSpawn = 0;
		this.targets.push(object);
	}
};
Anihilator.prototype.tick = function (){
	for(var i in this.targets){
		this.targets[i].colorAnouncer.emit(2);
		if(!(this.testCollision(this.targets[i]) && game.lights.collision(this.targets[i].position.x, this.targets[i].position.y))){
			this.targets[i].ghost = false;
			this.targets[i].color = "#1BE063";
			for(var i in this.targets[i].colors){
				if(this.targets[i].colors[i].getRGB() == this.color.getRGB()){
					this.targets[i].colors.splice(i,1);
					if(this.outSound)
						this.outSound.play();
				}
			};
			this.targets.splice(i,1);
		}
	};
};