var Gameover = new Phaser.Class({

    Extends: Phaser.Scene,

    initialize:

    function Gameover(){
        Phaser.Scene.call(this, {key: 'Gameover'});
    },


    create: function ()
    {
    
        
        var bgg = this.add.image(400, 300, 'gameover');
         bgg.setOrigin(0.5, 0.5).setDisplaySize(800, 600)
        

        var container = this.add.container(0, 0, [ bgg ]);

        bgg.setInteractive();

        bgg.once('pointerup', function () {

            
            this.scene.start('BootScene');

        }, this);
    }

});