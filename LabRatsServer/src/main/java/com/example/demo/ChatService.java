package com.example.demo;

import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class ChatService {

    private final List<ChatMessage> messages = new ArrayList<>();
    private long currentId = 0;

    // Método para obtener los mensajes desde un ID dado
    public List<ChatMessage> getMessagesSince(long lastMessageId) {
        List<ChatMessage> newMessages = new ArrayList<>();
        for (ChatMessage message : messages) {
            if (message.getId() > lastMessageId) {
                newMessages.add(message);
            }
        }
        return newMessages;
    }

    // Método para agregar mensajes
    public void addMessage(ChatMessage message) {
        message.setId(++currentId);  // Asignamos un ID único a cada mensaje
        messages.add(message);
    }

    // Obtener todos los mensajes
    public List<ChatMessage> getAllMessages() {
        return new ArrayList<>(messages);
    }
}
