var game, stats;

$(document).ready(function(){
	stats = new Stats();
	stats.setMode(1); // 0: fps, 1: ms

	// Align top-left
	stats.domElement.style.position = 'absolute';
	stats.domElement.style.left = stats.domElement.style.top = '0px';

	document.body.appendChild( stats.domElement );
	
	game = new Game();
	
	game.init();
	
	onStart( game ); // Předání startu mimo engine
});