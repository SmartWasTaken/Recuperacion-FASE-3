class GameOverScene extends Phaser.Scene {

    constructor(){
        super({key: "GameOverScene"});
    }

    preload(){

        this.load.setPath('assets/');

        this.load.image('loseBackground', 'loseBackground.png');

        this.load.image('startBtn', 'btnJugar.png');
        this.load.image('exitBtn', 'btnSalir.png');
        this.load.audio('mainMenuMusic', 'mainMenuMusic.ogg');
        this.load.audio('deathMusic', 'deathMusic.mp3');
    }

    create(){

        this.add.image(400, 300, 'loseBackground');

        this.optionsBtn = this.add.image(400, 540, 'exitBtn'); //CAMBIAR A SALIR AL MENU
        this.optionsBtn.setScale(0.5);
        this.optionsBtn.setInteractive();
        this.optionsBtn.on('pointerdown', () => {
            this.scene.start('MenuScene');
            if (this.game.deathMusic) {
                this.game.deathMusic.stop(); //se para la musica de muerte
                this.game.mainMenuMusic.play(); //se reinicia la musica principal
            }
        });
        this.optionsBtn.on('pointerover', () => {
            this.optionsBtn.setScale(0.55);
        });
        this.optionsBtn.on('pointerout', () => {
            this.optionsBtn.setScale(0.5);
        });

    }

    update(){
    }
}