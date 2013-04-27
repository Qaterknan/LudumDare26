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

		var polygon = new Polygon({
			position : new Vector2(200, 200),
			points : [
				new Vector2(-10*2,-20*2),
				new Vector2(10*2,-30*2),
				new Vector2(20*2,10*2),
				new Vector2(20*2,30*2),
				new Vector2(-60*2,10*2),
				new Vector2(-80*2,-10*2),
				]
			});
		game.add(polygon);
			
		var svetlo = new PointLight({color: "#ff0000"});
		svetlo.position.set(300,300);
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