function Lights(width, height){
	this.width = width;
	this.height = height;

	this.init();

	this.checks = 0;

	this.shadowColor = new Color(0x000000, 0.85);
}

Lights.prototype.init = function() {
	this.cacheCanvas = createCanvas(this.width, this.height);
	this.castCache = createCanvas(this.width, this.height);
	this.darkMaskCache = createCanvas(this.width, this.height);

	// document.body.appendChild(this.cacheCanvas.canvas);
};

Lights.prototype.render = function(ctx) {
	// darkmask
	var darkctx = this.darkMaskCache.ctx;
	darkctx.clearRect(0,0,this.darkMaskCache.width, this.darkMaskCache.width);
	darkctx.save();
	darkctx.fillStyle = this.shadowColor.getRGBA(); // barva stínu
	darkctx.fillRect(0, 0, this.darkMaskCache.width, this.darkMaskCache.height);
	darkctx.globalCompositeOperation = "destination-out";
	darkctx.translate(-game.camera.tx(0),-game.camera.ty(0));
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
	ctx.save();
	ctx.translate(-game.camera.tx(0),-game.camera.ty(0));
	if(playerLight)
		playerLight.glow(ctx);
	ctx.restore();
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
			
			castctx.save();
			castctx.translate(-game.camera.tx(0),-game.camera.ty(0));
			light.glow(castctx);
			castctx.restore();

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
				castctx.translate(-game.camera.tx(0),-game.camera.ty(0));
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
	this.checks += 1;
	if(this.checks%4==0){
		col = this.cacheCanvas.ctx.getImageData(x-game.camera.tx(0),y-game.camera.ty(0), 1, 1).data[3];
		game.ctx.fillStyle = "red";
		game.ctx.fillRect(game.camera.tx(x), game.camera.ty(y), 3,3);
		// console.log(col)
		this.switchASDF = col > 0;
	}
	return this.switchASDF;
	// return this.cacheCanvas.ctx.isPointInPath(x,y)
};