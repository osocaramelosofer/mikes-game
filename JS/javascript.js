//VARIABLES GLOBALES
var player1 = "";
var player2 = "";

//CLASES DE JUEGO

class MainScene extends Phaser.Scene{
    constructor(){
        super('gameScene');
    }
    preload(){
        this.load.baseURL='./';
        this.load.image('fondo','recursos/fondo.png');
        this.load.image('plataforma1','recursos/plataforma1.png');
        this.load.spritesheet('jugador','recursos/rorrosprite.png',{frameWidth:92,frameHeight:96});
        this.load.spritesheet('jugador2','recursos/rorrosprite-2.png',{frameWidth:92,frameHeight:96});

        //PLATAFORMAS
        this.load.image('plataforma2','recursos/plataforma1.png');
        this.load.image('plataforma3','recursos/plataforma1.png');
        this.load.image('plataforma4','recursos/plataforma1.png');
        this.load.image('plataforma5','recursos/plataforma1.png');
        this.load.image('plataforma6','recursos/plataforma1.png');

    }
    create(){
        this.add.image(400,200,'fondo').setScale(2);
        var plataforms = this.physics.add.staticGroup();
        plataforms.create(300,500,'plataforma1').setScale(2).refreshBody();

        //INICIO DE PLATAFORMAS
        plataforms.create(100,100,'plataforma2');
        plataforms.create(280,150,'plataforma3');
        plataforms.create(600,100,'plataforma4');
        plataforms.create(600,200,'plataforma5');
        plataforms.create(400,300,'plataforma6');
        

        //INICIO DE MONTAJE DE PERSONAJE 1
        player1 = this.physics.add.sprite(280,150,'jugador');
        player1.setCollideWorldBounds(true);
        player1.setBounce(.1);
        this.physics.add.collider(player1,plataforms);

        //ANIMACIONES DEL JUGADOR
        this.anims.create({
            key:'izquierda',
            frames: this.anims.generateFrameNumbers('jugador',{start:0,end:3}),
            frameRate:10,
            repeat:-1
        });
        this.anims.create({
            key:'idle',
            frames:[{key:'jugador',frame:4}],
            frameRate:1
        });
        this.anims.create({
            key:'derecha',
            frames: this.anims.generateFrameNumbers('jugador',{start:5,end:8}),
            frameRate:10,
            repeat:-1
        });

        //INICIO DE MONTAJE DE PERSONAJE 2
        player2 = this.physics.add.sprite(500,150,'jugador2');
        player2.setCollideWorldBounds(true);
        player2.setBounce(.1);
        this.physics.add.collider(player2,plataforms);
        this.physics.add.collider(player1,player2);

        //ANIMACIONES DEL JUGADOR 2
        this.anims.create({
            key:'izquierda2',
            frames: this.anims.generateFrameNumbers('jugador2',{start:0,end:3}),
            frameRate:10,
            repeat:-1
        });
        this.anims.create({
            key:'idle2',
            frames:[{key:'jugador2',frame:4}],
            frameRate:1
        });
        this.anims.create({
            key:'derecha2',
            frames: this.anims.generateFrameNumbers('jugador2',{start:5,end:8}),
            frameRate:10,
            repeat:-1
        });

        //TECLAS
        this.cursor = this.input.keyboard.createCursorKeys();
        this.teclas = this.input.keyboard.addKeys({a:'A',w:'W',d:'D'});


    }
    update(){
        //MOVIMIENTO DEL PERSONAJE 1 CON TECLAS
    if(this.cursor.left.isDown){
        player1.setVelocityX(-160);
        player1.anims.play('izquierda',true);
    }else if (this.cursor.right.isDown){
        player1.setVelocityX(160);
        player1.anims.play('derecha',true);
    }else{
        player1.setVelocityX(0);
        player1.anims.play('idle',true);
    }
    if(this.cursor.up.isDown && (player1.body.touching.down || player1.body.blocked.down)){
        player1.setVelocityY(-430);
    }

    //MOVIMIENTO DEL PERSONAJE 2 CON TECLAS A,W,D
    if(this.teclas.a.isDown){
        player2.setVelocityX(-160);
        player2.anims.play('izquierda2',true);
    }else if (this.teclas.d.isDown){
        player2.setVelocityX(160);
        player2.anims.play('derecha2',true);
    }else{
        player2.setVelocityX(0);
        player2.anims.play('idle2',true);
    }
    if(this.teclas.w.isDown && (player2.body.touching.down || player2.body.blocked.down)){
        player2.setVelocityY(-430);
    }
    }

    
}

//ESTRUCTURA GENERAL DEL JUEGO
const config = {
    type: Phaser.AUTO,
    width:800,
    height:530,
    scene: [MainScene],
    scale:{
        mode:Phaser.Scale.FIT
    },physics:{
        default:'arcade',
        arcade: {
            debug:false,
            gravity:{
                y:300
            },
        },

    },
}; 
new Phaser.Game(config);