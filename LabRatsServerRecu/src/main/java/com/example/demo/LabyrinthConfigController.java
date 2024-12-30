package com.example.demo;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

//controlador REST
@RestController
@RequestMapping("/api/game")
public class LabyrinthConfigController {

    //clase interna para representar las paredes del laberinto
    public static class Wall {
        private double x;
        private double y;
        private String type;

        public Wall(double x, double y, String type) {
            this.x = x;
            this.y = y;
            this.type = type;
        }
        
        //getters y Setters
        public double getX() { return x; }
        public void setX(double x) { this.x = x; }

        public double getY() { return y; }
        public void setY(double y) { this.y = y; }

        public String getType() { return type; }
        public void setType(String type) { this.type = type; }
    }

    //clase para representar la configuración del laberinto
    public static class LabyrinthConfig {
        private List<Wall> walls;

        public LabyrinthConfig() {
            this.walls = new ArrayList<>();
        }

        public List<Wall> getWalls() { return walls; }
        public void setWalls(List<Wall> walls) { this.walls = walls; }

        //agregar una pared
        public void addWall(Wall wall) {
            this.walls.add(wall);
        }
    }

    @GetMapping("/labyrinth-config")
    public ResponseEntity<LabyrinthConfig> getLabyrinthConfig() {
        LabyrinthConfig config = new LabyrinthConfig();
        
        //agregar todas las paredes del laberinto al objeto
        addWalls(config);
        
        return new ResponseEntity<>(config, HttpStatus.OK);
    }

