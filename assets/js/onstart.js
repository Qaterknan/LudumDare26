function onStart( game ){
	/*
		Zde je k umístěná kód, který se má spustit po spuštění enginu,
		do argumentu je vrácen objekt game
	*/
	
	game.eventhandler.addMouseControl(0,function (x,y){game.gui.mouseHandle(x-game.canvas.offsetLeft,y-game.canvas.offsetTop,"mousemove");});
	game.eventhandler.addMouseControl(1,
		function (x,y){game.gui.mouseHandle(x-game.canvas.offsetLeft,y-game.canvas.offsetTop,"mousedown")},
		function (x,y){game.gui.mouseHandle(x-game.canvas.offsetLeft,y-game.canvas.offsetTop,"mouseup")}
	);
	
	game.levelLoad("assets/levels/hel.js");
};