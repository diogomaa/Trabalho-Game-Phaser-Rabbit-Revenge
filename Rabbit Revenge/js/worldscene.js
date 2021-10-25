


var Bullet = new Phaser.Class({

    Extends: Phaser.GameObjects.Image,
   
    initialize:

    // Bullet Constructor
    function Bullet (scene)
    {
        Phaser.GameObjects.Image.call(this, scene, 0, 0, 'bullet');
        this.speed = 1;
        this.born = 0;
        this.direction = 0;
        this.xSpeed = 0;
        this.ySpeed = 0;
        this.setSize(12, 12, true);

    },

    // Fires a bullet from the player to the reticle
    fire: function (shooter, target)
    {
        this.setPosition(shooter.x, shooter.y); // Initial position
        this.direction = Math.atan( (target.x-this.x) / (target.y-this.y));

        // Calculate X and y velocity of bullet to moves it from shooter to target
        if (target.y >= this.y)
        {
            this.xSpeed = this.speed*Math.sin(this.direction);
            this.ySpeed = this.speed*Math.cos(this.direction);
        }
        else
        {
            this.xSpeed = -this.speed*Math.sin(this.direction);
            this.ySpeed = -this.speed*Math.cos(this.direction);
        }

        this.rotation = shooter.rotation; // angle bullet with shooters rotation
        this.born = 0; // Time since new bullet spawned
    },

    // Updates the position of the bullet each cycle
    update: function (time, delta)
    {
        this.x += this.xSpeed * delta;
        this.y += this.ySpeed * delta;
        this.born += delta;
        if (this.born > 10)
        {
            this.setActive(false);
            this.setVisible(false);
        }
    }

});
var WorldScene = new Phaser.Class({

    Extends: Phaser.Scene,
	
	initialize:
	function WorldScene(){
		Phaser.Scene.call(this, {key: 'WorldScene'});

	},



    
	preload: function(){

	},
    
	create: function(){
       

		// criar mapa
		var map = this.make.tilemap({key:'map'});




		// adicao dos tiles
		var tiles = map.addTilesetImage('spritesheet','tiles');

        
		
        // tamanho da font
        this.fontePequena = {font:"30px Arial",
                                fill:"#ffffff"};

        //audio
        
        this.sound.add('tiro');
        this.sound.add('kill');
        this.sound.add('pick');
   
       this.sound.play('humanskill');
       
   
		
        
		// criar as duas layers
		var grass = map.createStaticLayer('Relva', tiles, 0, 0);
		var obstaculos = map.createStaticLayer('Obstaculos',tiles,0,0);
		var obstaculos2 = map.createStaticLayer('Obstaculos2',tiles,0,0);

        


		// blocos desiponiveis para colisao
		obstaculos.setCollisionByExclusion([-1]);
		obstaculos2.setCollisionByExclusion([-1]);
	


		// adicao do player
		this.player = this.physics.add.sprite(1200,3000,'player');
        this.player.setDepth(5);
		//this.rabitlife = this.physics.add.image(3000,2000,'rabitlife');
		// Add 2 groups for Bullet objects
         playerBullets = this.physics.add.group({ classType: Bullet, runChildUpdate: true });
         this.lastFired = 0;
		 reticle = this.physics.add.sprite(1100,3000, 'target');
		  // Set image/sprite properties
   
        this.player.setOrigin(0.5, 0.5).setDisplaySize(80, 40).setCollideWorldBounds(true).setDrag(500, 500);
    
        reticle.setOrigin(0.5, 0.5).setDisplaySize(30, 30).setCollideWorldBounds(true);
        bar = this.add.sprite(400,30,'bar').setScrollFactor(0,0);
        bar.setOrigin(0.5,0.5).setDisplaySize(800, 60);
        bar.setDepth(10);
     // timer
        this.tempo = 0;
        this.relogio = this.time.addEvent ({delay:1000,
                                            callback: this.atualizaTimer,
                                            callbackScope: this, loop: true});


         this.textoTempo = this.add.text(450, 30, " " + this.tempo, this.fontePequena).setScrollFactor(0,0);
        this.textoTempo.setOrigin(0.5,0.5);
        this.textoTempo.setDepth(15);



        this.pick1= false;
        this.pick2= false;
        this.pick2= false;

        


        

		var numhumanskill = 50;

		this.humanskillgroup=this.add.group();

        for(i=0;i<30; i++ ){
        
        var xx= Phaser.Math.Between(0,3200);
        var yy= Phaser.Math.Between(0,4480);
		var humanskill = this.physics.add.sprite(xx,yy,'humanskill', 4).setDisplaySize(68, 52);
		humanskill.setCollideWorldBounds(true);
        humanskill.setDepth(5);
		this.physics.add.collider(humanskill,obstaculos);
		this.physics.add.collider(humanskill,obstaculos2);
	
		this.physics.add.collider(humanskill,humanskill);
        this.humanskillgroup.add(humanskill);

}      
        this.babyrabitgroup=this.add.group();
        for(i=0;i<50; i++ ){
        var xx= Phaser.Math.Between(0,3200);
        var yy= Phaser.Math.Between(0,4480);
        babyrabit = this.physics.add.sprite(xx,yy,'babyrabit');
        this.babyrabitgroup.add(babyrabit);




}


       this.cars=this.add.group();
        
        car = this.physics.add.sprite(2450,200,'car');
        car.setCollideWorldBounds(true);
        car.setDepth(5);
        car.setOrigin(0.5,0.5).setDisplaySize(350, 350);
        this.cars.add(car);


        // Set sprite variables
        this.player.health = 5;
        this.player.picks = 0;

    

        
        // limitar o movimento do player à area de jogo
		this.physics.world.bounds.width = map.widthInPixels;
		this.physics.world.bounds.height = map.heightInPixels;
		this.player.setCollideWorldBounds(true);
	   


		// colisao do player com a layer
		this.physics.add.collider(this.player,obstaculos);
		this.physics.add.collider(this.player,obstaculos2);

		
		

		this.cursors = this.input.keyboard.createCursorKeys();

		// camera a seguir jogador
		this.cameras.main.setBounds(0, 0,
									map.widthInPixels,
									map.heightInPixels);

		this.cameras.main.startFollow(this.player);

		//evitar linhas a volta de tiles
		this.cameras.main.roundPixels = true;

	

	

		
		
	  //disparar as balas

	  // Fires bullet from player on left click of mouse
    this.input.on('pointerdown', function (pointer, time, lastFired) {
        if (this.player.active === false)
            return;

        // Get bullet from bullets group
        var bullet = playerBullets.get().setActive(true).setVisible(true);
		
        
        if (bullet)
        {
            bullet.fire(this.player, reticle);

            this.sound.play('tiro');
            
        }
    }, this);

    // Pointer lock will only work after mousedown
    game.canvas.addEventListener('mousedown', function () {
        game.input.mouse.requestPointerLock();
    });

    
    // Move reticle upon locked pointer move
    this.input.on('pointermove', function (pointer) {
        if (this.input.mouse.locked)
        {
            reticle.x += pointer.movementX;
            reticle.y += pointer.movementY;

            
        }
    }, this);
        
    
	
	},



      atualizaTimer(){

        this.tempo++;
        
    },

 playercollidecar(){

            Phaser.Actions.Call(this.cars.getChildren(), function(carr) {
                         
                      if(this.player.picks >= 3 && this.physics.overlap(this.player, carr)){
                            
                            
                            this.scene.start('Win');
                            this.scene.stop('UI');
                            this.scene.stop('WorldScene');
                         }
                  
                        }, this);
    },



    matahumanskill(){

            Phaser.Actions.Call(this.humanskillgroup.getChildren(), function(enemy) {
                   this.physics.moveToObject(enemy,this.player,40);
                   
                   // Rotates enemy to face towards player
                    enemy.rotation = Phaser.Math.Angle.Between(enemy.x, enemy.y, this.player.x, this.player.y);
                            
                      if(this.physics.overlap(playerBullets, enemy)){
                        if (enemy) {
                            deadhuman = this.add.sprite(enemy.x,enemy.y,'deadhuman');
                            deadhuman.setOrigin(0.5,0.5).setDisplaySize(60, 60);
                            deadhuman.setDepth(0);
                            this.sound.play('kill');
           
                      enemy.destroy();
                   }

        }
                  
                        }, this);
    },





    Playerperderabitlife(){
        
 Phaser.Actions.Call(this.humanskillgroup.getChildren(), function(enemy) {
                      
                     if (this.physics.overlap(this.player, enemy))
                {
                     this.player.health = this.player.health - 1;
      
                          if (enemy)
                 {
                      
                      enemy.destroy();
                 }
         // Kill hp sprites and kill player if health <= 0
        if (this.player.health == 4)
        {   
            this.sound.play('hit');
            hp5.destroy();
        }
        else if (this.player.health == 3)
        {   
            this.sound.play('hit');
            hp4.destroy();
        }
        else if (this.player.health == 2)
        {   
            this.sound.play('hit');
            hp3.destroy();
        }
        else if (this.player.health == 1)
        {   
            this.sound.play('hit');
            hp2.destroy();
        }
        else
        {   

            this.sound.play('hit');
            hp1.destroy();
            this.scene.start('Gameover');
            this.scene.stop('UI');
            this.scene.stop('WorldScene');
        }

        
       // bulletHit.setActive(false).setVisible(false);
    }

             }, this);

    },




    playerpickbabyrabit(){
        Phaser.Actions.Call(this.babyrabitgroup.getChildren(), function(pick) {
                      
                     if (this.physics.overlap(this.player, pick))
                {
                     this.player.picks = this.player.picks + 1;
      
                          if (pick)
                 {
                      this.sound.play('pick');
                      pick.destroy();
                 }

       // Kill hp sprites and kill player if health <= 0
        if (this.player.picks == 1)
        {
          pick3.destroy();
          
        }
        else if (this.player.picks == 2)
        {
            pick2.destroy();
           
           
        }
        else if(this.player.picks == 3)
        {
        pick1.destroy();
        
        cartexto = this.add.text(200, 570, " Encontra o Carro!", {font:"60px SWEETREVENGE",fill:"#ff0000"}).setScrollFactor(0,0);
        cartexto.setOrigin(0.5,0.5);
         


        


            

            
        }

        
       // bulletHit.setActive(false).setVisible(false);
    }

             }, this);


    },





    acabouotempo(){
         
        if (this.tempo == 180)
        {
            hp5.destroy();
            hp4.destroy();
            hp3.destroy();
            hp2.destroy();
            hp1.destroy();
            this.scene.start('Gameover');
            this.scene.stop('UI');
            this.scene.stop('WorldScene');
        }

    },
    




		update: function(){

             this.player.body.setVelocity(0);
            // Rotates player to face towards reticle
             this.player.rotation = Phaser.Math.Angle.Between(this.player.x, this.player.y, reticle.x, reticle.y);

           

            if(this.cursors.left.isDown){
                this.physics.moveToObject(this.player,reticle,120);
				this.player.body.setVelocityX(-120);
			}else if(this.cursors.right.isDown){
				this.player.body.setVelocityX(120);
			}

			if(this.cursors.up.isDown){
                this.physics.moveToObject(this.player,reticle,120);
                this.player.body.setVelocityY(-120);
			}else if(this.cursors.down.isDown){
                this.player.body.setVelocityY(120);
			}


            
            var bullet = playerBullets.get().setActive(true).setVisible(true);
			this.textoTempo.setText("" + this.tempo);
            

            this.matahumanskill();
            this.Playerperderabitlife();
            this.playerpickbabyrabit();
            this.acabouotempo();
            this.playercollidecar();

           
            
			

       
         


     }





});










