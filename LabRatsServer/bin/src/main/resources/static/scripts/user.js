
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
        this.form.action = 'http://127.0.0.1:8080/user';  // URL a la que se envia el formulario
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
            //estilo
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
            //estilo
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


        // Botón inicio de sesión
        
        let submitButton = document.createElement('button');
        submitButton.type = 'submit';
        submitButton.innerText = 'Iniciar sesión';
            // estilo
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

            
            this.form.appendChild(user);
            this.form.appendChild(password);
            this.form.appendChild(submitButton);

            
            document.body.appendChild(this.form);

            
            this.form.onsubmit = (event) => {
                event.preventDefault();  
                console.log('Has iniciado sesión');
                this.form.style.display = 'none';
                this.scene.start('MenuScene');
				$.ajax({
					method: "POST",
					url: "http://localhost:8080/user",
					data: "user: " + document.getElementById("userID").value + ", pasword: " + document.getElementById("passwordID").value,
				}).done(function() {
					console.log("WORKED")
				})
            };
        }
    
}