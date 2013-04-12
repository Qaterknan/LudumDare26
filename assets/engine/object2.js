function Object2( options ){
	var _this = this;

	options = options === undefined ? {} : options;

	this.creationTime = new Date().getTime();

	this.position = options.position === undefined ? new Vector2() : options.position;
	this.relative = false;
	this.zIndex = options.zIndex === undefined ? 0 : options.zIndex;
	this.rotation = options.rotation === undefined ? 0 : options.rotation;
	
	this.width = options.width === undefined ? 0 : options.width;
	this.height = options.height === undefined ? 0 : options.height;

	this.parent = undefined;
	this.children = [];
	this.links = {};

	this.ticks = 0;

	this.selectable = true;
	this.selected = false;
	this.selectColor = new Color("#0000FF");

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
// pohybové funkce
Object2.prototype.lookAt = function(vec) {
	var tVec = new Vector2().sub(this.position, vec);
	this.rotation = Math.atan(tVec.y/tVec.x);
	if(tVec.x < 0)
		this.rotation += Math.PI;
};

Object2.prototype.move = function(vec) {
	this.position.addSelf(vec);
	var colls = game.findCollisions(this);
	if(colls.length)
		this.position.subSelf(vec);
};

Object2.prototype.onSelect = function() {};

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
	else if(this.collisionType == "rotated-hitbox"){
		return false;
	}
};

Object2.prototype.rangeCollision = function (obj){
	if(obj != this){
		if(Math.abs(this.position.x - obj.position.x) <= this.range){
			return true;
		}
		else{
			return false;
		}
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
	else if(this.collisionType == "rotated-hitbox"){
		return false;
	}
};

// funkce práce s dětmi
Object2.prototype.add = function(obj, name) {
	this.children.push(obj);
	obj.parent = this;

	if(name)
		this.links[name] = obj;
};

Object2.prototype.remove = function(obj){
	var search = this.children.indexOf(obj);
	if(search > -1){
		this.children.splice(search, 1);
	}

	for (var i = 0; i < this.links.length; i++) {
		if(this.links[i] == obj)
			delete this.links[i];
	};

	for (var i = 0; i < game.ai.property.length; i++) {
		if(this.links[i] == obj)
			delete game.ai.property[i];
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
	for (var i = 0, len = this.children.length; i < len; i++){
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
	for (var i = 0, len = this.children.length; i < len; i++){
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
		if(this.relative)
			ctx.translate(game.camera.tX(this.position.x), game.camera.tY(this.position.y));
		else
			ctx.translate(this.position.x, this.position.y);
		ctx.save();
			if(this.ghost)
				ctx.globalAlpha = this.ghostAlpha;
			ctx.rotate(this.rotation)
			ctx.save();
				ctx.translate(-this.width/2, -this.height/2);
				if(this.texture){
					if(this.ghost)
						this.texture.alpha = this.ghostAlpha;
					else
						this.texture.alpha = 1;
					this.texture.draw(ctx, 0, 0 , this.width, this.height)
				}

				/*if(this.owner && this.health){
					if(this.owner == "enemy")
						this.renderLife(ctx);
				}*/

				if(this.selected){
					ctx.beginPath();
					ctx.fillStyle = this.selectColor.getRGBA(0.3);
					ctx.strokeStyle =  this.selectColor.getRGBA(0.7);
					ctx.rect(0,0,this.width, this.height)
					ctx.fill();
					ctx.stroke();
					ctx.closePath();
					/*if(this.health)
						this.renderLife(ctx);
					if(this.procesQueue){
						if(this.procesQueue.length > 0)
							this.renderProduction(ctx);
					}*/
				}
			ctx.restore();
		ctx.restore();
	ctx.restore();
	
	// ctx.lineWidth = 1;
	// ctx.strokeStyle = "#FF00FF";
	// if(this.collisionType == "circle"){
	// 	ctx.beginPath();
	// 		ctx.arc(this.position.x, this.position.y, this.boundingRadius, 0, Math.PI*2, false );
	// 		ctx.stroke();
	// 	ctx.closePath();
	// }
	// else if(this.collisionType == "hitbox"){
	// 	ctx.strokeRect( this.position.x - this.width/2, this.position.y - this.height/2, this.width, this.height );
	// }
};
/* 
Object2.prototype.renderLife = function ( ctx ){
	ctx.fillStyle = "#000";
	ctx.fillRect(0, 0, this.width, 4);
	ctx.fillStyle = "#0F0";
	ctx.fillRect(0, 0, this.width * (this.health/this.maxHealth), 4);
};

Object2.prototype.renderProduction = function (ctx){
		ctx.fillStyle = "#000";
		ctx.fillRect(0, 5, this.width, 4);
		ctx.fillStyle = "#cae218";
		ctx.fillRect(0, 5, this.width * (this.proces/this.toProces), 4);
		for(var i = 0; i < this.procesQueue.length;i++){
			ctx.fillStyle = "#D6D145";
			ctx.fillRect(i*7+i*2+5,12,7,7);
		};
}; */