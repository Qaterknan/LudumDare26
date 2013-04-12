new function level(){
	this.textures = {
		"troll" : "assets/textures/troll.png",
	};
	this.sounds = {};
	this.scripts = {
		"BLAH" : "assets/levels/blah.js",
	};
	this.afterLoad = function (){
		var obj = new Object2({
			position: new Vector2(100,100),
			texture: new Texture(this.textures.troll,{}),
			width: 100,
			height: 100,
		});
		game.add(obj, "troll");
	};
};