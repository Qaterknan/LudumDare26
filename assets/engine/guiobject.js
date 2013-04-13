function GUIObject( options ){
	var options = options === undefined ? {} : options;
	
	this.position = options.position === undefined ? new Vector2(0,0) : options.position;
	this.rotaion = options.rotation === undefined ? new Vector2(0,0) : options.rotation;
	this.width = options.width === undefined ? 0 : options.width;
	this.height = options.height === undefined ? 0 : options.height;
	this.texture = options.texture === undefined ? false : options.texture;
	this.renderable = options.renderable === undefined ? true : options.renderable;
	
	this.objects = {};
	this.parent = undefined;
	this.nonLinked = 0;
	
	this.id = options.id;
	
	this.timeEvents = [];
	
	this.triggers = [];
};
GUIObject.prototype.render = function (ctx){
	return true;
};
GUIObject.prototype.tick = function (){
	return true;
};
GUIObject.prototype.tickObjects = function (){
	for(var i in this.objects){
		this.objects[i].tick();
		this.objects[i].tickObjects();
	};
	return true;
};
GUIObject.prototype.renderObjects = function (ctx){
	ctx.save();
	ctx.translate(this.position.x,this.position.y);
	ctx.rotate(this.rotation);
	for(var i in this.objects){
		if(!this.objects[i].renderable) continue;
		this.objects[i].render(ctx);
		this.objects[i].renderObjects(ctx);
	};
	ctx.restore();
	return true;
};
GUIObject.prototype.checkTimeEvents = function (){
	var len = this.timeEvents.length;
	var cas = new Date().getTime();
	for(var i = 0; i < len; i++){
		if(this.timeEvents[i][0] < cas){
			this.timeEvents[i][1](this);
		}
	};
};
GUIObject.prototype.addTimeEvent = function (cas,akce){
	var ted = new Date().getTime();
	this.timeEvents.push([cas+ted,akce]);
	return true;
};
GUIObject.prototype.add = function (obj, id){
	obj.parent = this;
	if(id === undefined){
		this.objects[this.nonLinked] = obj;
		obj.id = this.nonLinked;
		this.nonLinked++;
	}
	else{
		this.objects[id] = obj;
		obj.id = id;
	}
	return true;
};
GUIObject.prototype.addMore = function (objs){
	for(var i in objs){
		this.objects[i] = objs[i];
		objs[i].id = i;
		objs[i].parent = this;
	};
	return true;
};
GUIObject.prototype.erease = function (){
	if(this.parent !== undefined){
		delete this.parent.objects[this.id];
		delete this;
		return true;
	}
	else{
		delete this;
	}
};
GUIObject.prototype.mouseHandle = function (x,y,type){
	this.mouseCollision(x,y,type);
	for(var i in this.objects){
		this.objects[i].mouseHandle(x+this.position.x,y+this.position.y,type);
	};
};
GUIObject.prototype.mouseCollision = function (x,y,type){
	return false;
};