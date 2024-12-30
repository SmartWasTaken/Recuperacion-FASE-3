class LoadingScene extends Phaser.Scene {
    constructor() {
        super({ key: 'LoadingScene' });
    }

    preload() {
        //color del fondo
        this.cameras.main.setBackgroundColor(0xe6e1be); //amarillo estandar de nuestro juego
        
        //texto de porcentaje de carga
        const width = this.cameras.main.width;
        const height = this.cameras.main.height;

        const loadingText = this.add.text(width / 2, height / 2 - 50, 'Loading: 0%', {
            fontSize: '20px',
            fill: '#000',
        }).setOrigin(0.5);

        //barra de carga
        const progressBar = this.add.graphics();
        const progressBox = this.add.graphics();
        progressBox.fillStyle(0x222222, 0.8);
        progressBox.fillRect(width / 4, height / 2, width / 2, 30);

        //eventos para mostrar el progreso de carga
        this.load.on('progress', (value) => {
            loadingText.setText(`Loading: ${Math.round(value * 100)}%`);
            progressBar.clear();
            progressBar.fillStyle(0x00000, 1);
            progressBar.fillRect(width / 4 + 5, height / 2 + 5, (width / 2 - 10) * value, 20);
        });

        this.load.on('complete', () => {
            loadingText.setText('Loading Complete!');
            progressBar.destroy();
            progressBox.destroy();
        });
		
		
        //aqui cargamos los recursos del juego
        this.load.setPath('../assets/');

        //TODO LO QUE SE VA A UTILIZAR
        //IMAGENES
        this.load.image('background', 'MenuBackground.png');
        this.load.image('backgroundGame', 'gameBackground.png');
        this.load.image('portada', 'portada.png');
        this.load.image('pared', 'pared.png');
        this.load.image('startBtn', 'btnJugar.png');
        this.load.image('optionsBtn', 'btnOpciones.png');
        this.load.image('lifeIcon', 'lifeIcon.png');
        this.load.image('rat', 'rata.png');
        this.load.image('hand', 'hand.png');
        this.load.image('clon', 'clon.png');
        this.load.image('tp', 'tp.png');
        this.load.image('queso', 'queso.png');
        this.load.image('vacuna', 'vacuna.png');
        this.load.image('trapdoor', 'trapdoor.png');
        this.load.image('creditos', 'btnCréditos.png');
        this.load.image('salir', 'btnSalir.png');
		this.load.image('creditsBg', 'creditsBackground.png');
        this.load.image('loseBg', 'loseBackground.png');
        this.load.image('menuTuto', 'menuTutorial.png');
        this.load.image('plantilla', 'plantilla.png');
        this.load.image('winBg', 'winBackground.png');
        this.load.image('closedDown', 'closedDown.png');
        this.load.image('closedLeft', 'closedLeft.png');
        this.load.image('closedRight', 'closedRight.png');
        this.load.image('closedUp', 'closedUp.png');
        this.load.image('Horizontal', 'Horizontal.png');
        this.load.image('vertical', 'verical.png');
        this.load.image('tpA', 'tpA.png');
        this.load.image('tpB', 'tpB.png');
        this.load.image('cheeseOpen', 'cheeseOpen.png');
        this.load.image('cheeseClosed', 'cheeseClosed.png');
        this.load.image('needle', 'needle.png');
        this.load.image('trapdoorOpen', 'trapdoorOpen.png');
        this.load.image('trapdoorClosed', 'trapdoorClosed.png');
        
        //MUSICA
        this.load.audio('mainMenuMusic', 'mainMenuMusic.ogg');
        this.load.audio('deathMusic', 'deathMusic.mp3');
        this.load.audio('tpSound', 'tpSound.wav');
        this.load.audio('healthBoost', 'healthBoost.wav');
        this.load.audio('handMoving', 'handMoving.mp3');
        this.load.audio('click', 'click.wav');
    }

    create() {
        //cuando esta todo cargado pasamos al menu
        this.scene.start('UserScene');
    }
}
