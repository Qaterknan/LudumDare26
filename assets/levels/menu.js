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
	this.scripts = {};
	this.afterLoad = function (){
		var play = new Button({
			position : new Vector2(100,100),
			width: 100,
			height: 40,
			rectangle : {
				color : "#000000",
			},
			text : {
				size : 36,
				value : "Play",
				color : "#ffffff",
				font : "VT220",
			},
			mousedown : function (){
				game.levelLoad("assets/levels/tyranid1.js");
			},
		});
		game.gui.add(play);
	};
};