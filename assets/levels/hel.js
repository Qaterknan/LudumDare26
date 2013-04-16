new function level(){
	this.textures = {
		"troll" : "assets/textures/troll.png",
		"marine" : "assets/textures/pixel.jpg",
		"genestealer" : "assets/textures/genestealer.png"
	};
	this.sounds = {
		"sisters" : "assets/sounds/sisters.mp3"
	};
	this.scripts = {
		"BLAH" : "assets/levels/blah.js",
	};
	this.afterLoad = function (){
		// var obj = new Object2({
		// 	position: new Vector2(100,100),
		// 	texture: new Texture(this.textures.troll,{}),
		// 	width: 100,
		// 	height: 100,
		// });
		// game.add(obj, "troll");
		
		// var b = new Button({
		// 	color: new Color("#FF0000"),
		// 	width: 140,
		// 	height: 20,
		// 	onMouseDown: function (){
		// 		console.log("Olé!");
		// 	},
		// 	position: new Vector2(100,30)
		// });
		
		game.gui.add(new Button({
			position: new Vector2(100,100),
			value: "Hello world", 
			texture: new Texture(this.textures.marine),
			width: 100,
			height: 50,
			mousedown: function(){
				console.log("ahoj");
			}
		}));
		
		// var gsTexture = new Texture(this.textures.genestealer,{
		// 	totalFrames: 3,
		// 	currentAnimation: "walking",
		// 	animations: {
		// 		walking: {
		// 			start: 0,
		// 			end: 2,
		// 			speed: 7
		// 		},
		// 	}
		// });
		
		// var genestealer = new Genestealer({
		// 	position: new Vector2(20,20),
		// 	width: 50,
		// 	height: 50,
		// 	texture: gsTexture
		// });
		// game.add(genestealer, "gs");
	};
};