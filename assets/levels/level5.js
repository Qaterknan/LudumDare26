new function level(){
	this.textures = {};
	this.sounds = {};
	this.scripts = {"ingame" : "assets/js/guis/ingame.js"};
	this.afterLoad = function (){
		game.gui.GUILoad(this.scripts.ingame);
		statistics.send("level2");

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
		player.dieSound = new Sound(game.loader.assets.sounds.fire);
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
		var exit_sound = new Sound(game.loader.assets.sounds.clink);
		game.add(new Trigger({
			position: new Vector2(1125,-51),
			radius: 20,
			color: "#F2DE46",
			response: function(){
				exit_sound.play();
				game.levelLoad("assets/levels/level2.js");
			}
		}));
		var triggerLight = new PointLight({
			position: new Vector2(1125,-51),
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
			position: new Vector2(624,251),
			direction: PI*3/2,
			distance: 100,
			intensity: 0.8,
			scale: 0.5,
			oscilatePoints: [new Vector2(784,137), new Vector2(747,388)],
			oscilateEasing: "linear",
			acceleration: 0.02,
		});
		smaller.tick = function (){
			//~ this.oscilate();
		};
		game.add(smaller);
		
		game.add(new Polygon({
			points : [
				new Vector2(848,70),
				new Vector2(691,-25),
				new Vector2(719,-95),
				new Vector2(1092,-102),
				new Vector2(1241,-62),
				new Vector2(1035,56),
				new Vector2(985,400),
				new Vector2(812,406),
			],
			color: minorColor,
			opaque: false,
			zIndex: -100,
		}));
		
		var teleport1 = new Teleporter({
			id : "teleport1",
			position : new Vector2(740,250),
			color: "#D117B8",
			destination : new Vector2(877,251),
			radius : 20,
		});
		teleport1.response = function (){
			this.teleport(player);
			if(player.radius != 15){
				smaller.postefect(player);
				player.radius = 15
			}
		};
		game.add(teleport1);
		
		var teleport1Light = new PointLight({
			position: new Vector2(740,250),
			distance: 150,
			shadowCastDistance: 20,
			color: "#D117B8",
			intensity: 0.5,
		});
		game.add(teleport1Light);
		
		game.add(new Killer({
			position: new Vector2(982,352),
			direction: PI*3/2,
			distance: 120,
			range: PI/8,
			intensity: 0.8,
			oscilatePoints: [new Vector2(982,352), new Vector2(1017,133)],
			oscilateEasing: "harmonic",
			acceleration: 0.02,
		}));
	};
};
