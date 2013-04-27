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

		game.add(new Resizer({
			position: new Vector2(400,100),
			newSize: 10,
			color: "#FF0000"
		}));

		// pozadí
		game.clearColor = "#9999ff";
		game.add( new Polygon({
			id: "backgroundPolygon",
			color:"#F0B9F0",
			opaque: false,
			zIndex: -100,
			points:[
				new Vector2(100,100),
				new Vector2(500,20),
				new Vector2(400,350),
				new Vector2(200,400),
				new Vector2(50,250),
			],
		}));
		game.polygonBorder = game.getChild("backgroundPolygon");

		game.add(new Polygon({
			color:"#7777ff",
			opaque: true,
			position: new Vector2(240, 270),
			points:[
				new Vector2(0,0),
				new Vector2(30,50),
				new Vector2(-20,20),
				new Vector2(-20,-20),
			],
		}));
		
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
			if(player)
				this.position.copy(player.position).sub(new Vector2(game.width/2, game.height/2));
		};

		game.add(playerLight);
		game.add(player);

		
		var pol = new Polygon({
			color:"#9999ff",
			points:[
				new Vector2(25,75),
				new Vector2(75,75),
				new Vector2(75,500),
				new Vector2(25,500),
			],
		});
		game.add(pol);
		
		var pol2 = new Polygon({
			color: "#9999ff",
			points:[
				new Vector2(75,400),
				new Vector2(500,400),
				new Vector2(500,450),
				new Vector2(75,450),
			],
		});
		game.add(pol2);
		
		var pol3 = new Portal({
			color: "rgba(0,0,255,0.5)",
			points:[
				new Vector2(300,75),
				new Vector2(325,75),
				new Vector2(325,400),
				new Vector2(300,400),
			],
		});
		game.add(pol3);
		
		var pol4 = new Polygon({
			color:"#9999ff",
			points:[
				new Vector2(25,75),
				new Vector2(25,50),
				new Vector2(500,50),
				new Vector2(500,75),
			],
		});
		game.add(pol4);
		
		var pol5 = new Polygon({
			color:"#9999ff",
			points:[
				new Vector2(500,50),
				new Vector2(525,50),
				new Vector2(525,400),
				new Vector2(500,400),
			],
		});
		game.add(pol5);
			
		var svetlo = new Tunneler({
			color: "#0000ff",
			distance: 100,
			inSound: new Sound(game.loader.assets.sounds.up),
			outSound: new Sound(game.loader.assets.sounds.down)
		});
		svetlo.position.set(300,300);
		game.add(svetlo);
		
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
		
		var svetlo2 = new PointLight({color: "#FFFB03", distance: 50, shadowCastDistance: 100, intensity: 0.2});
		svetlo2.position.set(450,100);
		svetlo.changeSound = new Sound(game.loader.assets.sounds.up);
		game.add(svetlo2);
		
		var tlacitko = new Trigger({radius: 20});
		tlacitko.response = function (){
			game.levelLoad("assets/levels/level2.js");
		};
		tlacitko.position.set(450,100);
		game.add(tlacitko);
		
		/*var spotl = new SpotLight({color: "#00ff00"});
		spotl.position.set(300,100);
		game.add(spotl);
		spotl.direction.set(-1,1);*/
	};
};