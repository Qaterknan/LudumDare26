function GUI(game){
	GUIObject.call(this, {});
	this.parent = game;
};

GUI.prototype = Object.create( GUIObject.prototype );

GUI.prototype.tick = function (){
	this.tickChildren();
};

GUI.prototype.render = function (ctx){
	this.renderChildren(ctx);
};

GUI.prototype.GUILoad = function(guiobject) {
	this.children = [];
	guiobject.preload(this.parent);
	guiobject.objects(this.parent);
	guiobject.afterload(this.parent);
};

GUI.prototype.addControls = function() {
	var _this = this;
	game.eventhandler.addMouseControl(0,
		function (x,y,type){
			_this.mouseHandle(x,y,"mousemove");
		});
	game.eventhandler.addMouseControl(1,
		function (x,y,type){
			_this.mouseHandle(x,y,"mousedown");
		},
		function (x,y,type){
			_this.mouseHandle(x,y,"mouseup");
		}
	);
};

GUI.prototype.resetGUI = function() {
	this.children = {};
};