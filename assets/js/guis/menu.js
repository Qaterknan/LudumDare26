{
	preload: function(){
		return;
	},
	objects: function(game){
		game.gui.add( new Button({
			id: "startButton",
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
			mouseup : function (){
				game.levelLoad("assets/levels/level1.js");
			},
		}) );
	},
	afterload: function(){
		return;
	}
}