function Game(){
	Object2.call(this, {});

	this.canvas = document.createElement("canvas");
	this.ctx = this.canvas.getContext("2d");

	this.clearColor = "#FFFFFF";
	this.filterColor = false;
	this.width = 800;
	this.height = 480;

	this.gui = new GUI(this);
	this.eventhandler = new Eventhandler(this.canvas);
	this.loader = new Loader();
	this.jukebox = new Jukebox();
	this.lights = new Lights(this.width, this.height);
	
	this.camera = new Camera();

	this.interval = false;
};
Game.prototype = Object.create( Object2.prototype );

Game.prototype.init = function (){
	document.body.appendChild(this.canvas);

	var _this = this;

	this.tick();

	$(window).resize(function() {
		_this.adjustCanvas();
	});
};

Game.prototype.adjustCanvas = function(width, height) {
	this.canvas.width = width === undefined ? this.width : (this.width = width);
	this.canvas.height = height === undefined ? this.height : (this.height = height);

	this.canvas.style.left = (window.innerWidth - this.width)/2 + "px";
	this.canvas.style.top = (window.innerHeight - this.height)/3 + "px";

	this.eventhandler.offset = $(this.canvas).offset();
	this.gui.width = this.width;
	this.gui.height = this.height;

	this.lights.width = this.width;
	this.lights.height = this.height;
	this.lights.init();

	this.disableInterpolation();
};

// Vypne interpolaci canvasu = lepší pro pixelart
Game.prototype.disableInterpolation = function() {
	this.ctx.webkitImageSmoothingEnabled = this.ctx.mozImageSmoothingEnabled = false;
};

Game.prototype.tick = function (){
	stats.begin();

	var _this = this;
	this.interval = requestAnimationFrame(function(){
		_this.tick()
	});

	this.eventhandler.loop();

	this.tickChildren();

	game.gui.tick();
	this.camera.update();
	
	this.render(this.ctx);

	stats.end();
};

Game.prototype.render = function (ctx){
	ctx.fillStyle = this.clearColor;
	ctx.fillRect(0,0,this.width,this.height);

	
	// GUI je na hře
	ctx.save();
	ctx.translate(-this.camera.position.x,-this.camera.position.y);
	if(this.polygonBorder){
		ctx.save();
		this.polygonBorder.fill(ctx,this.clearColor,"clip");
	}
	this.renderChildren(ctx);
	if(this.polygonBorder){
		ctx.restore();
		this.polygonBorder.fill(ctx,this.clearColor,"stroke");
	}
	ctx.restore();

	this.lights.render(ctx);

	this.gui.render(ctx);

	if(this.filterColor){
		var gradient = ctx.createRadialGradient(this.width/2, this.height/2, 0, this.width/2, this.height/2, this.width/2);
		gradient.addColorStop(0, this.filterColor.getRGBA(0));
		gradient.addColorStop(1, this.filterColor.getRGBA());

		ctx.fillStyle = gradient;
		ctx.fillRect(0,0,this.width, this.height);
	}
};

Game.prototype.levelLoad = function (src, nosave){
	var _this = this;

	if(!nosave){
		localStorage.lastLevel = src;
	}
	this.levelSrc = src;
	this.children = [];
	this.childrenCache = {};
	this.eventhandler.resetControls();
	this.gui.addControls();

	this.polygonBorder = false;
	this.filterColor = false;

	this.clearColor = "#FFFFFF";
	this.gui.add(new Text({
		position: new Vector2(_this.width/2-100, _this.height/2-30),
		width: 200,
		height: 60,
		value: "Loading level",
		size: 30,
		color : "#ffffff",
		font : "Arial",
	}));

	$.get(src,function (data){
		var json = eval(data);
		_this.loader.loadAssets(json, function (lvl){
			_this.gui.resetGUI();
			lvl.afterLoad = json.afterLoad;
			lvl.afterLoad();
		})
	});
};

Game.prototype.checkCollisions = function(obj){
	var colliding = [];
	for(var i in this.children){
		var child = this.children[i];
		if(child != obj){
			if(child.testCollision(obj)){
				colliding.push(child);
			//~ var collision = child.testCollision(obj, true);
			//~ if(collision){
				//~ colliding.push([child, collision]);
				child.onCollision(obj);
			}
		}
	}
	if(colliding.length > 0){
		return colliding;
	}
	else {
		return false;
	}
};

Game.prototype.restartGame = function() {
	this.levelLoad(this.levelSrc);
};

Game.prototype.continueLevel = function() {
	if(localStorage.lastLevel){
		this.levelLoad(localStorage.lastLevel)
	}
};