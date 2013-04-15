function GUI(width, height){
	GUIObject.call(this, {width: width, height: height});
};

GUI.prototype = Object.create( GUIObject.prototype );

GUI.prototype.tick = function (){
	this.tickChildren();
};

GUI.prototype.render = function (ctx){
	this.renderChildren(ctx);
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