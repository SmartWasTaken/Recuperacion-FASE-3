class GameScene extends Phaser.Scene {
    constructor() {
        super({ key: "GameScene" });
    }

    preload() {

        //color del fondo
        this.cameras.main.setBackgroundColor(0xe6e1be); //amarillo estandar de nuestro juego
        
        //PANTALLA DE CARGA
        
        //dimensiones de la camara
        const width = this.cameras.main.width;
        const height = this.cameras.main.height;

        //porcentaje de carga
        const loadingText = this.add.text(width / 2, height / 2 - 50, 'Loading: 0%', {
            fontSize: '20px',
            fill: '#000',
        }).setOrigin(0.5);

        //barra de carga
        const progressBar = this.add.graphics();
        const progressBox = this.add.graphics();
        progressBox.fillStyle(0x222222, 0.8);
        progressBox.fillRect(width / 4, height / 2, width / 2, 30);

        //eventos para mostrar el progreso
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
        
        //JUEGO
        
        //cargamos aquí las imágenes o sprites necesarios

        this.load.setPath('assets/');

        this.load.image('scenery', 'gameBackground.png');

        this.load.image('rat', 'rata.png');
        this.load.image('hand', 'hand.png');
        this.load.image('clon', 'clon.png');
        this.load.image('tp', 'tp.png');
        this.load.image('queso', 'queso.png');
        this.load.image('vacuna', 'vacuna.png');
        this.load.image('trapdoor', 'trapdoor.png');
        
        this.load.image("roleInfo", "btnOpciones.png") //cambiar a btn de menu
        
        this.load.image('lifeIcon', 'lifeIcon.png');

        this.load.image('tpA', 'tpA.png');
        this.load.image('tpB', 'tpB.png');
        this.load.image('cheeseOpen', 'cheeseOpen.png');
        this.load.image('cheeseClosed', 'cheeseClosed.png');
        this.load.image('needle', 'needle.png');
        this.load.image('needleClosed', 'needleClosed.png');
        this.load.image('trapdoorOpen', 'trapdoorOpen.png');
        this.load.image('trapdoorClosed', 'trapdoorClosed.png');

        //cargamos aquí los efectos de sonido necesarios
        
        this.load.audio('mainMenuMusic', 'mainMenuMusic.ogg');
        this.load.audio('deathMusic', 'deathMusic.mp3');
        this.load.audio('hitSound', 'hitSound.wav');
        this.load.audio('eatSound', 'eatSound.mp3');
        this.load.audio('healthBoost', 'healthBoost.wav');
        this.load.audio('handMoving', 'handMoving.mp3');
        this.load.audio('click', 'click.wav');
        this.load.audio('tpSound', 'tpSound.wav');

        //Elementos del laberinto
        this.load.setPath('assets/laberinto/');
        
        //Bordes
        this.load.image('top', 'Top.png');
        this.load.image('left', 'Left.png');
        this.load.image('right', 'Right.png');
        this.load.image('bot', 'Bot.png');
        
        //Paredes
        this.load.image('closedDown', 'closedDown.png');
        this.load.image('closedLeft', 'closedLeft.png');
        this.load.image('closedRight', 'closedRight.png');
        this.load.image('closedUp', 'closedUp.png');
        this.load.image('vertical', 'verical.png');
        this.load.image('horizontal', 'Horizontal.png');

        this.load.image('exit', 'exit.png');
    }

    create() {
        
        //Añadir escenario
        this.add.image(400, 300, 'scenery');
        
        
        //Añadir sonidos
        this.game.click = this.sound.add('click');
        this.game.tpSound = this.sound.add('tpSound');
        this.game.eatSound = this.sound.add('eatSound');
        this.game.handMoving = this.sound.add('handMoving');
        this.game.healthBoost = this.sound.add('healthBoost');
        this.game.hitSound = this.sound.add('hitSound');
        
        
        //CRAR ELEMENTOS DEL ESCENARIO
        
        this.handcoords = [150, 400, 650];
        this.index = 1;
        this.lastMove = 0;

        
        //Contador de vidas para las ratas
        this.lives = 3; //por defecto empieza en 3
        
        //Crear la clonacion
        this.clon = this.add.image(300, 200, 'clon');
        this.clon.setScale(0.1);

        //Crear los tps dinámicamente
        this.tps = [
            this.createTeleportA1(400, 200),
            this.createTeleportA2(30, 210),
            this.createTeleportB1(600, 415),
            this.createTeleportB2(600, 290),
        ];
        this.exitCollider = true;

        //Crear quesos dinámicamente
        this.cheeses = [
            this.createCheese(275, 100),
            this.createCheese(300, 300),
            this.createCheese(735, 400),
        ];
        this.cheeseCollider = false;
        this.cheeseTime = 0;

        //Crear vidas dinámicamente
        this.lifeIcons = [
            this.createLives(30, 30),
            this.createLives(70, 30),
            this.createLives(110, 30),
            this.createLives(150, 30),
        ];
        this.lifeIcons[3].setVisible(false); //Quitar el icono de corazones
        
        //Crear jeringuillas dinámicamente
        this.syringes = [
            this.createSyringes(200, 100),
            this.createSyringes(410, 385),
            this.createSyringes(410, 385),
            this.createSyringes(450, 100)
        ];
        
        //Crear trampillas dinámicamente
        this.trapdoors = [ 
            this.createTrapdoors(225, 200),
            this.createTrapdoors(225, 345),
            this.createTrapdoors(400, 31)
        ];
        
        
        //BOTONES DEL CIENTÍFICO
        
        //Crear boton jeringuilla
        this.createButton(150, 500, 'vacuna', 'bvacuna');

        //Crear boton trampilla
        this.createButton(400, 500, 'trapdoor', 'btrapdoor');

        //Crear boton queso
        this.createButton(650, 500, 'queso', 'bqueso');
        
        //CONFIGURACIÓN DE CONTROLES
        
        this.cursors = this.input.keyboard.createCursorKeys(); //Añadir las flechas de dirección
        
        this.keys = this.input.keyboard.addKeys({ //Se crea la opcion de usar las teclas W A S D. 
            W: Phaser.Input.Keyboard.KeyCodes.W,
            A: Phaser.Input.Keyboard.KeyCodes.A,
            S: Phaser.Input.Keyboard.KeyCodes.S,
            D: Phaser.Input.Keyboard.KeyCodes.D,
        });

        //creamos el sprite "exit" en una posición específica
        this.exit = this.physics.add.staticImage(317, 415, 'exit').setScale(0.5);
        
        //Crear la rata
        this.rat = this.physics.add.sprite(20, 140, 'rat');

        this.rat.setScale(0.035);

        this.rat.setCollideWorldBounds(true);
        this.ratSpeed = 100;
        
        //Crear y configurar la mano
        this.hand = this.add.image(400, 530, 'hand');
        this.hand.setScale(0.5);
        
        //Creación del laberinto
        this.createLabyritnh();
        
        //Crear el botón de arriba de opciones
        this.btnOpt = this.add.image(745, 30, 'roleInfo').setScale(0.3);
        this.btnOpt.setInteractive();
        this.btnOpt.on('pointerdown', () => {
            this.game.click.play();
            this.scene.launch("RoleInfo");
        });
        this.btnOpt.on('pointerover', () => {this.btnOpt.setScale(0.35)});
        this.btnOpt.on('pointerout', () => {this.btnOpt.setScale(0.3)});
        
    }

    update(time, delta) {

        //MOVIMIENTO DE LA RATA
        
        this.handleRatMovement(this.ratSpeed);

        this.physics.add.overlap(this.rat, this.exit, () => {
            this.changeScene(); //si se detecta el "overlap" de la rata con la salid se cambia de escena
        }, null, this);
        
        if (this.cheeseCollider == false) {

            //comprobar colisiones con los quesos
            this.cheeses.forEach((cheese, index) => {
                if (this.checkCollision(this.rat, cheese, 50)) {
                    this.ratSpeed = 50;
                    cheese.destroy(); // Desactiva el queso del juego
                    console.log("Queso recogido");
                    this.cheeseCollider = true;
                    this.cheeseTime = time;
                    this.game.eatSound.play();
                    deleteCollectedItem(this.playerId, cheese.id);
                }
            });
            
        } else {
            //EFECTOS DEL QUESO
            if (Math.abs(time - this.cheeseTime) > 10000) {
                this.cheeseCollider = false;
                this.ratSpeed = 100;
            }
        }

        //MOVIMIENTO DE LA MANO
        this.handleHandMovement(time);

        //USO DE BOTONES
        if (this.cursors.up.isDown) {
            switch (this.index) {
                case 0: //Activar jeringuilla
                    this.bvacuna = true;
                    this.ActivateSyringe();
                    break;

                case 1: //Activar trampilla
                    this.btrapdoor = true;
                    this.ActivateTrapdoor();
                    break;

                case 2: //Activar queso
                    this.bqueso = true;
                    this.ActivateCheese();
                    break;
            }
        }
        
        
        //COLISION CON LA CLONACION
        if (this.checkCollision(this.rat, this.clon, 50)) {
            
            this.clon.x = 10000;
            
            this.lifeIcons[this.lives].setVisible(true); //Añadir el icono de corazones
            
            this.lives++; //Aumenta en 1 la vida
            this.game.healthBoost.play();

            this.clon.destroy();

            sendLifeChangeEvent('player123', 'add', this.lives); //este caso es para la suma de vedas dentro del mismo evento
        }
        
        //TP ENTRE LAS ALCANTARILLAS
        this.tps.forEach(tp => {
            if (this.checkCollision(this.rat, tp, 50) && this.exitCollider) {
                this.rat.x = tp.targetX;
                this.rat.y = tp.targetY;
                this.exitCollider = false;
                this.game.tpSound.play();
            }
        });

        if (this.tps.every(tp => !this.checkCollision(this.rat, tp, 50)) && !this.exitCollider) {
            this.exitCollider = true;
        }
    }


    changeScene() {
        //datos que enviamos al servidor
        const eventData = {
            event: 'RAT_EXIT',
            playerId: this.playerId, //asignamos un identificador único al jugador
            timestamp: new Date().toISOString(),
        };

        //fetch para solicitud HTTP
        fetch('http://localhost:8080/api/game/rat-exit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json', //tipo datos enviado (es decir, JSON)
            },
            body: JSON.stringify(eventData), //convierte datos a JSON
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Error en la solicitud: ${response.statusText}`);
                }
                return response.json();
            })
            .then(data => {
                console.log('Evento enviado al servidor:', data);
                this.scene.start('WinScene'); //cambiamos a la escena de victoria
            })
            .catch(error => {
                alert('Error de conexión. Intenta más tarde.');
                console.error('Error al enviar el evento:', error); //si no da error
            });
        
    }


    //MANEJO DE LA RATA
    
    //Maneja el movimiento de la rata según la velocidad.
    handleRatMovement(speed) {
        let positionChanged = false; // Flag para rastrear si hubo movimiento

        // Movimiento vertical
        if (this.keys.W.isDown) {
            this.rat.setVelocityY(-speed); // Arriba
            positionChanged = true;
        } else if (this.keys.S.isDown) {
            this.rat.setVelocityY(speed); // Abajo
            positionChanged = true;
        } else {
            this.rat.setVelocityY(0); // Detener en Y si no hay input
        }

        // Movimiento horizontal
        if (this.keys.A.isDown) {
            this.rat.setVelocityX(-speed); // Izquierda
            positionChanged = true;
        } else if (this.keys.D.isDown) {
            this.rat.setVelocityX(speed); // Derecha
            positionChanged = true;
        } else {
            this.rat.setVelocityX(0); // Detener en X si no hay input
        }

        // Actualizar posición del jugador si cambió
        if (positionChanged) {
            const player = {
                id: 'player123', // Hay que cambiar esto al id del jugador que le pongamos
                x: this.rat.x,
                y: this.rat.y,
            };
            updatePlayerPosition(player);
        }
    }


    //Manejo de perder vidas y de morir
    LifeDown(){

        //Devolvemos a la posicion inicial
        this.rat.x = 20;
        this.rat.y = 140; 
        
        this.lives--; //Restar la variable de vidas
        this.lifeIcons[this.lives].setVisible(false); //Quitar el icono de corazones
        this.game.hitSound.play();
        sendLifeChangeEvent('player123', 'subtract', this.lives); //el segundo es una resta
        
        //COMPROBAR SI EL JUGADOR HA MUERTO
        if (this.lives === 0) {
            
            if(!this.game.deathMusic) {
                this.game.mainMenuMusic.stop();
                this.game.deathMusic = this.sound.add('deathMusic', {loop: true});
                this.game.deathMusic.play();
            }
            
            this.scene.start('GameOverScene'); //Cargar la escena de derrota
        }
    }
    
    
    //MANEJO DEL CIENTÍFICO
    
    //Manejo de la mano
    handleHandMovement(time) {
        if (this.index === undefined || this.index < 0) {
            this.index = 0; // Valor inicial
        }

        const previousIndex = this.index; // Guardar el índice previo

        // Moverse a la izquierda
        if (this.cursors.left.isDown) {
            if (this.index > 0 && time - this.lastMove > 150) {
                this.index--;
                this.hand.x = this.handcoords[this.index];
                this.lastMove = time;
                this.game.handMoving.play();

                // Enviar evento de movimiento
                sendHandMovementEvent('player123', -1); // -1 significa izquierda
            }
        }

        // Moverse a la derecha
        if (this.cursors.right.isDown) {
            if (this.index < this.handcoords.length - 1 && time - this.lastMove > 150) {
                this.index++;
                this.hand.x = this.handcoords[this.index];
                this.lastMove = time;
                this.game.handMoving.play();

                // Enviar evento de movimiento
                sendHandMovementEvent('player123', 1); // 1 significa derecha
            }
        }

        // Verificar si está en el centro (opcional)
        if (this.index === Math.floor(this.handcoords.length / 2) && previousIndex !== this.index) {
            // Enviar evento de posición central
            sendHandMovementEvent('player123', 0); // 0 significa centro
        }
    }
    
    
    //MANEJO DE COLISIONES
    
    checkCollision(obj1, obj2, range) {
        const dx = Math.abs(obj1.x - obj2.x);
        const dy = Math.abs(obj1.y - obj2.y);
        return dx < range && dy < range;
    }

    
    //MÉTODOS PARA EL CONTROL DE LOS BOTONES DEL CIENTIFICO

    ActivateSyringe() {
        this.syringes.forEach((syringe, index) => {
            if (this.checkCollision(this.rat, syringe, 50) && syringe.isActive !== false) {
                this.LifeDown();

                //cambia la textura de la jeringuilla
                syringe.setTexture('needle'); // Cambia a la textura de jeringuilla usada

                //desactivaa temporalmente la jeringuilla
                syringe.isActive = false;

                //retrasar el reinicio de la textura y la reactivación de la jeringuilla
                this.time.delayedCall(3000, () => {
                    syringe.setTexture('needleClosed'); //regresa a la textura original
                    syringe.isActive = true; //reactiva la jeringuilla
                });
            }
        });
    }

    ActivateTrapdoor() {
        this.trapdoors.forEach((trapdoor, index) => {
            if (this.checkCollision(this.rat, trapdoor, 50) && trapdoor.isActive !== false) {
                this.LifeDown();

                //cambiar la textura de la trampilla
                trapdoor.setTexture('trapdoorOpen'); // Cambia a la textura de trampa activada

                //desactivar temporalmente la trampa para evitar múltiples activaciones
                trapdoor.isActive = false;

                //retrasaa el reinicio de la textura y la reactivación de la trampa
                this.time.delayedCall(3000, () => {
                    trapdoor.setTexture('trapdoorClosed'); //regresa a la textura original
                    trapdoor.isActive = true; //reactiva la trampa
                });
            }
        });
    }
    
    ActivateCheese(){
        //Regenera los quesos en sus respectivas posiciones
        this.cheeses.push(this.createCheese(250, 100));
        this.cheeses.push(this.createCheese(300, 300));
        this.cheeses.push(this.createCheese(700, 400));
    }
    
    //CREAR EL LABERINTO
    
    createLabyritnh(){
        
        //Crear el grupo estático "Paredes"
        const walls = this.physics.add.staticGroup();

        fetchLabyrinthConfig(walls);
        
        //Añadir los bordes
        walls.create(400, 7.5, 'top');    //pared superior
        walls.create(6, 220, 'left');  //pared izquierda
        walls.create(792, 220, 'right'); //pared derecha
        walls.create(400, 442, 'bot');  //pared inferior
        walls.create(6, 665, 'right'); //borde mano
        walls.create(792, 665, 'right'); //borde mano
        
        //Añadir las paredes del propio laberinto
        
        walls.create(30, 115, 'horizontal');
        walls.create(60, 60, 'vertical');
        
        walls.create(30, 170, 'horizontal');
        walls.create(60, 180, 'vertical');
        walls.create(60, 210, 'vertical');
        walls.create(60, 230, 'vertical');
        walls.create(60, 300, 'vertical');
        walls.create(60, 330, 'vertical');
        walls.create(60, 360, 'vertical');
        walls.create(60, 390, 'vertical');
        walls.create(60, 420, 'vertical');
        
        walls.create(75, 50, 'horizontal');
        walls.create(100, 50, 'horizontal');
        
        walls.create(75, 280, 'horizontal');
        walls.create(85, 280, 'horizontal');
        
        walls.create(110, 120, 'vertical');
        walls.create(110, 150, 'vertical');
        walls.create(110, 180, 'vertical');
        walls.create(110, 210, 'vertical');
        walls.create(110, 240, 'vertical');
        walls.create(110, 270, 'vertical');
        
        walls.create(110, 330, 'vertical');
        walls.create(110, 360, 'vertical');
        
        walls.create(100, 50, 'horizontal');
        walls.create(130, 50, 'horizontal');
        
        walls.create(135, 110, 'horizontal');
        walls.create(170, 110, 'horizontal');
        walls.create(200, 110, 'horizontal');
        walls.create(230, 110, 'horizontal');
        
        walls.create(320, 110, 'horizontal');
        walls.create(350, 110, 'horizontal');
        walls.create(380, 110, 'horizontal');
        walls.create(410, 110, 'horizontal');
        walls.create(440, 110, 'horizontal');
        walls.create(470, 110, 'horizontal');
        walls.create(500, 110, 'horizontal');
        walls.create(530, 110, 'horizontal');
        walls.create(560, 110, 'horizontal');
        walls.create(590, 110, 'horizontal');
        
        walls.create(380, 160, 'horizontal');
        walls.create(410, 160, 'horizontal');
        walls.create(440, 160, 'horizontal');
        walls.create(470, 160, 'horizontal');
        walls.create(500, 160, 'horizontal');
        walls.create(530, 160, 'horizontal');
        walls.create(560, 160, 'horizontal');
        walls.create(590, 160, 'horizontal');
        
        walls.create(135, 170, 'horizontal');
        walls.create(210, 170, 'horizontal');
        walls.create(235, 170, 'horizontal');
        walls.create(235, 170, 'horizontal');
        
        walls.create(135, 370, 'horizontal');
        
        walls.create(145, 30, 'vertical');
        
        walls.create(155, 240, 'vertical');
        walls.create(155, 270, 'vertical');
        walls.create(155, 300, 'vertical');
        
        walls.create(175, 110, 'horizontal');
        walls.create(175, 170, 'horizontal');
        walls.create(175, 230, 'horizontal');
        
        walls.create(175, 320, 'horizontal');
        walls.create(200, 320, 'horizontal');
        walls.create(230, 320, 'horizontal');
        walls.create(260, 320, 'horizontal');
        walls.create(290, 320, 'horizontal');
        walls.create(320, 320, 'horizontal');
        walls.create(350, 320, 'horizontal');
        
        walls.create(175, 370, 'horizontal');
        walls.create(200, 370, 'horizontal');
        walls.create(230, 370, 'horizontal');
        walls.create(260, 370, 'horizontal');
        
        walls.create(200, 240, 'vertical');
        walls.create(200, 270, 'vertical');

        walls.create(260, 180, 'vertical');
        walls.create(260, 210, 'vertical');
        walls.create(260, 240, 'vertical');
        walls.create(260, 270, 'vertical');
        
        walls.create(275, 390, 'vertical');
        walls.create(275, 420, 'vertical');
        
        walls.create(365, 340, 'vertical');
        walls.create(365, 370, 'vertical');
        walls.create(365, 400, 'vertical');
        walls.create(365, 420, 'vertical');

        walls.create(230, 50, 'horizontal');
        walls.create(260, 50, 'horizontal');
        walls.create(290, 50, 'horizontal');
        walls.create(320, 50, 'horizontal');
        walls.create(350, 50, 'horizontal');
        walls.create(370, 50, 'horizontal');
        walls.create(400, 50, 'horizontal');
        walls.create(430, 50, 'horizontal');
        walls.create(460, 50, 'horizontal');
        walls.create(490, 50, 'horizontal');
        walls.create(520, 50, 'horizontal');
        walls.create(550, 50, 'horizontal');
        walls.create(580, 50, 'horizontal');
        walls.create(610, 50, 'horizontal');
        walls.create(640, 50, 'horizontal');
        walls.create(670, 50, 'horizontal');
        walls.create(670, 50, 'horizontal');

        walls.create(700, 75, 'vertical');
        walls.create(700, 100, 'vertical');
        walls.create(700, 130, 'vertical');
        walls.create(700, 160, 'vertical');
        walls.create(700, 190, 'vertical');
        walls.create(700, 220, 'vertical');
        walls.create(700, 250, 'vertical');
        
        walls.create(700, 350, 'vertical');
        walls.create(700, 380, 'vertical');

        walls.create(675, 390, 'horizontal');
        walls.create(650, 390, 'horizontal');
        walls.create(625, 390, 'horizontal');
        walls.create(600, 390, 'horizontal');
        walls.create(575, 390, 'horizontal');
        walls.create(550, 390, 'horizontal');
        walls.create(525, 390, 'horizontal');
        walls.create(500, 390, 'horizontal');
        walls.create(475, 390, 'horizontal');
        walls.create(450, 390, 'horizontal');
        walls.create(425, 390, 'horizontal');
        walls.create(400, 390, 'horizontal');
        walls.create(390, 390, 'horizontal');

        walls.create(465, 220, 'horizontal');
        walls.create(495, 220, 'horizontal');
        walls.create(525, 220, 'horizontal');
        walls.create(555, 220, 'horizontal');
        walls.create(585, 220, 'horizontal');
        walls.create(615, 220, 'horizontal');
        walls.create(645, 220, 'horizontal');
        walls.create(675, 220, 'horizontal');

        walls.create(640, 240, 'vertical');
        walls.create(640, 270, 'vertical');
        walls.create(640, 300, 'vertical');
        walls.create(640, 310, 'vertical');

        walls.create(550, 320, 'horizontal');
        walls.create(580, 320, 'horizontal');
        walls.create(610, 320, 'horizontal');
        walls.create(550, 270, 'horizontal');

        walls.create(530, 300, 'vertical');
        walls.create(530, 280, 'vertical');
        
        walls.create(450, 320, 'vertical');
        walls.create(450, 300, 'vertical');

        walls.create(430, 280, 'horizontal');
        walls.create(400, 280, 'horizontal');
        walls.create(370, 280, 'horizontal');
        walls.create(340, 280, 'horizontal');
        walls.create(310, 280, 'horizontal');
        walls.create(280, 280, 'horizontal');
        
        walls.create(355, 170, 'vertical');
        walls.create(355, 200, 'vertical');
        walls.create(355, 230, 'vertical');
        walls.create(355, 260, 'vertical');

        walls.create(605, 140, 'vertical');
        walls.create(605, 130, 'vertical');
        
        //Añadir físicas a los bordes
        this.physics.add.collider(this.rat, walls);
    }
    
    
    //MÉTODOS PARA CREAR OBJETOS DE FORMA MÁS SENCILLA

    
    //Crea un teleport con posición y destino.

    createTeleportA1(x, y) {
        const tp = this.add.image(x, y, 'tpA').setScale(0.125);
        tp.targetX = 85; //cambia esto según dónde quieres que lleve
        tp.targetY = 200;
        return tp;
    }
    createTeleportA2(x, y) {
        const tp = this.add.image(x, y, 'tpA').setScale(0.125);
        tp.targetX = 400; //cambia esto según dónde quieres que lleve
        tp.targetY = 200;
        return tp;
    }
    createTeleportB1(x, y) {
        const tp = this.add.image(x, y, 'tpB').setScale(0.125);
        tp.targetX = 600; //cambia esto según dónde quieres que lleve
        tp.targetY = 290;
        return tp;
    }
    createTeleportB2(x, y) {
        const tp = this.add.image(x, y, 'tpB').setScale(0.125);
        tp.targetX = 600; //cambia esto según dónde quieres que lleve
        tp.targetY = 415;
        return tp;
    }

    //Crea un queso en la posición especificada.

    createCheese(x, y) {
        const cheese = this.add.image(x, y, 'cheeseOpen').setScale(0.085);
        return cheese;
    }
    
    //Crea un icono de vida
    
    createLives(x, y) {
        const lifeIcon = this.add.image(x, y, 'lifeIcon').setScale(0.15);
        return lifeIcon;
    }

    //Crea una jeringuilla
    
    createSyringes(x, y){
        const syringe = this.add.image(x, y, 'needleClosed').setScale(0.115);
        return syringe;
    }
    
    //Crea una trampilla
    
    createTrapdoors(x, y){
        const trapdoor = this.add.image(x, y, 'trapdoorClosed').setScale(0.115);
        return trapdoor;
    }
    
    //Crea un botón interactivo.

    createButton(x, y, texture, name) {
        this[name] = this.add.image(x, y, texture).setScale(0.3);
        this[name] = false;
    }
}

//FUNCIONES
function sendHandMovementEvent(playerId, movementDirection) {
    fetch('https://localhost:8080/api/game/hand-movement', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            playerId: playerId,
            direction: movementDirection, // -1 (izquierda), 0 (centro), 1 (derecha)
            timestamp: new Date().toISOString()
        }),
    })
        .then(response => {
            if (!response.ok) {
                throw new Error(`Error al enviar movimiento: ${response.statusText}`);
            }
            console.log(`Movimiento enviado: ${movementDirection}`);
        })
        .catch(error => {
            alert('Error de conexión. Intenta más tarde.');
            console.error('Error al enviar el movimiento:', error);
        });
}

function sendLifeChangeEvent(playerId, changeType, newLives) {
    fetch('https://localhost:8080/api/game/life-change', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            playerId: playerId,
            changeType: changeType, // "add" o "subtract"
            lives: newLives,       // Número de vidas actual
            timestamp: new Date().toISOString()
        }),
    })
        .then(response => {
            if (!response.ok) {
                throw new Error(`Error al enviar cambio de vidas: ${response.statusText}`);
            }
            console.log(`Cambio de vidas enviado: ${changeType}, Vidas: ${newLives}`);
        })
        .catch(error => {
            console.error('Error al enviar el cambio de vidas:', error);
        });
}

function fetchPlayerStats(playerId) {
    fetch(`https://localhost:8080/api/game/player-stats/${playerId}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
    })
        .then(response => {
            if (!response.ok) {
                throw new Error(`Error al obtener estadísticas: ${response.statusText}`);
            }
            return response.json();
        })
        .then(data => {
            console.log('Estadísticas del jugador:', data);
            // Usa los datos en el juego (por ejemplo, actualiza HUD o lógica de juego).
        })
        .catch(error => {
            console.error('Error al obtener estadísticas del jugador:', error);
        });
}

