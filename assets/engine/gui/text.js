function Text(options){
	GUIObject.call(this, options);

	this.value = options.value === undefined ? " " : options.value;
	this.text = options.text === undefined ? [] : options.text;
	this.color = options.color === undefined ? "#000000" : options.color;
	this.blink = options.blink === undefined ? false : options.blink;
	this.size = options.size === undefined ? 16 : options.size;
	this.lineSpacing = options.lineSpacing === undefined ? 1 : options.lineSpacing;
	this.font = options.font === undefined ? "Verdana" : options.font;
	this.style = options.style === undefined ? "normal" : options.style;
	this.weight = options.weight === undefined ? 400 : options.weight;
	this.shadow = options.shadow === undefined ? false : options.shadow;

	this.visible = options.visible === undefined ? true : options.visible;

	var ctx = document.createElement("canvas").getContext("2d");
	ctx.font = this.style + " " + this.weight + " " + this.size + "px " + this.font;

	// zalamování textu
	if(this.text.length < 1){
		if(options.width){
			this.width = options.width;

			var pole_slov = this.value.split(" ");
			var last_slovo = 0;
			while(last_slovo < pole_slov.length){
				var pokus_radek = pole_slov[last_slovo];
				novy_radek = pokus_radek;
				for(var i = last_slovo+1; i < pole_slov.length; i++){
					pokus_radek += " " + pole_slov[i];
					if(ctx.measureText(pokus_radek).width > this.width){
						break;
					}
					novy_radek = pokus_radek;
				}
				last_slovo = i;
				this.text.push(novy_radek);
			}
		}
		else {
			this.width = ctx.measureText(this.value).width;
			this.text.push(this.value);
		}
	}
	else {
		if(options.width){
			this.width = options.width;
		}
		else {
			this.width = ctx.measureText(this.text[0]).width;
		}
	}
	// var m_size = this.size;
	
	this.textHeight = this.text.length * this.size + (this.text.length - 1) * this.lineSpacing;
	this.height = options.height === undefined ? this.textHeight : options.height;

	this.align = options.align === undefined ? "left" : options.align;
	if(options.valign){
		this.valign = options.valign;
		if(this.valign == "center"){
			// poněkud zvláštní hack: this.size není přesná výška řádku, zatímco šířka dvou E za sebou je...
			// pokud tedy chci umístit text PŘESNĚ doprostřed, musím zahladit tento rozdíl.
			var ee_size = ctx.measureText("ee").width;
			this.position.y += (this.height-this.textHeight)/2 - (ee_size - this.size)/2;
		}
		else if(this.valign == "bottom")
			this.position.y += this.height-this.textHeight;
	}
}
Text.prototype = new GUIObject();
Text.prototype.changeText = function(text) {
	this.value = text;
	this.text = [];

	var ctx = document.createElement("canvas").getContext("2d");
	ctx.font = this.style + " " + this.weight + " " + this.size + "px " + this.font;

	var pole_slov = this.value.split(" ");
	var last_slovo = 0;
	while(last_slovo < pole_slov.length){
		var pokus_radek = pole_slov[last_slovo];
		novy_radek = pokus_radek;
		for(var i = last_slovo+1; i < pole_slov.length; i++){
			pokus_radek += " " + pole_slov[i];
			if(ctx.measureText(pokus_radek).width > this.width){
				break;
			}
			novy_radek = pokus_radek;
		}
		last_slovo = i;
		this.text.push(novy_radek);
	}
};
Text.prototype.render = function(ctx) {
	if(!this.visible)
		return
	ctx.font = this.style + " " + this.weight + " " + this.size + "px " + this.font;

	if(this.blink){
		if(game.ticks % 10 > 0 && game.ticks % 10 < 5) 
			ctx.fillStyle = this.color;
		else
			ctx.fillStyle = this.blink;
	}
	else
		ctx.fillStyle = this.color;

	var spacing = 0;
	for(var i = 0; i < this.text.length; i++){
		var x = this.position.x;
		var y = this.position.y + (i+1) * (this.size) + i * spacing;
		if(this.align == "center")
			x += (this.width - ctx.measureText(this.text[i]).width)/2;
		if(this.align == "right")
			x += this.width - ctx.measureText(this.text[i]).width;

		if(this.shadow){
			ctx.shadowBlur = this.shadow.blur || 0;
			ctx.shadowColor = this.shadow.color || "rgba(0, 0, 0, 0)";
			ctx.shadowOffsetX = this.shadow.offsetX || 0;
			ctx.shadowOffsetY = this.shadow.offsetY || 0;
		}
		ctx.fillText(this.text[i], x, y );
		if(this.shadow){
			ctx.shadowBlur = 0;
			ctx.shadowColor = "rgba(0, 0, 0, 0)";
			ctx.shadowOffsetX = 0;
			ctx.shadowOffsetY = 0;
		}

		spacing = this.lineSpacing;
	}
};