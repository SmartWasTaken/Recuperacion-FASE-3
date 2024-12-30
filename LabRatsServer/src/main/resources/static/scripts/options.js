class OptionsMenu extends Phaser.Scene {

    constructor(){
        super({key: "OptionsMenu"});
    }

    preload(){

        this.load.setPath('assets/');
        this.load.image('background', 'MenuBackground.png');
        this.load.image('backBtn', 'btnSalir.png'); //cambiar el boton (.png)
        this.load.audio('mainMenuMusic', 'mainMenuMusic.ogg');
        this.load.audio('click', 'click.wav');
        
    }

    //Fondo del menu de opciones
    create(){

        this.game.click = this.sound.add('click');
        
        this.add.image(400, 300, 'background');
        
        this.backBtn = this.add.image(400, 500, 'backBtn');
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
        
        //VOLUMEN (Y máximo 550)
        this.add.text(150,275, "Volumen General", {font: "20px Arial", fill: "#000" });
       
        this.generalVolumeSlider = this.createSlider(500, 290, 0.5, (value) => {
            this.game.sound.volume = value; // Ajusta el volumen general
        });
        
        this.add.text(150, 375, "Volumen de Música", { font: "20px Arial", fill: "#000" });
        
        this.musicVolumeSlider = this.createSlider(500, 390, 0.5, (value) => {
            // Manejo del volumen de la musica
            if (this.game.mainMenuMusic) {
                this.game.mainMenuMusic.setVolume(value);
            }
        }); 

        // Prueba de música
        //this.music = this.sound.add('mainMenuMusic', { loop: true });
        //this.music.play({ volume: 0.5 });
    }

    update(){
    }

    createSlider(x, y, initialValue, callback) {
        // Crea un slider utilizando un gráfico básico (puedes personalizarlo con tus assets)
        const sliderBar = this.add.rectangle(x, y, 200, 10, 0x555555);
        const sliderHandle = this.add.rectangle(x - 100 + (initialValue * 200), y, 20, 20, 0xffffff).setInteractive();

        this.input.setDraggable(sliderHandle);

        sliderHandle.on('drag', (pointer, dragX) => {
            const newX = Phaser.Math.Clamp(dragX, x - 100, x + 100); // Limita el rango del slider
            sliderHandle.x = newX;

            const value = (newX - (x - 100)) / 200; // Convierte la posición en un valor [0, 1]
            callback(value); // Llama al callback con el nuevo valor
        });

        return sliderHandle;
    }

}