
class UserScene extends Phaser.Scene {
    constructor() {
        super({ key: "UserScene" });
    }

    preload() {
        this.load.setPath('assets/');
        this.load.image('background', 'MenuBackground.png');
        this.load.audio('mainMenuMusic', 'mainMenuMusic.ogg');
        this.load.audio('click', 'click.wav');
    }

    create() {
        
        this.add.image(400, 300, 'background');

        
        this.game.click = this.sound.add('click');
        
        this.SignUp();
    }

    SignUp() {

        // Crear el formulario
        this.form = document.createElement('form');
        this.form.action = '/user';  // URL a la que se envia el formulario
        this.form.method = 'POST';
        this.form.style.position = 'absolute';
        this.form.style.top = '40%';  // Posición vertical 
        this.form.style.left = '50%'; // Posición horizontal
        this.form.style.transform = 'translateX(-50%)'; // Centrado horizontal
        this.form.style.zIndex = '10';  // posicion z
        this.form.style.display = 'block';

        // Usuario
        let user = document.createElement('input');
        user.type = 'text';  // Entrada para texto
        user.id = "userID";
        user.name = 'username';
        user.placeholder = 'Introduce el nombre de usuario';
        user.value = '';
        user.style.width = '300px';
        user.style.height = '40px';
        user.style.marginBottom = '15px';
        user.style.padding = '10px';
        user.style.backgroundColor = '#d5d3b3';  // Color de fondo
        user.style.color = 'black';

        // Contraseña
        let password = document.createElement('input');
        password.type = 'password';  // Entrada para contraseña
        password.id = "passwordID";
        password.name = 'password';
        password.placeholder = 'Introduce la contraseña';
        password.value = '';
        password.style.width = '300px';
        password.style.height = '40px';
        password.style.padding = '10px';
        password.style.position = 'absolute';
        password.style.left = '50%';
        password.style.top = '100px';
        password.style.transform = 'translateX(-50%)';
        password.style.marginTop = '10px';
        password.style.backgroundColor = '#d5d3b3';  // Color de fondo
        password.style.color = 'black';

        // Botón de registro
        let submitButton = document.createElement('button');
        submitButton.type = 'submit';
        submitButton.id = 'submitID';
        submitButton.innerText = 'Registrarse';
        submitButton.style.width = '320px';
        submitButton.style.height = '50px';
        submitButton.style.fontSize = '18px';
        submitButton.style.cursor = 'pointer';
        submitButton.style.marginTop = '20px';
        submitButton.style.backgroundColor = '#686653';
        submitButton.style.color = 'white';
        submitButton.style.border = 'none';
        submitButton.style.borderRadius = '5px';
        submitButton.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.2)';
        submitButton.style.position = 'absolute';
        submitButton.style.left = '50%';
        submitButton.style.top = '180px';
        submitButton.style.transform = 'translateX(-50%)';

