function Object2( options ){
	var _this = this;

	options = options === undefined ? {} : options;

	this.id = options.id === undefined ? "" : options.id;

	this.creationTime = new Date().getTime();

	this.position = options.position === undefined ? new Vector2() : options.position;
	this.zIndex = options.zIndex === undefined ? 0 : options.zIndex;
	this.rotation = options.rotation === undefined ? 0 : options.rotation;
	this.velocity = new Vector2();
	
	this.width = options.width === undefined ? 0 : options.width;
	this.height = options.height === undefined ? 0 : options.height;

	this.parent = undefined;
	this.children = [];
	this.childrenCache = {};
	
	this.timeEvents = [];

	this.ticks = 0;

	this.texture = options.texture === undefined ? false : options.texture;
	this.rendering = true;

	this.collidable = options.collidable === undefined ? true : options.collidable;
	this.collisionType = "circle"; // "hitbox", "rotated-hitbox"
	this.boundingRadius = options.boundingRadius === undefined ? this.computeBoundingRadius() : options.boundingRadius;
	this.hitbox = options.hitbox === undefined ? {x: 0, y: 0, width: _this.width, height: _this.height} : options.hitbox;

	this.oscilatePoints = options.oscilatePoints === undefined ? false : options.oscilatePoints;
	if(options.oscilatePoints !== undefined)
		this.oscilatePoint = options.oscilatePoint === undefined ? this.oscilatePoints[0] : options.oscilatePoint;
	this.acceleration = options.acceleration === undefined ? 0.1 : options.acceleration;
	this.oscilateEasing = options.oscilateEasing === undefined ? "harmonic" : options.oscilateEasing;

	// světlo
	this.opaque = options.opaque === undefined ? false : options.opaque;
	this.diffuse =  options.diffuse === undefined ? 0.4 : options.diffuse; // jak moc se od jeho povrchu odráží světlo

	this.velocity = new Vector2();
};

Object2.prototype.tick = function() {
	this.oscilate();
};

Object2.prototype.oscilate = function() {
	if(this.oscilatePoints){
		if(
			Math.abs(this.position.x - this.oscilatePoint.x) < 3 &&
			Math.abs(this.position.y - this.oscilatePoint.y) < 3
			){
			this.oscilatePoint = this.oscilatePoints[0].equals(this.oscilatePoint) ? this.oscilatePoints[1] : this.oscilatePoints[0];
		}
		if(this.oscilateEasing == "harmonic"){
			this.velocity.x = (this.oscilatePoint.x - this.position.x)*this.acceleration;
			this.velocity.y = (this.oscilatePoint.y - this.position.y)*this.acceleration;
			this.position.x += this.velocity.x;
			this.position.y += this.velocity.y;
		}
		else if(this.oscilateEasing == "linear") {
			var second = this.oscilatePoints[0].equals(this.oscilatePoint) ? this.oscilatePoints[1] : this.oscilatePoints[0];
			var dif = new Vector2().subVectors(this.oscilatePoint, second).multiplyScalar(this.acceleration);
			this.position.x += dif.x;
			this.position.y += dif.y;
		}
	}
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
Object2.prototype.add = function(obj) {
	obj.parent = this;
	this.children.push(obj);
};

Object2.prototype.getChild = function(id, recursive) {
	if(this.childrenCache[id] !== undefined){
		return this.childrenCache[id];
	}
	for(var i in this.children){
		var child = this.children[i];
		if(child.id == id){
			this.childrenCache[id] = child;
			return child;
		}
		if(recursive === true){
			child = child.getChild(id, recursive);
			if ( child !== undefined ) {
				return child;
			}
		}
	}
	return undefined;
};

Object2.prototype.getGlobalTranslate = function (){
	if(this.parent){
		var globalTranslate = this.parent.position.clone();
		globalTranslate.add(this.parent.getGlobalTranslate());
		return globalTranslate;
	}
	else{
		return new Vector2();
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
	for(var i in this.children){
		hash.push(this.children[i].zIndex)
	};
	return hash.join(".");
}

Object2.prototype.sortChildren = function() {
	// if(this.children.length)
	// 	return this.children;
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
	for(var i in this.children){
		this.children[i].tick();
		if(this.children[i] === undefined) // Může během ticku zemřít
			return;
		this.children[i].checkTimeEvents();
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
	for(var i in this.children){
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

Object2.prototype.testCollision = function(obj){
	var vector = new Vector2().subVectors(obj.position, this.position);
	var radiusSum = this.radius + obj.radius;
	if(vector.lengthSq() < radiusSum*radiusSum){
		return true;
	}
	return false;
}

Object2.prototype.onCollision = function (){
	return;
};

Object2.prototype.checkTimeEvents = function (){
	for(var i in this.timeEvents){
		var cas = new Date().getTime();
		if(this.timeEvents[i][0] < cas){
			this.timeEvents[i][1](this);
			if(!this.timeEvents[i][2])
				this.timeEvents.splice(i,1);
		}
	};
};

Object2.prototype.addTimeEvent = function (cas,akce,zachovat){
	var ted = new Date().getTime();
	this.timeEvents.push([cas+ted,akce,zachovat]);
};
