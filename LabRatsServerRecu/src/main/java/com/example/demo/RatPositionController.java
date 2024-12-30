package com.example.demo;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/game")
public class RatPositionController {

    //Mapa para almacenar las posiciones de los jugadores
    private Map<String, PlayerPosition> playerPositions = new HashMap<>();

    //endpoint para actualizar la posición de un jugador
    @PutMapping("/player-position")
    public ResponseEntity<String> updatePlayerPosition(@RequestBody PlayerPosition position) {
        //validar que la posición sea válida
        if (position.getPlayerId() == null || position.getPlayerId().isEmpty()) {
            return new ResponseEntity<>("El playerId es obligatorio", HttpStatus.BAD_REQUEST);
        }
        if (position.getX() == 0 || position.getY() == 0) {
            return new ResponseEntity<>("Las coordenadas X e Y no pueden ser cero", HttpStatus.BAD_REQUEST);
        }
        if (position.getTimestamp() == null || position.getTimestamp().isEmpty()) {
            return new ResponseEntity<>("El timestamp es obligatorio", HttpStatus.BAD_REQUEST);
        }

        //actualizar la posición del jugador
        playerPositions.put(position.getPlayerId(), position);

        //confirmar que la posición se ha actualizado
        return new ResponseEntity<>("Posición actualizada con éxito", HttpStatus.OK);
    }

    //endpoint para obtener la posición de un jugador
    @GetMapping("/player-position/{playerId}")
    public ResponseEntity<PlayerPosition> getPlayerPosition(@PathVariable String playerId) {
        PlayerPosition position = playerPositions.get(playerId);
        if (position == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(position, HttpStatus.OK);
    }
}

