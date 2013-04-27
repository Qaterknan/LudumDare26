new function level(){
	this.textures = {};
	this.sounds = {};
	this.scripts = {
		"menu" : "assets/js/guis/menu.js",
		"ingame" : "assets/js/guis/ingame.js",
	};
	this.afterLoad = function (){
		game.gui.GUILoad(this.scripts.ingame);
		
		var player = new Player();
		player.addControls(game.eventhandler);
		game.add(player);
	};
};