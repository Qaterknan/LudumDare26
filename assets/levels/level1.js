new function level(){
	this.textures = {};
	this.sounds = {
		"up" : "assets/audio/up.wav",
		"down" : "assets/audio/down.wav",
		"hit" : "assets/audio/hit.wav",
	};
	this.scripts = {
		"menu" : "assets/js/guis/menu.js",
		"ingame" : "assets/js/guis/ingame.js",
	};
	this.afterLoad = function (){
		game.gui.GUILoad(this.scripts.ingame);

		var majorColor = "#9999ff";
		var minorColor = "#F0B9F0";

		// pozadí levelu =============================
		game.clearColor = majorColor;
		game.add( new Polygon({
			id: "backgroundPolygon",
			color: minorColor,
			opaque: false,
			zIndex: -100,
			points:[
				new Vector2(100,100),
				new Vector2(518,9),
				new Vector2(1000,20),
				new Vector2(1091,394),
				new Vector2(966,570),
				new Vector2(705,621),
				new Vector2(536,823),
				new Vector2(70,692),
				new Vector2(25,479),
				new Vector2(220,401),
				new Vector2(380,547),
				new Vector2(648,444),
				new Vector2(759,354),
				new Vector2(715,253),
				new Vector2(400,400),
				new Vector2(50,250),
			],
		}));
		game.polygonBorder = game.getChild("backgroundPolygon");

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
			position : new Vector2(308,230),
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
			position: new Vector2(175,512),
			radius: 20,
			color: "#F2DE46",
			response: function(){
				game.levelLoad("assets/levels/testlevel2.js");
			}
		}));
		var triggerLight = new PointLight({
			position: new Vector2(175,512),
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

		game.add(new Polygon({
			color: majorColor,
			position: new Vector2(926,237),
			opaque: true,
			points:[
				new Vector2(-89,-39),
				new Vector2(-51,-64),
				new Vector2(10,48),
				new Vector2(-68,84),
			],
			oscilatePoints: [
				new Vector2(854,160),
				new Vector2(961,350)
			],
			acceleration: 0.02,
			oscilateEasing: "harmonic"
		}));
		
		game.add(new Killer({
			position: new Vector2(527,66),
			distance: 180,
			shadowCastDistance: 180*2,
		}));
		game.add(new Killer({
			position: new Vector2(993,239),
			distance: 300
		}));
		game.add(new Killer({
			position: new Vector2(522,807),
			oscilatePoints: [new Vector2(522,807), new Vector2(394,551)],
			oscilateEasing: "harmonic",
			acceleration: 0.05,
			distance: 140
		}));
	};
};