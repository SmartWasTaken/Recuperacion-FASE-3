package com.example.demo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
//
@RestController
@RequestMapping("/user")
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping
    public ResponseEntity<User> getUser(@RequestParam String name, @RequestParam String password) {
        User user = userService.getUser(name, password);
        return (user != null) ? ResponseEntity.ok(user) : ResponseEntity.notFound().build();
    }
    
    @GetMapping("/signin")
    public ResponseEntity<User> getUserSigned(@RequestParam String name, @RequestParam String password) {
        User user = userService.getUser(name, password);
        userService.connectPlayer(user.getName());
        return (user != null) ? ResponseEntity.ok(user) : ResponseEntity.notFound().build();
    }
    
    @GetMapping("/check-server-status")
    public ResponseEntity<String> checkServerStatus() {
        try {
            return ResponseEntity.ok("Servidor activo");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error al verificar el estado del servidor");
        }
    }

    @PostMapping
    public ResponseEntity<String> createUser(@RequestBody User newUser) {
        try {
            // Registrar al usuario
            boolean userCreated = userService.addUser(newUser);
            if (!userCreated) {
                return ResponseEntity.status(HttpStatus.CONFLICT).body("User already exists");
            }

            // Conectar al jugador después de crear el usuario
            boolean connectionStatus = userService.connectPlayer(newUser.getName());
            if (connectionStatus) {
                return ResponseEntity.status(HttpStatus.CREATED).body("User created and connected successfully");
            } else {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Error connecting the player");
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error while processing the request");
        }
    }
    
    @PostMapping("/login")
    public ResponseEntity<String> loginUser(@RequestBody User loginUser) {
        try {
            // Verificar si el usuario existe con el nombre y contraseña proporcionados
            User existingUser = userService.getUser(loginUser.getName(), loginUser.getPassword());
            
            if (existingUser != null) {
                // El usuario existe, iniciar sesión (se podría marcar como conectado, por ejemplo)
                boolean connectionStatus = userService.connectPlayer(existingUser.getName());
                if (connectionStatus) {
                    return ResponseEntity.ok("User logged in successfully");
                } else {
                    return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Error connecting the player");
                }
            } else {
                // El usuario no existe o la contraseña es incorrecta
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials");
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error while processing the request");
        }
    }


    @PutMapping
    public ResponseEntity<String> updateUser(@RequestParam String oldName, @RequestParam String oldPass,
                                             @RequestBody User updatedUser) {
        if (userService.updateUser(oldName, oldPass, updatedUser)) {
            return ResponseEntity.ok("User updated successfully");
        }
        return ResponseEntity.notFound().build();
    }

    @DeleteMapping
    public ResponseEntity<String> deleteUser(@RequestParam String name, @RequestParam String password) {
        if (userService.deleteUser(name, password)) {
            return ResponseEntity.ok("User deleted successfully");
        }
        return ResponseEntity.notFound().build();
    }

    // Nuevas rutas para gestionar conexiones
    @PostMapping("/connect")
    public ResponseEntity<String> connectPlayer(@RequestParam String playerName) {
        if (userService.connectPlayer(playerName)) {
            return ResponseEntity.ok("Jugador conectado");
        }
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Error al conectar jugador");
    }

    @PostMapping("/disconnect")
    public ResponseEntity<String> disconnectPlayer(@RequestParam String playerName) {
        if (userService.disconnectPlayer(playerName)) {
            return ResponseEntity.ok("Jugador desconectado");
        }
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Error al desconectar jugador");
    }

    @GetMapping("/connection-status/{playerName}")
    public ResponseEntity<Boolean> getPlayerConnectionStatus(@PathVariable String playerName) {
        Boolean isConnected = userService.getPlayerConnectionStatus(playerName);
        if (isConnected != null) {
            return ResponseEntity.ok(isConnected);
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
    }
    
    @GetMapping("/connected-users")
    public ResponseEntity<Integer> getConnectedUsers() {
    	return new ResponseEntity<Integer>(userService.getConnectedPlayersAmmount(), HttpStatus.OK);
    }
    
    @PostMapping("/heartbeat")
    public ResponseEntity<String> heartbeat(@RequestParam String userId) {
        System.out.println("Heartbeat recibido de: " + userId); // Log en la consola del servidor
        userService.updateUserHeartbeat(userId);
        return ResponseEntity.ok("Heartbeat recibido");
    }
}