    private void addWalls(LabyrinthConfig config) {
        //paredes exteriores
        config.addWall(new Wall(400, 7.5, "top"));
        config.addWall(new Wall(6, 220, "left"));
        config.addWall(new Wall(792, 220, "right"));
        config.addWall(new Wall(400, 442, "bot"));
        config.addWall(new Wall(6, 665, "right"));
        config.addWall(new Wall(792, 665, "right"));

        //paredes del laberinto
        config.addWall(new Wall(30, 115, "horizontal"));
        config.addWall(new Wall(60, 60, "vertical"));
        
        config.addWall(new Wall(30, 170, "horizontal"));
        config.addWall(new Wall(60, 180, "vertical"));
        config.addWall(new Wall(60, 210, "vertical"));
        config.addWall(new Wall(60, 230, "vertical"));
        config.addWall(new Wall(60, 300, "vertical"));
        config.addWall(new Wall(60, 330, "vertical"));
        config.addWall(new Wall(60, 360, "vertical"));
        config.addWall(new Wall(60, 390, "vertical"));
        config.addWall(new Wall(60, 420, "vertical"));
        
        config.addWall(new Wall(75, 50, "horizontal"));
        config.addWall(new Wall(100, 50, "horizontal"));
        
        config.addWall(new Wall(75, 280, "horizontal"));
        config.addWall(new Wall(85, 280, "horizontal"));
        
        config.addWall(new Wall(110, 120, "vertical"));
        config.addWall(new Wall(110, 150, "vertical"));
        config.addWall(new Wall(110, 180, "vertical"));
        config.addWall(new Wall(110, 210, "vertical"));
        config.addWall(new Wall(110, 240, "vertical"));
        config.addWall(new Wall(110, 270, "vertical"));
        
        config.addWall(new Wall(110, 330, "vertical"));
        config.addWall(new Wall(110, 360, "vertical"));
        
        config.addWall(new Wall(100, 50, "horizontal"));
        config.addWall(new Wall(130, 50, "horizontal"));
        
        config.addWall(new Wall(135, 110, "horizontal"));
        config.addWall(new Wall(170, 110, "horizontal"));
        config.addWall(new Wall(200, 110, "horizontal"));
        config.addWall(new Wall(230, 110, "horizontal"));
        
        config.addWall(new Wall(320, 110, "horizontal"));
        config.addWall(new Wall(350, 110, "horizontal"));
        config.addWall(new Wall(380, 110, "horizontal"));
        config.addWall(new Wall(410, 110, "horizontal"));
        config.addWall(new Wall(440, 110, "horizontal"));
        config.addWall(new Wall(470, 110, "horizontal"));
        config.addWall(new Wall(500, 110, "horizontal"));
        config.addWall(new Wall(530, 110, "horizontal"));
        config.addWall(new Wall(560, 110, "horizontal"));
        config.addWall(new Wall(590, 110, "horizontal"));
        
        config.addWall(new Wall(380, 160, "horizontal"));
        config.addWall(new Wall(410, 160, "horizontal"));
        config.addWall(new Wall(440, 160, "horizontal"));
        config.addWall(new Wall(470, 160, "horizontal"));
        config.addWall(new Wall(500, 160, "horizontal"));
        config.addWall(new Wall(530, 160, "horizontal"));
        config.addWall(new Wall(560, 160, "horizontal"));
        config.addWall(new Wall(590, 160, "horizontal"));
        
        config.addWall(new Wall(135, 170, "horizontal"));
        config.addWall(new Wall(210, 170, "horizontal"));
        config.addWall(new Wall(235, 170, "horizontal"));
        config.addWall(new Wall(235, 170, "horizontal"));
        
        config.addWall(new Wall(135, 370, "horizontal"));
        
        config.addWall(new Wall(145, 30, "vertical"));
        
        config.addWall(new Wall(155, 240, "vertical"));
        config.addWall(new Wall(155, 270, "vertical"));
        config.addWall(new Wall(155, 300, "vertical"));
        
        config.addWall(new Wall(175, 110, "horizontal"));
        config.addWall(new Wall(175, 170, "horizontal"));
        config.addWall(new Wall(175, 230, "horizontal"));
        
        config.addWall(new Wall(175, 320, "horizontal"));
        config.addWall(new Wall(200, 320, "horizontal"));
        config.addWall(new Wall(230, 320, "horizontal"));
        config.addWall(new Wall(260, 320, "horizontal"));
        config.addWall(new Wall(290, 320, "horizontal"));
        config.addWall(new Wall(320, 320, "horizontal"));
        config.addWall(new Wall(350, 320, "horizontal"));
        
        config.addWall(new Wall(175, 370, "horizontal"));
        config.addWall(new Wall(200, 370, "horizontal"));
        config.addWall(new Wall(230, 370, "horizontal"));
        config.addWall(new Wall(260, 370, "horizontal"));
        
        config.addWall(new Wall(200, 240, "vertical"));
        config.addWall(new Wall(200, 270, "vertical"));

        config.addWall(new Wall(260, 180, "vertical"));
        config.addWall(new Wall(260, 210, "vertical"));
        config.addWall(new Wall(260, 240, "vertical"));
        config.addWall(new Wall(260, 270, "vertical"));
        
        config.addWall(new Wall(275, 390, "vertical"));
        config.addWall(new Wall(275, 420, "vertical"));
        
        config.addWall(new Wall(365, 340, "vertical"));
        config.addWall(new Wall(365, 370, "vertical"));
        config.addWall(new Wall(365, 400, "vertical"));
        config.addWall(new Wall(365, 420, "vertical"));

        config.addWall(new Wall(230, 50, "horizontal"));
        config.addWall(new Wall(260, 50, "horizontal"));
        config.addWall(new Wall(290, 50, "horizontal"));
        config.addWall(new Wall(320, 50, "horizontal"));
        config.addWall(new Wall(350, 50, "horizontal"));
        config.addWall(new Wall(370, 50, "horizontal"));
        config.addWall(new Wall(400, 50, "horizontal"));
        config.addWall(new Wall(430, 50, "horizontal"));
        config.addWall(new Wall(460, 50, "horizontal"));
        config.addWall(new Wall(490, 50, "horizontal"));
        config.addWall(new Wall(520, 50, "horizontal"));
        config.addWall(new Wall(550, 50, "horizontal"));
        config.addWall(new Wall(580, 50, "horizontal"));
        config.addWall(new Wall(610, 50, "horizontal"));
        config.addWall(new Wall(640, 50, "horizontal"));
        config.addWall(new Wall(670, 50, "horizontal"));
        config.addWall(new Wall(670, 50, "horizontal"));

        config.addWall(new Wall(700, 75, "vertical"));
        config.addWall(new Wall(700, 100, "vertical"));
        config.addWall(new Wall(700, 130, "vertical"));
        config.addWall(new Wall(700, 160, "vertical"));
        config.addWall(new Wall(700, 190, "vertical"));
        config.addWall(new Wall(700, 220, "vertical"));
        config.addWall(new Wall(700, 250, "vertical"));
        
        config.addWall(new Wall(700, 350, "vertical"));
        config.addWall(new Wall(700, 380, "vertical"));

        config.addWall(new Wall(675, 390, "horizontal"));
        config.addWall(new Wall(650, 390, "horizontal"));
        config.addWall(new Wall(625, 390, "horizontal"));
        config.addWall(new Wall(600, 390, "horizontal"));
        config.addWall(new Wall(575, 390, "horizontal"));
        config.addWall(new Wall(550, 390, "horizontal"));
        config.addWall(new Wall(525, 390, "horizontal"));
        config.addWall(new Wall(500, 390, "horizontal"));
        config.addWall(new Wall(475, 390, "horizontal"));
        config.addWall(new Wall(450, 390, "horizontal"));
        config.addWall(new Wall(425, 390, "horizontal"));
        config.addWall(new Wall(400, 390, "horizontal"));
        config.addWall(new Wall(390, 390, "horizontal"));

        config.addWall(new Wall(465, 220, "horizontal"));
        config.addWall(new Wall(495, 220, "horizontal"));
        config.addWall(new Wall(525, 220, "horizontal"));
        config.addWall(new Wall(555, 220, "horizontal"));
        config.addWall(new Wall(585, 220, "horizontal"));
        config.addWall(new Wall(615, 220, "horizontal"));
        config.addWall(new Wall(645, 220, "horizontal"));
        config.addWall(new Wall(675, 220, "horizontal"));

        config.addWall(new Wall(640, 240, "vertical"));
        config.addWall(new Wall(640, 270, "vertical"));
        config.addWall(new Wall(640, 300, "vertical"));
        config.addWall(new Wall(640, 310, "vertical"));

        config.addWall(new Wall(550, 320, "horizontal"));
        config.addWall(new Wall(580, 320, "horizontal"));
        config.addWall(new Wall(610, 320, "horizontal"));
        config.addWall(new Wall(550, 270, "horizontal"));

        config.addWall(new Wall(530, 300, "vertical"));
        config.addWall(new Wall(530, 280, "vertical"));
        
        config.addWall(new Wall(450, 320, "vertical"));
        config.addWall(new Wall(450, 300, "vertical"));

        config.addWall(new Wall(430, 280, "horizontal"));
        config.addWall(new Wall(400, 280, "horizontal"));
        config.addWall(new Wall(370, 280, "horizontal"));
        config.addWall(new Wall(340, 280, "horizontal"));
        config.addWall(new Wall(310, 280, "horizontal"));
        config.addWall(new Wall(280, 280, "horizontal"));
        
        config.addWall(new Wall(355, 170, "vertical"));
        config.addWall(new Wall(355, 200, "vertical"));
        config.addWall(new Wall(355, 230, "vertical"));
        config.addWall(new Wall(355, 260, "vertical"));

        config.addWall(new Wall(605, 140, "vertical"));
        config.addWall(new Wall(605, 130, "vertical"));
    }
}
