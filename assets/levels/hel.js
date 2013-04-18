new function level(){
	this.textures = {
		"troll" : "assets/textures/troll.png",
		"marine" : "assets/textures/pixel.jpg",
		"genestealer" : "assets/textures/genestealer.png",
		"pozadi" : "assets/textures/pozadí.png",
	};
	this.sounds = {
		"sisters" : "assets/sounds/sisters.mp3"
	};
	this.scripts = {
		"BLAH" : "assets/levels/blah.js",
	};
	this.afterLoad = function (){
		game.gui.add(new Button({
			position: new Vector2(100,100),
			value: "Hello world", 
			texture: new Texture(this.textures.marine),
			width: 100,
			height: 50,
			mousedown: function(){
				game.children.ps.emit(Particle, 100, {gravity: new Vector2(0,0), size: 2}, {velocity: {x:{min:-1,max:1},y:{min:-1,max:1}}});
			}
		}));

		var pozadi = new Object2({
			position: new Vector2(300,150),
			width: 600,
			height: 300,
			texture: new Texture(this.textures.pozadi),
		});

		game.add(pozadi);
		
		var gsTexture = new Texture(this.textures.genestealer, {
			totalFrames: 3,
			currentAnimation: "walking",
			animations: {
				walking: {
					start: 0,
					end: 2,
					speed: 60
				}
			}
		});
		
		var genestealer = new Genestealer({
			position: new Vector2(300,150),
			width: 50,
			height: 50,
			texture: gsTexture
		});

		game.add(genestealer);
		
		var ps = new ParticleSystem({
			position: new Vector2(100,100)
		});
		
		game.add(ps, "ps");
		
	};
};