function Game(){
	Object2.call(this, {});
	
	this.level = {};

	this.canvas = document.createElement("canvas");
	this.ctx = this.canvas.getContext("2d");

	this.clearColor = "#FFFFFF";
	this.width = 800;
	this.height = 480;

	this.gui = new GUI(this.canvas.width, this.canvas.height);
	this.eventhandler = new Eventhandler(this.canvas);
	this.loader = new Loader();
	this.jukebox = new Jukebox();
	
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
	this.gui.width = this.width * this.scale;
	this.gui.height = this.height * this.scale;

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

	for(var i in this.children){
		this.children[i].tick();
		this.children[i].tickChildren();
	};

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
	ctx.translate(-this.camera.x,-this.camera.y);
	for(var i in this.children){
		this.children[i].render(ctx);
		this.children[i].renderChildren(ctx);
	};
	ctx.restore();
	this.gui.render(ctx);
	return true;
};

Game.prototype.levelLoad = function (src){
	var _this = this;
	this.children = {};
	$.get(src,function (data){
		var json = eval(data);
		_this.loader.loadAssets(json,function (lvl){
			_this.level = lvl;
			_this.level.afterLoad = json.afterLoad;
			_this.level.afterLoad();
		})
	});
};