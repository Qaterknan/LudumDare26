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

		var majorColor = "#0FF293";
		var minorColor = "#E09D80";

		// pozadí levelu =============================
		game.clearColor = majorColor;
		game.add( new Polygon({
			id: "backgroundPolygon",
			color: minorColor,
			opaque: false,
			zIndex: -100,
			points:[
				new Vector2(334,47),
				new Vector2(499,56),
				new Vector2(539,-151),
				new Vector2(721,-135),
				new Vector2(750,69),
				new Vector2(786,69),
				new Vector2(800,-122),
				new Vector2(1035,-23),
				new Vector2(1033,112),
				new Vector2(800,245),
				new Vector2(758,251),
				new Vector2(715,434),
				new Vector2(772,625),
				new Vector2(513,625),
				new Vector2(547,442),
				new Vector2(504,248),
				new Vector2(265,349),
				new Vector2(96,232),
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
			position: new Vector2(655,578),
			radius: 20,
			color: "#F2DE46",
			response: function(){
				game.levelLoad("assets/levels/level2.js");
			}
		}));
		var triggerLight = new PointLight({
			position: new Vector2(655,578),
			radius: 30,
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

		
		game.add(new Killer({
			id: "killer",
			position: new Vector2(627,-43),
			oscilatePoints: [new Vector2(627,-43), new Vector2(630,339)],
			oscilateEasing: "linear",
			acceleration: 0.01,
			distance: 130
		}));

		game.add(new Tunneler({
			id: "tunneler",
			position: new Vector2(624,167),
			color: "#0F16F2",
			distance: 140
		}));

		game.add(new Trigger({
			id: "speedTrigger",
			position: new Vector2(402,167),
			radius: 20,
			color: "#F20FDF",
			response: function(){
				game.getChild("killer").acceleration = 0.003;
				var sound = this.timerSound;
				sound.loop = true;
				sound.play();
				game.getChild("killer").addTimeEvent(5000, function (o){
					o.acceleration = 0.01;
					sound.stop();
				});
			}
		}));
		game.getChild("speedTrigger").timerSound = new Sound(game.loader.assets.sounds.ticking,{loop: true});
		var triggerLight = new PointLight({
			position: new Vector2(402,167),
			radius: 30,
			color: "#F20FDF",
			intensity: 0.6,
		})
		triggerLight.efect = function(){
				game.gui.children["press_e"].visible = true;
			};
		triggerLight.postefect = function(){
				game.gui.children["press_e"].visible = false;
			};
		game.add(triggerLight); 
	};
};