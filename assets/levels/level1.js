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
	};
};