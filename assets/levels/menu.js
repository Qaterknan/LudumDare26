new function level(){
	this.textures = {};
	this.sounds = {};
	this.scripts = {
		"menu" : "assets/js/guis/menu.js",
	};
	this.afterLoad = function (){
		game.gui.GUILoad(this.scripts.menu);
		
		game.clearColor = "#E0E0E0";
		
		game.camera.origin.set(0,0);
		
		game.eventhandler.addMouseControl(1, function(x,y){
		console.log(
			Math.round(game.camera.tx(x))+","+
			Math.round(game.camera.ty(y))
			);
		});
		
		var polygon = new Polygon({
			color: "#9999ff",
			position: new Vector2(0,0),
			points:[
				new Vector2(92,427),
				new Vector2(91,244),
				new Vector2(497,223),
				new Vector2(709,307),
				new Vector2(542,449),
			],
		});
		//~ game.add(polygon);
		
		var polygon2 = new Polygon({
			color: "#9999ff",
			position: new Vector2(0,0),
			points:[
				new Vector2(559,206),
				new Vector2(697,267),
				new Vector2(717,74),
				new Vector2(616,17),
				new Vector2(400,18),
				new Vector2(227,26),
				new Vector2(223,146),
				new Vector2(316,192),
				new Vector2(521,176),
			],
		});
		//~ game.add(polygon2)
		
		var svetlo1 = new Tunneler({
			color: "#0000ff", distance : 200, intensity: 0.8,
			position: new Vector2(496,397),
		});
		game.add(svetlo1);
		
		var svetlo2 = new Killer({
			distance: 100,
			intensity: 0.8,
			position: new Vector2(173,52),
			oscilatePoints: [new Vector2(173,52), new Vector2(319,395)],
			oscilateEasing: "harmonic",
			acceleration: 0.05,
		});
		game.add(svetlo2);
		
		var svetlo3 = new Accelerator({
			distance: 70,
			intensity: 0.8,
			position: new Vector2(655,99),
			oscilatePoints: [new Vector2(655,99), new Vector2(710,239)],
			oscilateEasing: "harmonic",
			acceleration: 0.005,
		});
		svetlo3.tick = function (){
			this.oscilate();
		};
		game.add(svetlo3);
	};
};