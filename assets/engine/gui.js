function GUI (width,height){
	GUIObject.call(this);
	
	this.width = width;
	this.height = height;
};
GUI.prototype = Object.create( GUIObject.prototype );
GUI.prototype.mouseInit = function (controls){
	var _this = this;
	controls.addMouseControl(1,function (){_this.mouseHandle(0,0)});
};
GUI.prototype.tick = function (){
	this.tickObjects();
};
GUI.prototype.render = function (ctx){
	this.renderObjects(ctx);
};