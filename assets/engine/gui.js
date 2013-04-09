function GUI (){
	GUIObject.call(this, {});
	
	
};
GUI.prototype = Object.create( GUIObject.prototype );
GUI.prototype.mouseInit = function (controls){
	var _this = this;
	controls.addMouseControl(1,function (){_this.mouseHandle(0,0)});
};