        // Botón de inicio de sesion
        let signButton = document.createElement('button');
        signButton.id = 'signID';
        signButton.type = 'submit';
        signButton.innerText = 'Iniciar Sesión';
        signButton.style.width = '320px';
        signButton.style.height = '50px';
        signButton.style.fontSize = '18px';
        signButton.style.cursor = 'pointer';
        signButton.style.marginTop = '20px';
        signButton.style.backgroundColor = '#686653';
        signButton.style.color = 'white';
        signButton.style.border = 'none';
        signButton.style.borderRadius = '5px';
        signButton.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.2)';
        signButton.style.position = 'absolute';
        signButton.style.left = '50%';
        signButton.style.top = '240px';
        signButton.style.transform = 'translateX(-50%)';

        this.form.appendChild(user);
        this.form.appendChild(password);
        this.form.appendChild(submitButton);
        this.form.appendChild(signButton);
        document.body.appendChild(this.form);

        // Añadir indicador de conexión
        //let connectionIndicator = document.createElement('div');
        //connectionIndicator.id = 'connection-indicator';
        //connectionIndicator.style.width = '20px';
        //connectionIndicator.style.height = '20px';
        //connectionIndicator.style.backgroundColor = 'red'; // Estado inicial (desconectado)
        //document.body.appendChild(connectionIndicator);

        // Manejar el submit del formulario
        document.body.addEventListener("click", event => {
            if(event.target.id === 'submitID') {
                event.preventDefault();
                console.log('Te has registrado');

                // Crear objeto JSON con los datos del usuario
                const userData = {
                    name: document.getElementById("userID").value,
                    password: document.getElementById("passwordID").value
                };

                console.log("Información a enviar:", JSON.stringify(userData));

                // Guardamos una referencia al contexto del formulario
                const self = this;
                // Realizar la petición POST usando AJAX con jQuery
                $.ajax({
                    method: "POST",
                    url: "/user",  // La ruta que maneja el registro y la conexión
                    contentType: "application/json",  // Especifica que el contenido es JSON
                    data: JSON.stringify(userData),  // Convierte el objeto JS a JSON
                    success: function(response) {
                        console.log("Respuesta del servidor:", response);

                        // Si la respuesta indica que el jugador se conectó correctamente
                        if (response === "User created and connected successfully") {
							
							// Guardar el nombre del usuario en sessionStorage
							sessionStorage.setItem('userName', userData.name);
                            // Cambiar la escena a MenuScene solo si se creó el usuario
                            console.log("Usuario creado, cambiando a la escena de menú...");
                            self.form.style.display = 'none';
                            self.scene.start('MenuScene');
                        }
                    },
                    error: function(xhr, status, error) {
                        if (xhr.status === 409) {
                            // Si el servidor responde con un código de conflicto (usuario ya existe)
                            console.log("El usuario ya existe, prueba a iniciar sesión.");

                            // Mostrar mensaje de error en la interfaz (por encima del cuadro de texto del nombre de usuario)
                            const errorMessage = document.createElement('div');
                            errorMessage.textContent = "El usuario que has intentado registrar ya existe, prueba a iniciar sesión con las mismas credenciales.";
                            errorMessage.style.color = 'black';  // Cambiar color a negro
                            errorMessage.style.fontSize = '12px';  // Ajustar el tamaño de fuente (opcional)
                            errorMessage.style.marginBottom = '10px'; // Espaciado para que no esté pegado al cuadro del usuario

                            // Colocar el mensaje de error justo encima del cuadro de texto del nombre de usuario
                            const userInput = document.getElementById('userID');
                            userInput.parentNode.insertBefore(errorMessage, userInput);  // Insertamos el mensaje antes del cuadro de texto del usuario

                            // Asegurarse de que no se cambie la escena
                            // No hacemos nada más, permanecemos en la misma pantalla
                        } else {
                            console.error("Error al enviar los datos:", xhr.responseText);
                        }
                    }
                });
            };
            
            if(event.target.id === 'signID'){
                event.preventDefault();
                console.log('Te has registrado');

                // Crear objeto JSON con los datos del usuario
                const userData = {
                    name: document.getElementById("userID").value,
                    password: document.getElementById("passwordID").value
                };

                console.log("Información a enviar:", JSON.stringify(userData));

                // Guardamos una referencia al contexto del formulario
                const self = this;
                
                $.ajax({
                    method: "GET",
                    url: "/user/signin",
                    contentType: "application/json",  // Especifica que el contenido es JSON
                    data: {name: document.getElementById("userID").value,
                        password: document.getElementById("passwordID").value},  // Convierte el objeto JS a JSON
                    success: function(response) {
                        console.log("Respuesta del servidor:", response);
						
						// Guardar el nombre del usuario en sessionStorage
						sessionStorage.setItem('userName', userData.name);
                        // Cambiar la escena a MenuScene solo si se creó el usuario
                        console.log("Usuario iniciado, cambiando a la escena de menú...");
                        self.form.style.display = 'none';
                        self.scene.start('MenuScene');
                    }
                }).error(function(xhr, status, error) {
                    if (xhr.status === 404) {
                        console.log("El usuario al que estás intentando acceder no existe");
                        // Mostrar mensaje de error en la interfaz (por encima del cuadro de texto del nombre de usuario)
                        const errorMessage = document.createElement('div');
                        errorMessage.textContent = "El usuario que has intentado acceder no existe, prueba a registrarte con las mismas credenciales.";
                        errorMessage.style.color = 'black';  // Cambiar color a negro
                        errorMessage.style.fontSize = '12px';  // Ajustar el tamaño de fuente (opcional)
                        errorMessage.style.marginBottom = '10px'; // Espaciado para que no esté pegado al cuadro del usuario

                        // Colocar el mensaje de error justo encima del cuadro de texto del nombre de usuario
                        const userInput = document.getElementById('userID');
                        userInput.parentNode.insertBefore(errorMessage, userInput);  // Insertamos el mensaje antes del cuadro de texto del usuario
                    }
                })
            }
            });
            
        };
}

