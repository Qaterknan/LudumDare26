function Loader(){
	// dva argumenty - src a type
	this.toLoad = 0;
	this.sounds = {};
	this.textures = {}; // Pouze obrázky, ne opravdové textury
	this.scripts = {};
	this.callback = function (){return false;};
};
Loader.prototype.load = function (type,src,callback){
	var _this = this;
	this.callback = callback === undefined ? this.callback : callback;
	this.toLoad++;
	if(type == "texture"){
		if(this.textures[src] !== undefined) return true; // Zajišťuje, aby se nenačítaly již načtené zdroje
		var obj = new Image();
		obj.src = src;
		obj.onload = function (){
			_this.textures[src] = this;
			_this.toLoad--;
			_this.checkLoad();
		};
		return true;
	}
	if(type == "sound"){
		if(this.sounds[src] !== undefined) return true;
		var obj = new Audio();
		obj.src = src;
		$(obj).on("loadeddata",function (){
			_this.sounds[src] = this;
			_this.toLoad--;
			_this.checkLoad();
		});
		return true;
	}
	if(type == "script"){
		if(this.scripts[src] !== undefined) return true;
		$.get(src,function (data){
			_this.scripts[src] = eval("(function (){return "+data+";})();");
			_this.toLoad--;
			_this.checkLoad();
		});
		return true;
	}
};
Loader.prototype.checkLoad = function (){
	if(this.toLoad == 0){
		this.callback();
		this.callback = function (){return false};
		return true;
	}
	else return false;
};
Loader.prototype.loadAssets = function (json,callback){
	var _this = this;
	this.callback = function (){
		var zpet = _this.nameAssets(json);
		callback(zpet);
	};
	for(var i in json){
		for(var j in json[i]){
			this.load(i.substr(0,i.length-1),json[i][j]);
		};
	};
};
Loader.prototype.nameAssets = function (json){
	var zpet = {
		textures : {},
		sounds : {},			
		scripts : {}
	};
	for(var i in json){
		for(var j in json[i]){
			zpet[i][j] = this[i][json[i][j]];
		};
	};
	return zpet;
};