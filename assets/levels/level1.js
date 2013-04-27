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
			position : new Vector2(100, 100),
			zIndex : 10
		});
		player.addControls(game.eventhandler);
		game.add(player);

		var polygon = new Polygon({
			position : new Vector2(200, 200),
			points : [
				new Vector2(-10*2,-20*2),
				new Vector2(10*2,-30*2),
				new Vector2(20*2,10*2),
				// new Vector2(20*2,30*2),
				// new Vector2(-60*2,10*2),
				// new Vector2(-80*2,-10*2),
				]
			});
		game.add(polygon);
	};
};