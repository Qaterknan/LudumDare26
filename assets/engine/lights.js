function Lights(width, height){
	this.width = width;
	this.height = height;

	this.init();	

	this.shadowColor = new Color(0x000000, 0.8);
}

Lights.prototype.init = function() {
	this.cacheCanvas = createCanvas(this.width, this.height);
	this.castCache = createCanvas(this.width, this.height);
	this.darkMaskCache = createCanvas(this.width, this.height);

	this.lightsCollisionMask = createCanvas(this.width, this.height);
	this.lightsCollisionCache = createCanvas(this.width, this.height);

	document.body.appendChild(this.lightsCollisionMask.canvas)
};

Lights.prototype.render = function(ctx) {
	// darkmask
	var darkctx = this.darkMaskCache.ctx;
	darkctx.clearRect(0,0,this.darkMaskCache.width, this.darkMaskCache.width);
	darkctx.save();
	darkctx.fillStyle = this.shadowColor.getRGBA(); // barva stínu
	darkctx.fillRect(0, 0, this.darkMaskCache.width, this.darkMaskCache.height);
	darkctx.globalCompositeOperation = "destination-out";
	for (var i in game.children){
		var child = game.children[i];
		if(child.glow){
			child.cast(darkctx);
		}
	};
	darkctx.restore();

	var cachectx = this.cacheCanvas.ctx;
	cachectx.clearRect(0, 0, this.cacheCanvas.width, this.cacheCanvas.height);
	this.cast(cachectx);

	ctx.drawImage(this.darkMaskCache.canvas, 0, 0);

	ctx.save();
	ctx.globalCompositeOperation = "lighter";
	ctx.drawImage(this.cacheCanvas.canvas, 0, 0);
	ctx.restore();

};

Lights.prototype.cast = function(ctx) {
	this.lightsCollisionMask.ctx.clearRect(0,0,this.lightsCollisionMask.width, this.lightsCollisionMask.height)
	
	var castctx = this.castCache.ctx;
	for (var i in game.children){
		var light = game.children[i];
		if(light.glow){
			if(light.id != "playerLight"){
				this.lightsCollisionCache.ctx.clearRect(0,0,this.lightsCollisionCache.width, this.lightsCollisionCache.height);
				this.lightsCollisionCache.ctx.beginPath();
				this.lightsCollisionCache.ctx.fillStyle = "#000";
				this.lightsCollisionCache.ctx.arc(light.position.x, light.position.y, light.distance, 0, PI*2);
				this.lightsCollisionCache.ctx.fill();
				this.lightsCollisionCache.ctx.closePath();
			}

			castctx.clearRect(0, 0, this.castCache.width, this.castCache.height);
		
			light.glow(castctx);

			for(var j in game.children){
				var child = game.children[j];
				if(!child.opaque)
					continue;
				var distanceSq = light.shadowCastDistance*light.shadowCastDistance;
				if(new Vector2().subVectors(light.position, child.position).lengthSq() < distance)
					continue;

				var distance = Math.sqrt(light.shadowCastDistance*light.shadowCastDistance);

				this.lightsCollisionCache.ctx.save();
				this.lightsCollisionCache.ctx.globalCompositeOperation = "destination-out";
				child.cast(this.lightsCollisionCache.ctx, light.position, distance, "#FFF");
				this.lightsCollisionCache.ctx.restore();

				child.cast(castctx, light.position, distance, "rgb(0,0,0)");
				castctx.save();
				castctx.translate(child.position.x, child.position.y);
				child.fill(castctx, "rgba(0,0,0,1)");
				castctx.restore();
			}

			ctx.save();
			ctx.globalCompositeOperation = "lighter";
			ctx.drawImage(this.castCache.canvas, 0,0);
			ctx.restore();

			this.lightsCollisionMask.ctx.drawImage(this.lightsCollisionCache.canvas, 0, 0);
		}

	}
};

Lights.prototype.collision = function(x,y) {
	// var col = this.lightsCollisionMask.ctx.isPointInPath(x,y);
	col = this.lightsCollisionMask.ctx.getImageData(x, y, 1, 1).data[3]; 
	return col;
};