function updatePlayerPosition(playerId, x, y) {
    fetch(`https://localhost:8080/api/game/player-position`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            playerId: playerId,
            position: { x, y },
            timestamp: new Date().toISOString(),
        }),
    })
        .then(response => {
            if (!response.ok) {
                throw new Error(`Error al actualizar posición: ${response.statusText}`);
            }
            console.log('Posición del jugador actualizada:', { x, y });
        })
        .catch(error => {
            console.error('Error al actualizar posición del jugador:', error);
        });
}

function deleteCollectedItem(playerId, itemId) {
    fetch(`https://localhost:8080/api/game/collected-item/${itemId}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            playerId: playerId,
            timestamp: new Date().toISOString(),
        }),
    })
        .then(response => {
            if (!response.ok) {
                throw new Error(`Error al eliminar objeto: ${response.statusText}`);
            }
            console.log(`Objeto eliminado: ${itemId}`);
        })
        .catch(error => {
            console.error('Error al eliminar el objeto:', error);
        });
}

function updateLives(playerId, newLives) {
    fetch(`https://localhost:8080/api/game/lives`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            playerId: playerId,
            lives: newLives,
            timestamp: new Date().toISOString(),
        }),
    })
        .then(response => {
            if (!response.ok) {
                throw new Error(`Error al actualizar vidas: ${response.statusText}`);
            }
            console.log(`Vidas actualizadas a: ${newLives}`);
        })
        .catch(error => {
            console.error('Error al actualizar las vidas:', error);
        });
}

function fetchLabyrinthConfig(walls) {
    fetch('https://localhost:8080/api/game/labyrinth-config', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
    })
        .then(response => response.json())
        .then(config => {
            config.walls.forEach(wall => {
                walls.create(wall.x, wall.y, wall.type);
            });
            console.log('Laberinto cargado');
        })
        .catch(error => {
            console.error('Error al cargar el laberinto:', error);
        });
}