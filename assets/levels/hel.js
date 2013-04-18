new function level(){
	this.textures = {
		"troll" : "assets/textures/troll.png",
		"marine" : "assets/textures/pixel.jpg",
		"genestealer" : "assets/textures/genestealer.png",
		"pozadi" : "assets/textures/pozadí.png",
		"kulka" : "assets/textures/kulka.png",
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
				return;
			}
		}));

		var pozadi = new Object2({
			position: new Vector2(420,270),
			width: 860,
			height: 560,
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
			position: new Vector2(200,400),
		},
		{
			velocity: new Vector2(20,0),
			life : 1500,
			textured : true,
			texture : new Texture(this.textures.kulka),
			width : 15,
			height : 6,
		},
		{
			randomize:{
				velocity : {
					y : {
						min: -0.1,
						max : 0.1
					}
				}
			},
			amount : 0.2,
			emiting : false
		});
		
		game.add(ps, "ps");
		
		game.eventhandler.addKeyboardControl(70,undefined,
			function (){
				ps.emiting = false;
				game.camera.stopShaking();
			},
			function (){
				ps.emiting = true;
				game.camera.shake({x:1,y:1},0.3);
			});
	};
};