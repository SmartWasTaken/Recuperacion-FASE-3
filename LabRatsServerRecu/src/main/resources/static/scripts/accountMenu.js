class AccountMenu extends Phaser.Scene {
	userName;
	constructor() {
	       super({key: "AccountMenu"});
		   
	   }
	   
	   init(data){
		this.userName = data.userName;
	   }
	   
	   preload(){
		this.load.setPath('assets/');
		this.load.image('background', 'MenuBackground.png');
		this.load.image('backBtn', 'btnVolver.png');
		this.load.image('deleteBtn', 'eliminar.png'); //cambiar por borrar
		this.load.image('logOut', 'cerrar_sesion.png');
		
	   }
	   
	   create(){
		this.add.image(400, 300, 'background');
		
		this.createBackBtn();
		this.createConnectedUsersDisplay();
		this.updateConnectedUsers();
		this.createDeleteButton();
		this.createLogOutButton();
		this.createConnectionIndicator();
		this.connectedUser();
		
		this.buttonAnims();
	   }
	   
	   createLogOutButton() {
	       this.logOutBtn = this.add.image(400, 480, 'logOut').setScale(0.5).setInteractive();
	       this.logOutBtn.on('pointerdown', async () => {
	           this.game.click.play();
	           
	           // Llamar al endpoint de desconexión
	           const playerName = this.userName; // Asegúrate de tener el nombre del jugador almacenado
	           try {
	               const response = await fetch('/user/disconnect', {
	                   method: 'POST',
	                   headers: {
	                       'Content-Type': 'application/x-www-form-urlencoded',
	                   },
	                   body: new URLSearchParams({ playerName }),
	               });

	               if (response.ok) {
	                   console.log("Jugador desconectado exitosamente del servidor.");
	                   this.scene.start('UserScene', {"userName" : this.userName}); // Cambiar a la escena de inicio
	               } else {
	                   console.error("Error al desconectar al jugador del servidor.");
	               }
	           } catch (err) {
	               console.error("Error al realizar la solicitud de desconexión:", err);
	           }
	       });
	   }

	   
	   createBackBtn(){
		this.backBtn = this.add.image(700, 550, 'backBtn').setScale(0.5).setInteractive();
		this.backBtn.on('pointerdown', () => {
			this.game.click.play();
			this.scene.stop('AccountMenu');
			this.scene.start('MenuScene');
		});
	   }
	   
	   createDeleteButton(){
		this.deleteBtn = this.add.image(400, 550, 'deleteBtn').setScale(0.5).setInteractive();
		this.deleteBtn.on('pointerdown', async () => {
			// Obtener el nombre y contraseña del usuario de sessionStorage
			        const playerName = sessionStorage.getItem('userName');
			        const password = sessionStorage.getItem('userPassword');
			        if (!playerName || !password) {
			            console.error("No se encontró información del usuario en sessionStorage.");
			            return;
			        }

			        try {
			            // Llamar al endpoint DELETE para eliminar al usuario
			            const response = await fetch('/user/delete', {
			                method: 'DELETE',
			                headers: {
			                    'Content-Type': 'application/x-www-form-urlencoded',
			                },
			                body: new URLSearchParams({ name: playerName, password }),
			            });

			            if (response.ok) {
			                console.log("Usuario eliminado exitosamente del servidor.");

			                // Limpiar el sessionStorage
			                sessionStorage.removeItem('userName');
			                sessionStorage.removeItem('userPassword');

			                // Cambiar a la escena inicial
			                this.scene.start('UserScene');
			            } else if (response.status === 404) {
			                console.error("El usuario no existe o ya fue eliminado.");
			            } else {
			                console.error("Error al intentar eliminar el usuario.");
			            }
			        } catch (err) {
			            console.error("Error al realizar la solicitud de eliminación:", err);
			        }
		});
		
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
	   
			connectedUser() {
			    // Mostrar texto de 'USUARIO:'
			    this.add.text(310, 250, 'USUARIO:', {
			        fontSize: '32px',
			        fill: '#000',
			    });

			    // Mostrar el nombre del usuario al lado del texto
				this.add.text(350, 280, `"${this.userName}"`, {
				        fontSize: '32px',
				        fill: '#000',
				    });
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
	           }, 50); // 50 milisegundos
	       }
		   
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
		   		        }, 10000);  // Verificar cada 500 milisegundos
		   		    }	
	   
	   buttonAnims(){
	           [this.backBtn, this.logOutBtn, this.deleteBtn].forEach(button => {
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