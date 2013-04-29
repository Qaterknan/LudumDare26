function Loader(){
	// dva argumenty - src a type
	this.toLoad = 0;

	this.sounds = {};
	this.textures = {}; // Pouze obrázky, ne opravdové textury
	this.scripts = {};

	this.assets = {
		textures : {},
		sounds : {},			
		scripts : {}
	};
};
Loader.prototype.load = function (type, src, callback){
	if(this[type+"s"][name] !== undefined){
		console.log("game.loader: "+name+" has been already loaded. Skipping.");
		return;
	}

	var _this = this;

	this.toLoad++;

	if(type == "texture"){
		var obj = new Image();
		$(obj).on("load", function (){
			_this.textures[src] = this;
			_this.toLoad--;
			_this.checkLoad(callback);
		});
		obj.src = src;
	}
	else if(type == "sound"){
		var obj = new Audio();
		$(obj).on("loadeddata",function (){// console.log(src+ " loaded");
			_this.sounds[src] = this;
			_this.toLoad--;
			_this.checkLoad(callback);
		});
		obj.src = src;
	}
	else if(type == "script"){
		$.ajax({
			url: src,
			success: function (data){
				_this.scripts[src] = eval("(function (){return "+data+";})();");
				_this.toLoad--;
				_this.checkLoad(callback);
			},
			error: function(jqXHR, textStatus, errorThrown){
				_this.scripts[src] = eval("(function (){return "+jqXHR.responseText+";})();");
				_this.toLoad--;
				_this.checkLoad(callback);
			}
		});
	}
};
Loader.prototype.checkLoad = function (callback){
	if(this.toLoad == 0){
		callback();
		return true;
	}
	else {
		return false;
	}
};
Loader.prototype.loadAssets = function (json, callback){
	var _this = this;
	
	var cb = function (){
		var named = _this.nameAssets(json);
		callback(named);
	};

	for(var i in json){
		for(var j in json[i]){
			this.load(i.substr(0, i.length-1), json[i][j], cb);
		};
	};

	// pokud nebyl žádný asset k loadnutí
	if(this.toLoad === 0){
		cb();
	}
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
			this.assets[i][j] = this[i][json[i][j]];
		};
	};
	return zpet;
};

Loader.prototype.get = function(pseudoPath) {
	var pseudoPathArray = pseudoPath.split("/");
	var id = pseudoPathArray[1];
	var type = pseudoPathArray[0];
	return this.assets[type][id];
};