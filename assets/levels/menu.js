new function level(){
	this.textures = {};
	this.sounds = {};
	this.scripts = {
		"menu" : "assets/js/guis/menu.js",
	};
	this.afterLoad = function (){
		game.gui.GUILoad(this.scripts.menu);
		
		var svetlo = new PointLight({color: "#ff0000"});
		svetlo.position.set(300,300);
		game.add(svetlo);
	};
};