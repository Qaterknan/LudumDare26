function onStart( game ){
	/*
		Zde je k umístěná kód, který se má spustit po spuštění enginu,
		do argumentu je vrácen objekt game
	*/
	jQuery.ajaxSetup( {
		cache : false
	} );

	game.adjustCanvas(800, 480);
	
	game.gui.addControls();
	
	if(localStorage.lastLevel === undefined){
		localStorage.lastLevel = "assets/levels/menu.js";
	}
	game.levelLoad("assets/levels/menu.js", true);
};