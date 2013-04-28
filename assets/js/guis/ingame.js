{
	preload: function(){
		return;
	},
	objects: function(game){
		game.gui.add( new Text({
			size : 56,
			visible: false,
			width: game.width,
			height: game.height,
			align: "center",
			valign: "center",
			value : "Press E",
			color : "rgba(255,255,255,0.35)",
			font : "Tahoma",
		}),"press_e");
	},
	afterload: function(){
		return;
	}
}