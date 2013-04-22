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
			collidable : false,
		});

		game.add(pozadi, "background");
		
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
			position: new Vector2(400,400),
			width: 75,
			height: 100,
			texture: gsTexture
		});

		game.add(genestealer, "genestealer");
		
		
		var player = new Object2({
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
		player.add(zbran, "weapon");
		game.add(player, "player");
		
		game.eventhandler.addKeyboardControl(70,undefined,
			function (){
				player.children.weapon.emiter.emiting = false;
				game.camera.stopShaking();
			},
			function (){
				player.children.weapon.emiter.emiting = true;
				game.camera.shake({x:2,y:2},0.1);
			}
		);
		game.eventhandler.addKeyboardControl(68, function (){
				player.texture.switchAnimation("walking");
				player.texture.flip = false;
				player.children.weapon.flip(false);
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
				player.children.weapon.flip("x");
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