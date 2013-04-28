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

		var mainColor = "#9999ff";

		// pozadí levelu =============================
		game.clearColor = mainColor;
		game.add( new Polygon({
			id: "backgroundPolygon",
			color:"#F0B9F0",
			opaque: false,
			zIndex: -100,
			points:[
				new Vector2(100,200),
				new Vector2(300,200),
				new Vector2(700,200),
				new Vector2(700,100),
				new Vector2(650,100),
				new Vector2(650, 0),
				new Vector2(770, 0),
				new Vector2(770,100),
				new Vector2(720,100),
				new Vector2(720,200),
				new Vector2(900,200),
				new Vector2(900,900),
				new Vector2(800,900),
				new Vector2(700,300),
				new Vector2(400,300),
				new Vector2(100,300),
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
			position: new Vector2(710,50),
			radius: 20,
			color: "#F2DE46",
			response: function(){
				game.levelLoad("assets/levels/testlevel2.js");
			}
		}));
		var triggerLight = new PointLight({
			position: new Vector2(710,50),
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
			position: new Vector2(500,250),
			oscilatePoints: [new Vector2(400,150), new Vector2(600,350)],
			oscilateEasing: "harmonic",
			acceleration: 0.05,
			distance: 100
		}));
		game.add(new Killer({
			position: new Vector2(850,250),
			oscilatePoints: [new Vector2(700,250), new Vector2(1000,250)],
			oscilateEasing: "harmonic",
			acceleration: 0.09,
			distance: 80
		}));
		game.add(new Killer({
			position: new Vector2(900,500),
			oscilatePoints: [new Vector2(700,500), new Vector2(1000,500)],
			oscilateEasing: "harmonic",
			acceleration: 0.09,
			distance: 80
		}));
		game.add(new Killer({
			position: new Vector2(900,500),
			oscilatePoints: [new Vector2(700,750), new Vector2(1000,750)],
			oscilateEasing: "harmonic",
			acceleration: 0.09,
			distance: 80
		}));
		game.add(new Killer({
			position: new Vector2(900,500),
			oscilatePoints: [new Vector2(700,250), new Vector2(1000,750)],
			oscilateEasing: "harmonic",
			acceleration: 0.09,
			distance: 40
		}));
		game.add(new Killer({
			position: new Vector2(900,500),
			oscilatePoints: [new Vector2(1000,250), new Vector2(700,750)],
			oscilateEasing: "harmonic",
			acceleration: 0.09,
			distance: 80
		}));
		var res = new new Resizer({
			position: new Vector2(900, 900),
			scale: 0.5,
			distance: 80
		})
		res.postefect = false;
		game.add(res);
	};
};