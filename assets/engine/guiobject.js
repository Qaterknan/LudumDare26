function GUIObject(options){
	var options = options === undefined ? {} : options;

	this.id = options.id === undefined ? "" : options.id;
	
	this.position = options.position === undefined ? new Vector2(0,0) : options.position;
	this.rotation = options.rotation === undefined ? 0 : options.rotation;
	this.width = options.width === undefined ? 0 : options.width;
	this.height = options.height === undefined ? 0 : options.height;

	this.visible = options.visible === undefined ? true : options.visible;
	
	this.children = {};
	this.parent = undefined;
	
	this.timeEvents = [];

	this.mouseIn = false;
	this.mouseover = options.mouseover === undefined ? undefined : options.mouseover;
	this.mouseout = options.mouseout === undefined ? undefined : options.mouseout;
	this.mousedown = options.mousedown === undefined ? undefined : options.mousedown;
	this.mouseup = options.mouseup === undefined ? undefined : options.mouseup;
};

GUIObject.prototype.render = function (ctx){
	return;
};

GUIObject.prototype.tick = function (){
	return;
};

GUIObject.prototype.tickChildren = function (){
	if(this.mouseIn && this.mouseover){
		this.mouseover();
	}

	for(var i in this.children){
		this.children[i].tick();
		this.children[i].tickChildren();
	};
};

GUIObject.prototype.renderChildren = function (ctx){
	ctx.save();
	ctx.translate(this.position.x,this.position.y);
	ctx.rotate(this.rotation);
	for(var i in this.children){
		if(this.children[i].visible){
			this.children[i].render(ctx);
			this.children[i].renderChildren(ctx);
		}
	};
	ctx.restore();
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
};

GUIObject.prototype.add = function (obj, id){
	obj.parent = this;
	if(id === undefined){
		var length = Object.keys(this.children).length;
		this.children[length] = obj;
	}
	else{
		this.children[id] = obj;
	}
};

GUIObject.prototype.remove = function (obj){
	for (var i in this.children) {
		if(this.children[i] == obj)
			delete this.children[i];
	};
};

GUIObject.prototype.mouseHandle = function (x,y,type){
	for(var i in this.children){
		this.children[i].mouseHandle(x+this.position.x,y+this.position.y,type);
	};

	this.mouseIn = false;
	if((this[type] || (type == "mousemove" && (this.mouseover || this.mouseout))) && !(this instanceof GUI)){
		if(this.mouseCollision(x,y)){
			if(type != "mousemove"){
				this[type]();
			}
			else if(this.mouseover){
				this.mouseIn = true;
				// samotná funkce se vykoná v ticku
			}
		}
		else if(this.mouseout){
			this.mouseout();
		}
	}
	// for (var i = 0; i < this.children.length; i++){
	// 	this.children[i].mousehandler(x-this.x,y-this.y,type);
	// }
};

GUIObject.prototype.mouseCollision = function (x, y){
	return x >= this.position.x && x <= this.position.x + this.width && y >= this.position.y && y <= this.position.y + this.height;
};