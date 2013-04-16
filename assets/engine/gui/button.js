function Button(options){
	var options = options === undefined ? {} : options;
	GUIObject.call(this, options);

	if(options.rectangle !== false){
		options.rectangle = options.rectangle === undefined ? {} : options.rectangle;
		
		var inheritedKeys = ["width", "height", "texture"];
		for(var i in inheritedKeys){
			var key = inheritedKeys[i];
			if(options.rectangle[key] === undefined){
				options.rectangle[key] = options[key];
			}
		}
		
		this.add(new Rectangle(options.rectangle));
	}

	if(options.text !== false){
		options.text = options.text === undefined ? {} : options.text;

		var inheritedKeys = ["width", "height", "value"];
		for(var i in inheritedKeys){
			var key = inheritedKeys[i];
			if(options.text[key] === undefined){
				options.text[key] = options[key];
			}
		}

		this.add(new Text(options.text));
	}
};

Button.prototype = Object.create( GUIObject.prototype );