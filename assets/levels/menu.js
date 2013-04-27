new function level(){
	this.textures = {};
	this.sounds = {};
	this.scripts = {
		"menu" : "assets/js/guis/menu.js",
	};
	this.afterLoad = function (){
		game.gui.GUILoad(this.scripts.menu);
	};
};