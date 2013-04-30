{
	preload: function(){
		return;
	},
	objects: function(game){
		game.gui.add( new Text({
			size : 20,
			lineSpacing: 25,
			visible: true,
			position: new Vector2((game.width - game.width/2)/2,0),
			width: game.width/2,
			height: game.height,
			align: "center",
			valign: "center",
			value : "Programming: Jirka Balhar, Štěpán Marek                                                                 Level Design: Jiří Zbytovský, Martin Mach,                   Jirka Balhar, Štěpán Marek                                                                                               Music: Jirka Balhar              Sounds: freesound.org",
			color : "#FFF",
			font : "Tahoma",
			shadow : {
					blur : 15,
					color : "#333"
				}
		}));
	},
	afterload: function(){
		return;
	}
}