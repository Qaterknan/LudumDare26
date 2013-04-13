function Game(){
	this.objects = {};
	this.level = {};
	this.canvas = document.createElement("canvas");
	this.canvas.offsetLeft = this.canvas.offsetTop = 0;
	this.ctx = this.canvas.getContext("2d");
	// Přidávání game objektů
	this.gui = new GUI( this.canvas.width,this.canvas.height );
	this.eventhandler = new Eventhandler(this.canvas);
	this.loader = new Loader();
	this.jukebox = new Jukebox();
	
	this.camera = new Vector2();
	this.nonLinked = 0;
};
Game.prototype.init = function (){
	document.body.appendChild(this.canvas);
	var _this = this;
	this.interval = setInterval(function (){_this.tick();},1000/60);
};
Game.prototype.tick = function (){
	//~ console.log("engine running");
	this.eventhandler.loop();
	for(var i in this.objects){
		this.objects[i].tick();
	};
	game.gui.tick();
	this.render(this.ctx);
};
Game.prototype.render = function (ctx){
	ctx.fillStyle = "#ffffff";
	ctx.fillRect(0,0,this.canvas.width,this.canvas.height);
	// GUI je na hře
	for(var i in this.objects){
		this.objects[i].render(ctx);
	};
	this.gui.render(ctx);
	return true;
};
Game.prototype.levelLoad = function (src){
	var _this = this;
	$.get(src,function (data){
		var json = eval(data);
		_this.loader.loadAssets(json,function (lvl){
			_this.level = lvl;
			_this.level.afterLoad = json.afterLoad;
			_this.level.afterLoad();
		})
	});
};
Game.prototype.checkCollision = function (obj){
	return false;
};
Game.prototype.add = function (obj,id){
	if(id === undefined){
		this.objects[this.nonLinked] = obj;
		this.nonLinked++;
	}
	else{
		this.objects[id] = obj;
	}
};