function Game(){
	this.objects = {};
	this.canvas = document.createElement("canvas");
	this.ctx = this.canvas.getContext("2d");
	// Přidávání game objektů
	this.gui = new GUI();
	this.eventhandler = new Eventhandler(this.canvas);
	this.loader = new Loader();
	this.camera = new Vector2();
};
Game.prototype.init = function (){
	document.body.appendChild(this.canvas);
	var _this = this;
	this.interval = setInterval(function (){game.tick();},1000/60);
};
Game.prototype.tick = function (){
	console.log("engine running");
	this.eventhandler.loop();
	this.render(this.ctx);
};
Game.prototype.render = function (ctx){
	this.gui.render(ctx);
	return true;
};