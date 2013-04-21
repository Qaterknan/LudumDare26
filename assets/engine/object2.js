function Object2( options ){
	var _this = this;

	options = options === undefined ? {} : options;

	this.creationTime = new Date().getTime();

	this.position = options.position === undefined ? new Vector2() : options.position;
	this.zIndex = options.zIndex === undefined ? 0 : options.zIndex;
	this.rotation = options.rotation === undefined ? 0 : options.rotation;
	
	this.width = options.width === undefined ? 0 : options.width;
	this.height = options.height === undefined ? 0 : options.height;

	this.parent = undefined;
	this.children = [];

	this.ticks = 0;

	this.texture = options.texture === undefined ? false : options.texture;
	this.rendering = true;

	this.collidable = options.collidable === undefined ? true : options.collidable;
	this.collisionType = "hitbox"; // "hitbox", "rotated-hitbox"
	this.boundingRadius = options.boundingRadius === undefined ? this.computeBoundingRadius() : options.boundingRadius;
	this.hitbox = options.hitbox === undefined ? {x: 0, y: 0, width: _this.width, height: _this.height} : options.hitbox;

	// světlo
	this.opaque = options.opaque === undefined ? true : options.opaque;
	this.diffuse =  options.diffuse === undefined ? 0.4 : options.diffuse; // jak moc se od jeho povrchu odráží světlo

	this.velocity = new Vector2();
};

Object2.prototype.lookAt = function(position) {
	var tVec = new Vector2().sub(this.position, position);
	this.rotation = Math.atan(tVec.y/tVec.x);
	if(tVec.x < 0)
		this.rotation += Math.PI;
};

Object2.prototype.move = function(vector) {
	this.position.addSelf(vector);
	var colls = game.findCollisions(this);
	if(colls.length)
		this.position.subSelf(vector);
};

// kolizní funkce
Object2.prototype.computeBoundingRadius = function() {
	return this.boundingRadius = Math.sqrt(this.width*this.width + this.height*this.height)/2;
};

Object2.prototype.checkCollision = function(obj) {
	if(!obj.collidable)
		return false;
	if(this.collisionType == "circle"){
		var dx = obj.position.x - this.position.x;
		var dy = obj.position.y - this.position.y;
		var minDistance = obj.boundingRadius+this.boundingRadius;
		if(dx*dx + dy*dy < minDistance*minDistance){
			return new Vector2( obj.position.x/this.position.x * minDistance, obj.position.y/this.position.y * minDistance )
		}
		return false;
	}
	else if(this.collisionType == "hitbox"){
		// http://gamedev.stackexchange.com/questions/586/what-is-the-fastest-way-to-work-out-2d-bounding-box-intersection
		return (Math.abs(this.position.x - obj.position.x) * 2 < (this.width + obj.width)) && 
			(Math.abs(this.position.y - obj.position.y) * 2 < (this.height + obj.height));
	}
};

Object2.prototype.inObject = function(vec) {
	if(this.collisionType == "circle"){
		var dx = vec.x - this.position.x;
		var dy = vec.y - this.position.y;
		var minDistance = this.boundingRadius;
		return dx*dx + dy*dy < minDistance*minDistance;
	}
	else if(this.collisionType == "hitbox"){
		// http://gamedev.stackexchange.com/questions/586/what-is-the-fastest-way-to-work-out-2d-bounding-box-intersection
		return (Math.abs(this.position.x - vec.x) * 2 < this.width) && 
			(Math.abs(this.position.y - vec.y) * 2 < this.height);
	}
};

// funkce práce s dětmi
Object2.prototype.add = function(obj, id) {
	obj.parent = this;
	if(id === undefined){
		var length = Object.keys(this.children).length;
		this.children[length] = obj;
	}
	else {
		this.children[id] = obj;
	}
};

Object2.prototype.remove = function(obj){
	for (var i in this.children) {
		if(this.children[i] == obj)
			delete this.children[i];
	};
};

Object2.prototype.getSortedChildrenHash = function(){
	var hash = [];
	for (var i = 0, len = this.children.length; i < len; i++){
		hash.push(this.children[i].zIndex)
	};
	return hash.join("");
}

Object2.prototype.sortChildren = function() {
	if(this.children.length)
		return this.children;
	if( this.sortedChildrenHash !== this.getSortedChildrenHash() ){
		this.children.sort(function(a,b){
			return a.zIndex - b.zIndex;
		})
		this.sortedChildrenHash = this.getSortedChildrenHash();
		return this.children;
	}
	else {
		return this.children;
	}
};
Object2.prototype.tickChildren = function() {
	for (var i in this.children){
		this.children[i].tick();
		if(this.children[i].tickChildren)
			this.children[i].tickChildren();
	};
};

Object2.prototype.renderChildren = function(ctx) {
	if(this.children.length < 1)
		return;

	this.sortChildren();

	ctx.save();
	ctx.translate(this.position.x, this.position.y);
	for (var i in this.children){
		if(this.children[i].rendering)
			this.children[i].render(ctx);
		if(this.children[i].renderChildren)
			this.children[i].renderChildren(ctx);
	};
	ctx.restore();
};


Object2.prototype.tick = function() {
};

Object2.prototype.render = function(ctx) {
	ctx.save();
	ctx.translate(this.position.x, this.position.y);
		ctx.save();
		ctx.rotate(this.rotation);
		ctx.translate(-this.width/2, -this.height/2);
		if(this.texture){
			this.texture.draw(ctx, this.width, this.height);
		}
		ctx.restore();
	ctx.restore();
};
