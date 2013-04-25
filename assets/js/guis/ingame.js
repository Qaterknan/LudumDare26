{
	preload: function(){
		return;
	},
	objects: function(game){
		game.gui.add(new Button({
			position: new Vector2(100,100),
			value: "Hello world", 
			texture: new Texture( game.loader.get("textures/marine") ),
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