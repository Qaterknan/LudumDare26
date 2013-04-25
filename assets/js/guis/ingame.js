{
	preload: function(){
		return;
	},
	objects: function(game){
		game.gui.add(new Button({
			position: new Vector2(100,100),
			value: "Hello world", 
			texture: new Texture(game.loader.textures["assets/textures/pixel.jpg"]),
			width: 100,
			height: 50,
			mousedown: function(){
				return;
			}
		}));
	},
	afterload: function(){
		return;
	}
}