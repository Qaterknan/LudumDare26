new function level(){
	this.textures = {};
	this.sounds = {
		"up" : "assets/audio/up.wav",
	};
	this.scripts = {
		"menu" : "assets/js/guis/menu.js",
		"ingame" : "assets/js/guis/ingame.js",
	};
	this.afterLoad = function (){
		game.gui.GUILoad(this.scripts.ingame);
		
		var playerLight = new PointLight({color: "#ffffff", distance: 50});
		
		var player = new Player({
			position : new Vector2(100, 100),
			zIndex : 10
		});
		player.addControls(game.eventhandler);
		player.id = "player";
		playerLight.id = "svetlo";
		player.add(playerLight);
		game.add(player);

		game.clearColor = "#F0B9F0";
		
		

		
		
			
		var svetlo = new PointLight({color: "#0000ff", distance: 200});
		svetlo.position.set(300,300);
		svetlo.changeSound = new Sound(game.loader.assets.sounds.up);
		game.add(svetlo);
		
		//~ var svetlo2 = new PointLight({color: "#009900", distance: 200});
		//~ svetlo2.position.set(400,300);
		//~ svetlo.changeSound = new Sound(game.loader.assets.sounds.up);
		//~ game.add(svetlo2);
		
		//~ var tlacitko = new Trigger({radius: 20});
		//~ tlacitko.response = function (){
			//~ console.log("olé");
		//~ };
		//~ tlacitko.position.set(100,100);
		//~ game.add(tlacitko);
		
		/*var spotl = new SpotLight({color: "#00ff00"});
		spotl.position.set(300,100);
		game.add(spotl);
		spotl.direction.set(-1,1);*/
	};
};