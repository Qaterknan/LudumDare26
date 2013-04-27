function Sound(audio, options){
	var options = options === undefined ? {} : options;
	this.element = audio;
	
	var options = options === undefined ? options : {};
	
	this.borders = options.borders === undefined ? false : options.borders;
	this.volume = options.volume === undefined ? 1 : options.volume;
	this.loop = options.loop === undefined ? false : options.loop;
	this.willStop = false;
	this.fade = options.fade === undefined ? 0.005 : options.fade;
	this.interval = false;
	
};
Sound.prototype.play = function (){
	this.element.volume = this.volume;
	if(this.loop) this.element.loop = true;
	/* if(this.borders){
		var _this = this;
		this.element.currentTime = this.borders[0];
		this.willStop = setTimeout(this.borders[1],function (){_this.stop();if(_this.loop) _this.play();});
	} */
	this.element.play();
};
Sound.prototype.stop = function (){
	this.element.pause();
	this.element.currentTime = 0;
};
Sound.prototype.fade = function (){
	var _this = this;
	this.interval = setInterval(1000/60,function (){
		if(_this.volume - _this.fade <= 0){
			_this.stop();
			_this.volume = 1;
			clearInterval(_this.interval);
		}
		else{
			_this.volume -= _this.fade;
		}
	});
};