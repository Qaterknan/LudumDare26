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
		
		var player = new Player({
			position : new Vector2(100, 100),
			zIndex : 10
		});
		player.addControls(game.eventhandler);
		player.id = "player";
		game.add(player);

		game.clearColor = "#F0B9F0";

		
		for(var i=0;i<25;i++){
			var polygon = new Polygon({
				position : new Vector2(1000*Math.random(), 1000*Math.random()),
				points : [
					new Vector2(-10*Math.random(),-10*Math.random()),
					new Vector2(10*Math.random(),-30*Math.random()),
					new Vector2(30*Math.random(),10*Math.random()),
					// new Vector2(40*Math.random(),30*Math.random()),
					// new Vector2(-60*Math.random(),10*Math.random()),
					// new Vector2(-80*Math.random(),-10*Math.random()),
					],
				color : "#E01BE0"
				});
			game.add(polygon);
		}
			
		var svetlo = new PointLight({color: "#ff0000"});
		svetlo.position.set(300,300);
		svetlo.changeSound = new Sound(game.loader.assets.sounds.up);
		game.add(svetlo);
		
		var svetlo2 = new PointLight({color: "#00ff00"});
		svetlo2.position.set(400,300);
		svetlo.changeSound = new Sound(game.loader.assets.sounds.up);
		game.add(svetlo2);
		
		var tlacitko = new Trigger({radius: 20});
		tlacitko.response = function (){
			console.log("olé");
		};
		tlacitko.position.set(100,100);
		game.add(tlacitko);
		
		/*var spotl = new SpotLight({color: "#00ff00"});
		spotl.position.set(300,100);
		game.add(spotl);
		spotl.direction.set(-1,1);*/
	};
};