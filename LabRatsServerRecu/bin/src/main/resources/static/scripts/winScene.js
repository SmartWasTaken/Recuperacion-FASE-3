class WinScene extends Phaser.Scene {

    constructor(){
        super({key: "WinScene"});
    }

    preload(){

        this.load.setPath('assets/');

        this.load.image('winBackground', 'winBackground.png');

        this.load.image('startBtn', 'btnJugar.png');
        this.load.image('exitBtn', 'btnSalir.png');
        this.load.audio('mainMenuMusic', 'mainMenuMusic.ogg');
    }

    create(){

        this.add.image(400, 300, 'winBackground');

        if (!this.game.mainMenuMusic) {
            this.game.mainMenuMusic = this.sound.add('mainMenuMusic', { loop: true });
            this.game.mainMenuMusic.play();
        }

        this.optionsBtn = this.add.image(400, 540, 'exitBtn');
        this.optionsBtn.setScale(0.5);
        this.optionsBtn.setInteractive();
        this.optionsBtn.on('pointerdown', () => {this.scene.start('MenuScene');});
        this.optionsBtn.on('pointerover', () => {this.optionsBtn.setScale(0.55);});
        this.optionsBtn.on('pointerout', () => {this.optionsBtn.setScale(0.5);});

    }

    update(){
    }
}