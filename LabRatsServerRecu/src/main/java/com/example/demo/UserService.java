package com.example.demo;

import org.springframework.stereotype.Service;

import jakarta.annotation.PostConstruct;

import java.io.*;
import java.time.Instant;
import java.util.*;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.Executors;
import java.util.concurrent.ScheduledExecutorService;
import java.util.concurrent.TimeUnit;
import java.util.stream.Collectors;

@Service
public class UserService {

    private static final String FILE_NAME = "UserList.txt";
    //private static final String CONNECTIONS_FILE = "connections.txt";

    private Map<String, Instant> connectedUsers = new ConcurrentHashMap<>();
    private List<User> userList = new ArrayList<>(); // Simulamos la base de datos en memoria
    private Map<String, Boolean> playerConnections = new HashMap<>(); // Mapa para gestionar el estado de conexión de los jugadores
    private String currentUser;

    // Cargar usuarios desde el archivo al iniciar el servidor
    @PostConstruct
    private void setFromFile() {
    	userList.clear();
        try (BufferedReader reader = new BufferedReader(new FileReader(FILE_NAME))) {
            String line;
            while ((line = reader.readLine()) != null) {
                String[] userParts = line.split(",");
                if (userParts.length == 2) {
                    userList.add(new User(userParts[0], userParts[1]));
                }
            }
            System.out.println("Usuarios cargados desde " + FILE_NAME);
        } catch (FileNotFoundException e) {
            System.out.println(FILE_NAME + " no encontrado. Se creará uno nuevo al guardar usuarios.");
        } catch (IOException e) {
            e.printStackTrace();
        }

        // Iniciar limpieza de usuarios inactivos
        startCleanupTask();
    }

 // Método para obtener el usuario conectado
    public String getCurrentUser() {
        return currentUser;
    }

    // Método para establecer el usuario conectado
    public void setCurrentUser(String userName) {
        this.currentUser = userName;
    }
    
    // Guardar usuarios en el archivo
    private void saveUsersToFile() {
        try (BufferedWriter writer = new BufferedWriter(new FileWriter(FILE_NAME))) {
            for (User user : userList) {
                writer.write(user.getName() + "," + user.getPassword());
                writer.newLine();
            }
            System.out.println("Usuarios guardados en " + FILE_NAME);
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
    
    // Obtener todos los usuarios
    public List<User> getAllUsers() {
        return userList;
    }

    // Obtener un usuario por nombre y contraseña
    public User getUser(String name, String password) {
        return userList.stream()
            .filter(user -> user.getName().equals(name) && user.getPassword().equals(password))
            .findFirst()
            .orElse(null);
    }

    // Agregar un nuevo usuario
    public boolean addUser(User newUser) {
        // Verificar si el usuario ya existe en userList
        if (getUser(newUser.getName(), newUser.getPassword()) == null) {
            // Asegurarnos de que no hay residuos en playerConnections
            playerConnections.remove(newUser.getName());
            
            // Agregar el nuevo usuario
            userList.add(newUser);
            saveUsersToFile();
            return true;
        }
        return false; // El usuario ya existe
    }


    // Actualizar un usuario
    public boolean updateUser(String oldName, String oldPass, User updatedUser) {
        User existingUser = getUser(oldName, oldPass);
        if (existingUser != null) {
            existingUser.setName(updatedUser.getName());
            existingUser.setPassword(updatedUser.getPassword());
            saveUsersToFile();
            return true;
        }
        return false;
    }

    // Eliminar un usuario
    public boolean deleteUser(String name, String password) {
        boolean removed = userList.removeIf(user -> user.getName().equals(name) && user.getPassword().equals(password));
        if (removed) {
            saveUsersToFile(); // Sobrescribe el archivo después de eliminar
            setFromFile();
            connectedUsers.remove(name); // Elimina también de los usuarios conectados
            playerConnections.remove(name); // Limpia las conexiones de jugadores
            System.out.println("Usuario eliminado: " + name);
        } else {
            System.out.println("Usuario no encontrado para eliminar: " + name);
        }
        return removed;
    }
    // Conectar un jugador (marcar como conectado)
    public boolean connectPlayer(String playerId) {
        // Validar que el jugador exista en userList
        boolean userExists = userList.stream()
                                     .anyMatch(user -> user.getName().equals(playerId));
        if (!userExists) {
            System.out.println("El jugador no existe: " + playerId);
            return false; // No se puede conectar un jugador inexistente
        }

        // Verificar si ya está conectado
        if (playerConnections.containsKey(playerId)) {
            return false; // El jugador ya está conectado
        }

        // Marcar como conectado
        playerConnections.put(playerId, true);
        return true;
    }
    
    // Desconectar un jugador (marcar como desconectado)
    public boolean disconnectPlayer(String playerId) {
        if (!playerConnections.containsKey(playerId)) {
            return false; // El jugador no está conectado
        }
        playerConnections.put(playerId, false);
        //saveConnectionsToFile();
        return true;
    }

    // Obtener el estado de conexión de un jugador
    public Boolean getPlayerConnectionStatus(String playerId) {
        return playerConnections.get(playerId);
    }

    // Obtener cuántos usuarios están conectados simultáneamente
    public int getConnectedPlayersAmmount() {
    	return (int) playerConnections.values().stream().filter(Boolean::booleanValue).count();
    }

    // Actualizar el tiempo de actividad del usuario
    public void updateUserHeartbeat(String userId) {
        connectedUsers.put(userId, Instant.now());
    }

    // Eliminar usuarios inactivos (timeout: 30 segundos)
    private void removeInactiveUsers() {
        Instant now = Instant.now();
        connectedUsers.entrySet().removeIf(entry ->
                now.minusSeconds(30).isAfter(entry.getValue())
        );
    }

    // Tarea programada para limpiar usuarios inactivos
    private void startCleanupTask() {
        ScheduledExecutorService scheduler = Executors.newScheduledThreadPool(1);
        scheduler.scheduleAtFixedRate(this::removeInactiveUsers, 0, 10, TimeUnit.SECONDS);
    }
}
