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
		var obj = new Object2({
			position: new Vector2(100,100),
			texture: new Texture(this.textures.troll,{}),
			width: 100,
			height: 100,
		});
		game.add(obj, "troll");
		
		var b = new Button({
			color: new Color("#FF0000"),
			width: 140,
			height: 20,
			onMouseDown: function (){
				console.log("Olé!");
			},
			position: new Vector2(100,30)
		});
		
		var t = new Text({
			value: "Hello, world!",
			color: new Color("#000000"),
			position : new Vector2(0,0)
		});
		
		var a = new GUITexture(new Texture(this.textures.marine,{}),{
			position: new Vector2(115,2),
			width: 30,
			height: 15,
		});
		b.add(t, "napis");
		b.add(a, "marine");
		game.gui.add(b, "tlacitko");
		
		var gsTexture = new Texture(this.textures.genestealer,{
			totalFrames: 3,
			currentAnimation: "walking",
			animations: {
				walking: {
					start: 0,
					end: 2,
					speed: 7
				},
			}
		});
		
		var genestealer = new Genestealer({
			position: new Vector2(20,20),
			width: 50,
			height: 50,
			texture: gsTexture
		});
		game.add(genestealer, "gs");
	};
};