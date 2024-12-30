package com.example.demo;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;

//controlador REST
@RestController
@RequestMapping("/api/game")
public class HandMovementController {

    //clase interna para representar los datos enviados en la solicitud
    public static class HandMovementRequest {
        private String playerId;
        private int direction; // -1 = izquierda, 0 = medio, 1 = derecha
        private String timestamp;

        // Getters y Setters
        public String getPlayerId() { return playerId; }
        public void setPlayerId(String playerId) { this.playerId = playerId; }

        public int getDirection() { return direction; }
        public void setDirection(int direction) { this.direction = direction; }

        public String getTimestamp() { return timestamp; }
        public void setTimestamp(String timestamp) { this.timestamp = timestamp; }
    }

    //endpoint POST para recibir los movimientos
    @PostMapping("/hand-movement")
    public ResponseEntity<String> handleHandMovement(@RequestBody HandMovementRequest request) {
        //validación básica
        if (request.getPlayerId() == null || request.getTimestamp() == null) {
            return new ResponseEntity<>("Datos incompletos", HttpStatus.BAD_REQUEST);
        }

        //log en la consola del servidor
        System.out.println("Movimiento recibido:");
        System.out.println("Player ID: " + request.getPlayerId());
        System.out.println("Dirección: " + request.getDirection() + " (Izquierda: -1, Centro: 0, Derecha: 1)");
        System.out.println("Timestamp: " + request.getTimestamp());

        //respuesta exitosa
        return new ResponseEntity<>("Movimiento registrado correctamente", HttpStatus.OK);
    }
}
