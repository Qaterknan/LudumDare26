new function level(){
	this.textures = {
		"troll" : "assets/textures/troll.png",
		"marine" : "assets/textures/pixel.jpg",
		"genestealer" : "assets/textures/genestealer.png",
		"pozadi" : "assets/textures/pozadí.png",
		"kulka" : "assets/textures/kulka.png",
		"player" : "assets/textures/terminator.png",
		"heavy_bolter" : "assets/textures/heavy_bolter.png",
	};
	this.sounds = {};
	this.scripts = {
		"menu" : "assets/js/guis/menu.js",
		"ingame" : "assets/js/guis/ingame.js"
	};
	this.afterLoad = function (){
		game.gui.GUILoad(this.scripts.menu);
	};
};