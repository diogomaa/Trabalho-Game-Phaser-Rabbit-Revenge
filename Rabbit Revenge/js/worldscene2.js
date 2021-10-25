
var WorldScene2 = new Phaser.Class({

    Extends: Phaser.Scene,
    
    initialize:
    function WorldScene2(){
        Phaser.Scene.call(this, {key: 'WorldScene2'});

    },



    
    preload: function(){

    },

    create: function(){
       

        // criar mapa
        var map2 = this.make.tilemap({key:'map2'});




        // adicao dos tiles
        var tiles = map2.addTilesetImage('spritesheet','tiles');

        
        
        // tamanho da font
        this.fontePequena = {font:"30px Arial",
                                fill:"#ffffff"};



        this.sound.add('kill');
        this.sound.add('pick');
   
       this.sound.play('humanskill');
        
        
        // criar as duas layers
        var grass = map2.createStaticLayer('Relva', tiles, 0, 0);
        var obstaculos = map2.createStaticLayer('Obstaculos',tiles,0,0);
        
        


        // blocos desiponiveis para colisao
        obstaculos.setCollisionByExclusion([-1]);
        

        // adicao do player
        this.player2 = this.physics.add.sprite(2100,2000,'player2');
        this.player2.setDepth(5);
        //this.rabitlife = this.physics.add.image(3000,2000,'rabitlife');
        // Add 2 groups for Bullet objects
         
         reticle = this.physics.add.sprite(2100, 2100, 'target');
          // Set image/sprite properties
   
        this.player2.setOrigin(0.5, 0.5).setDisplaySize(60, 40).setCollideWorldBounds(true).setDrag(500, 500);
    
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
        

        


        

        

        this.humanskillgroup=this.add.group();

        for(i=0;i<60; i++ ){
        
        var xx= Phaser.Math.Between(0,3200);
        var yy= Phaser.Math.Between(0,3200);
        var humanskill = this.physics.add.sprite(xx,yy,'humanskill', 4).setDisplaySize(68, 52);
        humanskill.setCollideWorldBounds(true);
        humanskill.setDepth(5);
        this.physics.add.collider(humanskill,obstaculos);
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

       this.rabitholes=this.add.group();
        
        rabithole = this.physics.add.sprite(3000,300,'rabithole');
        rabithole.setCollideWorldBounds(true);
        rabithole.setDepth(5);
        rabithole.setOrigin(0.5,0.5).setDisplaySize(300, 300);
        this.rabitholes.add(rabithole);




       
      



        // Set sprite variables
        this.player2.health = 3;
        this.player2.picks = 0;

    

        
        // limitar o movimento do player à area de jogo
        this.physics.world.bounds.width = map2.widthInPixels;
        this.physics.world.bounds.height = map2.heightInPixels;
        this.player2.setCollideWorldBounds(true);
       


        // colisao do player com a layer
        this.physics.add.collider(this.player2,obstaculos);
        
        

        this.cursors = this.input.keyboard.createCursorKeys();

        // camera a seguir jogador
        this.cameras.main.setBounds(0, 0,
                                    map2.widthInPixels,
                                    map2.heightInPixels);

        this.cameras.main.startFollow(this.player2);

        //evitar linhas a volta de tiles
        this.cameras.main.roundPixels = true;


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






    Playerperderabitlife(){
        
 Phaser.Actions.Call(this.humanskillgroup.getChildren(), function(enemy) {
    this.physics.moveToObject(enemy,this.player2,40);
                   // Rotates enemy to face towards player
                    enemy.rotation = Phaser.Math.Angle.Between(enemy.x, enemy.y, this.player2.x, this.player2.y);
                      
                     if (this.physics.overlap(this.player2, enemy))
                {
                     this.player2.health = this.player2.health - 1;
      
                          if (enemy)
                 {
                      
                      enemy.destroy();
                 }
         // Kill hp sprites and kill player if health <= 0
     

       if (this.player2.health == 2)
        {   
            this.sound.play('hit');
            hp3.destroy();
        }
        else if (this.player2.health == 1)
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
        
        }

        
       // bulletHit.setActive(false).setVisible(false);
    }

             }, this);

    },




    playerpickbabyrabit(){
        Phaser.Actions.Call(this.babyrabitgroup.getChildren(), function(pick) {
                      
                     if (this.physics.overlap(this.player2, pick))
                {
                     this.player2.picks = this.player2.picks + 1;
      
                          if (pick)
                 {
                    this.sound.play('pick');
                      pick.destroy();
                 }

       // Kill hp sprites and kill player if health <= 0
        if (this.player2.picks == 1)
        { 
          pick1.destroy();
          
        }

        holetexto = this.add.text(200, 570, " Encontra o Buraco!", {font:"60px SWEETREVENGE",fill:"#ff0000"}).setScrollFactor(0,0);
        holetexto.setOrigin(0.5,0.5);
    

        
       // bulletHit.setActive(false).setVisible(false);
    }

             }, this);


    },





    acabouotempo(){
         
        if (this.tempo == 180)
        {
            
            hp3.destroy();
            hp2.destroy();
            hp1.destroy();
            this.scene.start('Gameover');
            this.scene.stop('UI2');
            this.scene.stop('WorldScene2');
        }

    },
     playercolliderabithole(){

            Phaser.Actions.Call(this.rabitholes.getChildren(), function(bunk) {
                         
                      if(this.player2.picks >= 1 && this.physics.overlap(this.player2, bunk)){
                            this.scene.start('Win2');
                            this.scene.stop('UI2');
                            this.scene.stop('WorldScene2');
                         }
                  
                        }, this);
    },
    




        update: function(){

             this.player2.body.setVelocity(0);
            // Rotates player to face towards reticle
             this.player2.rotation = Phaser.Math.Angle.Between(this.player2.x, this.player2.y, reticle.x, reticle.y);

           
            
            if(this.cursors.left.isDown){
                this.physics.moveToObject(this.player2,reticle,120);
				this.player2.body.setVelocityX(-120);
			}else if(this.cursors.right.isDown){
				this.player2.body.setVelocityX(120);
			}

			if(this.cursors.up.isDown){
                this.physics.moveToObject(this.player2,reticle,120);
                this.player2.body.setVelocityY(-120);
			}else if(this.cursors.down.isDown){
                this.player2.body.setVelocityY(120);
			}

            this.textoTempo.setText("" + this.tempo);
            

            this.Playerperderabitlife();
            this.playercolliderabithole();
            this.playerpickbabyrabit();
            this.acabouotempo();
             


     }





});










var UI2 = new Phaser.Class({

    Extends: Phaser.Scene,

    initialize:

    function UI2(){
        Phaser.Scene.call(this, {key: 'UI2'});
    },




    create: function ()

    {  
       
         timeimg = this.add.image(390,30,'timeimg').setScrollFactor(0.0);
        timeimg.setOrigin(0.5, 0.5).setDisplaySize(50, 50);
        hp3 = this.add.image(650, 30, 'rabitlife').setScrollFactor(0.5, 0.5);
        hp2 = this.add.image(700, 30, 'rabitlife').setScrollFactor(0.5, 0.5);
        hp1 = this.add.image(750, 30, 'rabitlife').setScrollFactor(0.5, 0.5);
        hp1.setOrigin(0.5, 0.5).setDisplaySize(50, 50);
        hp2.setOrigin(0.5, 0.5).setDisplaySize(50, 50);
        hp3.setOrigin(0.5, 0.5).setDisplaySize(50, 50);
        pick1 = this.add.image(50,30,'babyrabit').setScrollFactor(0.0);
        pick1.setOrigin(0.5,0.5).setDisplaySize(50, 50);



        
          
    }

});










var Win2 = new Phaser.Class({

    Extends: Phaser.Scene,

    initialize:

    function Win2(){
        Phaser.Scene.call(this, {key: 'Win2'});
    },




    create: function ()
    {
       
        
     
         var bgg = this.add.image(400, 300, 'level2');
         bgg.setOrigin(0.5, 0.5).setDisplaySize(800, 600)
        

        var container = this.add.container(0, 0, [ bgg ]);

        bgg.setInteractive();

        bgg.once('pointerup', function () {

            
            this.scene.start('scene2');

        }, this);
        

        

        
        
    }

});


var scene2 = new Phaser.Class({

    Extends: Phaser.Scene,

    initialize:

    function scene2(){
        Phaser.Scene.call(this, {key: 'scene2'});
    },




    create: function ()
    {
       
        
     
         var bgg = this.add.image(400, 300, 'end');
         bgg.setOrigin(0.5, 0.5).setDisplaySize(800, 600)
        

        var container = this.add.container(0, 0, [ bgg]);

        bgg.setInteractive();

        bgg.once('pointerup', function () {

            
            this.scene.start('BootScene');
             

        }, this);
        

        

        
        
    }

});
