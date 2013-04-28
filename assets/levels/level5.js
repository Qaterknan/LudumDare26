new function level(){
	this.textures = {};
	this.sounds = {
		"up" : "assets/audio/up.wav",
		"down" : "assets/audio/down.wav",
		"hit" : "assets/audio/hit.wav",
		"ticking" : "assets/sounds/ticking.wav",
	};
	this.scripts = {
		"menu" : "assets/js/guis/menu.js",
		"ingame" : "assets/js/guis/ingame.js",
	};
	this.afterLoad = function (){
		game.gui.GUILoad(this.scripts.ingame);

		var majorColor = "#F55D5D";
		var minorColor = "#94ADF2";

		// pozadí levelu =============================
		game.clearColor = majorColor;
		game.add( new Polygon({
			id: "backgroundPolygon",
			color: minorColor,
			opaque: false,
			zIndex: -100,
			points:[
				new Vector2(98,97),
				new Vector2(106,404),
				new Vector2(539,412),
				new Vector2(567,261),
				new Vector2(591,262),
				new Vector2(586,403),
				new Vector2(749,403),
				new Vector2(791,105),
				new Vector2(642,102),
				new Vector2(601,238),
				new Vector2(569,237),
				new Vector2(594,91),
			],
		}));
		// game.polygonBorder = game.getChild("backgroundPolygon");

		// player =============================
		var playerLight = new PointLight({
			id: "playerLight",
			color: "#FFF", 
			distance: 20, 
			shadowCastDistance: 40,
			intensity: 0.5,
			collidable: false,
		});
		playerLight.ambientParticles.emiting = false;
		
		var player = new Player({
			id: "player",
			position : new Vector2(267,249),
			zIndex : 10
		});
		player.addControls(game.eventhandler);

		playerLight.position = player.position;
		game.camera.tick = function(){
			var player = game.getChild("player");
			if(player){
				this.moveTo( new Vector2(-game.width/2, -game.height/2).add(player.position) );
			}
		};
		game.add(playerLight);
		game.add(player);

		// cíl =============================
		game.add(new Trigger({
			position: new Vector2(738,253),
			radius: 20,
			color: "#F2DE46",
			response: function(){
				game.levelLoad("assets/levels/level2.js");
			}
		}));
		var triggerLight = new PointLight({
			position: new Vector2(738,253),
			radius: 20,
			color: "#FFFF00",
			intensity: 0.4,
		})
		triggerLight.efect = function(){
				game.gui.children["press_e"].visible = true;
			};
		triggerLight.postefect = function(){
				game.gui.children["press_e"].visible = false;
			};
		game.add(triggerLight);

		// ostatní =============================
		
		var smaller = new Resizer({
			position: new Vector2(448,102),
			direction: PI*5/8,
			distance: 300,
			range: PI/6,
			intensity: 0.8,
			scale: 0.5,
		});
		smaller.tick = function (){
			if(this.oldDirection === undefined)
				this.oldDirection = this.direction;
			this.direction = Math.sin(this.ticks/10)+this.oldDirection;
			this.ticks++;
			console.log(this.direction);
		};
		game.add(smaller);
	};
};