var UI = new Phaser.Class({

    Extends: Phaser.Scene,

    initialize:

    function UI(){
        Phaser.Scene.call(this, {key: 'UI'});
    },




    create: function ()

    {  
       
         timeimg = this.add.image(390,30,'timeimg').setScrollFactor(0.0);
        timeimg.setOrigin(0.5, 0.5).setDisplaySize(50, 50);
        hp5 = this.add.image(550, 30, 'rabitlife').setScrollFactor(0.5, 0.5);
        hp4 = this.add.image(600, 30, 'rabitlife').setScrollFactor(0.5, 0.5);
        hp3 = this.add.image(650, 30, 'rabitlife').setScrollFactor(0.5, 0.5);
        hp2 = this.add.image(700, 30, 'rabitlife').setScrollFactor(0.5, 0.5);
        hp1 = this.add.image(750, 30, 'rabitlife').setScrollFactor(0.5, 0.5);
        hp1.setOrigin(0.5, 0.5).setDisplaySize(50, 50);
        hp2.setOrigin(0.5, 0.5).setDisplaySize(50, 50);
        hp3.setOrigin(0.5, 0.5).setDisplaySize(50, 50);
        hp4.setOrigin(0.5, 0.5).setDisplaySize(50, 50);
        hp5.setOrigin(0.5, 0.5).setDisplaySize(50, 50);
        pick1 = this.add.image(50,30,'babyrabit').setScrollFactor(0.0);
        pick2 = this.add.image(100,30,'babyrabit').setScrollFactor(0.0);
        pick3 = this.add.image(150,30,'babyrabit').setScrollFactor(0.0);
        pick1.setOrigin(0.5,0.5).setDisplaySize(50, 50);
        pick1.setOrigin(0.5,0.5).setDisplaySize(50, 50);
        pick1.setOrigin(0.5,0.5).setDisplaySize(50, 50);



        
          
    }

});










var Win = new Phaser.Class({

    Extends: Phaser.Scene,

    initialize:

    function Win(){
        Phaser.Scene.call(this, {key: 'Win'});
    },




    create: function ()
    {
       
      
      
         var bgg = this.add.image(400, 300, 'level1');
         bgg.setOrigin(0.5, 0.5).setDisplaySize(800, 600)
        

        var container = this.add.container(0, 0, [ bgg ]);

        bgg.setInteractive();

        bgg.once('pointerup', function () {

            
            this.scene.start('scene1');

        }, this);
        

        

        
        
    }

});

var scene1 = new Phaser.Class({

    Extends: Phaser.Scene,

    initialize:

    function scene1(){
        Phaser.Scene.call(this, {key: 'scene1'});
    },




    create: function ()
    {
       
        
     
         var bgg = this.add.image(400, 300, 'saverabit');
         bgg.setOrigin(0.5, 0.5).setDisplaySize(800, 600)
        

        var container = this.add.container(0, 0, [ bgg]);

        bgg.setInteractive();

        bgg.once('pointerup', function () {

            
            this.scene.start('WorldScene2');
             this.scene.start('UI2');

        }, this);
        

        

        
        
    }

});


