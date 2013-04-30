new function level(){
	this.textures = {};
	this.sounds = {};
	this.scripts = {"ingame" : "assets/js/guis/ingame.js"};
	this.afterLoad = function (){
		game.gui.GUILoad(this.scripts.ingame);
		statistics.send("level4");

		var majorColor = "#F55D5D";
		var minorColor = "#94ADF2";

		// pozadí levelu =============================
		game.clearColor = majorColor;
		game.add( new Polygon({
			id: "backgroundPolygon",
			color: minorColor,
			opaque: false,
			zIndex: -100,
			points:[
				new Vector2(45,346),
				new Vector2(206,346),
				new Vector2(39,554),
				new Vector2(-58,432),
				new Vector2(2,289),
				new Vector2(-179,234),
				new Vector2(-206,375),
				new Vector2(-107,608),
				new Vector2(160,669),
				new Vector2(176,577),
				new Vector2(321,348),
				new Vector2(455,347),
				new Vector2(491,247),
				new Vector2(417,-32),
				new Vector2(446,-159),
				new Vector2(313,-159),
				new Vector2(305,-197),
				new Vector2(453,-195),
				new Vector2(461,-319),
				new Vector2(58,-327),
				new Vector2(57,-193),
				new Vector2(192,-201),
				new Vector2(203,-164),
				new Vector2(60,-133),
				new Vector2(88,33),
			],
		}));
		// game.polygonBorder = game.getChild("backgroundPolygon");

		// player =============================
		var playerLight = new PointLight({
			id: "playerLight",
			color: "#FFF", 
			distance: 20, 
			shadowCastDistance: 40,
			intensity: 0.5,
			collidable: false,
		});
		playerLight.ambientParticles.emiting = false;
		
		var player = new Player({
			id: "player",
			position : new Vector2(267,249),
			zIndex : 10
		});
		player.dieSound = new Sound(game.loader.assets.sounds.fire);
		player.addControls(game.eventhandler);

		playerLight.position = player.position;
		game.camera.tick = function(){
			var player = game.getChild("player");
			if(player){
				this.moveTo( new Vector2(-game.width/2, -game.height/2).add(player.position) );
			}
		};
		game.add(playerLight);
		game.add(player);

		// cíl =============================
		var exit_sound = new Sound(game.loader.assets.sounds.clink);
		game.add(new Trigger({
			position: new Vector2(253,-281),
			radius: 20,
			color: "#F2DE46",
			response: function(){
				exit_sound.play();
				game.getChild("tunnelerTrigger").tickingSound.stop();
				game.levelLoad("assets/levels/menu.js");
			}
		}));
		var triggerLight = new PointLight({
			position: new Vector2(253,-281),
			radius: 20,
			color: "#FFFF00",
			intensity: 0.4,
		})
		triggerLight.efect = function(){
				game.gui.children["press_e"].visible = true;
			};
		triggerLight.postefect = function(){
				game.gui.children["press_e"].visible = false;
			};
		game.add(triggerLight);

		// ostatní =============================

		var prep = new Trigger({
			position: new Vector2(403,296),
			radius : 20,
			color: "#00FA21",
			response : function (){
				var save = game.getChild("teleport").destination.clone();
				game.getChild("teleport").destination.set(this.otherDestination.x,this.otherDestination.y);
				this.otherDestination = save;
				this.clinkSound.play()
			},
		});
		prep.clinkSound = new Sound(game.loader.assets.sounds.clink);
		prep.otherDestination = new Vector2(-120,342);
		game.add(prep);
		
		var teleport = new Teleporter({
			position : new Vector2(132,283),
			color: "#D117B8",
			id : "teleport",
			destination : new Vector2(257,-142),
			radius : 20,
		});
		game.add(teleport);
		
		game.add(new PointLight({
			position: new Vector2(132,283),
			radius: 20,
			color: "#D117B8",
			intensity: 0.4,
		}));
		
		game.add(new Polygon({
			position: new Vector2(155,83),
			color: majorColor,
			points : [
				new Vector2(-8,61),
				new Vector2(-83,15),
				new Vector2(90,-22),
			],
			oscilatePoints: [new Vector2(155,83), new Vector2(301,78)],
			oscilateEasing: "harmonic",
			acceleration: 0.1,
			opaque : true,
		}));
		
		var modryPortal = new Portal({
			color:"rgba(15,22,242,0.5)",
			ghostId : "modry",
			points: [
				new Vector2(313,-159),
				new Vector2(305,-197),
				new Vector2(192,-201),
				new Vector2(203,-164),
			],
		});
		game.add(modryPortal);
		
		var modryTunneler = new Tunneler({
			position: new Vector2(258,-40),
			color:"#0F16F2",
			ghostId : "modry",
			distance : 100,
		});
		
		var killer = new Killer({
			position : new Vector2(258,-40),
			distance : 300,
			shadowCastDistance: 600,
		});
		
		var sw = new Switch({
			id : "tunnelerTrigger",
			position : new Vector2(-81,491),
			color: "#A5ECFA",
			radius : 20,
			response : function (){
				var _this = this;
				this.toogleLight();
				this.tickingSound.play();
				this.addTimeEvent(5000,function (){
					_this.toogleLight();
					_this.tickingSound.stop();
				})
			},
			lights : {
				on : modryTunneler,
				off : killer,
			},
		});
		sw.tickingSound = new Sound(game.loader.assets.sounds.ticking);
		sw.tickingSound.loop = true;
		game.add(sw);
		
		var zlutyTunneler = new Tunneler({
			position : new Vector2(64,607),
			color:"#F2F20F",
			ghostId : "zluty",
			distance : 100,
			intensity: 0.5,
		});
		game.add(zlutyTunneler);
		
		var zlutyPortal = new Portal({
			color:"rgba(242,242,15,0.5)",
			ghostId : "zluty",
			points: [
				new Vector2(206,346),
				new Vector2(183,375),
				new Vector2(299,383),
				new Vector2(321,348),
			],
		});
		game.add(zlutyPortal);
		
		game.add(new Accelerator({
			position: new Vector2(173,476),
			bonus: 20,
			distance: 50,
		}));
	};
};