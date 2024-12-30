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

@Service
public class UserService {

    private static final String FILE_NAME = "UserList.txt";
    //private static final String CONNECTIONS_FILE = "connections.txt";

    private Map<String, Instant> connectedUsers = new ConcurrentHashMap<>();
    private List<User> userList = new ArrayList<>(); // Simulamos la base de datos en memoria
    private Map<String, Boolean> playerConnections = new HashMap<>(); // Mapa para gestionar el estado de conexión de los jugadores

    // Cargar usuarios desde el archivo al iniciar el servidor
    @PostConstruct
    private void loadUsersFromFile() {
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

    // Guardar el estado de las conexiones en un archivo
    //private void saveConnectionsToFile() {
    //    try (BufferedWriter writer = new BufferedWriter(new FileWriter(CONNECTIONS_FILE))) {
    //      for (Map.Entry<String, Boolean> entry : playerConnections.entrySet()) {
    //          writer.write(entry.getKey() + "," + entry.getValue());
    //          writer.newLine();
    //      }
    //      System.out.println("Estado de las conexiones guardado en " + CONNECTIONS_FILE);
    //  } catch (IOException e) {
    //      e.printStackTrace();
    //  }
    //}
    
    // Cargar el estado de las conexiones desde un archivo
    //private void loadConnectionsFromFile() {
    //  try (BufferedReader reader = new BufferedReader(new FileReader(CONNECTIONS_FILE))) {
    //      String line;
    //      while ((line = reader.readLine()) != null) {
    //          String[] parts = line.split(",");
    //          if (parts.length == 2) {
    //              String playerId = parts[0];
    //              Boolean isConnected = Boolean.parseBoolean(parts[1]);
    //              playerConnections.put(playerId, isConnected);
    //          }
    //      }
    //      System.out.println("Estado de las conexiones cargado desde " + CONNECTIONS_FILE);
    //  } catch (FileNotFoundException e) {
    //      System.out.println(CONNECTIONS_FILE + " no encontrado. Se creará uno nuevo al guardar el estado de las conexiones.");
    //  } catch (IOException e) {
    //      e.printStackTrace();
    //  }
    //}
    
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
        if (getUser(newUser.getName(), newUser.getPassword()) == null) {
            userList.add(newUser);
            saveUsersToFile();
            return true;
        }
        return false;
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
            saveUsersToFile();
        }
        return removed;
    }

    // Conectar un jugador (marcar como conectado)
    public boolean connectPlayer(String playerId) {
        if (playerConnections.containsKey(playerId)) {
            return false; // El jugador ya está conectado
        }
        playerConnections.put(playerId, true);
        //saveConnectionsToFile();  // Guardamos el estado de las conexiones
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
