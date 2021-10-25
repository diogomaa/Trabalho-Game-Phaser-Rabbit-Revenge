var BootScene = new Phaser.Class({

	Extends: Phaser.Scene,

	initialize:

	function BootScene(){
		Phaser.Scene.call(this, {key: 'BootScene'});
	},

	preload: function() {



      
       
        this.load.image('help', 'assets/help.png');
        this.load.image('story', 'assets/story.png');
        this.load.image('story2', 'assets/story1.png');
        this.load.image('end', 'assets/end.png');
		this.load.image('level2', 'assets/level2.png');
        this.load.image('saverabit', 'assets/saverabit.png');

		this.load.image('level1', 'assets/level1.png');
	

        this.load.image('babyrabit', 'assets/baby.png');
		this.load.image('timeimg', 'assets/time.png');
        this.load.image('bar', 'assets/bar.jpg');
        this.load.image('deadhuman', 'assets/deadhuman.png');
        this.load.image('rabitlife', 'assets/life.png');
        this.load.image('btn2', 'assets/btn2.png');
        this.load.image('btn', 'assets/btn.png');
        this.load.image('background', 'assets/background.png');
        this.load.image('gameover', 'assets/gameover.png');


		// carrega os assets do jogo
		this.load.image('tiles','assets/map/spritesheet.png');


		// mapa
		this.load.tilemapTiledJSON('map','assets/map/mapa.json');
		this.load.tilemapTiledJSON('map2','assets/map/mapa2.json');

		this.load.spritesheet('car', 'assets/car.png',{ frameWidth:258,
								frameHeight:129});

		this.load.spritesheet('rabithole', 'assets/rabithole.png',{ frameWidth:300,
								frameHeight:300});

		// player
        this.load.spritesheet('player', 'assets/map/character.png',
								{ frameWidth:200,
								frameHeight:200});
        // player
        this.load.spritesheet('player2', 'assets/map/character2.png',
								{ frameWidth:120,
								frameHeight:98});
		this.load.spritesheet('humanskill', 'assets/map/kill.png',
								{ frameWidth:170,
								frameHeight:130});
		this.load.image('rabitlife','assets/rabitlife.png');
		
		this.load.image('bullet', 'assets/bala.png');
		this.load.image('target', 'assets/target.png');


		//audio
		this.load.audio('button', 'assets/sounds/button.mp3', {
        instances: 1
    });
		this.load.audio('humanskill', 'assets/sounds/humanskill.m4a', {
        instances: 2
    });
		this.load.audio('tiro', 'assets/sounds/tiro.mp3', {
        instances: 1
    });
		this.load.audio('kill', 'assets/sounds/kill.mp3', {
        instances: 1
    });
		this.load.audio('pick', 'assets/sounds/pick.m4a', {
        instances: 1
    });
		this.load.audio('hit', 'assets/sounds/hit.mp3', {
        instances: 1
    });
		

       


		//this.load.spritesheet('player', 'assets/map/characters.png',
								//{ frameWidth:44,
								 // frameHeight:43});
	},

	create: function(){
		this.sound.add('button');

		 var nome = this.add.text(-380, 230, "Diogo Amorim" ,{font:"60px SWEETREVENGE", fill:"#ffffff"} );
         
         var bg = this.add.image(0, 0, 'background');
		 var btn = this.add.image(200, 10, 'btn');
		 btn.setDisplaySize(400, 200)
		 var btn2 = this.add.image(200, 130, 'btn2');
		 btn2.setDisplaySize(400, 200)
		 
		 
		 
        

        var container = this.add.container(400, 300, [ bg , btn, nome ]);

        btn.setInteractive();

        btn.once('pointerup', function () {
            this.sound.play('button');
            
            this.scene.start('story');
   

        }, this);

        var container = this.add.container(400, 300, [ btn2]);

        btn2.setInteractive();

        btn2.once('pointerup', function () {
        	this.sound.play('button');

            this.scene.start('help');
           

        }, this);
	
	}

});

var help = new Phaser.Class({

    Extends: Phaser.Scene,

    initialize:

    function help(){
        Phaser.Scene.call(this, {key: 'help'});
    },




    create: function ()
    {
       
        
     
         var bgg = this.add.image(400, 300, 'help');
         bgg.setOrigin(0.5, 0.5).setDisplaySize(800, 600)


        var container = this.add.container(0, 0, [ bgg]);

        bgg.setInteractive();

        bgg.once('pointerup', function () {

            
            this.scene.start('BootScene');
             

        }, this);
        

        

        
        
    }

});

var story = new Phaser.Class({

    Extends: Phaser.Scene,

    initialize:

  


    function story(){
        Phaser.Scene.call(this, {key: 'story'});
    },

    create: function ()
    {
       
        
     
        
         var bgg = this.add.image(400, 300, 'story');
         bgg.setOrigin(0.5, 0.5).setDisplaySize(800, 600)

        var container = this.add.container(0, 0, [ bgg]);

        bgg.setInteractive();

        bgg.once('pointerup', function () {

            
            this.scene.start('story2');
           
             

        }, this);
        

        

        
        
    }

});
var story2 = new Phaser.Class({

    Extends: Phaser.Scene,

    initialize:

  


    function story(){
        Phaser.Scene.call(this, {key: 'story2'});
    },

    create: function ()
    {
       
        
     
        
         var bgg = this.add.image(400, 300, 'story2');
         bgg.setOrigin(0.5, 0.5).setDisplaySize(800, 600)

        var container = this.add.container(0, 0, [ bgg]);

        bgg.setInteractive();

        bgg.once('pointerup', function () {

            
            this.scene.start('WorldScene');
            this.scene.start('UI');
             

        }, this);
        

        

        
        
    }

});