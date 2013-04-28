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

		// pozadí levelu
		game.clearColor = "#9999ff";
		game.add( new Polygon({
			id: "backgroundPolygon",
			color:"#F0B9F0",
			opaque: false,
			zIndex: -100,
			points:[
				new Vector2(100,100),
				new Vector2(518,45),
				new Vector2(1000,20),
				new Vector2(800,350),
				new Vector2(400,400),
				new Vector2(50,250),
			],
		}));
		game.polygonBorder = game.getChild("backgroundPolygon");

		var playerLight = new PointLight({
			id: "playerLight",
			color: "#FFF", 
			distance: 20, 
			shadowCastDistance: 40,
			intensity: 0.5,
			collidable: false,
		});
		
		var player = new Player({
			id: "player",
			position : new Vector2(150, 150),
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

		var pol3 = new Portal({
			color: "rgba(0,0,255,0.5)",
			ghostId: "port1",
			position: new Vector2(811,155),
			points:[
				new Vector2(-30,-150),
				new Vector2(15,-150),
				new Vector2(50,150),
				new Vector2(30,150),
			],
		});
		game.add(pol3);
		
		var svetlo = new Tunneler({
			color: "#0000ff",
			distance: 100,
			shadowCastDistance: 100,
			ghostId: "port1",
			inSound: new Sound(game.loader.assets.sounds.up),
			outSound: new Sound(game.loader.assets.sounds.down)
		});
		svetlo.position.set(300,300);
		game.add(svetlo);
		
		var sw = new Switch({
			radius: 25,
			position: new Vector2(100,100),
			light: new PointLight({
				color: "#ffffff",
				distance: 50,
				position: new Vector2(0,0),
			}),
		});
		game.add(sw);
		
		var zmensovadlo = new Resizer({color: "#855E3E", distance: 100, intensity: 0.8, scale: 2});
		zmensovadlo.position.set(100,300);
		game.add(zmensovadlo);
		
		var zabijak = new Killer({
			color: "#990000",
			distance: 25,
			hitSound: new Sound(game.loader.assets.sounds.hit),
		});
		zabijak.position.set(200,100);
		game.add(zabijak);
		
		var urychlovac = new Accelerator({
			lightConstructor: PointLight,
			color: "#25E6B9",
			distance: 300,
			intensity: 0.8,
			bonus: 5,
			range: PI/6,
			inSound: new Sound(game.loader.assets.sounds.up),
			outSound: new Sound(game.loader.assets.sounds.down),
		});
		urychlovac.position.set(622,371);
		game.add(urychlovac);
		
		var svetlo2 = new PointLight({color: "#FFFB03", distance: 50, shadowCastDistance: 100, intensity: 0.2});
		svetlo2.position.set(918,76);
		svetlo.changeSound = new Sound(game.loader.assets.sounds.up);
		game.add(svetlo2);
		
		var tlacitko = new Trigger({radius: 20});
		tlacitko.response = function (){
			game.levelLoad("assets/levels/level2.js");
		};
		tlacitko.position.set(918,76);
		game.add(tlacitko);
	};
};