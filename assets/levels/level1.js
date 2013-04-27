new function level(){
	this.textures = {};
	this.sounds = {
		"up" : "assets/audio/up.wav",
		"down" : "assets/audio/down.wav",
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

		game.add( new InversedPolygon({
			color:"#9999ff",
			points:[
				new Vector2(100,100),
				new Vector2(500,20),
				new Vector2(400,350),
				new Vector2(200,400),
			],
		}));

		var pol = new Polygon({
			color:"#7777ff",
			opaque: true,
			position: new Vector2(240, 270),
			points:[
				new Vector2(0,0),
				new Vector2(30,50),
				new Vector2(-20,20),
			],
		});
		game.add(pol);
		
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
		game.add(playerLight);
		game.add(player);

		game.clearColor = "#F0B9F0";
		
			
		var svetlo = new Anihilator({
			color: "#0000ff",
			distance: 100,
			inSound: new Sound(game.loader.assets.sounds.up),
			outSound: new Sound(game.loader.assets.sounds.down)
		});
		svetlo.position.set(300,300);
		game.add(svetlo);
		
		var zmensovadlo = new Resizer({color: "#855E3E", distance: 100, intensity: 0.8, newSize: 20});
		zmensovadlo.position.set(100,300);
		game.add(zmensovadlo);
		
		var svetlo2 = new PointLight({color: "#FFFB03", distance: 50, intensity: 0.2});
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