new function level(){
	this.textures = {};
	this.sounds = {};
	this.scripts = {
		"menu" : "assets/js/guis/menu.js",
		"credits" : "assets/js/guis/credits.js",
	};
	this.afterLoad = function (){
		game.gui.GUILoad(this.scripts.menu);
	};
};