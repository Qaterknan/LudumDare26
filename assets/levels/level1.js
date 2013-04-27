new function level(){
	this.textures = {};
	this.sounds = {};
	this.scripts = {
		"menu" : "assets/js/guis/menu.js",
		"ingame" : "assets/js/guis/ingame.js",
	};
	this.afterLoad = function (){
		game.gui.GUILoad(this.scripts.ingame);
		
		var player = new Player({
			position : new Vector2(100, 100)
		});
		player.addControls(game.eventhandler);
		game.add(player);

		var polygon = new Polygon({
			position : new Vector2(200, 200),
			points : [
				new Vector2(-10,-40),
				new Vector2(10,-30),
				new Vector2(20,10),
				new Vector2(20,30),
				new Vector2(-60,10),
				new Vector2(-80,-10),
				]
			});
		game.add(polygon);
			
		var svetlo = new PointLight({color: "#ff0000"});
		svetlo.position.set(300,300);
		game.add(svetlo);
		
		/*var spotl = new SpotLight({color: "#00ff00"});
		spotl.position.set(300,100);
		game.add(spotl);
		spotl.direction.set(-1,1);*/
	};
};