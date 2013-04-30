new function level(){
	this.textures = {};
	this.sounds = {};
	this.scripts = {"ingame" : "assets/js/guis/ingame.js"};
	this.afterLoad = function (){
		game.gui.GUILoad(this.scripts.ingame);
		statistics.send("level3");

		var majorColor = "#FBFF7A";
		var minorColor = "#B2B0FF";

		// pozadí levelu =============================
		game.clearColor = majorColor;
		game.add( new Polygon({
			id: "backgroundPolygon",
			color: minorColor,
			opaque: false,
			zIndex: -100,
			points:[
				new Vector2(334,47),
				new Vector2(499,56),
				new Vector2(539,-151),
				new Vector2(721,-135),
				new Vector2(750,69),
				new Vector2(786,69),
				new Vector2(800,-122),
				new Vector2(1035,-23),
				new Vector2(1033,112),
				new Vector2(800,245),
				new Vector2(758,251),
				new Vector2(715,434),
				new Vector2(772,625),
				new Vector2(513,625),
				new Vector2(547,442),
				new Vector2(504,248),
				new Vector2(265,349),
				new Vector2(96,232),
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
			position: new Vector2(655,578),
			radius: 20,
			color: "#F2DE46",
			response: function(){
				exit_sound.play();
				if(game.getChild("speedTrigger").timerSound)
					game.getChild("speedTrigger").timerSound.stop();
				game.levelLoad("assets/levels/level4.js");
			}
		}));
		var triggerLight = new PointLight({
			position: new Vector2(655,578),
			distance: 30,
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

		
		game.add(new Killer({
			id: "killer",
			position: new Vector2(627,-43),
			intensity: 1,
			oscilatePoints: [new Vector2(627,-43), new Vector2(630,339)],
			oscilateEasing: "linear",
			acceleration: 0.01,
			distance: 130,
			shadowCastDistance: 130*6,
			zIndex: 2,
		}));

		var tunneler1 = new Tunneler({
			id: "tunneler1",
			position: new Vector2(624,167),
			color: "#0F16F2",
			distance: 140,
			shadowCastDistance: 140,
			ghostId : "prvni",
		});
		
		var tunneler2 = new Tunneler({
			id: "tunneler2",
			position: new Vector2(624,167),
			color: "#F2F20F",
			distance: 140,
			shadowCastDistance: 140,
			ghostId : "druhy",
			intensity : 0.5,
		});
		
		var sw = new Switch({
			id : "tunnelerTrigger",
			position : new Vector2(893,62),
			color: "#A5ECFA",
			radius : 20,
			response : function (){
				this.toogleLight();
			},
			lights : {
				on : tunneler2,
				off : tunneler1,
			},
		});
		game.add(sw);
		var switchLight = new PointLight({
			position: new Vector2(893,62),
			distance: 150,
			shadowCastDistance: 20,
			color: "#10BEE0",
			intensity: 0.5,
		});
		switchLight.efect = function(){
				game.gui.children["press_e"].visible = true;
			};
		switchLight.postefect = function(){
				game.gui.children["press_e"].visible = false;
			};
		game.add(switchLight);
		
		var port1 = new Portal({
			id : "modryPortal",
			ghostId : "prvni",
			color : "rgba(15,22,242,0.5)",
			points : [
				new Vector2(750,69),
				new Vector2(786,69),
				new Vector2(800,245),
				new Vector2(758,251),
			],
		});
		game.add(port1);
		
		var port2 = new Portal({
			id : "zlutyPortal",
			ghostId : "druhy",
			color : "rgba(242,242,15,0.5)",
			points : [
				new Vector2(758,251),
				new Vector2(504,248),
				new Vector2(510,273),
				new Vector2(752,272),
			],
		});
		game.add(port2);
		
		var teleport = new Teleporter({
			id : "teleport",
			position : new Vector2(833,-42),
			color: "#D117B8",
			destination : new Vector2(621,-37),
			radius : 20,
		});
		game.add(teleport);
		
		var teleportLight = new PointLight({
			position: new Vector2(833,-42),
			distance: 150,
			shadowCastDistance: 20,
			color: "#D117B8",
			intensity: 0.5,
		});
		teleportLight.efect = function(){
				game.gui.children["press_e"].visible = true;
			};
		teleportLight.postefect = function(){
				game.gui.children["press_e"].visible = false;
			};
		game.add(teleportLight);
		
		
		game.add(new Trigger({
			id: "speedTrigger",
			position: new Vector2(402,167),
			radius: 20,
			color: "#F20FDF",
			response: function(){
				game.getChild("killer").acceleration = 0.003;
				var sound = this.timerSound;
				sound.loop = true;
				sound.play();
				game.getChild("killer").addTimeEvent(5000, function (o){
					o.acceleration = 0.01;
					sound.stop();
				});
			}
		}));
		game.getChild("speedTrigger").timerSound = new Sound(game.loader.assets.sounds.ticking,{loop: true});
		var triggerLight2 = new PointLight({
			position: new Vector2(402,167),
			distance: 150,
			color: "#F20FDF",
			intensity: 0.5,
		})
		triggerLight2.efect = function(){
				game.gui.children["press_e"].visible = true;
			};
		triggerLight2.postefect = function(){
				game.gui.children["press_e"].visible = false;
			};
		game.add(triggerLight2); 
	};
};