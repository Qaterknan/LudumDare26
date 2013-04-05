function Game(){
	this.objects = {};
	this.canvas = {};
	this.ctx = {};
	// Přidávání game objektů
	this.gui = new GUI();
};
Game.prototype.init = function (canv){
	this.canvas = canv;
	this.ctx = this.canvas.getContext("2d");
	var _this = this;
	this.interval = setInterval(function (){game.tick();},1000/60);
};
Game.prototype.tick = function (){
	console.log("engine running");
	this.render(this.ctx);
};
Game.prototype.render = function (ctx){
	return true;
};