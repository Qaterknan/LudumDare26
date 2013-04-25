new function level(){
	this.textures = {
		"troll" : "assets/textures/troll.png",
		"marine" : "assets/textures/pixel.jpg",
		"genestealer" : "assets/textures/genestealer.png",
		"pozadi" : "assets/textures/pozadí.png",
		"kulka" : "assets/textures/kulka.png",
		"player" : "assets/textures/terminator.png",
		"heavy_bolter" : "assets/textures/heavy_bolter.png",
	};
	this.sounds = {
		"sisters" : "assets/sounds/sisters.mp3"
	};
	this.scripts = {
		"bolter_options" : "assets/js/weapons/bolterOptions.js",
		"ingame" : "assets/js/guis/ingame.js"
	};
	this.afterLoad = function (){
		game.gui.GUILoad(this.scripts.ingame);

		var pozadi = new Object2({
			position: new Vector2(420,270),
			width: 860,
			height: 560,
			texture: new Texture(this.textures.pozadi),
			collidable : false,
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
		
		var genestealer = new Creature({
			zIndex: 20,
			position: new Vector2(400,400),
			width: 75,
			height: 100,
			texture: gsTexture
		});

		game.add(genestealer);
		
		
		var player = new Object2({
			id: "player",
			position: new Vector2(200,400),
			width: 96,
			height: 105,
			texture : new Texture(this.textures.player,{
				totalFrames : 5,
				currentAnimation : "standing",
				animations : {
					standing : {
						start : 0,
						end : 0,
						speed : 1
					},
					walking : {
						start : 1,
						end : 4,
						speed : 10
					}
				},
			}),
		});
		
		var bolter_options = this.scripts.bolter_options;
		bolter_options.texture = new Texture(this.textures.heavy_bolter);
		bolter_options.bulletOptions.texture = new Texture(this.textures.kulka);
		
		var zbran = new RangeredWeapon(bolter_options);
		zbran.id = "weapon";

		player.add(zbran);
		game.add(player);

		// game.camera.follow(player.position);
		
		game.eventhandler.addKeyboardControl(70,
			function (){
				game.camera.shake({x:2,y:2},0.5);
			},
			function (){
				player.getChild("weapon").emiter.emiting = false;
				game.camera.stopShaking();
			},
			function (){
				player.getChild("weapon").emiter.emiting = true;
			}
		);
		game.eventhandler.addKeyboardControl(68, function (){
				player.texture.switchAnimation("walking");
				player.texture.flip = false;
				player.getChild("weapon").flip(false);
			},
			function (){
				player.texture.switchAnimation("standing");
			}, 
			function (){
				player.position.x += 1;
			}
		);
		game.eventhandler.addKeyboardControl(65, function (){
				player.texture.switchAnimation("walking");
				player.texture.flip = "x";
				player.getChild("weapon").flip("x");
			}, 
			function (){
				player.texture.switchAnimation("standing");
			},
			function (){
				player.position.x -= 1;
			}
		);
	};
};