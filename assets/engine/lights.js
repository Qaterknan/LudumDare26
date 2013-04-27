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

	// document.body.appendChild(this.cacheCanvas.canvas)
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
	var castctx = this.castCache.ctx;
	for (var i in game.children){
		var light = game.children[i];
		if(light.glow){
			castctx.clearRect(0, 0, this.castCache.width, this.castCache.height);
		
			light.glow(castctx);

			for(var j in game.children){
				var child = game.children[j];
				if(!child.opaque)
					continue;

				var distance = Math.sqrt(light.shadowCastDistance*light.shadowCastDistance);

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
		}

	}
		// var light = this.lights[i];
		// var lightBounds = light.getBounds();

		// ctx.clearRect(0,0,this.castCache.width,this.castCache.height);

		// ctx.save();
		// light.render(ctx);
		// ctx.globalCompositeOperation = "destination-out";

		// var dx = (lightBounds.bottomright.x-lightBounds.topleft.x);
		// var dy = (lightBounds.bottomright.y-lightBounds.topleft.y);
		// var distance = Math.sqrt(dx*dx+dy*dy);

		// for (var j = 0,leToP len = game.children.length; j < len; j++){
		// 	var object = game.children[j];
		// 	// pokud je ve světle
		// 	if(object.position.x < lightBounds.topleft.x || object.position.x > lightBounds.bottomright.x ||
		// 		object.position.y < lightBounds.topleft.y || object.position.y > lightBounds.bottomright.y )
		// 		continue;
		// 	// pokud je neprůhledný
		// 	if(!object.opaque)
		// 		continue;

		// 	// if( object.points ){
		// 	// 	var polygon = new Polygon( object.points );
		// 	// 	polygon.position = object.position;
		// 	// }
		// 	// else {
		// 		// console.log("gen points")
		// 		var polygon = new Polygon();
		// 		polygon.rectangleToPoints( object );
		// 		object.points = polygon.points;
		// 		polygon.position = object.position;
		// 	// }
		// 	// pokud je světlo uvnitř objektu
		// 	if(polygon.contains(light.position)){
		// 		ctx.fillRect(lightBounds.topleft.x, lightBounds.topleft.y, lightBounds.bottomright.x-lightBounds.topleft.x, lightBounds.bottomright.y - lightBounds.topleft.y);
		// 		break;
		// 	}
		// 	ctx.fillStyle = "rgba(0,0,0,"+(1-object.diffuse)+")";
		// 	polygon.fill(ctx);
		// 	ctx.fillStyle = "rgb(0,0,0)";
		// 	polygon.cast(ctx, light.position, lightBounds, distance);
		// };
		// ctx.restore();
		// castctx.save();
		// castctx.globalCompositeOperation = "lighter";
		// castctx.drawImage(this.castCache.canvas, 0,0);
		// castctx.restore();
};