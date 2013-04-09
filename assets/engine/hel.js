new function level(){
	this.textures = {};
	this.sounds = {};
	this.scripts = {
		"BLAH" : "assets/engine/blah.js",
	};
	this.afterLoad = function (){
		return true;
	};
};