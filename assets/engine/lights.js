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

	ctx.drawImage(this.darkMaskCache.canvas, 0, 0);

	this.cacheCanvas.ctx.clearRect(0, 0, this.cacheCanvas.width, this.cacheCanvas.height);
	this.cast(this.cacheCanvas.ctx);
	ctx.save();
	ctx.globalCompositeOperation = "lighter";
	ctx.drawImage(this.cacheCanvas.canvas, 0, 0);
	var playerLight = game.getChild("playerLight");
	if(playerLight)
		playerLight.glow(ctx);
	ctx.restore();

};

Lights.prototype.cast = function(ctx) {
	var castctx = this.castCache.ctx;
	for (var i in game.children){
		var light = game.children[i];
		if(light.glow){
			castctx.clearRect(0, 0, this.castCache.width, this.castCache.height);

			if(light.id == "playerLight")
				continue;
		
			light.glow(castctx);

			for(var j in game.children){
				var child = game.children[j];
				if(!child.opaque)
					continue;
				var distanceSq = light.distance*light.distance;
				var distanceChildSq = new Vector2().subVectors(light.position, child.getCenter()).lengthSq();
				if(distanceChildSq > distanceSq)
					continue;

				var distance = light.shadowCastDistance;

				castctx.save();
				castctx.globalCompositeOperation = "destination-out";
				child.cast(castctx, light.position, distance, "#000");
					castctx.save();
						castctx.translate(child.position.x, child.position.y);
						child.fill(castctx, "rgba(0,0,0,"+(1-child.diffuse)+")");
					castctx.restore();
				castctx.restore();
			}

			ctx.save();
			ctx.globalCompositeOperation = "lighter";
			ctx.drawImage(this.castCache.canvas, 0,0);
			ctx.restore();
		}

	}
};

Lights.prototype.collision = function(x,y) {
	if(Math.random()<1){
		col = this.cacheCanvas.ctx.getImageData(x, y, 1, 1).data[3];
		console.log(col)
		this.switchASDF = col > 0;
	}
	return this.switchASDF;
};