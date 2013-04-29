new function level(){
	this.textures = {};
	this.sounds = {
		"fire" : "assets/sounds/fire.wav",
		"ticking" : "assets/sounds/ticking.wav",
		"clink" : "assets/sounds/clink.wav",
		"music" : "assets/sounds/shit.mp3",
	};
	this.scripts = {
		"menu" : "assets/js/guis/menu.js",
		"credits" : "assets/js/guis/credits.js",
	};
	this.afterLoad = function (){
		game.gui.GUILoad(this.scripts.menu);

		var music = new Sound(this.sounds.music);
		music.volume = 0.2;
		music.loop = true;
		music.play();
		
		game.clearColor = "#9999ff";
		
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
		
		for(var i=0;i<10;i++){
			var svetlo = new PointLight({
			color: '#'+(Math.random()*0xFFFFFF<<0).toString(16), 
			distance : 100+200*Math.random(), intensity: 0.5+Math.random()*0.5,
			position: new Vector2(Math.random()*game.width,Math.random()*game.height),
			oscilatePoints: [
				new Vector2(Math.random()*game.width,Math.random()*game.height), 
				new Vector2(Math.random()*game.width,Math.random()*game.height)
				],
			oscilateEasing: "harmonic",
			acceleration: 0.05*Math.random(),
		});
		svetlo.tick = function (){
			this.oscilate();
		};
		game.add(svetlo);
		}
	};
};