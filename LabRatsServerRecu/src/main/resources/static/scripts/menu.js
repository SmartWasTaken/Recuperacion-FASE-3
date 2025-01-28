class MenuScene extends Phaser.Scene {

    constructor() {
        super({ key: "MenuScene" });
        this.userId = `user_${Math.floor(Math.random() * 10000)}`; // Generar un ID único temporal
        this.usersConnectedContainer = null; // Contenedor del texto
		this.userName = null;
        this.lastMessageId = 0;  // Inicializamos el ID del último mensaje recibido
		this.maxMessages = 16;
		this.receivedMessages = new Set();
		this.connectedUsers = 0;
    }

    preload() {
        //Cargamos los assets necesarios
        this.loadAssets();
    }

    create() {
		//this.setupWebSocket();
		this.userName = sessionStorage.getItem('userName');
        //Configuramos los sonidos
        this.setupSounds();
    
        //Creamos el escenario
        this.add.image(400, 300, 'background');
        
		this.createConnectedUsersDisplay();
		this.updateConnectedUsers();
		
		this.createConnectionIndicator();
		this.checkConnection();
		
        ///Creamos los botones básicos
        this.createStartButton();
        this.createOptionsButton();
        this.createCreditsButton();
        this.createChatButton();
		//this.createLogOutButton();
        this.createMetalPipe();
        this.campeonesinvierno();
		
		this.createAccountBtn();
		
		//this.getConnectedUser();
		
        //Configuramos los botones
        this.buttonAnims();
        
        // Contenedor del chat (inicialmente oculto)
        this.createChatContainer();
        
        // Iniciar actualización periódica de usuarios conectados
        //this.sendHeartbeat(); // Enviar heartbeat periódicamente
        
        // Iniciar polling para obtener mensajes cada 1 segundo
        this.startPolling();
    }
	
	setupWebSocket() {
		this.socket = new WebSocket(`ws://${window.location.host}/echo`);

		    this.socket.addEventListener('open', () => {
		        console.log('Conectado al servidor WebSocket');
		    });

		    this.socket.addEventListener('message', (event) => {
		        const message = JSON.parse(event.data);
		        console.log('Mensaje recibido:', message);

		        switch (message.type) {
		            case 'CONNECTED':
		                this.userId = message.userId;
		                console.log(`Usuario registrado con ID: ${this.userId}`);
		                break;

		            case 'CHAT':
		                this.displayMessage(`${message.sender}: ${message.content}`);
		                break;
						
					case 'POSITION_UPDATE':
						console.log(`Jugador ${message.playerId} se movió a (${message.x}, ${message.y})`);
						// Emitir un evento global
						this.game.events.emit('positionUpdate', message);
						break;	
					
					case 'HAND_POSITION_UPDATE':
					    console.log(`Jugador ${message.playerId} movió la mano al índice ${message.handIndex}`);
					    // Emitir un evento global para que el juego lo maneje
					    this.game.events.emit('handPositionUpdate', message);
					    break;
					
					case 'START_GAME':
						console.log("Iniciando el juego...");
						break;
					
					case 'CHECK_ROOM':
						if(message.roomFull == true){
							this.startBtn.setVisible = false;
							console.log("FULL");
						} else {
							this.startBtn.setVisible = true;
							console.log("NOT FULL");
						}
						break;
						
					case "LIFE_UPDATE":
						console.log("Actualizaciones de vida");
						break;
						
					case "WIN_SCENE":
						console.log("Pasamos a la victoria");
						break;
						
					case "PLAYER_CONNECT":
						console.log("CONEXIÓN DE JUGADOR");	
						this.connectedUsers = message.numOfPlayersMenu;
						this.usersText.setText(`USUARIOS CONECTADOS: ${this.connectedUsers}`);	
						break;
						
					case "PLAYER_DISCONECT":
						console.log("DESCONEXION DE JUGADOR");
						this.connectedUsers = message.numOfPlayersMenu;
						this.usersText.setText(`USUARIOS CONECTADOS: ${this.connectedUsers}`);
						break;
						
					case "PLAYER_LOBBY_CONNECT":
						break;
						
					case "PLAYER_LOBBY_DISCONNECT":
						break;
						
					case "JOIN_ROOM":
						break;
						
					case "UPDATE_LOBBY_PLAYERS":
						break;
						
					case "ROOM_UPDATE":
						break;
						
		            default:
		                console.error('Tipo de mensaje desconocido:', message.type);
		        }
		    });

		    this.socket.addEventListener('close', () => {
		        console.error('Conexión cerrada con el servidor WebSocket');
		    });

		    this.socket.addEventListener('error', (error) => {
		        console.error('Error en el WebSocket:', error);
		    });
	}
	
	createDeleteAccountButton() {
	    const deleteButton = this.add.image(20, 80, 'deleteAccount').setScale(0.5).setInteractive();
	    deleteButton.on('pointerdown', () => {
	        // Confirmar con el usuario antes de eliminar la cuenta
	        const confirmation = confirm("¿Estás seguro de que deseas eliminar tu cuenta? Esta acción no se puede deshacer.");
	        if (confirmation) {
	            this.deleteAccount();
	        }
	    });
	}
	
	// Función para mostrar el nombre del usuario en la pantalla
	showUsername(username) {
	    // Si el contenedor de nombre de usuario no existe, lo creamos
	    if (!this.usernameContainer) {
	        // Fondo negro para el área del nombre del usuario
	        this.usernameContainer = this.add.container(10, 80); // Ajustamos la posición aquí
	        const usernameBackground = this.add.rectangle(0, 0, 180, 60, 0x000000, 0.8).setOrigin(0);
	        this.usernameContainer.add(usernameBackground);

	        // Texto del nombre de usuario conectado
	        this.usernameText = this.add.text(10, 10, `Usuario: ${username}`, {
	            fontSize: '16px',
	            fill: '#fff',
	            wordWrap: { width: 180, useAdvancedWrap: true }
	        });
	        this.usernameContainer.add(this.usernameText);
	    } else {
	        // Si el contenedor ya existe, solo actualizamos el texto
	        this.usernameText.setText(`Usuario: ${username}`);
	    }
	}
	
	// Crear el indicador de conexión
	    createConnectionIndicator() {
	        // Crear el cuadrado verde (inicialmente desconectado)
	        this.connectionIndicator = this.add.rectangle(67, 568, 25, 25, 0xff0000); // Cuadrado rojo por defecto
	        this.connectionIndicator.setOrigin(0);
	        
	        // Crear el texto "Conectado"
	        this.connectionText = this.add.text(37, 550, 'Conectado', {
	            fontSize: '16px',
	            fill: '#000',
	        });

	        // Alineamos el texto al lado del cuadrado
	        this.connectionText.setOrigin(0);

	        // Función que cambiará el color según la conexión
	        this.updateConnectionStatus(true); // Llamamos con 'true' para simular conexión al principio
	    }
		
		// Actualizar el estado de la conexión
		// Método para actualizar el estado de la conexión
		updateConnectionStatus(isConnected) {
		    if (isConnected) {
		        // Cuadrado verde
		        this.connectionIndicator.setFillStyle(0x00ff00);  // Cambiar color a verde
		        this.connectionText.setText('Conectado');
		    } else {
		        // Cuadrado rojo
		        this.connectionIndicator.setFillStyle(0xff0000);  // Cambiar color a rojo
		        this.connectionText.setText('Desconectado');
		    }
		}
		
		// Función para revisar la conexión al servidor
		    checkConnection() {
		        setInterval(() => {
		            fetch('/user/check-server-status')  // Endpoint que verifica el estado del servidor
		                .then(response => {
		                    if (response.ok) {
		                        this.updateConnectionStatus(true);  // El servidor está disponible
		                    } else {
		                        this.updateConnectionStatus(false);  // El servidor no está disponible
		                    }
		                })
		                .catch(error => {
		                    console.error('Error al comprobar la conexión:', error);
		                    this.updateConnectionStatus(false);  // En caso de error, asumimos que el servidor está desconectado
		                });
		        }, 1000);  // Verificar cada 500 milisegundos
		    }


	createConnectedUsersDisplay() {
	        // Fondo negro para el área de usuarios conectados
	        this.usersContainer = this.add.container(10, 10);
	        const usersBackground = this.add.rectangle(0, 0, 180, 60, 0x000000, 0.8).setOrigin(0);
	        this.usersContainer.add(usersBackground);

	        // Texto de usuarios conectados
	        this.usersText = this.add.text(10, 10, 'USUARIOS CONECTADOS: Cargando...', {
	            fontSize: '16px',
	            fill: '#fff',
	            wordWrap: { width: 180, useAdvancedWrap: true }
	        });
	        this.usersContainer.add(this.usersText);
	    }
	
    sendHeartbeat() {
        setInterval(() => {
            console.log(`Enviando heartbeat para el usuario: ${this.userId}`);
            fetch(`/user/heartbeat?userId=${this.userId}`, { method: "POST" })
                .then(response => {
                    if (!response.ok) {
                        throw new Error("Error al enviar heartbeat");
                    }
                    console.log("Heartbeat enviado correctamente");
                })
                .catch(error => console.error("Error en heartbeat:", error));
        }, 10000); // Cada 2 segundos
    }
	
	updateConnectedUsers() {
	        // Actualizar usuarios conectados cada 5 segundos
	        setInterval(() => {
	            fetch("/user/connected-users")
	                .then(response => response.json())
	                .then(data => {
						// Actualizar el texto de usuarios conectados
						this.usersText.setText(`USUARIOS CONECTADOS: ${data}`);
	                })
	                .catch(error => console.error("Error al obtener usuarios conectados:", error));
	        }, 1000
		);
	}

    // Crear botón para abrir el chat
    createChatButton() {
        this.chatButton = this.add.image(700, 550, 'chat').setScale(0.5).setInteractive();
        this.chatButton.on('pointerdown', () => {
            this.toggleChat();
        });
    }
	
    // Crear el contenedor del chat
	createChatContainer() {
	    this.chatContainer = this.add.container(180, 180).setVisible(false);

	    // Fondo del chat
	    const chatBackground = this.add.rectangle(0, 0, 400, 300, 0x000000, 0.8).setOrigin(0);
	    this.chatContainer.add(chatBackground);

	    // Zona de mensajes
	    this.messagesText = this.add.text(10, 10, '', {
	        fontSize: '16px',
	        fill: '#fff',
	        wordWrap: { width: 380, useAdvancedWrap: true }  // Configurar wordWrap al crear el texto
	    });
	    this.chatContainer.add(this.messagesText);

	    // Input para escribir mensaje
	    this.inputBackground = this.add.rectangle(10, 260, 380, 30, 0x222222).setOrigin(0).setInteractive();
	    this.chatContainer.add(this.inputBackground);

	    this.inputText = this.add.text(15, 265, '', {
	        fontSize: '16px',
	        fill: '#fff',
	        wordWrap: { width: 360, useAdvancedWrap: true }  // También configuramos wordWrap para el texto de entrada
	    });
	    this.chatContainer.add(this.inputText);

	    // Indicador de envío en progreso
	    this.isSending = false;

	    // Detectar teclas para entrada de texto
	    this.input.keyboard.on('keydown', (event) => {
	        if (!this.chatContainer.visible) return;

	        if (event.key === 'Backspace') {
	            this.inputText.text = this.inputText.text.slice(0, -1); // Eliminar último carácter
	        } else if (event.key === 'Enter') {
	            this.sendMessage();
	        } else if (event.key.length === 1) {
	            this.inputText.text += event.key; // Agregar carácter al texto
	        }
	    });

	    // Botón para enviar mensajes (fuera del cuadro de texto)
	    this.sendButton = this.add.image(460, 265, 'enviar') // Botón fuera del cuadro
	        .setScale(0.5)
	        .setInteractive()
	        .on('pointerdown', () => this.sendMessage());
	    this.chatContainer.add(this.sendButton);
	}

    // Método para enviar un mensaje
	sendMessage() {
	    const message = this.inputText.text.trim();
	    if (!message || this.isSending) return; // Evitar enviar mensajes vacíos o duplicados

	    this.isSending = true; // Bloquear nuevos envíos mientras se procesa el actual

	    const sender = this.userName || this.userId;
	    this.inputText.text = ''; // Limpiar el inputText

	    fetch('/api/messages', {
	        method: 'POST',
	        headers: {
	            'Content-Type': 'application/json',
	        },
	        body: JSON.stringify({
	            id: Date.now(), // Generar un ID basado en el timestamp
	            sender: sender,
	            content: message,
	            timestamp: Date.now(),
	        }),
	    })
	    .then(response => {
	        if (response.ok) {
	            console.log("Mensaje enviado correctamente");
	        } else {
	            console.error("Error al enviar el mensaje");
	        }
	    })
	    .catch(error => console.error('Error al enviar el mensaje:', error))
	    .finally(() => {
	        this.isSending = false; // Desbloquear envío al completar la operación
	    });
	}

    // Mostrar el mensaje en la interfaz
	displayMessage(message) {
	       // Añadir el nuevo mensaje en la parte superior
	       let currentText = this.messagesText.text.split("\n");

	       // Si tenemos más de 10 mensajes, eliminar el más antiguo
	       if (currentText.length >= this.maxMessages) {
	           currentText.shift();  // Eliminar el mensaje más antiguo
	       }

	       // Agregar el nuevo mensaje al principio
	       currentText.push(message);
	       
	       // Actualizar el texto del contenedor
	       this.messagesText.setText(currentText.join("\n"));

	       // Desplazar el contenedor para que siempre se vea el último mensaje
	       this.chatContainer.scrollTop = this.chatContainer.scrollHeight;
	   }

    // Hacer que el chat se muestre o se oculte
	toggleChat() {
	    const isVisible = this.chatContainer.visible;
	    this.chatContainer.setVisible(!isVisible);

	    // Mostrar u ocultar el botón X según el estado del chat
	    if (this.xButton) {
	        this.xButton.setVisible(!isVisible);
	    } else if (!isVisible) {
	        this.createXButton(); // Crear el botón solo si el chat se abre y no existe
	    }
	}

    // Iniciar polling para obtener mensajes nuevos cada 1 segundo
    startPolling() {
        setInterval(() => {
            fetch(`/api/messages?lastMessageId=${this.lastMessageId}`)  // Solicitar mensajes con un ID mayor al último
                .then(response => response.json())
                .then(messages => {
                    if (messages.length > 0) {
                        this.lastMessageId = messages[messages.length - 1].id;  // Actualizar el último ID recibido
                        this.updateMessages(messages);  // Actualizar la interfaz con los nuevos mensajes
                    }
                })
                .catch(error => console.error('Error al obtener los mensajes:', error));
        }, 100);  // Polling cada 1 segundo
    }

    // Actualizar la interfaz con los nuevos mensajes
	updateMessages(messages) {
	    messages.forEach(message => {
	        // Verificar si el mensaje ya fue procesado
	        if (!this.receivedMessages.has(message.id)) {
	            this.receivedMessages.add(message.id); // Marcar el mensaje como procesado
	            const formattedMessage = `${message.sender}: ${message.content}`;
	            this.displayMessage(formattedMessage);
	        }
	    });
    }

    //CARGA DE ASSETS
    loadAssets() {
        this.load.setPath('assets/');
		this.load.image('xButton', 'X.png');
		this.load.image('logOut', 'cerrar_sesion.png');
        this.load.image('background', 'MenuBackground.png');
        this.load.image('startBtn', 'ejemplo.png');
        this.load.image('optionsBtn', 'btnOpciones.png');
        this.load.image('creditsBtn', 'btnCreditos.png'); //cambiar la imagen
        this.load.image('acceptBtn', 'btnAceptar.png');
		this.load.image('accountBtn', 'cuenta.png'); //cambiar la imagen
        this.load.image('menuBtn', 'btnMenu.png');
        this.load.image('backButton', 'btnVolver.png');
		this.load.image('btnJugar', 'btnJugar.png');
        this.load.image('metalpipe', 'metalpipe.png');
        this.load.image('interrogacion', 'interrogacion.png');
        this.load.image ('secreto', 'secreto.png');
		this.load.image('chat', 'chat.png');
		this.load.image('enviar', 'enviar.png');
        this.load.audio('mainMenuMusic', 'mainMenuMusic.ogg');
        this.load.audio('deathMusic', 'deathMusic.mp3');
        this.load.audio('click', 'click.wav');
        this.load.audio('pipe', 'metalpipe.mp3');
        this.load.audio('atleti', 'himnoatletico.mp3');
    }

    //CONFIGURACIÓN DE SONIDOS
    setupSounds() {
        this.game.click = this.sound.add('click');
        if (!this.game.mainMenuMusic) {
            this.game.mainMenuMusic = this.sound.add('mainMenuMusic', { loop: true });
            this.game.mainMenuMusic.play();
        }
    }

	createAccountBtn(){
		this.accBtn = this.add.image(90, 100, 'accountBtn').setScale(0.5).setInteractive(); //cambiar por CUENTA
		this.accBtn.on('pointerdown', () => {
			this.scene.start('AccountMenu', { "userName" : this.userName });
		 });
	}
	
    //CREACIÓN DE BOTONES
    createStartButton() {
        this.startBtn = this.add.image(400, 300, 'btnJugar').setScale(0.5).setInteractive();
        this.startBtn.on('pointerdown', () => {
			this.game.click.play(); //Reproducir sonido
			
			//this.socket.send(JSON.stringify({type: "JOIN_ROOM"}));
			
			
			this.scene.stop("MenuScene");
			this.scene.start('GameScene');
        });
    }

    createOptionsButton() {
        this.optionsBtn = this.add.image(400, 400, 'optionsBtn').setScale(0.5).setInteractive();
        this.optionsBtn.on('pointerdown', () => {
            this.game.click.play();
            this.scene.start('OptionsMenu');
        });
    }

    createCreditsButton() {
        this.creditsBtn = this.add.image(400, 500, 'creditsBtn').setScale(0.5).setInteractive();
        this.creditsBtn.on('pointerdown', () => {
            this.game.click.play();
            this.scene.start('Credits');
        });
    }
	
	createLogOutButton() {
	    this.logOutBtn = this.add.image(400, 550, 'logOut').setScale(0.5).setInteractive();
	    this.logOutBtn.on('pointerdown', () => {
	        this.game.click.play();
	        this.scene.start('UserScene');
	    });
	}
		

	createXButton() {
		 // Crear el botón solo si no existe
		 if (!this.xButton) {
		 	this.xButton = this.add.image(570, 160, 'xButton')
		    	.setScale(0.35)
		        .setInteractive();

		    this.xButton.on('pointerdown', () => {
		    	this.toggleChat(); // Ocultar el chat al presionar el botón
		    });
		}
		this.xButton.setVisible(true); // Asegurarse de que sea visible al crearlo
	}
    
    createMetalPipe() {
        this.metalpipe = this.add.image(750, 400, 'metalpipe').setScale(0.1).setInteractive();
        this.metalpipe.on('pointerdown', () => {
            this.game.pipe = this.sound.add('pipe');
           this.game.pipe.play(); 
        })
    }
    
    campeonesinvierno() {
        let primerclick=true; 
        this.interrogacion = this.add.image(750, 100, 'interrogacion').setScale(0.2).setInteractive();
            this.interrogacion.on('pointerdown', () => {
                if (primerclick==true) {
                    this.secreto = this.add.image(400, 400, 'secreto').setScale(1);
                    this.game.atleti = this.sound.add('atleti');
                    this.game.atleti.play();
                    primerclick=false;
                } else {
                        this.secreto.setScale(0);
                        this.interrogacion.setScale(0);
                        this.game.atleti.setVolume(0);
            } 
            })
        }

    //CONFIGURACIÓN DE BOTONES
    buttonAnims(){
        [this.startBtn, this.optionsBtn, this.creditsBtn, this.accBtn, this.chatButton].forEach(button => {
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