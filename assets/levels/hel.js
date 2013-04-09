new function level(){
	this.textures = {
		"troll" : "assets/textures/troll.png",
	};
	this.sounds = {};
	this.scripts = {
		"BLAH" : "assets/levels/blah.js",
	};
	this.afterLoad = function (){
		return true;
	};
};