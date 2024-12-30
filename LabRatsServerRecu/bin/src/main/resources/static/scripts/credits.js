class Credits extends Phaser.Scene {

    constructor() {
        super({key: "Credits"});
    }

    preload() {

        this.load.setPath('../assets/');
        this.load.image('creditsBackground', 'creditsBackground.png');
        this.load.image('backBtn', 'btnSalir.png'); //cambiar el boton (.png)
        this.load.audio('mainMenuMusic', 'mainMenuMusic.ogg');
        this.load.audio('click', 'click.wav');

    }

    //Fondo de los creditos
    create() {

        this.game.click = this.sound.add('click');

        this.add.image(400, 300, 'creditsBackground');

        this.backBtn = this.add.image(720, 550, 'backBtn');
        this.backBtn.setScale(0.5);
        this.backBtn.setInteractive();
        this.backBtn.on('pointerdown', () => {
            this.game.click.play();
            this.scene.start('MenuScene');
        });
        this.backBtn.on('pointerover', () => {
            this.backBtn.setScale(0.55);
        });
        this.backBtn.on('pointerout', () => {
            this.backBtn.setScale(0.5);
        });
    }
    
    update(){
    }
    
    
}