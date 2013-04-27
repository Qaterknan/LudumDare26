new function level(){
	this.textures = {};
	this.sounds = {};
	this.scripts = {
		"menu" : "assets/js/guis/menu.js",
		"ingame" : "assets/js/guis/ingame.js",
	};
	this.afterLoad = function (){
		game.gui.GUILoad(this.scripts.ingame);
		
		var player = new Player({
			position : new Vector2(100, 100),
			zIndex : 10
		});
		player.addControls(game.eventhandler);
		player.id = "player";
		game.add(player);

		game.clearColor = "#F0B9F0";

		
		for(var i=0;i<25;i++){
			var polygon = new Polygon({
				position : new Vector2(1000*Math.random(), 1000*Math.random()),
				points : [
					new Vector2(-10*Math.random(),-10*Math.random()),
					new Vector2(10*Math.random(),-30*Math.random()),
					new Vector2(30*Math.random(),10*Math.random()),
					// new Vector2(40*Math.random(),30*Math.random()),
					// new Vector2(-60*Math.random(),10*Math.random()),
					// new Vector2(-80*Math.random(),-10*Math.random()),
					],
				color : "#E01BE0"
				});
			game.add(polygon);
		}
			
		var svetlo = new PointLight({color: "#ff4444"});
		svetlo.position = player.position;
		// svetlo.position.set(300,300);
		game.add(svetlo);
		
		var tlacitko = new Trigger({radius: 20});
		tlacitko.response = function (){
			console.log("olé");
		};
		tlacitko.position.set(100,100);
		game.add(tlacitko);
		
		game.eventhandler.addKeyboardControl("E",function (){for(var i in game.children){
			if(game.children[i] instanceof Trigger){
				if(game.children[i].inRange) game.children[i].response();
			}
		}});
		/*var spotl = new SpotLight({color: "#00ff00"});
		spotl.position.set(300,100);
		game.add(spotl);
		spotl.direction.set(-1,1);*/
	};
};