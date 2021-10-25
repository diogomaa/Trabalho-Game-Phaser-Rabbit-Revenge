var config = {
	type : Phaser.WebGL,
	parent : 'content',
	width : 800,
	height : 600,

	zoom : 1,
	pixelArt : false,

	physics : {
		default : 'arcade',
		arcade : {
			gravity : {y:0},
			debug: false
		}
		
	},

	scene : [
		BootScene,
		WorldScene,
		UI,
		Gameover,
		Win,
		scene1,
		WorldScene2,
		Win2,
		UI2,
		scene2,
		help,
		story,
		story2
	]
	

};


var game = new Phaser.Game(config);
