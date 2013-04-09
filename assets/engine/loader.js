function Loader(){
	// dva argumenty - src a type
	this.toLoad = 0;
	this.objects = {};
};
Loader.prototype.load = function (type,src){
	var _this = this;
	this.toLoad++;
	if(type == "image"){
		var obj = new Image();
		obj.src = src;
		obj.onload = function (){
			_this.toLoad--;
			_this.objects[src] = this;
		};
	}
	if(type == "audio"){
		var obj = new Audio();
		obj.src = src;
		obj.oncanplaythrough = function (){
			_this.toLoad--;
			_this.objects[src] = this;
		};
	}
	if(type == "script"){
		$.getScript(src,function (data){
			console.log(data);
		});
	}
};