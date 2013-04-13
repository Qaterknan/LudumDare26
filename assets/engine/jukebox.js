function Jukebox(){
	this.objects = {};
};
Jukebox.prototype.addSounds = function (sounds){
	for(var i in sounds){
		this.objects[i] = new Sound(sounds[i]);
	}
};
Jukebox.prototype.get = function (name){
	return this.objects[name];
};
Jukebox.prototype.play = function (name){
	this.objects[name].play();
};
Jukebox.prototype.silence = function (){
	for(var i in this.objects){
		this.objects[i].stop();
	};
};