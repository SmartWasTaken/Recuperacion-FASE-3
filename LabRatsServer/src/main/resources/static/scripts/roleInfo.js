class RoleInfo extends Phaser.Scene {

    constructor() {
        super({ key: "RoleInfo" });
    }

    preload() {
        
        //Cargamos los assets
        this.loadAssets();
    }

    create() {
        
        //Configuramos los sonidos
        this.setupSounds();
        
        //Configuramos el fondo
        this.setupBackground();
        
        //Creamos botones
        this.createAcceptButton();
        this.createExitButton();
        
        //Configuramos botones
        this.buttonAnims();
    }

    update() {}
    
    //CARGA DE ASSETS
    loadAssets() {
        
        this.load.setPath('assets/');

        this.load.image('tutorialBackground', 'menuTutorial.png'); // Cambiar assets

        this.load.image('acceptBtn', 'btnJugar.png'); // Botón de aceptar (esconde escena)
        this.load.image('exitBtn', 'btnSalir.png');
        this.load.audio('mainMenuMusic', 'mainMenuMusic.ogg');
        this.load.audio('click', 'click.wav');
    }

    //CONFIGURACIÓN 
    setupSounds() {
        this.game.click = this.sound.add('click');
        if (!this.game.mainMenuMusic) {
            this.game.mainMenuMusic = this.sound.add('mainMenuMusic', { loop: true });
            this.game.mainMenuMusic.play();
        }
    }

    setupBackground() {
        const bg = this.add.image(200, 150, 'tutorialBackground');
        bg.setScale(0.75);
        bg.setOrigin(0.15, 0.2);
    }

    //CREACIÓN DE BOTONES
    
    createAcceptButton() {
        this.acceptBtn = this.add.image(260, 500, 'acceptBtn').setScale(0.45).setInteractive();
        this.acceptBtn.on('pointerdown', () => {
            console.log('Accept button pressed');
            this.game.click.play();
            this.scene.stop('RoleInfo');
        });
    }

    createExitButton() {
        this.exitBtn = this.add.image(550, 500, 'exitBtn').setScale(0.45).setInteractive();
        this.exitBtn.on('pointerdown', () => {
            console.log('Exit button pressed');
            this.game.click.play();
            this.scene.stop('RoleInfo'); // Detenemos la escena actual
            this.scene.stop('GameScene'); // Detenemos la escena del juego
            this.scene.start('MenuScene'); // Cambiamos a la escena del menú
        });
    }
    
    //CONFIGURACIÓN DE OTONES
    
    buttonAnims(){
        [this.acceptBtn, this.exitBtn].forEach(button => {
            button.on('pointerover', ()=>this.onButtonHover(button));
            button.on('pointerout', ()=>this.onButtonOut(button));
        });
    }
    onButtonHover(button){
        button.setScale(0.55);
    }
    onButtonOut(button){
        button.setScale(0.5);
    }
}
