function Blah(opt){
	for(var i in opt){
		this[i] = opt[i];
	};
};