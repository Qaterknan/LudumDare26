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
		
		var t = new Text({
			value: "Hello, world!",
			color: new Color("#FF0000"),
			width: 90,
			position : new Vector2(0,0)
		});
		
		var a = new Rectangle({
			texture: new Texture(this.textures.marine,{
				repeat: true,
				scale: new Vector2(0.1,0.1)
			}),
			position: new Vector2(100,100),
			// rotation: 1,
			width: 90,
			height: 60,
			mousedown: function(){
				console.log(game.eventhandler.mouse.x,game.eventhandler.mouse.y)
			},
		});
		a.add(t, "napis");
		// b.add(a, "marine");
		game.gui.add(a, "tlacitko");
		
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