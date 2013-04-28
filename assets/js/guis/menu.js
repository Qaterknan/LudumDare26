{
	preload: function(){
		return;
	},
	objects: function(game){
		game.gui.add( new Button({
			id: "startButton",
			position : new Vector2(game.width/2-50,150),
			width: 130,
			height: 40,
			rectangle : {
				visible: false,
			},
			text : {
				size : 36,
				value : "Play",
				color : "#ffffff",
				font : "VT220",
				position: new Vector2(35,0),
			},
			mouseup : function (){
				game.levelLoad("assets/levels/level1.js");
			},
			mouseover : function (){
				this.children[1].size = 38;
				this.children[1].position.x = 33;
			},
			mouseout : function (){
				this.children[1].size = 36;
				this.children[1].position.x = 35;
			},
		}) );
		game.gui.add(new Button({
			id: "load",
			position: new Vector2(game.width/2-50,100),
			width: 130,
			height: 40,
			rectangle : {
				visible: false,
			},
			text: {
				size: 36,
				value: "Continue",
				color: "#ffffff",
				font: "VT220",
			},
			mouseup : function (){
				console.log("Program this first!");
			},
			mouseover : function (){
				this.children[1].size = 38;
				this.children[1].position.x = -3;
			},
			mouseout : function (){
				this.children[1].size = 36;
				this.children[1].position.x = 0;
			},
		}));
		game.gui.add(new Button({
			id: "website",
			position: new Vector2(game.width/2-50,200),
			width: 130,
			height: 40,
			rectangle : {
				visible: false,
			},
			text: {
				size: 36,
				value: "Website",
				color: "#ffffff",
				font: "VT220",
				position: new Vector2(7,0),
			},
			mouseup : function (){
				window.open("http://kukas.no-ip.org/","_blank");
			},
			mouseover : function (){
				this.children[1].size = 38;
				this.children[1].position.x = 3;
			},
			mouseout : function (){
				this.children[1].size = 36;
				this.children[1].position.x = 7;
			},
		}));
		game.gui.add(new Button({
			id: "credits",
			position: new Vector2(game.width/2-50,250),
			width: 130,
			height: 40,
			rectangle : {
				visible: false,
			},
			text: {
				size: 36,
				value: "Credits",
				color: "#ffffff",
				font: "VT220",
				position: new Vector2(14,0),
			},
			mouseup : function (){
				game.gui.GUILoad(game.loader.assets.scripts.credits);
			},
			mouseover : function (){
				this.children[1].size = 38;
				this.children[1].position.x = 11;
			},
			mouseout : function (){
				this.children[1].size = 36;
				this.children[1].position.x = 14;
			},
		}));
	},
	afterload: function(){
		return;
	}
}