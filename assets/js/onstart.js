function onStart( game ){
	/*
		Zde je k umístěná kód, který se má spustit po spuštění enginu,
		do argumentu je vrácen objekt game
	*/
	jQuery.ajaxSetup( {
		cache : false
	} )
	// var scripts = ["player.js", "polygon.js"];
	// for(var i in scripts){
	// 	$.getScript("assets/js/"+scripts[i]);
	// }

	game.adjustCanvas(800, 480);
	
	game.gui.addControls();
	
	game.levelLoad("assets/levels/menu.js");
};